'use client'

import React, { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient, warmCache } from './client'

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create a stable query client instance
  const [client] = useState(() => queryClient)

  // Warm cache on mount
  React.useEffect(() => {
    warmCache()
  }, [])

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* Only show devtools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  )
}

// Error Boundary for Query Errors
export class QueryErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Query Error Boundary caught an error:', error, errorInfo)
    
    // You can log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} />
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Something went wrong
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                We encountered an error while loading the data. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Loading Component for Suspense
export function QueryLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

// Prefetch component for data warming
export function PrefetchData({ children }: { children: React.ReactNode }) {
  const [isWarmed, setIsWarmed] = useState(false)

  React.useEffect(() => {
    const warmData = async () => {
      try {
        await warmCache()
        setIsWarmed(true)
      } catch (error) {
        console.error('Failed to warm cache:', error)
        setIsWarmed(true) // Continue anyway
      }
    }

    warmData()
  }, [])

  if (!isWarmed) {
    return <QueryLoading />
  }

  return <>{children}</>
}

// Hook to provide query client context
export function useQueryClient() {
  return queryClient
}

// Performance monitoring hook
export function useQueryPerformance() {
  const [metrics, setMetrics] = useState({
    cacheSize: 0,
    queryCount: 0,
    mutationCount: 0,
  })

  React.useEffect(() => {
    const updateMetrics = () => {
      const cache = queryClient.getQueryCache()
      const mutationCache = queryClient.getMutationCache()
      
      setMetrics({
        cacheSize: cache.getAll().length,
        queryCount: cache.getAll().filter(query => query.state.status === 'success').length,
        mutationCount: mutationCache.getAll().length,
      })
    }

    // Update metrics every 5 seconds in development
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(updateMetrics, 5000)
      updateMetrics() // Initial call
      
      return () => clearInterval(interval)
    }
  }, [])

  return metrics
}

// Network status hook
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? window.navigator.onLine : true
  )

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      // Refetch all queries when back online
      queryClient.refetchQueries()
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

// Query synchronization hook for real-time updates
export function useQuerySync() {
  React.useEffect(() => {
    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket(
      process.env.NODE_ENV === 'development' 
        ? 'ws://localhost:3003/ws'
        : 'wss://your-domain.com/ws'
    )

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        
        switch (message.type) {
          case 'property_updated':
            queryClient.invalidateQueries({ 
              queryKey: ['properties'] 
            })
            break
          case 'client_updated':
            queryClient.invalidateQueries({ 
              queryKey: ['clients'] 
            })
            break
          case 'investment_created':
            queryClient.invalidateQueries({ 
              queryKey: ['investments'] 
            })
            queryClient.invalidateQueries({ 
              queryKey: ['analytics'] 
            })
            break
          default:
            console.log('Unknown message type:', message.type)
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [])
}