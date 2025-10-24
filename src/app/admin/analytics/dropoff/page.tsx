'use client'

import { useState, useEffect } from 'react'
import { AdminHeader } from '@/components/admin/AdminHeader'

interface DropOffData {
  pageExits: Array<{
    page: string
    _count: { _all: number }
  }>
  bounceAnalysis: Array<{
    page: string
    _count: { _all: number }
  }>
  formAbandonment: Array<{
    page: string
    _count: { _all: number }
  }>
}

interface FunnelStep {
  step: string
  page: string
  visitors: number
  dropOff: number
  conversionRate: number
}

interface PageAnalytics {
  page: string
  totalVisits: number
  bounces: number
  exits: number
  avgTimeOnPage: number
  avgScrollDepth: number
  formStarts: number
  formCompletions: number
  bounceRate: number
  exitRate: number
  formAbandonmentRate: number
}

export default function DropOffAnalysisPage() {
  const [dropOffData, setDropOffData] = useState<DropOffData | null>(null)
  const [pageAnalytics, setPageAnalytics] = useState<PageAnalytics[]>([])
  const [funnelData, setFunnelData] = useState<FunnelStep[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const fetchDropOffData = async () => {
    setLoading(true)
    try {
      const [dropOffResponse, funnelResponse] = await Promise.all([
        fetch('/api/analytics/dropoff'),
        fetch('/api/analytics/funnel')
      ])

      const dropOffResult = await dropOffResponse.json()
      const funnelResult = await funnelResponse.json()

      if (dropOffResult.success) {
        setDropOffData(dropOffResult.data)
      }

      if (funnelResult.success) {
        // Generate funnel data
        generateFunnelData(funnelResult.data)
      }

      // Generate detailed page analytics
      await generatePageAnalytics()
    } catch (error) {
      console.error('Failed to fetch drop-off data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateFunnelData = (funnelAnalysis: any) => {
    const steps: FunnelStep[] = [
      {
        step: '1',
        page: 'Landing Pages',
        visitors: funnelAnalysis.totalSessions || 0,
        dropOff: 0,
        conversionRate: 100
      },
      {
        step: '2',
        page: 'Property Pages',
        visitors: Math.floor((funnelAnalysis.totalSessions || 0) * 0.7), // Estimated
        dropOff: Math.floor((funnelAnalysis.totalSessions || 0) * 0.3),
        conversionRate: 70
      },
      {
        step: '3',
        page: 'Contact Forms',
        visitors: Math.floor((funnelAnalysis.totalSessions || 0) * 0.25), // Estimated
        dropOff: Math.floor((funnelAnalysis.totalSessions || 0) * 0.45),
        conversionRate: 25
      },
      {
        step: '4',
        page: 'Form Completion',
        visitors: funnelAnalysis.convertedSessions || 0,
        dropOff: Math.floor((funnelAnalysis.totalSessions || 0) * 0.20),
        conversionRate: funnelAnalysis.conversionRate || 0
      }
    ]

    setFunnelData(steps)
  }

  const generatePageAnalytics = async () => {
    // Mock data for now - in real implementation, this would come from API
    const mockPageAnalytics: PageAnalytics[] = [
      {
        page: '/',
        totalVisits: 1250,
        bounces: 425,
        exits: 200,
        avgTimeOnPage: 120,
        avgScrollDepth: 65,
        formStarts: 0,
        formCompletions: 0,
        bounceRate: 34,
        exitRate: 16,
        formAbandonmentRate: 0
      },
      {
        page: '/properties',
        totalVisits: 890,
        bounces: 156,
        exits: 178,
        avgTimeOnPage: 180,
        avgScrollDepth: 78,
        formStarts: 12,
        formCompletions: 8,
        bounceRate: 17.5,
        exitRate: 20,
        formAbandonmentRate: 33.3
      },
      {
        page: '/contact',
        totalVisits: 245,
        bounces: 45,
        exits: 89,
        avgTimeOnPage: 145,
        avgScrollDepth: 85,
        formStarts: 195,
        formCompletions: 89,
        bounceRate: 18.4,
        exitRate: 36.3,
        formAbandonmentRate: 54.4
      },
      {
        page: '/about',
        totalVisits: 420,
        bounces: 98,
        exits: 145,
        avgTimeOnPage: 95,
        avgScrollDepth: 45,
        formStarts: 0,
        formCompletions: 0,
        bounceRate: 23.3,
        exitRate: 34.5,
        formAbandonmentRate: 0
      }
    ]

    setPageAnalytics(mockPageAnalytics)
  }

  useEffect(() => {
    fetchDropOffData()
  }, [selectedTimeRange])

  const getRateColor = (rate: number, type: 'bounce' | 'exit' | 'abandon') => {
    const thresholds = {
      bounce: { good: 25, bad: 40 },
      exit: { good: 30, bad: 50 },
      abandon: { good: 30, bad: 60 }
    }

    const { good, bad } = thresholds[type]
    if (rate <= good) return 'text-green-600 bg-green-100'
    if (rate <= bad) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading drop-off analysis...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Drop-off & Funnel Analysis</h1>
          <p className="text-gray-600">Identify where users leave your site and optimize conversion funnels</p>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Analysis Period</h2>
            <div className="flex space-x-2">
              {['7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedTimeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h2>
          <div className="space-y-4">
            {funnelData.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {step.step}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">{step.page}</h3>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{step.visitors.toLocaleString()} visitors</p>
                        <p className="text-xs text-gray-500">{step.conversionRate.toFixed(1)}% conversion</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${step.conversionRate}%` }}
                      ></div>
                    </div>
                    {step.dropOff > 0 && (
                      <p className="text-xs text-red-600 mt-1">
                        {step.dropOff.toLocaleString()} users dropped off
                      </p>
                    )}
                  </div>
                </div>
                {index < funnelData.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-6 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Page Analytics Table */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Page Performance Analysis</h2>
            <p className="text-sm text-gray-500 mt-1">
              Detailed breakdown of user behavior on each page
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exit Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scroll Depth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form Abandon</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pageAnalytics.map((page) => (
                  <tr key={page.page} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{page.page}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{page.totalVisits.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRateColor(page.bounceRate, 'bounce')}`}>
                        {page.bounceRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRateColor(page.exitRate, 'exit')}`}>
                        {page.exitRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDuration(page.avgTimeOnPage)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${page.avgScrollDepth}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{page.avgScrollDepth}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {page.formStarts > 0 ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRateColor(page.formAbandonmentRate, 'abandon')}`}>
                          {page.formAbandonmentRate.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drop-off Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Exit Pages */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Exit Pages</h3>
            <div className="space-y-3">
              {dropOffData?.pageExits?.slice(0, 5).map((exit, index) => (
                <div key={exit.page} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{exit.page}</p>
                    <p className="text-sm text-gray-500">{exit._count._all} exits</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">#{index + 1}</p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500">No exit data available</p>
              )}
            </div>
          </div>

          {/* High Bounce Pages */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">High Bounce Pages</h3>
            <div className="space-y-3">
              {dropOffData?.bounceAnalysis?.slice(0, 5).map((bounce, index) => (
                <div key={bounce.page} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{bounce.page}</p>
                    <p className="text-sm text-gray-500">{bounce._count._all} bounces</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-600">#{index + 1}</p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500">No bounce data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">High Bounce Rate Pages</h4>
              <p className="text-sm text-blue-800">
                Focus on improving content quality, page load speed, and mobile responsiveness for pages with bounce rates above 40%.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Form Optimization</h4>
              <p className="text-sm text-green-800">
                Reduce form abandonment by simplifying forms, adding progress indicators, and implementing auto-save functionality.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Exit Page Analysis</h4>
              <p className="text-sm text-purple-800">
                Add compelling CTAs and related content suggestions on high-exit pages to keep users engaged.
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Scroll Depth Optimization</h4>
              <p className="text-sm text-orange-800">
                Improve content structure and add engaging elements to increase scroll depth on low-performing pages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}