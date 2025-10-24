import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys, queryClient, invalidateQueries, optimisticUpdates } from '../client'
import type { ClientQuery, ClientCreate, ClientUpdate } from '@/lib/api/types'

// Fetch functions
const fetchClients = async (query: ClientQuery) => {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value))
    }
  })
  
  const response = await fetch(`/api/clients?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  return response.json()
}

const fetchClient = async (id: string) => {
  const response = await fetch(`/api/clients/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch client')
  }
  return response.json()
}

const fetchClientAnalytics = async (id: string) => {
  const response = await fetch(`/api/clients/${id}/analytics`)
  if (!response.ok) {
    throw new Error('Failed to fetch client analytics')
  }
  return response.json()
}

const fetchClientDashboard = async () => {
  const response = await fetch('/api/clients/dashboard')
  if (!response.ok) {
    throw new Error('Failed to fetch client dashboard')
  }
  return response.json()
}

const createClient = async (data: ClientCreate) => {
  const response = await fetch('/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create client')
  }
  return response.json()
}

const updateClient = async ({ id, data }: { id: string; data: ClientUpdate }) => {
  const response = await fetch(`/api/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update client')
  }
  return response.json()
}

const deleteClient = async (id: string) => {
  const response = await fetch(`/api/clients/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete client')
  }
  return response.json()
}

// Query Hooks
export const useClients = (query: ClientQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.clients.list(query),
    queryFn: () => fetchClients(query),
    staleTime: 2 * 60 * 1000, // 2 minutes for list data
    placeholderData: (previousData) => previousData,
  })
}

export const useInfiniteClients = (query: ClientQuery = {}) => {
  return useInfiniteQuery({
    queryKey: queryKeys.clients.list({ ...query, infinite: true }),
    queryFn: ({ pageParam = 1 }) => fetchClients({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data || {}
      return pagination?.hasNext ? pagination.page + 1 : undefined
    },
    staleTime: 2 * 60 * 1000,
  })
}

export const useClient = (id: string) => {
  return useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: () => fetchClient(id),
    enabled: !!id,
    staleTime: 3 * 60 * 1000, // 3 minutes for client detail
  })
}

export const useClientAnalytics = (id: string) => {
  return useQuery({
    queryKey: queryKeys.clients.analytics(id),
    queryFn: () => fetchClientAnalytics(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes for analytics
  })
}

export const useClientDashboard = () => {
  return useQuery({
    queryKey: queryKeys.clients.dashboard(),
    queryFn: fetchClientDashboard,
    staleTime: 3 * 60 * 1000, // 3 minutes for dashboard stats
  })
}

// Mutation Hooks
export const useCreateClient = () => {
  return useMutation({
    mutationFn: createClient,
    onSuccess: (newClient) => {
      // Invalidate clients list
      invalidateQueries.clients.list()
      invalidateQueries.clients.dashboard()
      
      // Set the new client in cache
      queryClient.setQueryData(
        queryKeys.clients.detail(newClient.data.id),
        newClient
      )
    },
    onError: (error) => {
      console.error('Failed to create client:', error)
    },
  })
}

export const useUpdateClient = () => {
  return useMutation({
    mutationFn: updateClient,
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.clients.detail(id) })
      
      // Snapshot the previous value
      const previousClient = queryClient.getQueryData(queryKeys.clients.detail(id))
      
      // Optimistically update the cache
      optimisticUpdates.updateClient(id, data)
      
      return { previousClient, id }
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousClient && context?.id) {
        queryClient.setQueryData(
          queryKeys.clients.detail(context.id),
          context.previousClient
        )
      }
    },
    onSuccess: (updatedClient, { id }) => {
      // Update the cache with the real data
      queryClient.setQueryData(
        queryKeys.clients.detail(id),
        updatedClient
      )
      
      // Invalidate related queries
      invalidateQueries.clients.list()
      invalidateQueries.clients.dashboard()
    },
  })
}

export const useDeleteClient = () => {
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.clients.detail(deletedId) })
      
      // Invalidate list queries
      invalidateQueries.clients.list()
      invalidateQueries.clients.dashboard()
    },
    onError: (error) => {
      console.error('Failed to delete client:', error)
    },
  })
}

