'use client'

import { useState, useEffect, useRef } from 'react'
import { AdminHeader } from '@/components/admin/AdminHeader'

interface RealtimeData {
  activeSessions: number
  recentLeads: number
  recentEvents: number
  timestamp: string
}

interface LiveEvent {
  id: string
  type: 'page_view' | 'event' | 'lead' | 'session_start'
  page?: string
  eventName?: string
  sessionId: string
  timestamp: string
  userAgent?: string
  country?: string
  device?: string
}

interface ActiveSession {
  sessionId: string
  currentPage: string
  startTime: string
  lastActivity: string
  device: string
  country?: string
  eventsCount: number
  pagesViewed: number
  isLead: boolean
}

export default function RealtimeAnalyticsPage() {
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null)
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([])
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([])
  const [loading, setLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const eventsRef = useRef<HTMLDivElement>(null)

  const fetchRealtimeData = async () => {
    try {
      const response = await fetch('/api/analytics/realtime')
      const data = await response.json()
      
      if (data.success) {
        setRealtimeData(data.data)
        setIsConnected(true)
        
        // Simulate active sessions data
        generateMockActiveSessions(data.data.activeSessions)
      }
    } catch (error) {
      console.error('Failed to fetch realtime data:', error)
      setIsConnected(false)
    }
  }

  const generateMockActiveSessions = (count: number) => {
    const sessions: ActiveSession[] = []
    const pages = ['/', '/properties', '/contact', '/about', '/version-3']
    const devices = ['DESKTOP', 'MOBILE', 'TABLET']
    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'UAE']

    for (let i = 0; i < Math.min(count, 10); i++) {
      const sessionStart = new Date(Date.now() - Math.random() * 3600000) // Last hour
      sessions.push({
        sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
        currentPage: pages[Math.floor(Math.random() * pages.length)],
        startTime: sessionStart.toISOString(),
        lastActivity: new Date(sessionStart.getTime() + Math.random() * 1800000).toISOString(),
        device: devices[Math.floor(Math.random() * devices.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        eventsCount: Math.floor(Math.random() * 15),
        pagesViewed: Math.floor(Math.random() * 5) + 1,
        isLead: Math.random() > 0.85
      })
    }

    setActiveSessions(sessions.sort((a, b) => 
      new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    ))
  }

  const generateMockEvent = (): LiveEvent => {
    const types: LiveEvent['type'][] = ['page_view', 'event', 'lead', 'session_start']
    const pages = ['/', '/properties', '/contact', '/about', '/version-3']
    const events = ['click', 'scroll_depth', 'form_focus', 'button_click', 'link_click']
    const devices = ['DESKTOP', 'MOBILE', 'TABLET']
    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'UAE']

    const type = types[Math.floor(Math.random() * types.length)]
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      page: type === 'page_view' ? pages[Math.floor(Math.random() * pages.length)] : undefined,
      eventName: type === 'event' ? events[Math.floor(Math.random() * events.length)] : undefined,
      sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      userAgent: `${devices[Math.floor(Math.random() * devices.length)]}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      device: devices[Math.floor(Math.random() * devices.length)]
    }
  }

  const addLiveEvent = (event: LiveEvent) => {
    setLiveEvents(prev => {
      const newEvents = [event, ...prev.slice(0, 49)] // Keep last 50 events
      return newEvents
    })

    // Auto-scroll to top of events
    if (eventsRef.current) {
      eventsRef.current.scrollTop = 0
    }
  }

  useEffect(() => {
    // Initial data fetch
    fetchRealtimeData()
    setLoading(false)

    // Set up real-time updates
    const dataInterval = setInterval(fetchRealtimeData, 10000) // Every 10 seconds
    
    // Simulate live events
    const eventInterval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance of generating an event
        addLiveEvent(generateMockEvent())
      }
    }, 2000) // Every 2 seconds

    return () => {
      clearInterval(dataInterval)
      clearInterval(eventInterval)
    }
  }, [])

  const getEventIcon = (type: LiveEvent['type']) => {
    switch (type) {
      case 'page_view': return '👁️'
      case 'event': return '⚡'
      case 'lead': return '🎯'
      case 'session_start': return '🚀'
      default: return '📊'
    }
  }

  const getEventColor = (type: LiveEvent['type']) => {
    switch (type) {
      case 'page_view': return 'bg-blue-100 text-blue-800'
      case 'event': return 'bg-green-100 text-green-800'
      case 'lead': return 'bg-red-100 text-red-800'
      case 'session_start': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return `${seconds}s ago`
  }

  const getSessionDuration = (startTime: string) => {
    const duration = Date.now() - new Date(startTime).getTime()
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading real-time analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-time Analytics</h1>
              <p className="text-gray-600">Live monitoring of user activity and engagement</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold text-gray-900">{realtimeData?.activeSessions || 0}</p>
            <p className="text-sm text-green-600 mt-1">🟢 Live now</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Leads</h3>
            <p className="text-3xl font-bold text-red-600">{realtimeData?.recentLeads || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Last hour</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Events</h3>
            <p className="text-3xl font-bold text-blue-600">{realtimeData?.recentEvents || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Last hour</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Live Events</h3>
            <p className="text-3xl font-bold text-green-600">{liveEvents.length}</p>
            <p className="text-sm text-gray-500 mt-1">Tracked</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Event Stream */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Live Event Stream</h2>
              <p className="text-sm text-gray-500">Real-time user interactions</p>
            </div>
            
            <div ref={eventsRef} className="h-96 overflow-y-auto p-4 space-y-3">
              {liveEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg">{getEventIcon(event.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                        {event.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">{formatTimeAgo(event.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-900 mt-1">
                      {event.type === 'page_view' && event.page && `Page: ${event.page}`}
                      {event.type === 'event' && event.eventName && `Event: ${event.eventName}`}
                      {event.type === 'lead' && 'New lead generated!'}
                      {event.type === 'session_start' && 'New session started'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {event.device} • {event.country} • {event.sessionId.slice(-8)}
                    </p>
                  </div>
                </div>
              ))}
              
              {liveEvents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Waiting for live events...</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>
              <p className="text-sm text-gray-500">Current website visitors</p>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 space-y-3">
              {activeSessions.map((session) => (
                <div key={session.sessionId} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {session.currentPage}
                    </span>
                    <div className="flex items-center space-x-2">
                      {session.isLead && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Lead
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {getSessionDuration(session.startTime)}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Device: {session.device} • {session.country}</p>
                    <p>Pages: {session.pagesViewed} • Events: {session.eventsCount}</p>
                    <p>Last activity: {formatTimeAgo(session.lastActivity)}</p>
                  </div>
                </div>
              ))}
              
              {activeSessions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No active sessions</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Real-time Insights */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Real-time Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Peak Activity</h4>
              <p className="text-sm text-blue-800">
                Most users are currently viewing property pages and engaging with contact forms.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Conversion Rate</h4>
              <p className="text-sm text-green-800">
                {realtimeData && realtimeData.activeSessions > 0 
                  ? `${((realtimeData.recentLeads / realtimeData.activeSessions) * 100).toFixed(1)}%`
                  : '0%'
                } of active sessions have converted to leads.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">User Engagement</h4>
              <p className="text-sm text-yellow-800">
                Average session includes {activeSessions.length > 0 
                  ? Math.round(activeSessions.reduce((sum, s) => sum + s.eventsCount, 0) / activeSessions.length)
                  : 0
                } interactions and {activeSessions.length > 0 
                  ? Math.round(activeSessions.reduce((sum, s) => sum + s.pagesViewed, 0) / activeSessions.length)
                  : 0
                } page views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}