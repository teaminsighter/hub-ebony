'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  MapPin,
  Search,
  Calendar,
  Download,
  Filter,
  BarChart3,
  ArrowUp,
  ArrowDown,
  X,
  RefreshCw,
  Activity,
  Target,
  Settings,
  Zap,
  Share2,
  PieChart,
  LineChart,
  Layers,
  Hash,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Edit,
  Save,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Wifi,
  Signal,
  Radio
} from 'lucide-react'

interface TrafficData {
  overview: {
    totalVisitors: number
    uniqueVisitors: number
    pageViews: number
    averageSessionDuration: number
    bounceRate: number
    newVsReturning: {
      new: number
      returning: number
    }
  }
  sources: {
    source: string
    visitors: number
    percentage: number
    bounceRate: number
    avgSessionDuration: number
  }[]
  devices: {
    device: string
    visitors: number
    percentage: number
    conversionRate: number
  }[]
  topPages: {
    page: string
    pageViews: number
    uniquePageViews: number
    avgTimeOnPage: number
    exitRate: number
  }[]
  geography: {
    country: string
    visitors: number
    percentage: number
    revenue: number
  }[]
  hourlyTraffic: {
    hour: number
    visitors: number
  }[]
  trends: {
    metric: string
    current: number
    previous: number
    change: number
  }[]
}

