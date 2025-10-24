'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Calendar,
  DollarSign,
  Building,
  Download,
  Filter,
  Settings,
  RefreshCw,
  X,
  Activity,
  Target,
  Clock,
  Globe,
  FileText,
  PieChart,
  LineChart,
  Share2,
  Bookmark,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Search,
  Plus,
  Edit,
  Save,
  Mail,
  Phone,
  MapPin,
  Layers,
  Hash,
  Percent
} from 'lucide-react'

interface AnalyticsData {
  pageViews: {
    total: number
    byPage: { page: string; views: number }[]
    trend: number
  }
  conversions: {
    total: number
    rate: number
    byType: { type: string; count: number }[]
  }
  consultations: {
    total: number
    completed: number
    scheduled: number
    trend: number
  }
  clients: {
    total: number
    qualified: number
    activeInvestors: number
    trend: number
  }
  monthlyStats: {
    month: string
    pageViews: number
    conversions: number
    consultations: number
  }[]
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  
  // Modal states
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false)
  const [filtersModalOpen, setFiltersModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [alertsModalOpen, setAlertsModalOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        // Mock data for development
        setAnalytics({
          pageViews: {
            total: 145820,
            byPage: [
              { page: '/properties/downtown-dubai', views: 45230 },
              { page: '/investment-guide', views: 32150 },
              { page: '/properties/palm-jumeirah', views: 28940 },
              { page: '/consultations', views: 23780 },
              { page: '/version-3', views: 15720 }
            ],
            trend: 12.5
          },
          conversions: {
            total: 1247,
            rate: 8.6,
            byType: [
              { type: 'consultation_booking', count: 542 },
              { type: 'property_inquiry', count: 389 },
              { type: 'newsletter_signup', count: 203 },
              { type: 'download_guide', count: 113 }
            ]
          },
          consultations: {
            total: 542,
            completed: 387,
            scheduled: 125,
            trend: 18.2
          },
          clients: {
            total: 2840,
            qualified: 1056,
            activeInvestors: 428,
            trend: 15.7
          },
          monthlyStats: [
            { month: 'Jan', pageViews: 98450, conversions: 856, consultations: 342 },
            { month: 'Feb', pageViews: 112340, conversions: 967, consultations: 398 },
            { month: 'Mar', pageViews: 128760, conversions: 1105, consultations: 445 },
            { month: 'Apr', pageViews: 145820, conversions: 1247, consultations: 542 }
          ]
        })
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      // Mock data for development
      setAnalytics({
        pageViews: {
          total: 145820,
          byPage: [
            { page: '/properties/downtown-dubai', views: 45230 },
            { page: '/investment-guide', views: 32150 },
            { page: '/properties/palm-jumeirah', views: 28940 },
            { page: '/consultations', views: 23780 },
            { page: '/version-3', views: 15720 }
          ],
          trend: 12.5
        },
        conversions: {
          total: 1247,
          rate: 8.6,
          byType: [
            { type: 'consultation_booking', count: 542 },
            { type: 'property_inquiry', count: 389 },
            { type: 'newsletter_signup', count: 203 },
            { type: 'download_guide', count: 113 }
          ]
        },
        consultations: {
          total: 542,
          completed: 387,
          scheduled: 125,
          trend: 18.2
        },
        clients: {
          total: 2840,
          qualified: 1056,
          activeInvestors: 428,
          trend: 15.7
        },
        monthlyStats: [
          { month: 'Jan', pageViews: 98450, conversions: 856, consultations: 342 },
          { month: 'Feb', pageViews: 112340, conversions: 967, consultations: 398 },
          { month: 'Mar', pageViews: 128760, conversions: 1105, consultations: 445 },
          { month: 'Apr', pageViews: 145820, conversions: 1247, consultations: 542 }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data available</h3>
            <p className="text-gray-500 text-center">
              Start collecting data to see your analytics here.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? '↗️' : trend < 0 ? '↘️' : '➡️'
  }

  const getTrendColor = (trend: number) => {
    return trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
  }

  const handleExportReport = () => {
    setExportModalOpen(true)
  }

  const handleCustomizeAnalytics = () => {
    setCustomizeModalOpen(true)
  }

  const handleRefreshData = () => {
    setLoading(true)
    fetchAnalytics()
  }

  const handleAdvancedFilters = () => {
    setFiltersModalOpen(true)
  }

  const handleViewDetails = (metricType: string) => {
    setSelectedMetric(metricType)
    setDetailsModalOpen(true)
  }

  const handleExportData = async (format: string, includeCharts: boolean) => {
    setIsSubmitting(true)
    try {
      if (format === 'pdf') {
        // Generate PDF report
        const reportData = `Analytics Report - ${timeRange}\n\nPage Views: ${analytics?.pageViews.total}\nConversions: ${analytics?.conversions.total}\nConversion Rate: ${analytics?.conversions.rate}%\nConsultations: ${analytics?.consultations.total}\nClients: ${analytics?.clients.total}`
        const blob = new Blob([reportData], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.txt`
        link.click()
        window.URL.revokeObjectURL(url)
      } else if (format === 'excel') {
        // Generate Excel export
        const csvData = analytics?.monthlyStats.map(stat => ({
          Month: stat.month,
          PageViews: stat.pageViews,
          Conversions: stat.conversions,
          Consultations: stat.consultations
        }))
        
        if (csvData) {
          const csv = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(row => Object.values(row).join(','))
          ].join('\n')
          
          const blob = new Blob([csv], { type: 'text/csv' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `analytics-data-${new Date().toISOString().split('T')[0]}.csv`
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
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
          <Button variant="outline" size="sm" onClick={handleAdvancedFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleCustomizeAnalytics}>
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
          <Button variant="outline" size="sm" onClick={() => setAlertsModalOpen(true)}>
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleViewDetails('pageViews')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.pageViews.total.toLocaleString()}</div>
            <p className={`text-xs ${getTrendColor(analytics.pageViews.trend)}`}>
              {getTrendIcon(analytics.pageViews.trend)} {Math.abs(analytics.pageViews.trend)}% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleViewDetails('conversions')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversions.rate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics.conversions.total.toLocaleString()} total conversions
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleViewDetails('consultations')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.consultations.total.toLocaleString()}</div>
            <p className={`text-xs ${getTrendColor(analytics.consultations.trend)}`}>
              {getTrendIcon(analytics.consultations.trend)} {Math.abs(analytics.consultations.trend)}% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleViewDetails('clients')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.clients.total.toLocaleString()}</div>
            <p className={`text-xs ${getTrendColor(analytics.clients.trend)}`}>
              {getTrendIcon(analytics.clients.trend)} {Math.abs(analytics.clients.trend)}% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Performance</CardTitle>
            <CardDescription>Views by landing page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.pageViews.byPage.map((page) => (
                <div key={page.page} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{page.page}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{page.views}</p>
                    <p className="text-sm text-gray-500">
                      {((page.views / analytics.pageViews.total) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Types</CardTitle>
            <CardDescription>Breakdown by conversion type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.conversions.byType.map((conversion) => (
                <div key={conversion.type} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium capitalize">{conversion.type.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{conversion.count}</p>
                    <p className="text-sm text-gray-500">
                      {((conversion.count / analytics.conversions.total) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Status Breakdown</CardTitle>
            <CardDescription>Current client distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="font-medium">Active Investors</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{analytics.clients.activeInvestors}</p>
                  <p className="text-sm text-gray-500">
                    {((analytics.clients.activeInvestors / analytics.clients.total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="font-medium">Qualified Leads</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{analytics.clients.qualified}</p>
                  <p className="text-sm text-gray-500">
                    {((analytics.clients.qualified / analytics.clients.total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <p className="font-medium">Prospects</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {analytics.clients.total - analytics.clients.qualified - analytics.clients.activeInvestors}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(((analytics.clients.total - analytics.clients.qualified - analytics.clients.activeInvestors) / analytics.clients.total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultation Status</CardTitle>
            <CardDescription>Meeting completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="font-medium">Completed</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{analytics.consultations.completed}</p>
                  <p className="text-sm text-gray-500">
                    {((analytics.consultations.completed / analytics.consultations.total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="font-medium">Scheduled</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{analytics.consultations.scheduled}</p>
                  <p className="text-sm text-gray-500">
                    {((analytics.consultations.scheduled / analytics.consultations.total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <p className="font-medium">Other</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {analytics.consultations.total - analytics.consultations.completed - analytics.consultations.scheduled}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(((analytics.consultations.total - analytics.consultations.completed - analytics.consultations.scheduled) / analytics.consultations.total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Data Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Export Analytics Report</h2>
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
                        <p className="text-sm text-gray-600">Comprehensive analytics report with charts and insights</p>
                      </div>
                      <FileText className="h-8 w-8 text-red-600" />
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => handleExportData('pdf', true)}
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
                        <p className="text-sm text-gray-600">Raw data export for custom analysis</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-green-600" />
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => handleExportData('excel', false)}
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
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Include</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded mr-2" />
                        <span className="text-sm">Charts and Visualizations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded mr-2" />
                        <span className="text-sm">Detailed Breakdowns</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Raw Data Tables</span>
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

      {/* Customize Analytics Modal */}
      {customizeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Customize Analytics Dashboard</h2>
                <Button variant="ghost" size="sm" onClick={() => setCustomizeModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                    <CardDescription>Select which metrics to display on your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { id: 'pageViews', label: 'Page Views', icon: Eye, enabled: true },
                      { id: 'conversions', label: 'Conversion Rate', icon: Target, enabled: true },
                      { id: 'consultations', label: 'Consultations', icon: Calendar, enabled: true },
                      { id: 'clients', label: 'Total Clients', icon: Users, enabled: true },
                      { id: 'revenue', label: 'Revenue', icon: DollarSign, enabled: false },
                      { id: 'properties', label: 'Property Views', icon: Building, enabled: false }
                    ].map((metric) => (
                      <label key={metric.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <metric.icon className="h-4 w-4" />
                          <span>{metric.label}</span>
                        </div>
                        <input 
                          type="checkbox" 
                          defaultChecked={metric.enabled}
                          className="rounded" 
                        />
                      </label>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Layout</CardTitle>
                    <CardDescription>Customize the layout and appearance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Time Range</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="7d">Last 7 days</option>
                        <option value="30d" selected>Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chart Style</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-3 border border-blue-500 bg-blue-50 rounded-lg text-center">
                          <LineChart className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-xs">Line Charts</span>
                        </button>
                        <button className="p-3 border rounded-lg text-center">
                          <BarChart3 className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-xs">Bar Charts</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Refresh Interval</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="manual">Manual</option>
                        <option value="5m">Every 5 minutes</option>
                        <option value="15m">Every 15 minutes</option>
                        <option value="1h">Every hour</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications & Alerts</CardTitle>
                  <CardDescription>Configure when to receive analytics alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Conversion rate drops below 5%', type: 'conversions' },
                      { label: 'Page views increase by 50%', type: 'traffic' },
                      { label: 'Weekly consultation goal reached', type: 'consultations' },
                      { label: 'New client milestone achieved', type: 'clients' }
                    ].map((alert, index) => (
                      <label key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{alert.label}</span>
                        <input type="checkbox" className="rounded" />
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCustomizeModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setCustomizeModalOpen(false)}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Modal */}
      {filtersModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Advanced Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setFiltersModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Date Range</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        defaultValue="2024-01-01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Data Sources</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'website', label: 'Website Traffic', enabled: true },
                      { id: 'social', label: 'Social Media', enabled: true },
                      { id: 'email', label: 'Email Campaigns', enabled: false },
                      { id: 'ads', label: 'Paid Advertising', enabled: true }
                    ].map((source) => (
                      <label key={source.id} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          defaultChecked={source.enabled}
                          className="rounded" 
                        />
                        <span className="text-sm">{source.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Client Segments</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'all', label: 'All Clients', count: '2,840' },
                    { id: 'investors', label: 'Active Investors', count: '428' },
                    { id: 'prospects', label: 'Prospects', count: '1,356' },
                    { id: 'leads', label: 'Qualified Leads', count: '1,056' }
                  ].map((segment) => (
                    <label key={segment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{segment.label}</span>
                        <p className="text-sm text-gray-500">{segment.count} clients</p>
                      </div>
                      <input 
                        type="checkbox" 
                        defaultChecked={segment.id === 'all'}
                        className="rounded" 
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Geographic Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="all">All Countries</option>
                      <option value="ae">United Arab Emirates</option>
                      <option value="sa">Saudi Arabia</option>
                      <option value="qa">Qatar</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="all">All Cities</option>
                      <option value="dubai">Dubai</option>
                      <option value="abu-dhabi">Abu Dhabi</option>
                      <option value="sharjah">Sharjah</option>
                      <option value="other">Other</option>
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

      {/* Metric Details Modal */}
      {detailsModalOpen && selectedMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedMetric === 'pageViews' && 'Page Views Details'}
                  {selectedMetric === 'conversions' && 'Conversion Analytics'}
                  {selectedMetric === 'consultations' && 'Consultation Metrics'}
                  {selectedMetric === 'clients' && 'Client Analytics'}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setDetailsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {selectedMetric === 'pageViews' && analytics && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Total Views</p>
                            <p className="text-2xl font-bold text-blue-600">{analytics.pageViews.total.toLocaleString()}</p>
                          </div>
                          <Eye className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Avg. Daily Views</p>
                            <p className="text-2xl font-bold text-green-600">{Math.round(analytics.pageViews.total / 30).toLocaleString()}</p>
                          </div>
                          <Activity className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Top Page</p>
                            <p className="text-lg font-bold text-purple-600">{analytics.pageViews.byPage[0]?.views.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">views</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Growth</p>
                            <p className={`text-2xl font-bold ${getTrendColor(analytics.pageViews.trend)}`}>
                              {analytics.pageViews.trend > 0 ? '+' : ''}{analytics.pageViews.trend.toFixed(1)}%
                            </p>
                          </div>
                          {analytics.pageViews.trend > 0 ? (
                            <ArrowUpRight className="h-8 w-8 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-8 w-8 text-red-600" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analytics.pageViews.byPage.map((page, index) => (
                          <div key={page.page} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-medium">{page.page}</p>
                                <p className="text-sm text-gray-500">
                                  {((page.views / analytics.pageViews.total) * 100).toFixed(1)}% of total traffic
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">{page.views.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">page views</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {selectedMetric === 'conversions' && analytics && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Conversion Rate</p>
                            <p className="text-2xl font-bold text-green-600">{analytics.conversions.rate.toFixed(1)}%</p>
                          </div>
                          <Percent className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Total Conversions</p>
                            <p className="text-2xl font-bold text-blue-600">{analytics.conversions.total.toLocaleString()}</p>
                          </div>
                          <Target className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Daily Average</p>
                            <p className="text-2xl font-bold text-purple-600">{Math.round(analytics.conversions.total / 30)}</p>
                          </div>
                          <Clock className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Top Type</p>
                            <p className="text-lg font-bold text-orange-600">{analytics.conversions.byType[0]?.count}</p>
                            <p className="text-xs text-gray-500">consultations</p>
                          </div>
                          <Calendar className="h-8 w-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Conversion Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analytics.conversions.byType.map((conversion, index) => (
                          <div key={conversion.type} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-green-600">{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-medium capitalize">{conversion.type.replace('_', ' ')}</p>
                                <p className="text-sm text-gray-500">
                                  {((conversion.count / analytics.conversions.total) * 100).toFixed(1)}% of total conversions
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">{conversion.count.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">conversions</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setDetailsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Management Modal */}
      {alertsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Analytics Alerts</h2>
                <Button variant="ghost" size="sm" onClick={() => setAlertsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Active Alerts</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Alert
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: '1',
                    title: 'High Conversion Rate',
                    description: 'Conversion rate exceeded 10% threshold',
                    type: 'success',
                    time: '2 hours ago',
                    metric: 'Conversions',
                    value: '12.3%'
                  },
                  {
                    id: '2',
                    title: 'Page Views Spike',
                    description: 'Page views increased by 45% compared to yesterday',
                    type: 'info',
                    time: '4 hours ago',
                    metric: 'Traffic',
                    value: '+45%'
                  },
                  {
                    id: '3',
                    title: 'Consultation Goal Reached',
                    description: 'Weekly consultation target achieved',
                    type: 'success',
                    time: '1 day ago',
                    metric: 'Consultations',
                    value: '542'
                  },
                  {
                    id: '4',
                    title: 'Low Email Open Rate',
                    description: 'Email open rate below 15% threshold',
                    type: 'warning',
                    time: '2 days ago',
                    metric: 'Email',
                    value: '12.1%'
                  }
                ].map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                          {alert.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />}
                          {alert.type === 'info' && <Info className="h-5 w-5 text-blue-600 mt-0.5" />}
                          <div>
                            <h4 className="font-medium text-gray-900">{alert.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{alert.time}</span>
                              <span>•</span>
                              <span>{alert.metric}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{alert.value}</p>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>Configure when you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="immediate">Immediate</option>
                        <option value="daily">Daily Summary</option>
                        <option value="weekly">Weekly Summary</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alert Threshold</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="high">High Priority Only</option>
                        <option value="medium">Medium & High Priority</option>
                        <option value="all">All Alerts</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAlertsModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}