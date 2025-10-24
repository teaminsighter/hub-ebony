'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  Target,
  Users,
  Building,
  Calculator,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  X,
  Settings,
  FileText,
  Eye,
  Edit
} from 'lucide-react'

interface ForecastData {
  period: string
  predictedRevenue: number
  actualRevenue: number
  variance: number
  variancePercent: number
  deals: number
  averageDealSize: number
  conversionRate: number
  confidence: number
}

interface QuarterlyForecast {
  quarter: string
  forecast: number
  target: number
  probability: number
  deals: {
    high: number
    medium: number
    low: number
  }
}

export default function ForecastingPage() {
  const [forecastData, setForecastData] = useState<ForecastData[]>([])
  const [quarterlyData, setQuarterlyData] = useState<QuarterlyForecast[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [forecastModel, setForecastModel] = useState('pipeline_based')
  
  // Modal states
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [adjustModalOpen, setAdjustModalOpen] = useState(false)
  const [scenarioModalOpen, setScenarioModalOpen] = useState(false)
  const [targetModalOpen, setTargetModalOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [trendsModalOpen, setTrendsModalOpen] = useState(false)
  const [selectedForecast, setSelectedForecast] = useState<ForecastData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchForecastData()
  }, [selectedPeriod, forecastModel])

  const fetchForecastData = async () => {
    try {
      // Demo data for monthly forecasting
      const demoMonthlyData: ForecastData[] = [
        {
          period: '2025-11',
          predictedRevenue: 850000,
          actualRevenue: 0,
          variance: 0,
          variancePercent: 0,
          deals: 3,
          averageDealSize: 283333,
          conversionRate: 75,
          confidence: 85
        },
        {
          period: '2025-12',
          predictedRevenue: 1200000,
          actualRevenue: 0,
          variance: 0,
          variancePercent: 0,
          deals: 4,
          averageDealSize: 300000,
          conversionRate: 70,
          confidence: 80
        },
        {
          period: '2026-01',
          predictedRevenue: 950000,
          actualRevenue: 0,
          variance: 0,
          variancePercent: 0,
          deals: 3,
          averageDealSize: 316667,
          conversionRate: 65,
          confidence: 75
        },
        {
          period: '2026-02',
          predictedRevenue: 1400000,
          actualRevenue: 0,
          variance: 0,
          variancePercent: 0,
          deals: 5,
          averageDealSize: 280000,
          conversionRate: 68,
          confidence: 72
        },
        {
          period: '2025-10',
          predictedRevenue: 780000,
          actualRevenue: 850000,
          variance: 70000,
          variancePercent: 8.97,
          deals: 3,
          averageDealSize: 283333,
          conversionRate: 80,
          confidence: 90
        },
        {
          period: '2025-09',
          predictedRevenue: 650000,
          actualRevenue: 720000,
          variance: 70000,
          variancePercent: 10.77,
          deals: 2,
          averageDealSize: 360000,
          conversionRate: 85,
          confidence: 95
        }
      ]

      // Demo quarterly data
      const demoQuarterlyData: QuarterlyForecast[] = [
        {
          quarter: 'Q4 2025',
          forecast: 2850000,
          target: 3000000,
          probability: 85,
          deals: { high: 4, medium: 6, low: 3 }
        },
        {
          quarter: 'Q1 2026',
          forecast: 3200000,
          target: 3500000,
          probability: 78,
          deals: { high: 5, medium: 8, low: 4 }
        },
        {
          quarter: 'Q2 2026',
          forecast: 3800000,
          target: 4000000,
          probability: 72,
          deals: { high: 6, medium: 10, low: 5 }
        },
        {
          quarter: 'Q3 2026',
          forecast: 4200000,
          target: 4500000,
          probability: 68,
          deals: { high: 7, medium: 12, low: 6 }
        }
      ]

      setForecastData(demoMonthlyData)
      setQuarterlyData(demoQuarterlyData)
    } catch (error) {
      console.error('Error fetching forecast data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPeriod = (period: string) => {
    const date = new Date(period + '-01')
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-green-600'
    if (variance < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const handleRefreshForecast = () => {
    setLoading(true)
    // Show professional info notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-semibold">Refreshing Forecast</p>
          <p class="text-sm">Recalculating with latest data</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
    
    setTimeout(() => {
      fetchForecastData()
    }, 1000)
  }

  const handleExportForecast = () => {
    // Show professional success notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-semibold">Forecast Report Exported</p>
          <p class="text-sm">Comprehensive analysis generated</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  const handleAdjustTargets = () => {
    setTargetModalOpen(true)
  }

  const handleScenarioAnalysis = () => {
    setScenarioModalOpen(true)
  }

  const handleForecastSettings = () => {
    setSettingsModalOpen(true)
  }

  const handleViewTrends = () => {
    setTrendsModalOpen(true)
  }

  const handleViewDetails = (forecast: ForecastData) => {
    setSelectedForecast(forecast)
    setDetailsModalOpen(true)
  }

  const handleAdjustForecast = (forecast: ForecastData) => {
    setSelectedForecast(forecast)
    setAdjustModalOpen(true)
  }

  // Calculate summary metrics
  const currentQuarter = quarterlyData[0]
  const totalPipelineValue = forecastData.reduce((sum, item) => sum + item.predictedRevenue, 0)
  const avgConfidence = forecastData.length > 0 
    ? forecastData.reduce((sum, item) => sum + item.confidence, 0) / forecastData.length 
    : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Sales Forecasting</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Sales Forecasting</h1>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleViewTrends}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Trends
          </Button>
          <Button variant="outline" size="sm" onClick={handleScenarioAnalysis}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Scenarios
          </Button>
          <Button variant="outline" size="sm" onClick={handleForecastSettings}>
            <Calculator className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" onClick={handleRefreshForecast}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportForecast}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAdjustTargets}>
            <Target className="h-4 w-4 mr-2" />
            Adjust Targets
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Forecast Parameters</CardTitle>
          <CardDescription>Configure forecasting model and time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forecast Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full"
              >
                <option value="3months">Next 3 Months</option>
                <option value="6months">Next 6 Months</option>
                <option value="12months">Next 12 Months</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forecasting Model
              </label>
              <select
                value={forecastModel}
                onChange={(e) => setForecastModel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full"
              >
                <option value="pipeline_based">Pipeline Based</option>
                <option value="historical_trend">Historical Trend</option>
                <option value="hybrid">Hybrid Model</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(totalPipelineValue)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Q4 2025 Forecast</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(currentQuarter?.forecast || 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className={`text-2xl font-bold ${getConfidenceColor(avgConfidence)}`}>
                  {avgConfidence.toFixed(0)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Target Gap</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency((currentQuarter?.target || 0) - (currentQuarter?.forecast || 0))}
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Forecast Overview</CardTitle>
          <CardDescription>Revenue forecasts and targets by quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quarterlyData.map((quarter) => (
              <Card key={quarter.quarter} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-lg">{quarter.quarter}</h4>
                      <Badge className={`${
                        quarter.probability >= 80 ? 'bg-green-100 text-green-800' :
                        quarter.probability >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quarter.probability}% confident
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Forecast:</span>
                        <span className="font-medium">{formatCurrency(quarter.forecast)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium">{formatCurrency(quarter.target)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gap:</span>
                        <span className={`font-medium ${
                          quarter.forecast >= quarter.target ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(quarter.forecast - quarter.target)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-600 mb-1">Deal Probability Mix:</p>
                      <div className="flex gap-2 text-xs">
                        <span className="text-green-600">High: {quarter.deals.high}</span>
                        <span className="text-yellow-600">Med: {quarter.deals.medium}</span>
                        <span className="text-red-600">Low: {quarter.deals.low}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Forecast Details */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Forecast Details</CardTitle>
          <CardDescription>Detailed monthly revenue predictions and variance analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastData.map((month) => (
              <Card key={month.period} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <h4 className="font-medium text-lg">{formatPeriod(month.period)}</h4>
                        <Badge className={`${getConfidenceColor(month.confidence)} bg-gray-100`}>
                          {month.confidence}% confidence
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Revenue</h5>
                          <div className="space-y-1 text-gray-600">
                            <div>Forecast: {formatCurrency(month.predictedRevenue)}</div>
                            {month.actualRevenue > 0 && (
                              <div>Actual: {formatCurrency(month.actualRevenue)}</div>
                            )}
                            {month.variance !== 0 && (
                              <div className={`flex items-center gap-1 ${getVarianceColor(month.variance)}`}>
                                {month.variance > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                                {Math.abs(month.variancePercent).toFixed(1)}% variance
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Deals</h5>
                          <div className="space-y-1 text-gray-600">
                            <div>Expected: {month.deals}</div>
                            <div>Avg Size: {formatCurrency(month.averageDealSize)}</div>
                            <div>Conversion: {month.conversionRate}%</div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Key Factors</h5>
                          <div className="space-y-1 text-gray-600">
                            <div className="text-xs">
                              • Pipeline strength
                            </div>
                            <div className="text-xs">
                              • Seasonal trends
                            </div>
                            <div className="text-xs">
                              • Market conditions
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Risk Assessment</h5>
                          <div className="space-y-1 text-gray-600">
                            {month.confidence >= 80 ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Low Risk
                              </div>
                            ) : month.confidence >= 60 ? (
                              <div className="flex items-center gap-1 text-yellow-600">
                                <AlertTriangle className="h-4 w-4" />
                                Medium Risk
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-red-600">
                                <AlertTriangle className="h-4 w-4" />
                                High Risk
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(month)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAdjustForecast(month)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Adjust
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Professional Details Modal */}
      {detailsModalOpen && selectedForecast && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Forecast Details - {formatPeriod(selectedForecast.period)}</h2>
              <button 
                onClick={() => setDetailsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Revenue Forecast</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Predicted Revenue:</span> {formatCurrency(selectedForecast.predictedRevenue)}</p>
                      {selectedForecast.actualRevenue > 0 && (
                        <p><span className="font-medium">Actual Revenue:</span> {formatCurrency(selectedForecast.actualRevenue)}</p>
                      )}
                      {selectedForecast.variance !== 0 && (
                        <p><span className="font-medium">Variance:</span> 
                          <span className={getVarianceColor(selectedForecast.variance)}>
                            {formatCurrency(Math.abs(selectedForecast.variance))} ({Math.abs(selectedForecast.variancePercent).toFixed(1)}%)
                          </span>
                        </p>
                      )}
                      <p><span className="font-medium">Confidence Level:</span> 
                        <span className={getConfidenceColor(selectedForecast.confidence)}>
                          {selectedForecast.confidence}%
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Deal Metrics</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Expected Deals:</span> {selectedForecast.deals}</p>
                      <p><span className="font-medium">Average Deal Size:</span> {formatCurrency(selectedForecast.averageDealSize)}</p>
                      <p><span className="font-medium">Conversion Rate:</span> {selectedForecast.conversionRate}%</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Risk Assessment</h3>
                    <div className="space-y-2">
                      {selectedForecast.confidence >= 80 ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Low Risk</span>
                        </div>
                      ) : selectedForecast.confidence >= 60 ? (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-medium">Medium Risk</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-medium">High Risk</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Key Factors</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Pipeline strength analysis</p>
                      <p>• Seasonal trend adjustments</p>
                      <p>• Market condition impact</p>
                      <p>• Historical performance data</p>
                      <p>• Economic indicators</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setDetailsModalOpen(false)}>Close</Button>
              <Button onClick={() => {
                setDetailsModalOpen(false)
                handleAdjustForecast(selectedForecast)
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Adjust Forecast
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Adjust Modal */}
      {adjustModalOpen && selectedForecast && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Adjust Forecast - {formatPeriod(selectedForecast.period)}</h2>
              <button 
                onClick={() => setAdjustModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Predicted Revenue (AED)</label>
                    <Input
                      type="number"
                      defaultValue={selectedForecast.predictedRevenue}
                      placeholder="Enter predicted revenue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Deals</label>
                    <Input
                      type="number"
                      defaultValue={selectedForecast.deals}
                      placeholder="Enter expected number of deals"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Average Deal Size (AED)</label>
                    <Input
                      type="number"
                      defaultValue={selectedForecast.averageDealSize}
                      placeholder="Enter average deal size"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      defaultValue={selectedForecast.conversionRate}
                      placeholder="Enter conversion rate"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confidence Level (%)</label>
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      defaultValue={selectedForecast.confidence}
                      placeholder="Enter confidence level"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Market Conditions</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Favorable</option>
                      <option>Neutral</option>
                      <option>Challenging</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk Factors</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Low Risk</option>
                      <option>Medium Risk</option>
                      <option>High Risk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adjustment Reason</label>
                    <textarea
                      placeholder="Enter reason for forecast adjustment..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setAdjustModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  setIsSubmitting(true)
                  setTimeout(() => {
                    setIsSubmitting(false)
                    setAdjustModalOpen(false)
                    
                    // Show professional success notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">Forecast Updated</p>
                          <p class="text-sm">Changes saved successfully</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Scenario Analysis Modal */}
      {scenarioModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Scenario Analysis</h2>
              <button 
                onClick={() => setScenarioModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-green-700 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Best Case
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPipelineValue * 1.3)}</p>
                        <p className="text-sm text-gray-600">30% above forecast</p>
                        <div className="text-xs text-gray-500">
                          <p>• All high-probability deals close</p>
                          <p>• Market conditions favorable</p>
                          <p>• No competitive pressure</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-700 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Most Likely
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalPipelineValue)}</p>
                        <p className="text-sm text-gray-600">Current forecast</p>
                        <div className="text-xs text-gray-500">
                          <p>• Normal conversion rates</p>
                          <p>• Expected market conditions</p>
                          <p>• Standard deal velocity</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-red-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-red-700 flex items-center gap-2">
                        <TrendingDown className="h-5 w-5" />
                        Worst Case
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(totalPipelineValue * 0.6)}</p>
                        <p className="text-sm text-gray-600">40% below forecast</p>
                        <div className="text-xs text-gray-500">
                          <p>• Economic downturn impact</p>
                          <p>• Increased competition</p>
                          <p>• Deal delays and cancellations</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Sensitivity Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Market Condition Impact</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Strong Growth (+20%)</option>
                        <option>Moderate Growth (+10%)</option>
                        <option>Stable (0%)</option>
                        <option>Decline (-10%)</option>
                        <option>Recession (-25%)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Competition Level</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Low Competition</option>
                        <option>Moderate Competition</option>
                        <option>High Competition</option>
                        <option>Intense Competition</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setScenarioModalOpen(false)}>Close</Button>
              <Button onClick={() => {
                setScenarioModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"></path>
                      <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h8v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Scenario Analysis</p>
                      <p class="text-sm">Report generated successfully</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Target Adjustment Modal */}
      {targetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Adjust Sales Targets</h2>
              <button 
                onClick={() => setTargetModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quarterly Targets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quarterlyData.map((quarter) => (
                      <div key={quarter.quarter} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">{quarter.quarter} Target (AED)</label>
                        <Input
                          type="number"
                          defaultValue={quarter.target}
                          placeholder="Enter target amount"
                        />
                        <p className="text-xs text-gray-500">Current forecast: {formatCurrency(quarter.forecast)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Target Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Growth Rate (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        defaultValue={15}
                        placeholder="Enter annual growth rate"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Market Factor</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Optimistic (+15%)</option>
                        <option>Realistic (0%)</option>
                        <option>Conservative (-10%)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Agent Allocation</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Equal Distribution</option>
                        <option>Performance Based</option>
                        <option>Custom Allocation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Review Period</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Semi-Annual</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setTargetModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  setIsSubmitting(true)
                  setTimeout(() => {
                    setIsSubmitting(false)
                    setTargetModalOpen(false)
                    
                    // Show professional success notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">Targets Updated</p>
                          <p class="text-sm">Sales targets saved successfully</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Targets'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Settings Modal */}
      {settingsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Forecast Settings</h2>
              <button 
                onClick={() => setSettingsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Model Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Algorithm</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Pipeline-Based Forecasting</option>
                        <option>Historical Trend Analysis</option>
                        <option>Machine Learning Model</option>
                        <option>Hybrid Approach</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Historical Data Weight</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Last 12 Months (50%)</option>
                        <option>Last 24 Months (70%)</option>
                        <option>Last 36 Months (80%)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confidence Calculation</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Conservative</option>
                        <option>Balanced</option>
                        <option>Optimistic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Real-time</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Manual</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">External Data Integration</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Market Indicators</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Economic Data</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Industry Trends</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Competitive Intelligence</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setSettingsModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  setIsSubmitting(true)
                  setTimeout(() => {
                    setIsSubmitting(false)
                    setSettingsModalOpen(false)
                    
                    // Show professional success notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">Settings Updated</p>
                          <p class="text-sm">Forecast settings saved</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Trends Modal */}
      {trendsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Detailed Trends Analysis</h2>
              <button 
                onClick={() => setTrendsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">YoY Growth</p>
                          <p className="text-2xl font-bold text-green-600">+18.5%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                          <p className="text-2xl font-bold text-blue-600">72.3%</p>
                        </div>
                        <Target className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                          <p className="text-2xl font-bold text-purple-600">{formatCurrency(295000)}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Sales Cycle</p>
                          <p className="text-2xl font-bold text-orange-600">42 days</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Seasonal Patterns</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• Q4 shows strongest performance (+25%)</p>
                        <p>• Summer months slightly slower (-8%)</p>
                        <p>• New year brings fresh opportunities</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Market Dynamics</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• Luxury market segment growing</p>
                        <p>• Commercial properties gaining traction</p>
                        <p>• Off-plan sales increasing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setTrendsModalOpen(false)}>Close</Button>
              <Button onClick={() => {
                setTrendsModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Trends Report</p>
                      <p class="text-sm">Analysis exported successfully</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}