// Client interaction hooks
export const useClientInteractions = (clientId: string) => {
  return useQuery({
    queryKey: queryKeys.clientInteractions.byClient(clientId),
    queryFn: async () => {
      const response = await fetch(`/api/clients/${clientId}/interactions`)
      if (!response.ok) {
        throw new Error('Failed to fetch client interactions')
      }
      return response.json()
    },
    enabled: !!clientId,
    staleTime: 2 * 60 * 1000,
  })
}

export const useCreateClientInteraction = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/client-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create interaction')
      }
      return response.json()
    },
    onSuccess: (_, variables) => {
      // Invalidate client interactions
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.clientInteractions.byClient(variables.clientId) 
      })
      
      // Invalidate client details to update interaction count
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.clients.detail(variables.clientId) 
      })
    },
  })
}

// Client property interest hooks
export const useClientProperties = (clientId: string) => {
  return useQuery({
    queryKey: ['clientProperties', clientId],
    queryFn: async () => {
      const response = await fetch(`/api/clients/${clientId}/properties`)
      if (!response.ok) {
        throw new Error('Failed to fetch client properties')
      }
      return response.json()
    },
    enabled: !!clientId,
    staleTime: 3 * 60 * 1000,
  })
}

export const useAddClientPropertyInterest = () => {
  return useMutation({
    mutationFn: async ({ clientId, propertyId, status, notes }: any) => {
      const response = await fetch('/api/client-properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, propertyId, status, notes }),
      })
      if (!response.ok) {
        throw new Error('Failed to add property interest')
      }
      return response.json()
    },
    onSuccess: (_, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ 
        queryKey: ['clientProperties', variables.clientId] 
      })
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.clients.detail(variables.clientId) 
      })
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.properties.detail(variables.propertyId) 
      })
    },
  })
}

// Client search and filtering
export const useClientSearch = (searchTerm: string, filters: ClientQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.clients.list({ ...filters, search: searchTerm }),
    queryFn: () => fetchClients({ ...filters, search: searchTerm }),
    enabled: searchTerm.length >= 2, // Only search with 2+ characters
    staleTime: 1 * 60 * 1000, // 1 minute for search results
  })
}

// Lead management hooks
export const useUpdateLeadScore = () => {
  return useMutation({
    mutationFn: async (clientId: string) => {
      const response = await fetch(`/api/clients/${clientId}/lead-score`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Failed to update lead score')
      }
      return response.json()
    },
    onSuccess: (_, clientId) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.clients.detail(clientId) 
      })
    },
  })
}

export const useClientFollowUp = () => {
  return useMutation({
    mutationFn: async ({ clientId, followUpDate, notes }: any) => {
      const response = await fetch(`/api/clients/${clientId}/follow-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followUpDate, notes }),
      })
      if (!response.ok) {
        throw new Error('Failed to schedule follow-up')
      }
      return response.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.clients.detail(variables.clientId) 
      })
    },
  })
}

// Client segmentation hooks
export const useClientSegments = () => {
  return useQuery({
    queryKey: ['clientSegments'],
    queryFn: async () => {
      const response = await fetch('/api/clients/segments')
      if (!response.ok) {
        throw new Error('Failed to fetch client segments')
      }
      return response.json()
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Bulk operations
export const useBulkUpdateClients = () => {
  return useMutation({
    mutationFn: async ({ ids, data }: { ids: string[]; data: Partial<ClientUpdate> }) => {
      const response = await fetch('/api/clients/bulk-update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, data }),
      })
      if (!response.ok) {
        throw new Error('Failed to bulk update clients')
      }
      return response.json()
    },
    onSuccess: () => {
      // Invalidate all client-related queries
      invalidateQueries.clients.all()
    },
  })
}

// Communication hooks
export const useSendClientEmail = () => {
  return useMutation({
    mutationFn: async ({ clientId, subject, content, templateId }: any) => {
      const response = await fetch('/api/communications/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, subject, content, templateId }),
      })
      if (!response.ok) {
        throw new Error('Failed to send email')
      }
      return response.json()
    },
    onSuccess: (_, variables) => {
      // Record the interaction
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.clientInteractions.byClient(variables.clientId) 
      })
    },
  })
}

// Client export hook
export const useExportClients = () => {
  return useMutation({
    mutationFn: async ({ filters, format }: { filters: ClientQuery; format: 'csv' | 'excel' }) => {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value))
        }
      })
      params.append('format', format)
      
      const response = await fetch(`/api/clients/export?${params}`)
      if (!response.ok) {
        throw new Error('Failed to export clients')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `clients_export_${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      return { success: true }
    },
  })
}