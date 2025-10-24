'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  MousePointer,
  Calendar,
  DollarSign,
  Target,
  Funnel,
  Download,
  Filter,
  RefreshCw,
  ArrowRight,
  ArrowDown,
  Eye,
  CheckCircle,
  X,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  Zap,
  Hash,
  Percent,
  Clock,
  Globe,
  Share2,
  Plus,
  Edit,
  Save,
  AlertCircle,
  Info,
  Search,
  MapPin,
  Layers,
  Bookmark,
  Star,
  ThumbsUp,
  ThumbsDown,
  PlayCircle,
  PauseCircle,
  Shuffle,
  RotateCcw
} from 'lucide-react'

interface ConversionFunnelStep {
  step: string
  visitors: number
  conversions: number
  rate: number
  dropOff: number
}

interface ConversionGoal {
  id: string
  name: string
  type: 'page_view' | 'form_submission' | 'consultation_booking' | 'property_inquiry'
  completions: number
  value: number
  conversionRate: number
  trend: number
}

interface ConversionData {
  totalConversions: number
  conversionRate: number
  totalValue: number
  averageValue: number
  funnelSteps: ConversionFunnelStep[]
  goals: ConversionGoal[]
  topPages: { page: string; conversions: number; rate: number }[]
  conversionsBySource: { source: string; conversions: number; rate: number; value: number }[]
  timeSeriesData: { date: string; conversions: number; rate: number }[]
}

