import { QueryClient } from '@tanstack/react-query'

// Create a new QueryClient instance with optimized defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data remains fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      
      // Cache data for 10 minutes
      gcTime: 10 * 60 * 1000,
      
      // Retry failed requests 3 times with exponential backoff
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        return failureCount < 3
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus in production
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Refetch on mount if data is stale
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
      
      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
})

// Query keys factory for consistent key management
export const queryKeys = {
  // Properties
  properties: {
    all: ['properties'] as const,
    lists: () => [...queryKeys.properties.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.properties.lists(), filters] as const,
    details: () => [...queryKeys.properties.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.properties.details(), id] as const,
    analytics: (id: string) => [...queryKeys.properties.detail(id), 'analytics'] as const,
    featured: () => [...queryKeys.properties.all, 'featured'] as const,
    similar: (id: string) => [...queryKeys.properties.detail(id), 'similar'] as const,
  },
  
  // Clients
  clients: {
    all: ['clients'] as const,
    lists: () => [...queryKeys.clients.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.clients.lists(), filters] as const,
    details: () => [...queryKeys.clients.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.clients.details(), id] as const,
    analytics: (id: string) => [...queryKeys.clients.detail(id), 'analytics'] as const,
    dashboard: () => [...queryKeys.clients.all, 'dashboard'] as const,
  },
  
  // Property Areas
  propertyAreas: {
    all: ['propertyAreas'] as const,
    lists: () => [...queryKeys.propertyAreas.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.propertyAreas.lists(), filters || {}] as const,
    details: () => [...queryKeys.propertyAreas.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.propertyAreas.details(), id] as const,
  },
  
  // Developers
  developers: {
    all: ['developers'] as const,
    lists: () => [...queryKeys.developers.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.developers.lists(), filters || {}] as const,
    details: () => [...queryKeys.developers.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.developers.details(), id] as const,
  },
  
  // Investments
  investments: {
    all: ['investments'] as const,
    lists: () => [...queryKeys.investments.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.investments.lists(), filters] as const,
    details: () => [...queryKeys.investments.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.investments.details(), id] as const,
    byClient: (clientId: string) => [...queryKeys.investments.all, 'client', clientId] as const,
    byProperty: (propertyId: string) => [...queryKeys.investments.all, 'property', propertyId] as const,
  },
  
  // Property Tours
  propertyTours: {
    all: ['propertyTours'] as const,
    lists: () => [...queryKeys.propertyTours.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.propertyTours.lists(), filters] as const,
    details: () => [...queryKeys.propertyTours.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.propertyTours.details(), id] as const,
    byClient: (clientId: string) => [...queryKeys.propertyTours.all, 'client', clientId] as const,
    byProperty: (propertyId: string) => [...queryKeys.propertyTours.all, 'property', propertyId] as const,
  },
  
  // Client Interactions
  clientInteractions: {
    all: ['clientInteractions'] as const,
    lists: () => [...queryKeys.clientInteractions.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.clientInteractions.lists(), filters] as const,
    byClient: (clientId: string) => [...queryKeys.clientInteractions.all, 'client', clientId] as const,
  },
  
  // Market Data
  marketData: {
    all: ['marketData'] as const,
    lists: () => [...queryKeys.marketData.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.marketData.lists(), filters] as const,
    byArea: (areaId: string) => [...queryKeys.marketData.all, 'area', areaId] as const,
    trends: (params: Record<string, any>) => [...queryKeys.marketData.all, 'trends', params] as const,
  },
  
  // Analytics
  analytics: {
    all: ['analytics'] as const,
    dashboard: () => [...queryKeys.analytics.all, 'dashboard'] as const,
    properties: () => [...queryKeys.analytics.all, 'properties'] as const,
    clients: () => [...queryKeys.analytics.all, 'clients'] as const,
    investments: () => [...queryKeys.analytics.all, 'investments'] as const,
    revenue: (timeframe: string) => [...queryKeys.analytics.all, 'revenue', timeframe] as const,
  },
} as const

// Helper function to invalidate related queries
export const invalidateQueries = {
  properties: {
    all: () => queryClient.invalidateQueries({ queryKey: queryKeys.properties.all }),
    list: () => queryClient.invalidateQueries({ queryKey: queryKeys.properties.lists() }),
    detail: (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.properties.detail(id) }),
  },
  clients: {
    all: () => queryClient.invalidateQueries({ queryKey: queryKeys.clients.all }),
    list: () => queryClient.invalidateQueries({ queryKey: queryKeys.clients.lists() }),
    detail: (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.clients.detail(id) }),
    dashboard: () => queryClient.invalidateQueries({ queryKey: queryKeys.clients.dashboard() }),
  },
  investments: {
    all: () => queryClient.invalidateQueries({ queryKey: queryKeys.investments.all }),
    byClient: (clientId: string) => queryClient.invalidateQueries({ queryKey: queryKeys.investments.byClient(clientId) }),
    byProperty: (propertyId: string) => queryClient.invalidateQueries({ queryKey: queryKeys.investments.byProperty(propertyId) }),
  },
}

// Prefetch helpers for better UX
export const prefetchQueries = {
  propertyDetails: async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.properties.detail(id),
      queryFn: () => fetch(`/api/properties/${id}`).then(res => res.json()),
      staleTime: 5 * 60 * 1000,
    })
  },
  
  clientDetails: async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.clients.detail(id),
      queryFn: () => fetch(`/api/clients/${id}`).then(res => res.json()),
      staleTime: 5 * 60 * 1000,
    })
  },
  
  similarProperties: async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.properties.similar(id),
      queryFn: () => fetch(`/api/properties/${id}/similar`).then(res => res.json()),
      staleTime: 10 * 60 * 1000,
    })
  },
}

// Background sync for real-time updates
export const backgroundSync = {
  startPolling: (queryKey: any[], intervalMs: number = 30000) => {
    return setInterval(() => {
      queryClient.invalidateQueries({ queryKey })
    }, intervalMs)
  },
  
  stopPolling: (intervalId: NodeJS.Timeout) => {
    clearInterval(intervalId)
  },
}

// Optimistic update helpers
export const optimisticUpdates = {
  updateProperty: (id: string, updatedData: any) => {
    queryClient.setQueryData(
      queryKeys.properties.detail(id),
      (oldData: any) => oldData ? { ...oldData, ...updatedData } : null
    )
  },
  
  updateClient: (id: string, updatedData: any) => {
    queryClient.setQueryData(
      queryKeys.clients.detail(id),
      (oldData: any) => oldData ? { ...oldData, ...updatedData } : null
    )
  },
  
  addPropertyToList: (newProperty: any, filters: Record<string, any>) => {
    queryClient.setQueryData(
      queryKeys.properties.list(filters),
      (oldData: any) => {
        if (!oldData) return null
        return {
          ...oldData,
          properties: [newProperty, ...oldData.properties],
          pagination: {
            ...oldData.pagination,
            total: oldData.pagination.total + 1
          }
        }
      }
    )
  },
}

// Cache warming for frequently accessed data
export const warmCache = async () => {
  // Warm up featured properties
  queryClient.prefetchQuery({
    queryKey: queryKeys.properties.featured(),
    queryFn: () => fetch('/api/properties/featured').then(res => res.json()),
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
  
  // Warm up property areas
  queryClient.prefetchQuery({
    queryKey: queryKeys.propertyAreas.list(),
    queryFn: () => fetch('/api/property-areas').then(res => res.json()),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
  
  // Warm up developers
  queryClient.prefetchQuery({
    queryKey: queryKeys.developers.list(),
    queryFn: () => fetch('/api/developers').then(res => res.json()),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}