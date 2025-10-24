import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys, queryClient, invalidateQueries, optimisticUpdates } from '../client'
import type { PropertyQuery, PropertyCreate, PropertyUpdate } from '@/lib/api/types'

// Fetch functions
const fetchProperties = async (query: PropertyQuery) => {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value))
    }
  })
  
  const response = await fetch(`/api/properties?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch properties')
  }
  return response.json()
}

const fetchProperty = async (id: string) => {
  const response = await fetch(`/api/properties/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch property')
  }
  return response.json()
}

const fetchPropertyAnalytics = async (id: string) => {
  const response = await fetch(`/api/properties/${id}/analytics`)
  if (!response.ok) {
    throw new Error('Failed to fetch property analytics')
  }
  return response.json()
}

const fetchFeaturedProperties = async () => {
  const response = await fetch('/api/properties/featured')
  if (!response.ok) {
    throw new Error('Failed to fetch featured properties')
  }
  return response.json()
}

const fetchSimilarProperties = async (id: string) => {
  const response = await fetch(`/api/properties/${id}/similar`)
  if (!response.ok) {
    throw new Error('Failed to fetch similar properties')
  }
  return response.json()
}

const createProperty = async (data: PropertyCreate) => {
  const response = await fetch('/api/properties', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create property')
  }
  return response.json()
}

const updateProperty = async ({ id, data }: { id: string; data: PropertyUpdate }) => {
  const response = await fetch(`/api/properties/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update property')
  }
  return response.json()
}

const deleteProperty = async (id: string) => {
  const response = await fetch(`/api/properties/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete property')
  }
  return response.json()
}

// Query Hooks
export const useProperties = (query: PropertyQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.properties.list(query),
    queryFn: () => fetchProperties(query),
    staleTime: 2 * 60 * 1000, // 2 minutes for list data
    placeholderData: (previousData) => previousData,
  })
}

export const useInfiniteProperties = (query: PropertyQuery = {}) => {
  return useInfiniteQuery({
    queryKey: queryKeys.properties.list({ ...query, infinite: true }),
    queryFn: ({ pageParam = 1 }) => fetchProperties({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data || {}
      return pagination?.hasNext ? pagination.page + 1 : undefined
    },
    staleTime: 2 * 60 * 1000,
  })
}

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: queryKeys.properties.detail(id),
    queryFn: () => fetchProperty(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes for detail data
  })
}

export const usePropertyAnalytics = (id: string) => {
  return useQuery({
    queryKey: queryKeys.properties.analytics(id),
    queryFn: () => fetchPropertyAnalytics(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for analytics
  })
}

export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: queryKeys.properties.featured(),
    queryFn: fetchFeaturedProperties,
    staleTime: 15 * 60 * 1000, // 15 minutes for featured properties
  })
}

export const useSimilarProperties = (id: string) => {
  return useQuery({
    queryKey: queryKeys.properties.similar(id),
    queryFn: () => fetchSimilarProperties(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for similar properties
  })
}

// Mutation Hooks
export const useCreateProperty = () => {
  return useMutation({
    mutationFn: createProperty,
    onSuccess: (newProperty, variables) => {
      // Invalidate and refetch properties list
      invalidateQueries.properties.list()
      
      // Add the new property to existing queries optimistically
      const currentFilters = {} // You might want to track current filters
      optimisticUpdates.addPropertyToList(newProperty.data, currentFilters)
      
      // Prefetch the new property details
      queryClient.setQueryData(
        queryKeys.properties.detail(newProperty.data.id),
        newProperty
      )
    },
    onError: (error) => {
      console.error('Failed to create property:', error)
    },
  })
}

export const useUpdateProperty = () => {
  return useMutation({
    mutationFn: updateProperty,
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.properties.detail(id) })
      
      // Snapshot the previous value
      const previousProperty = queryClient.getQueryData(queryKeys.properties.detail(id))
      
      // Optimistically update the cache
      optimisticUpdates.updateProperty(id, data)
      
      return { previousProperty, id }
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousProperty && context?.id) {
        queryClient.setQueryData(
          queryKeys.properties.detail(context.id),
          context.previousProperty
        )
      }
    },
    onSuccess: (updatedProperty, { id }) => {
      // Update the cache with the real data
      queryClient.setQueryData(
        queryKeys.properties.detail(id),
        updatedProperty
      )
      
      // Invalidate related queries
      invalidateQueries.properties.list()
    },
  })
}

export const useDeleteProperty = () => {
  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.properties.detail(deletedId) })
      
      // Invalidate list queries
      invalidateQueries.properties.list()
    },
    onError: (error) => {
      console.error('Failed to delete property:', error)
    },
  })
}

// Utility hooks for property management
export const usePropertyFilters = () => {
  const { data: areas } = useQuery({
    queryKey: queryKeys.propertyAreas.list(),
    queryFn: () => fetch('/api/property-areas').then(res => res.json()),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
  
  const { data: developers } = useQuery({
    queryKey: queryKeys.developers.list(),
    queryFn: () => fetch('/api/developers').then(res => res.json()),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
  
  return {
    areas: areas?.data || [],
    developers: developers?.data || [],
  }
}

export const usePropertySearch = (searchTerm: string, filters: PropertyQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.properties.list({ ...filters, search: searchTerm }),
    queryFn: () => fetchProperties({ ...filters, search: searchTerm }),
    enabled: searchTerm.length >= 2, // Only search with 2+ characters
    staleTime: 1 * 60 * 1000, // 1 minute for search results
  })
}

// Property statistics hook
export const usePropertyStats = () => {
  return useQuery({
    queryKey: ['properties', 'stats'],
    queryFn: async () => {
      const response = await fetch('/api/properties/stats')
      if (!response.ok) {
        throw new Error('Failed to fetch property stats')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Bulk operations
export const useBulkUpdateProperties = () => {
  return useMutation({
    mutationFn: async ({ ids, data }: { ids: string[]; data: Partial<PropertyUpdate> }) => {
      const response = await fetch('/api/properties/bulk-update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, data }),
      })
      if (!response.ok) {
        throw new Error('Failed to bulk update properties')
      }
      return response.json()
    },
    onSuccess: () => {
      // Invalidate all property-related queries
      invalidateQueries.properties.all()
    },
  })
}

// Property favorites/watchlist
export const usePropertyWatchlist = (userId: string) => {
  return useQuery({
    queryKey: ['watchlist', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}/watchlist`)
      if (!response.ok) {
        throw new Error('Failed to fetch watchlist')
      }
      return response.json()
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  })
}

export const useTogglePropertyWatchlist = (userId: string) => {
  return useMutation({
    mutationFn: async ({ propertyId, action }: { propertyId: string; action: 'add' | 'remove' }) => {
      const response = await fetch(`/api/users/${userId}/watchlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId, action }),
      })
      if (!response.ok) {
        throw new Error('Failed to update watchlist')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', userId] })
    },
  })
}