export default function ConversionsPage() {
  const [conversions, setConversions] = useState<ConversionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedGoal, setSelectedGoal] = useState<string>('all')
  
  // Modal states
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [filtersModalOpen, setFiltersModalOpen] = useState(false)
  const [goalsModalOpen, setGoalsModalOpen] = useState(false)
  const [funnelModalOpen, setFunnelModalOpen] = useState(false)
  const [attributionModalOpen, setAttributionModalOpen] = useState(false)
  const [abTestModalOpen, setAbTestModalOpen] = useState(false)
  const [optimizationModalOpen, setOptimizationModalOpen] = useState(false)
  const [selectedConversionGoal, setSelectedConversionGoal] = useState<ConversionGoal | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchConversions()
  }, [timeRange, selectedGoal])

  const fetchConversions = async () => {
    setLoading(true)
    try {
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const demoData: ConversionData = {
        totalConversions: 1247,
        conversionRate: 3.2,
        totalValue: 2847500,
        averageValue: 2284,
        funnelSteps: [
          { step: 'Landing Page Visit', visitors: 38924, conversions: 38924, rate: 100, dropOff: 0 },
          { step: 'Property Browse', visitors: 15569, conversions: 15569, rate: 40.0, dropOff: 60.0 },
          { step: 'Property Details View', visitors: 7784, conversions: 7784, rate: 50.0, dropOff: 50.0 },
          { step: 'Contact Form Started', visitors: 2335, conversions: 2335, rate: 30.0, dropOff: 70.0 },
          { step: 'Consultation Booked', visitors: 1247, conversions: 1247, rate: 53.4, dropOff: 46.6 },
        ],
        goals: [
          {
            id: 'consultation_booking',
            name: 'Consultation Booking',
            type: 'consultation_booking',
            completions: 1247,
            value: 2500,
            conversionRate: 3.2,
            trend: 12.5
          },
          {
            id: 'property_inquiry',
            name: 'Property Inquiry',
            type: 'property_inquiry',
            completions: 2156,
            value: 150,
            conversionRate: 5.5,
            trend: 8.3
          },
          {
            id: 'newsletter_signup',
            name: 'Newsletter Signup',
            type: 'form_submission',
            completions: 3247,
            value: 25,
            conversionRate: 8.3,
            trend: -2.1
          },
          {
            id: 'brochure_download',
            name: 'Brochure Download',
            type: 'page_view',
            completions: 1876,
            value: 50,
            conversionRate: 4.8,
            trend: 15.7
          }
        ],
        topPages: [
          { page: '/properties/downtown-dubai', conversions: 234, rate: 4.2 },
          { page: '/properties/business-bay', conversions: 189, rate: 3.8 },
          { page: '/properties/dubai-marina', conversions: 167, rate: 3.5 },
          { page: '/investment-guide', conversions: 143, rate: 6.1 },
          { page: '/consultation', conversions: 128, rate: 8.4 }
        ],
        conversionsBySource: [
          { source: 'Google Ads', conversions: 487, rate: 4.2, value: 1218000 },
          { source: 'Facebook Ads', conversions: 298, rate: 3.1, value: 671400 },
          { source: 'Organic Search', conversions: 234, rate: 2.8, value: 526800 },
          { source: 'Direct Traffic', conversions: 156, rate: 2.1, value: 351600 },
          { source: 'LinkedIn Ads', conversions: 72, rate: 5.8, value: 216000 }
        ],
        timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          conversions: Math.floor(Math.random() * 50) + 30,
          rate: Math.random() * 2 + 2.5
        }))
      }
      
      setConversions(demoData)
    } catch (error) {
      console.error('Error fetching conversions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportReport = () => {
    setExportModalOpen(true)
  }

  const handleRefreshData = () => {
    setLoading(true)
    fetchConversions()
  }

  const handleAdvancedFilters = () => {
    setFiltersModalOpen(true)
  }

  const handleGoalSettings = () => {
    setGoalsModalOpen(true)
  }

  const handleFunnelAnalysis = () => {
    setFunnelModalOpen(true)
  }

  const handleViewGoalDetails = (goal: ConversionGoal) => {
    setSelectedConversionGoal(goal)
    setGoalsModalOpen(true)
  }

  const handleAttributionAnalysis = () => {
    setAttributionModalOpen(true)
  }

  const handleABTesting = () => {
    setAbTestModalOpen(true)
  }

  const handleOptimization = () => {
    setOptimizationModalOpen(true)
  }

  const handleExportData = async (format: string) => {
    setIsSubmitting(true)
    try {
      if (format === 'pdf') {
        const reportData = `Conversion Analytics Report - ${timeRange}\n\nTotal Conversions: ${conversions?.totalConversions}\nConversion Rate: ${conversions?.conversionRate.toFixed(1)}%\nTotal Value: AED ${conversions?.totalValue.toLocaleString()}\nAverage Value: AED ${conversions?.averageValue.toLocaleString()}`
        const blob = new Blob([reportData], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `conversion-report-${new Date().toISOString().split('T')[0]}.txt`
        link.click()
        window.URL.revokeObjectURL(url)
      } else if (format === 'excel') {
        const csvData = conversions?.goals.map(goal => ({
          Goal: goal.name,
          Type: goal.type,
          Completions: goal.completions,
          Value: goal.value,
          ConversionRate: goal.conversionRate.toFixed(1) + '%',
          Trend: goal.trend.toFixed(1) + '%'
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
          link.download = `conversion-goals-${new Date().toISOString().split('T')[0]}.csv`
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

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? '↗️' : trend < 0 ? '↘️' : '➡️'
  }

  const getTrendColor = (trend: number) => {
    return trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Conversions</h1>
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

  if (!conversions) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Conversions</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversion data available</h3>
            <p className="text-gray-500 text-center">
              Set up conversion tracking to see your performance here.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Conversions</h1>
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
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Goals</option>
            <option value="consultation_booking">Consultations</option>
            <option value="property_inquiry">Property Inquiries</option>
            <option value="newsletter_signup">Newsletter</option>
          </select>
          <Button variant="outline" size="sm" onClick={handleAdvancedFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleAttributionAnalysis}>
            <Share2 className="h-4 w-4 mr-2" />
            Attribution
          </Button>
          <Button variant="outline" size="sm" onClick={handleABTesting}>
            <Shuffle className="h-4 w-4 mr-2" />
            A/B Testing
          </Button>
          <Button variant="outline" size="sm" onClick={handleGoalSettings}>
            <Target className="h-4 w-4 mr-2" />
            Goals
          </Button>
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversions.totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {conversions.conversionRate.toFixed(1)}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversions.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-green-600">
              ↗️ 0.3% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED {(conversions.totalValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              AED {conversions.averageValue.toLocaleString()} avg. value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversions.goals[0].completions}</div>
            <p className="text-xs text-muted-foreground">
              {conversions.goals[0].name}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Step-by-step conversion analysis</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleFunnelAnalysis}>
            <Funnel className="h-4 w-4 mr-2" />
            Analyze Funnel
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {conversions.funnelSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{step.step}</h4>
                      <p className="text-sm text-gray-500">{step.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{step.rate.toFixed(1)}%</div>
                    {index > 0 && (
                      <div className="text-sm text-red-600">
                        {step.dropOff.toFixed(1)}% drop-off
                      </div>
                    )}
                  </div>
                </div>
                {index < conversions.funnelSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-5 w-5 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals and Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Goals</CardTitle>
            <CardDescription>Performance by goal type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversions.goals.map((goal) => (
                <div key={goal.id} className="flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleViewGoalDetails(goal)}>
                  <div>
                    <h4 className="font-medium">{goal.name}</h4>
                    <p className="text-sm text-gray-500">
                      {goal.completions.toLocaleString()} completions • {goal.conversionRate.toFixed(1)}% rate
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">AED {goal.value.toLocaleString()}</div>
                    <div className={`text-sm ${getTrendColor(goal.trend)}`}>
                      {getTrendIcon(goal.trend)} {Math.abs(goal.trend).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversions by Source</CardTitle>
            <CardDescription>Performance by traffic source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversions.conversionsBySource.map((source) => (
                <div key={source.source} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{source.source}</h4>
                    <p className="text-sm text-gray-500">
                      {source.conversions.toLocaleString()} conversions • {source.rate.toFixed(1)}% rate
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">AED {(source.value / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-500">
                      AED {(source.value / source.conversions).toFixed(0)} per conversion
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Converting Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Converting Pages</CardTitle>
          <CardDescription>Pages with highest conversion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {conversions.topPages.map((page, index) => (
              <div key={page.page} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 rounded text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{page.page}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{page.conversions} conversions</div>
                  <div className="text-sm text-green-600">{page.rate.toFixed(1)}% rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Report Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Export Conversion Report</h2>
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
                        <p className="text-sm text-gray-600">Comprehensive conversion analysis</p>
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
                        <p className="text-sm text-gray-600">Raw conversion data</p>
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
                        <span className="text-sm">Conversion Goals</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded mr-2" />
                        <span className="text-sm">Funnel Analysis</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded mr-2" />
                        <span className="text-sm">Source Attribution</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Advanced Conversion Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setFiltersModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Conversion Types</h3>
                  <div className="space-y-2">
                    {['Consultation Booking', 'Property Inquiry', 'Newsletter Signup', 'Brochure Download', 'Contact Form', 'Phone Call'].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Attribution Models</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'last_click', label: 'Last Click' },
                      { value: 'first_click', label: 'First Click' },
                      { value: 'linear', label: 'Linear Attribution' },
                      { value: 'time_decay', label: 'Time Decay' },
                      { value: 'position_based', label: 'Position Based' }
                    ].map((model) => (
                      <label key={model.value} className="flex items-center gap-2">
                        <input type="radio" name="attribution" defaultChecked={model.value === 'last_click'} className="rounded" />
                        <span className="text-sm">{model.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Value Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Value</label>
                    <input 
                      type="number" 
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Value</label>
                    <input 
                      type="number" 
                      placeholder="10000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="aed">AED</option>
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Conversion Segments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">User Type</label>
                    <div className="space-y-2">
                      {['New Users', 'Returning Users', 'VIP Clients'].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Traffic Source</label>
                    <div className="space-y-2">
                      {['Organic Search', 'Paid Ads', 'Social Media', 'Direct', 'Referral'].map((source) => (
                        <label key={source} className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">{source}</span>
                        </label>
                      ))}
                    </div>
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

      {/* Funnel Analysis Modal */}
      {funnelModalOpen && conversions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Detailed Funnel Analysis</h2>
                <Button variant="ghost" size="sm" onClick={() => setFunnelModalOpen(false)}>
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
                        <p className="text-sm text-gray-600">Total Funnel Length</p>
                        <p className="text-2xl font-bold text-blue-600">{conversions.funnelSteps.length}</p>
                      </div>
                      <Layers className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Overall Conversion</p>
                        <p className="text-2xl font-bold text-green-600">
                          {((conversions.funnelSteps[conversions.funnelSteps.length - 1].visitors / conversions.funnelSteps[0].visitors) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Biggest Drop-off</p>
                        <p className="text-2xl font-bold text-red-600">
                          {Math.max(...conversions.funnelSteps.slice(1).map(step => step.dropOff)).toFixed(1)}%
                        </p>
                      </div>
                      <ArrowDown className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {conversions.funnelSteps.map((step, index) => (
                  <Card key={step.step}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{step.step}</h3>
                            <p className="text-sm text-gray-500">{step.visitors.toLocaleString()} visitors reached this step</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{step.rate.toFixed(1)}%</div>
                          <p className="text-sm text-gray-500">conversion rate</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Visitors</p>
                          <p className="text-lg font-bold text-blue-600">{step.visitors.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Conversions</p>
                          <p className="text-lg font-bold text-green-600">{step.conversions.toLocaleString()}</p>
                        </div>
                        {index > 0 && (
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Drop-off Rate</p>
                            <p className="text-lg font-bold text-red-600">{step.dropOff.toFixed(1)}%</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full" 
                            style={{ width: `${step.rate}%` }}
                          ></div>
                        </div>
                      </div>

                      {index > 0 && step.dropOff > 50 && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">High Drop-off Alert</span>
                          </div>
                          <p className="text-sm text-yellow-700 mt-1">
                            This step has a high drop-off rate. Consider optimizing the user experience here.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Optimization Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      priority: 'High', 
                      suggestion: 'Simplify the contact form to reduce abandonment', 
                      impact: '+15% conversion rate',
                      color: 'text-red-600'
                    },
                    { 
                      priority: 'Medium', 
                      suggestion: 'Add trust signals on property detail pages', 
                      impact: '+8% engagement',
                      color: 'text-yellow-600'
                    },
                    { 
                      priority: 'Low', 
                      suggestion: 'Improve page loading speed', 
                      impact: '+3% retention',
                      color: 'text-blue-600'
                    }
                  ].map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${rec.color} bg-opacity-10`}>
                        {rec.priority}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{rec.suggestion}</p>
                        <p className="text-sm text-gray-500 mt-1">Estimated impact: {rec.impact}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setFunnelModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => handleOptimization()}>
                <Zap className="h-4 w-4 mr-2" />
                Start Optimization
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Goals Management Modal */}
      {goalsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedConversionGoal ? `Goal Details: ${selectedConversionGoal.name}` : 'Conversion Goals Management'}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setGoalsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {selectedConversionGoal ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Completions</p>
                            <p className="text-2xl font-bold text-blue-600">{selectedConversionGoal.completions.toLocaleString()}</p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Conversion Rate</p>
                            <p className="text-2xl font-bold text-green-600">{selectedConversionGoal.conversionRate.toFixed(1)}%</p>
                          </div>
                          <Percent className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Value per Goal</p>
                            <p className="text-2xl font-bold text-purple-600">AED {selectedConversionGoal.value.toLocaleString()}</p>
                          </div>
                          <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Trend</p>
                            <p className={`text-2xl font-bold ${getTrendColor(selectedConversionGoal.trend)}`}>
                              {selectedConversionGoal.trend > 0 ? '+' : ''}{selectedConversionGoal.trend.toFixed(1)}%
                            </p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Goal Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                          <input 
                            type="text" 
                            value={selectedConversionGoal.name}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Goal Type</label>
                          <input 
                            type="text" 
                            value={selectedConversionGoal.type.replace('_', ' ')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md capitalize"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Goal Value (AED)</label>
                          <input 
                            type="number" 
                            value={selectedConversionGoal.value}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="active">Active</option>
                            <option value="paused">Paused</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">All Conversion Goals</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Goal
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {conversions?.goals.map((goal) => (
                      <Card key={goal.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Target className="h-5 w-5 text-blue-600" />
                              <div>
                                <h4 className="font-medium text-gray-900">{goal.name}</h4>
                                <p className="text-sm text-gray-500">{goal.type.replace('_', ' ')}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-8 text-center">
                              <div>
                                <p className="text-sm text-gray-600">Completions</p>
                                <p className="text-lg font-bold text-blue-600">{goal.completions.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Rate</p>
                                <p className="text-lg font-bold text-green-600">{goal.conversionRate.toFixed(1)}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Value</p>
                                <p className="text-lg font-bold text-purple-600">AED {goal.value.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setGoalsModalOpen(false)}>
                Close
              </Button>
              {selectedConversionGoal && (
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Attribution Analysis Modal */}
      {attributionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Attribution Analysis</h2>
                <Button variant="ghost" size="sm" onClick={() => setAttributionModalOpen(false)}>
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
                        <p className="text-sm text-gray-600">First Touch</p>
                        <p className="text-2xl font-bold text-blue-600">32%</p>
                      </div>
                      <Share2 className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Last Touch</p>
                        <p className="text-2xl font-bold text-green-600">45%</p>
                      </div>
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Assisted</p>
                        <p className="text-2xl font-bold text-purple-600">23%</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Multi-Touch</p>
                        <p className="text-2xl font-bold text-orange-600">67%</p>
                      </div>
                      <Layers className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attribution by Channel</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { channel: 'Google Ads', first: 45, last: 38, assisted: 67 },
                      { channel: 'Facebook Ads', first: 23, last: 29, assisted: 45 },
                      { channel: 'Organic Search', first: 18, last: 15, assisted: 32 },
                      { channel: 'Direct', first: 8, last: 12, assisted: 18 },
                      { channel: 'Email', first: 6, last: 6, assisted: 15 }
                    ].map((channel) => (
                      <div key={channel.channel} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{channel.channel}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <p className="text-blue-600 font-medium">{channel.first}</p>
                            <p className="text-xs text-gray-500">First</p>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <p className="text-green-600 font-medium">{channel.last}</p>
                            <p className="text-xs text-gray-500">Last</p>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <p className="text-purple-600 font-medium">{channel.assisted}</p>
                            <p className="text-xs text-gray-500">Assisted</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Journey Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Average Touchpoints</h4>
                      <p className="text-2xl font-bold text-blue-600">4.7</p>
                      <p className="text-sm text-gray-500">touchpoints before conversion</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Time to Convert</h4>
                      <p className="text-2xl font-bold text-green-600">18.5</p>
                      <p className="text-sm text-gray-500">days average</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Top Path</h4>
                      <p className="text-sm font-medium">Google Ads → Organic → Direct</p>
                      <p className="text-sm text-gray-500">23% of conversions</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Attribution Model Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Channel</th>
                          <th className="text-center py-2">Last Click</th>
                          <th className="text-center py-2">First Click</th>
                          <th className="text-center py-2">Linear</th>
                          <th className="text-center py-2">Time Decay</th>
                          <th className="text-center py-2">Position Based</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { channel: 'Google Ads', values: [487, 312, 398, 445, 423] },
                          { channel: 'Facebook Ads', values: [298, 187, 245, 267, 251] },
                          { channel: 'Organic Search', values: [234, 298, 267, 245, 278] },
                          { channel: 'Direct', values: [156, 89, 123, 134, 112] },
                          { channel: 'Email', values: [72, 45, 58, 65, 61] }
                        ].map((row) => (
                          <tr key={row.channel} className="border-b">
                            <td className="py-2 font-medium">{row.channel}</td>
                            {row.values.map((value, index) => (
                              <td key={index} className="text-center py-2">{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setAttributionModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* A/B Testing Modal */}
      {abTestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">A/B Testing Dashboard</h2>
                <Button variant="ghost" size="sm" onClick={() => setAbTestModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Active Tests</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: '1',
                    name: 'Consultation Form CTA',
                    status: 'running',
                    confidence: 95,
                    winner: 'B',
                    variants: [
                      { name: 'Control (A)', conversions: 156, rate: 3.2, visitors: 4875 },
                      { name: 'Variant B', conversions: 189, rate: 3.8, visitors: 4972 }
                    ]
                  },
                  {
                    id: '2',
                    name: 'Property Page Layout',
                    status: 'draft',
                    confidence: 78,
                    winner: 'inconclusive',
                    variants: [
                      { name: 'Control (A)', conversions: 89, rate: 2.1, visitors: 4238 },
                      { name: 'Variant B', conversions: 94, rate: 2.3, visitors: 4089 }
                    ]
                  },
                  {
                    id: '3',
                    name: 'Pricing Display Test',
                    status: 'completed',
                    confidence: 99,
                    winner: 'A',
                    variants: [
                      { name: 'Control (A)', conversions: 234, rate: 4.8, visitors: 4875 },
                      { name: 'Variant B', conversions: 198, rate: 4.1, visitors: 4829 }
                    ]
                  }
                ].map((test) => (
                  <Card key={test.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            test.status === 'running' ? 'bg-green-500' :
                            test.status === 'draft' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`}></div>
                          <div>
                            <h4 className="font-medium text-gray-900">{test.name}</h4>
                            <p className="text-sm text-gray-500 capitalize">{test.status}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Confidence</p>
                            <p className={`font-bold ${test.confidence >= 95 ? 'text-green-600' : test.confidence >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {test.confidence}%
                            </p>
                          </div>
                          {test.winner !== 'inconclusive' && (
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Winner</p>
                              <p className="font-bold text-blue-600">Variant {test.winner}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {test.variants.map((variant, index) => (
                          <div key={variant.name} className={`p-4 border rounded-lg ${
                            test.winner === (index === 0 ? 'A' : 'B') ? 'border-green-500 bg-green-50' : ''
                          }`}>
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium">{variant.name}</h5>
                              {test.winner === (index === 0 ? 'A' : 'B') && (
                                <Star className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-center">
                                <p className="text-gray-600">Visitors</p>
                                <p className="font-bold">{variant.visitors.toLocaleString()}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-600">Conversions</p>
                                <p className="font-bold">{variant.conversions}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-600">Rate</p>
                                <p className="font-bold">{variant.rate.toFixed(1)}%</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Testing Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">3</p>
                      <p className="text-sm text-gray-600">Active Tests</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">12%</p>
                      <p className="text-sm text-gray-600">Avg Lift</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">89%</p>
                      <p className="text-sm text-gray-600">Test Accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAbTestModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}