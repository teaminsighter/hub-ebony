'use client'

import { useState, useEffect } from 'react'
import { AdminHeader } from '@/components/admin/AdminHeader'

interface RepeatLead {
  id: string
  email: string
  name?: string
  originalLeadId: string
  previousLeadCount: number
  isRepeatLead: boolean
  formType: string
  leadScore: number
  createdAt: string
  updatedAt: string
  timeBetweenLeads?: number // in days
  changes: {
    name?: { old: string, new: string }
    phone?: { old: string, new: string }
    company?: { old: string, new: string }
    message?: { old: string, new: string }
    formType?: { old: string, new: string }
  }
  behaviorChange: {
    timeOnSiteChange: number
    pagesVisitedChange: number
    eventsTriggeredChange: number
    leadScoreChange: number
  }
  allSubmissions: Array<{
    id: string
    formType: string
    leadScore: number
    createdAt: string
    pagesVisited: number
    timeOnSite: number
    eventsTriggered: number
  }>
}

interface RepeatLeadFilters {
  startDate?: string
  endDate?: string
  minSubmissions?: number
  maxDaysBetween?: number
  formType?: string
  leadScoreRange?: [number, number]
}

export default function RepeatLeadsAnalysisPage() {
  const [repeatLeads, setRepeatLeads] = useState<RepeatLead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<RepeatLead | null>(null)
  const [filters, setFilters] = useState<RepeatLeadFilters>({
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 90 days
    endDate: new Date().toISOString().split('T')[0],
    minSubmissions: 2
  })

  const fetchRepeatLeads = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('isRepeatLead', 'true')
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString())
        }
      })

      const response = await fetch(`/api/analytics/leads?${queryParams}`)
      const data = await response.json()
      
      if (data.success) {
        // Process the leads to add repeat lead analysis
        const processedLeads = await processRepeatLeads(data.data.leads)
        setRepeatLeads(processedLeads)
      }
    } catch (error) {
      console.error('Failed to fetch repeat leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const processRepeatLeads = async (leads: any[]): Promise<RepeatLead[]> => {
    // Group leads by email and analyze changes
    const leadsByEmail = leads.reduce((acc, lead) => {
      if (!acc[lead.email]) {
        acc[lead.email] = []
      }
      acc[lead.email].push(lead)
      return acc
    }, {} as Record<string, any[]>)

    const processedLeads: RepeatLead[] = []

    Object.entries(leadsByEmail).forEach(([email, userLeads]) => {
      if (userLeads.length < 2) return // Skip if not actually repeat leads

      // Sort by creation date
      userLeads.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

      // Process each submission after the first
      for (let i = 1; i < userLeads.length; i++) {
        const currentLead = userLeads[i]
        const previousLead = userLeads[i - 1]
        const firstLead = userLeads[0]

        const timeBetweenLeads = Math.floor(
          (new Date(currentLead.createdAt).getTime() - new Date(previousLead.createdAt).getTime()) 
          / (1000 * 60 * 60 * 24)
        )

        // Analyze changes between submissions
        const changes: any = {}
        if (currentLead.name !== previousLead.name) {
          changes.name = { old: previousLead.name, new: currentLead.name }
        }
        if (currentLead.phone !== previousLead.phone) {
          changes.phone = { old: previousLead.phone, new: currentLead.phone }
        }
        if (currentLead.company !== previousLead.company) {
          changes.company = { old: previousLead.company, new: currentLead.company }
        }
        if (currentLead.message !== previousLead.message) {
          changes.message = { old: previousLead.message, new: currentLead.message }
        }
        if (currentLead.formType !== previousLead.formType) {
          changes.formType = { old: previousLead.formType, new: currentLead.formType }
        }

        // Analyze behavior changes
        const behaviorChange = {
          timeOnSiteChange: currentLead.timeOnSite - previousLead.timeOnSite,
          pagesVisitedChange: currentLead.pagesVisited - previousLead.pagesVisited,
          eventsTriggeredChange: currentLead.eventsTriggered - previousLead.eventsTriggered,
          leadScoreChange: currentLead.leadScore - previousLead.leadScore
        }

        processedLeads.push({
          ...currentLead,
          originalLeadId: firstLead.id,
          timeBetweenLeads,
          changes,
          behaviorChange,
          allSubmissions: userLeads.map(lead => ({
            id: lead.id,
            formType: lead.formType,
            leadScore: lead.leadScore,
            createdAt: lead.createdAt,
            pagesVisited: lead.pagesVisited,
            timeOnSite: lead.timeOnSite,
            eventsTriggered: lead.eventsTriggered
          }))
        })
      }
    })

    return processedLeads
  }

  useEffect(() => {
    fetchRepeatLeads()
  }, [])

  const handleFilterChange = (key: keyof RepeatLeadFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    fetchRepeatLeads()
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) return `${hours}h ${minutes}m`
    if (minutes > 0) return `${minutes}m`
    return `${seconds}s`
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getEngagementTrend = (lead: RepeatLead) => {
    const { behaviorChange } = lead
    const positiveChanges = [
      behaviorChange.timeOnSiteChange > 0,
      behaviorChange.pagesVisitedChange > 0,
      behaviorChange.eventsTriggeredChange > 0,
      behaviorChange.leadScoreChange > 0
    ].filter(Boolean).length

    if (positiveChanges >= 3) return { trend: 'Increasing', color: 'text-green-600' }
    if (positiveChanges <= 1) return { trend: 'Decreasing', color: 'text-red-600' }
    return { trend: 'Mixed', color: 'text-yellow-600' }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading repeat leads analysis...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Repeat Leads Analysis</h1>
          <p className="text-gray-600">Analyze behavior patterns and changes in repeat lead submissions</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Analysis Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Submissions</label>
              <input
                type="number"
                min="2"
                value={filters.minSubmissions || 2}
                onChange={(e) => handleFilterChange('minSubmissions', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Days Between</label>
              <input
                type="number"
                placeholder="e.g., 30"
                value={filters.maxDaysBetween || ''}
                onChange={(e) => handleFilterChange('maxDaysBetween', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={applyFilters}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Apply Filters'}
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Repeat Leads</h3>
            <p className="text-3xl font-bold text-gray-900">{repeatLeads.length}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Days Between</h3>
            <p className="text-3xl font-bold text-blue-600">
              {repeatLeads.length > 0 
                ? Math.round(repeatLeads.reduce((sum, lead) => sum + (lead.timeBetweenLeads || 0), 0) / repeatLeads.length)
                : 0}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Improving Engagement</h3>
            <p className="text-3xl font-bold text-green-600">
              {repeatLeads.filter(lead => getEngagementTrend(lead).trend === 'Increasing').length}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Info Changes</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {repeatLeads.filter(lead => Object.keys(lead.changes).length > 0).length}
            </p>
          </div>
        </div>

        {/* Repeat Leads Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Repeat Lead Details</h3>
            <p className="text-sm text-gray-500 mt-1">
              Click on any row to view detailed submission history and changes
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Between</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement Trend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Info Changes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latest Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {repeatLeads.map((lead) => {
                  const engagementTrend = getEngagementTrend(lead)
                  return (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{lead.name || 'Anonymous'}</p>
                          <p className="text-sm text-gray-500">{lead.email}</p>
                          <p className="text-xs text-gray-400">{lead.formType}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <p className="font-medium">{lead.previousLeadCount + 1} total</p>
                          <p className="text-xs text-gray-500">#{lead.previousLeadCount + 1} submission</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <p>{lead.timeBetweenLeads} days</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${engagementTrend.color}`}>
                          {engagementTrend.trend}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getChangeColor(lead.behaviorChange.leadScoreChange)}`}>
                          {lead.behaviorChange.leadScoreChange > 0 ? '+' : ''}{lead.behaviorChange.leadScoreChange}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {Object.keys(lead.changes).length > 0 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {Object.keys(lead.changes).length} changed
                            </span>
                          ) : (
                            <span className="text-gray-500">No changes</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(lead.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Detailed Analysis: {selectedLead.name || selectedLead.email}
                  </h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Submission History */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Submission History</h4>
                  <div className="space-y-3">
                    {selectedLead.allSubmissions.map((submission, index) => (
                      <div key={submission.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              Submission #{index + 1} - {submission.formType}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(submission.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">Score: {submission.leadScore}</p>
                            <p className="text-xs text-gray-500">
                              {submission.pagesVisited} pages, {formatDuration(submission.timeOnSite)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Changes Analysis */}
                {Object.keys(selectedLead.changes).length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Information Changes</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedLead.changes).map(([field, change]: [string, any]) => (
                        <div key={field} className="bg-yellow-50 p-3 rounded">
                          <p className="text-sm font-medium text-gray-900 capitalize">{field}:</p>
                          <p className="text-sm text-gray-600">
                            <span className="line-through text-red-600">{change.old || 'Empty'}</span>
                            {' → '}
                            <span className="text-green-600">{change.new || 'Empty'}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Behavior Changes */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Behavior Changes</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Time on Site</p>
                      <p className={`text-lg font-bold ${getChangeColor(selectedLead.behaviorChange.timeOnSiteChange)}`}>
                        {selectedLead.behaviorChange.timeOnSiteChange > 0 ? '+' : ''}{formatDuration(Math.abs(selectedLead.behaviorChange.timeOnSiteChange))}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Pages Visited</p>
                      <p className={`text-lg font-bold ${getChangeColor(selectedLead.behaviorChange.pagesVisitedChange)}`}>
                        {selectedLead.behaviorChange.pagesVisitedChange > 0 ? '+' : ''}{selectedLead.behaviorChange.pagesVisitedChange}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Events Triggered</p>
                      <p className={`text-lg font-bold ${getChangeColor(selectedLead.behaviorChange.eventsTriggeredChange)}`}>
                        {selectedLead.behaviorChange.eventsTriggeredChange > 0 ? '+' : ''}{selectedLead.behaviorChange.eventsTriggeredChange}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Lead Score</p>
                      <p className={`text-lg font-bold ${getChangeColor(selectedLead.behaviorChange.leadScoreChange)}`}>
                        {selectedLead.behaviorChange.leadScoreChange > 0 ? '+' : ''}{selectedLead.behaviorChange.leadScoreChange}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}