export default function TrafficAnalyticsPage() {
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Modal states
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [filtersModalOpen, setFiltersModalOpen] = useState(false)
  const [realTimeModalOpen, setRealTimeModalOpen] = useState(false)
  const [goalsModalOpen, setGoalsModalOpen] = useState(false)
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false)
  const [geographyModalOpen, setGeographyModalOpen] = useState(false)
  const [devicesModalOpen, setDevicesModalOpen] = useState(false)
  const [pagesModalOpen, setPagesModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchTrafficData()
  }, [timeRange])

  const fetchTrafficData = async () => {
    setLoading(true)
    try {
      // Simulate API call with demo data
      const demoData: TrafficData = {
        overview: {
          totalVisitors: 45230,
          uniqueVisitors: 38120,
          pageViews: 127890,
          averageSessionDuration: 185, // seconds
          bounceRate: 23.4,
          newVsReturning: {
            new: 28340,
            returning: 16890
          }
        },
        sources: [
          { source: 'Google Search', visitors: 18450, percentage: 40.8, bounceRate: 21.2, avgSessionDuration: 195 },
          { source: 'Direct', visitors: 12670, percentage: 28.0, bounceRate: 18.5, avgSessionDuration: 220 },
          { source: 'Social Media', visitors: 7890, percentage: 17.4, bounceRate: 35.7, avgSessionDuration: 145 },
          { source: 'Referral', visitors: 4120, percentage: 9.1, bounceRate: 28.3, avgSessionDuration: 175 },
          { source: 'Email', visitors: 2100, percentage: 4.6, bounceRate: 15.2, avgSessionDuration: 240 }
        ],
        devices: [
          { device: 'Desktop', visitors: 24650, percentage: 54.5, conversionRate: 4.8 },
          { device: 'Mobile', visitors: 16780, percentage: 37.1, conversionRate: 3.2 },
          { device: 'Tablet', visitors: 3800, percentage: 8.4, conversionRate: 3.9 }
        ],
        topPages: [
          { page: '/', pageViews: 32450, uniquePageViews: 28900, avgTimeOnPage: 145, exitRate: 24.5 },
          { page: '/properties/downtown-dubai', pageViews: 18920, uniquePageViews: 16780, avgTimeOnPage: 285, exitRate: 18.2 },
          { page: '/investment-guide', pageViews: 15670, uniquePageViews: 14230, avgTimeOnPage: 320, exitRate: 15.8 },
          { page: '/properties/dubai-marina', pageViews: 12340, uniquePageViews: 10890, avgTimeOnPage: 265, exitRate: 22.1 },
          { page: '/consultation', pageViews: 8920, uniquePageViews: 8450, avgTimeOnPage: 195, exitRate: 12.4 }
        ],
        geography: [
          { country: 'UAE', visitors: 18450, percentage: 40.8, revenue: 2450000 },
          { country: 'Saudi Arabia', visitors: 8920, percentage: 19.7, revenue: 1820000 },
          { country: 'United Kingdom', visitors: 6780, percentage: 15.0, revenue: 1650000 },
          { country: 'India', visitors: 4560, percentage: 10.1, revenue: 890000 },
          { country: 'United States', visitors: 3240, percentage: 7.2, revenue: 980000 }
        ],
        hourlyTraffic: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          visitors: Math.floor(Math.random() * 2000) + 500
        })),
        trends: [
          { metric: 'Total Visitors', current: 45230, previous: 41200, change: 9.8 },
          { metric: 'Page Views', current: 127890, previous: 118450, change: 8.0 },
          { metric: 'Avg Session Duration', current: 185, previous: 172, change: 7.6 },
          { metric: 'Bounce Rate', current: 23.4, previous: 26.8, change: -12.7 }
        ]
      }
      setTrafficData(demoData)
    } catch (error) {
      console.error('Error fetching traffic data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-4 w-4 text-green-600" />
    if (change < 0) return <ArrowDown className="h-4 w-4 text-red-600" />
    return null
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const handleExportReport = () => {
    setExportModalOpen(true)
  }

  const handleCustomFilters = () => {
    setFiltersModalOpen(true)
  }

  const handleViewRealTime = () => {
    setRealTimeModalOpen(true)
  }

  const handleSetupGoals = () => {
    setGoalsModalOpen(true)
  }

  const handleViewSources = () => {
    setSourcesModalOpen(true)
  }

  const handleViewGeography = () => {
    setGeographyModalOpen(true)
  }

  const handleViewDevices = () => {
    setDevicesModalOpen(true)
  }

  const handleViewPages = () => {
    setPagesModalOpen(true)
  }

  const handleExportData = async (format: string) => {
    setIsSubmitting(true)
    try {
      if (format === 'pdf') {
        const reportData = `Traffic Analytics Report - ${timeRange}\n\nTotal Visitors: ${trafficData?.overview.totalVisitors}\nPage Views: ${trafficData?.overview.pageViews}\nBounce Rate: ${trafficData?.overview.bounceRate}%\nAvg Session Duration: ${formatDuration(trafficData?.overview.averageSessionDuration || 0)}`
        const blob = new Blob([reportData], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `traffic-report-${new Date().toISOString().split('T')[0]}.txt`
        link.click()
        window.URL.revokeObjectURL(url)
      } else if (format === 'excel') {
        const csvData = trafficData?.sources.map(source => ({
          Source: source.source,
          Visitors: source.visitors,
          Percentage: source.percentage.toFixed(1) + '%',
          BounceRate: source.bounceRate.toFixed(1) + '%',
          AvgSessionDuration: formatDuration(source.avgSessionDuration)
        }))
        
        if (csvData) {
          const csv = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
          ].join('\n')
          
          const blob = new Blob([csv], { type: 'text/csv' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `traffic-sources-${new Date().toISOString().split('T')[0]}.csv`
          link.click()
          window.URL.revokeObjectURL(url)
        }
      }
      
      setExportModalOpen(false)
    } catch (error) {
      console.error('Error exporting data:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Traffic Analytics</h1>
        </div>
        <div className="grid gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!trafficData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Traffic Analytics</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No traffic data available</h3>
            <p className="text-gray-500 text-center">Traffic data will appear here once analytics tracking is set up.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Traffic Analytics</h1>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline" size="sm" onClick={handleCustomFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleViewRealTime}>
            <Eye className="h-4 w-4 mr-2" />
            Real-time
          </Button>
          <Button variant="outline" size="sm" onClick={handleSetupGoals}>
            <MousePointer className="h-4 w-4 mr-2" />
            Goals
          </Button>
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <p className="text-2xl font-bold text-blue-600">{trafficData.overview.totalVisitors.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-green-600">{trafficData.overview.pageViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Session Duration</p>
                <p className="text-2xl font-bold text-purple-600">{formatDuration(trafficData.overview.averageSessionDuration)}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold text-orange-600">{trafficData.overview.bounceRate.toFixed(1)}%</p>
              </div>
              <MousePointer className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Trends</CardTitle>
          <CardDescription>Period-over-period comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trafficData.trends.map((trend) => (
              <div key={trend.metric} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{trend.metric}</p>
                  <p className="text-2xl font-bold">{trend.current.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 ${getChangeColor(trend.change)}`}>
                    {getChangeIcon(trend.change)}
                    <span className="text-sm font-medium">{Math.abs(trend.change).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleViewSources}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); handleViewSources()}}>
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficData.sources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{source.source}</p>
                      <p className="text-sm text-gray-500">{source.percentage.toFixed(1)}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{source.visitors.toLocaleString()} visitors</span>
                      <span>{source.bounceRate.toFixed(1)}% bounce rate</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleViewDevices}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Device Types</CardTitle>
                <CardDescription>Visitor device distribution</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); handleViewDevices()}}>
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficData.devices.map((device) => {
                const DeviceIcon = device.device === 'Desktop' ? Monitor : 
                                 device.device === 'Mobile' ? Smartphone : 
                                 BarChart3
                return (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DeviceIcon className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{device.device}</p>
                        <p className="text-sm text-gray-500">{device.visitors.toLocaleString()} visitors</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{device.percentage.toFixed(1)}%</p>
                      <p className="text-sm text-gray-500">{device.conversionRate.toFixed(1)}% conv.</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleViewPages}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); handleViewPages()}}>
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficData.topPages.map((page) => (
                <div key={page.page} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-blue-600 hover:underline cursor-pointer">{page.page}</p>
                      <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                        <div>
                          <span className="text-gray-500">Page Views:</span> {page.pageViews.toLocaleString()}
                        </div>
                        <div>
                          <span className="text-gray-500">Unique:</span> {page.uniquePageViews.toLocaleString()}
                        </div>
                        <div>
                          <span className="text-gray-500">Avg Time:</span> {formatDuration(page.avgTimeOnPage)}
                        </div>
                        <div>
                          <span className="text-gray-500">Exit Rate:</span> {page.exitRate.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleViewGeography}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Visitors by country</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); handleViewGeography()}}>
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficData.geography.map((geo) => (
                <div key={geo.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="font-medium">{geo.country}</p>
                      <p className="text-sm text-gray-500">{geo.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{geo.percentage.toFixed(1)}%</p>
                    <p className="text-sm text-gray-500">AED {(geo.revenue / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New vs Returning Visitors */}
      <Card>
        <CardHeader>
          <CardTitle>New vs Returning Visitors</CardTitle>
          <CardDescription>Visitor type breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{trafficData.overview.newVsReturning.new.toLocaleString()}</div>
              <p className="text-sm text-gray-500">New Visitors</p>
              <p className="text-lg font-medium">{((trafficData.overview.newVsReturning.new / trafficData.overview.totalVisitors) * 100).toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{trafficData.overview.newVsReturning.returning.toLocaleString()}</div>
              <p className="text-sm text-gray-500">Returning Visitors</p>
              <p className="text-lg font-medium">{((trafficData.overview.newVsReturning.returning / trafficData.overview.totalVisitors) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Report Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Export Traffic Report</h2>
                <Button variant="ghost" size="sm" onClick={() => setExportModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">PDF Report</h3>
                        <p className="text-sm text-gray-600">Comprehensive traffic analysis with charts</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-red-600" />
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => handleExportData('pdf')}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Export PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Excel Data</h3>
                        <p className="text-sm text-gray-600">Raw traffic data for analysis</p>
                      </div>
                      <LineChart className="h-8 w-8 text-green-600" />
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => handleExportData('excel')}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Export Excel
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Export Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Time Range</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="current">Current Selection ({timeRange})</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Include Data</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded mr-2" />
                        <span className="text-sm">Traffic Sources</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded mr-2" />
                        <span className="text-sm">Geographic Data</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded mr-2" />
                        <span className="text-sm">Device Analytics</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setExportModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Modal */}
      {filtersModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Advanced Traffic Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setFiltersModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Traffic Sources</h3>
                  <div className="space-y-2">
                    {['Google Search', 'Direct', 'Social Media', 'Referral', 'Email', 'Paid Ads'].map((source) => (
                      <label key={source} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Device Types</h3>
                  <div className="space-y-2">
                    {['Desktop', 'Mobile', 'Tablet'].map((device) => (
                      <label key={device} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">{device}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Geographic Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="all">All Countries</option>
                      <option value="ae">United Arab Emirates</option>
                      <option value="sa">Saudi Arabia</option>
                      <option value="uk">United Kingdom</option>
                      <option value="in">India</option>
                      <option value="us">United States</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="all">All Cities</option>
                      <option value="dubai">Dubai</option>
                      <option value="abu-dhabi">Abu Dhabi</option>
                      <option value="london">London</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="new-york">New York</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="all">All Languages</option>
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Behavior Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Duration</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="all">All Sessions</option>
                      <option value="short">0-30 seconds</option>
                      <option value="medium">30 seconds - 3 minutes</option>
                      <option value="long">3+ minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Views</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="all">All Page Views</option>
                      <option value="single">Single Page</option>
                      <option value="few">2-5 Pages</option>
                      <option value="many">5+ Pages</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setFiltersModalOpen(false)}>
                Reset Filters
              </Button>
              <Button onClick={() => setFiltersModalOpen(false)}>
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Traffic Modal */}
      {realTimeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">Real-time Traffic</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Live</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setRealTimeModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-green-600">127</p>
                      </div>
                      <div className="relative">
                        <Radio className="h-8 w-8 text-green-600" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Page Views/min</p>
                        <p className="text-2xl font-bold text-blue-600">342</p>
                      </div>
                      <Activity className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Top Source</p>
                        <p className="text-lg font-bold text-purple-600">Google</p>
                        <p className="text-xs text-gray-500">45% of traffic</p>
                      </div>
                      <Search className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Conversions</p>
                        <p className="text-2xl font-bold text-orange-600">18</p>
                        <p className="text-xs text-gray-500">Last hour</p>
                      </div>
                      <Target className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { source: 'Google Search', users: 45, percentage: 35.4 },
                      { source: 'Direct', users: 32, percentage: 25.2 },
                      { source: 'Social Media', users: 28, percentage: 22.0 },
                      { source: 'Referral', users: 22, percentage: 17.3 }
                    ].map((source) => (
                      <div key={source.source} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">{source.source}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{source.users}</p>
                          <p className="text-sm text-gray-500">{source.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Pages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { page: '/', users: 34, views: 67 },
                      { page: '/properties/downtown-dubai', users: 28, views: 45 },
                      { page: '/investment-guide', users: 21, views: 38 },
                      { page: '/consultation', users: 18, views: 24 }
                    ].map((page) => (
                      <div key={page.page} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-blue-600">{page.page}</p>
                          <p className="text-sm text-gray-500">{page.users} active users</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{page.views}</p>
                          <p className="text-sm text-gray-500">views</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: 'New visitor from Dubai viewing Downtown Dubai properties', time: '2 seconds ago', type: 'visitor' },
                      { action: 'Consultation booked for tomorrow', time: '15 seconds ago', type: 'conversion' },
                      { action: 'Investment guide downloaded', time: '32 seconds ago', type: 'engagement' },
                      { action: 'User spent 5 minutes on property page', time: '45 seconds ago', type: 'engagement' },
                      { action: 'Newsletter signup from London visitor', time: '1 minute ago', type: 'conversion' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'conversion' ? 'bg-green-500' :
                          activity.type === 'engagement' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setRealTimeModalOpen(false)}>
                Close
              </Button>
              <Button>
                <RefreshCw className="h-4 w-4 mr-2" />
                Auto Refresh: ON
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Traffic Sources Modal */}
      {sourcesModalOpen && trafficData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Detailed Traffic Sources</h2>
                <Button variant="ghost" size="sm" onClick={() => setSourcesModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {trafficData.sources.map((source, index) => (
                  <Card key={source.source}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{source.source}</h3>
                            <p className="text-sm text-gray-500">{source.visitors.toLocaleString()} visitors ({source.percentage.toFixed(1)}%)</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Bounce Rate</p>
                          <p className="text-lg font-bold text-orange-600">{source.bounceRate.toFixed(1)}%</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Avg Session</p>
                          <p className="text-lg font-bold text-purple-600">{formatDuration(source.avgSessionDuration)}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Traffic Share</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${source.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setSourcesModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Geography Modal */}
      {geographyModalOpen && trafficData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Geographic Analytics</h2>
                <Button variant="ghost" size="sm" onClick={() => setGeographyModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Countries</p>
                        <p className="text-2xl font-bold text-blue-600">{trafficData.geography.length}</p>
                      </div>
                      <Globe className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Top Country</p>
                        <p className="text-lg font-bold text-green-600">{trafficData.geography[0]?.country}</p>
                        <p className="text-xs text-gray-500">{trafficData.geography[0]?.percentage.toFixed(1)}% of traffic</p>
                      </div>
                      <MapPin className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-purple-600">
                          AED {(trafficData.geography.reduce((sum, geo) => sum + geo.revenue, 0) / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {trafficData.geography.map((geo, index) => (
                  <Card key={geo.country}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-green-600">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{geo.country}</h3>
                            <p className="text-sm text-gray-500">{geo.visitors.toLocaleString()} visitors</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                          <div>
                            <p className="text-sm text-gray-600">Traffic Share</p>
                            <p className="text-lg font-bold text-blue-600">{geo.percentage.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Revenue</p>
                            <p className="text-lg font-bold text-green-600">AED {(geo.revenue / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Rev/Visitor</p>
                            <p className="text-lg font-bold text-purple-600">AED {(geo.revenue / geo.visitors).toFixed(0)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${geo.percentage}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setGeographyModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Goals Setup Modal */}
      {goalsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Traffic Goals & Conversion Tracking</h2>
                <Button variant="ghost" size="sm" onClick={() => setGoalsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Active Goals</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: '1',
                    name: 'Consultation Bookings',
                    type: 'Conversion',
                    target: 50,
                    current: 42,
                    status: 'active'
                  },
                  {
                    id: '2',
                    name: 'Newsletter Signups',
                    type: 'Engagement',
                    target: 200,
                    current: 167,
                    status: 'active'
                  },
                  {
                    id: '3',
                    name: 'Property Inquiry Forms',
                    type: 'Lead Generation',
                    target: 100,
                    current: 89,
                    status: 'active'
                  },
                  {
                    id: '4',
                    name: 'Time on Property Pages',
                    type: 'Engagement',
                    target: 180,
                    current: 245,
                    status: 'completed'
                  }
                ].map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {goal.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Target className="h-5 w-5 text-blue-600" />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900">{goal.name}</h4>
                            <p className="text-sm text-gray-500">{goal.type}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{goal.current}</span>
                            <span className="text-sm text-gray-500">/ {goal.target}</span>
                          </div>
                          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${
                                goal.current >= goal.target ? 'bg-green-600' : 'bg-blue-600'
                              }`}
                              style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Goal Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">4</p>
                      <p className="text-sm text-gray-600">Active Goals</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">1</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">84%</p>
                      <p className="text-sm text-gray-600">Avg Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">543</p>
                      <p className="text-sm text-gray-600">Total Conversions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setGoalsModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}