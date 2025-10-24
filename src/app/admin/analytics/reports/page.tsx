'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText,
  Download,
  Calendar,
  Clock,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  DollarSign,
  Building,
  Mail,
  Phone,
  Settings,
  Filter,
  Plus,
  Play,
  Pause,
  Share,
  X,
  RefreshCw,
  Send,
  Copy,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  Layers
} from 'lucide-react'

interface ReportTemplate {
  id: string
  name: string
  description: string
  category: 'performance' | 'sales' | 'marketing' | 'clients' | 'properties'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  isScheduled: boolean
  lastGenerated: string
  recipients: string[]
  metrics: string[]
}

interface GeneratedReport {
  id: string
  name: string
  type: string
  generatedAt: string
  period: string
  size: string
  status: 'completed' | 'generating' | 'failed'
  downloadUrl?: string
}

interface ReportsData {
  templates: ReportTemplate[]
  recentReports: GeneratedReport[]
  scheduledReports: number
  totalReports: number
  lastWeekReports: number
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'templates' | 'generated' | 'scheduled'>('templates')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Modal states
  const [createReportModalOpen, setCreateReportModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [selectedReport, setSelectedReport] = useState<GeneratedReport | null>(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setLoading(true)
    try {
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const demoData: ReportsData = {
        templates: [
          {
            id: 'weekly_performance',
            name: 'Weekly Performance Summary',
            description: 'Comprehensive weekly overview of key metrics and KPIs',
            category: 'performance',
            frequency: 'weekly',
            isScheduled: true,
            lastGenerated: '2024-01-22T10:00:00Z',
            recipients: ['admin@hubebony.com', 'sales@hubebony.com'],
            metrics: ['Page Views', 'Conversions', 'Revenue', 'Lead Quality']
          },
          {
            id: 'monthly_sales',
            name: 'Monthly Sales Report',
            description: 'Detailed analysis of sales performance and pipeline',
            category: 'sales',
            frequency: 'monthly',
            isScheduled: true,
            lastGenerated: '2024-01-01T09:00:00Z',
            recipients: ['sales@hubebony.com', 'manager@hubebony.com'],
            metrics: ['Deals Closed', 'Pipeline Value', 'Conversion Rate', 'Commission']
          },
          {
            id: 'campaign_roi',
            name: 'Campaign ROI Analysis',
            description: 'Marketing campaign performance and return on investment',
            category: 'marketing',
            frequency: 'monthly',
            isScheduled: false,
            lastGenerated: '2024-01-15T14:30:00Z',
            recipients: ['marketing@hubebony.com'],
            metrics: ['ROAS', 'CPA', 'CTR', 'Impressions', 'Conversions']
          },
          {
            id: 'client_satisfaction',
            name: 'Client Satisfaction Survey',
            description: 'Client feedback analysis and satisfaction metrics',
            category: 'clients',
            frequency: 'quarterly',
            isScheduled: true,
            lastGenerated: '2024-01-01T12:00:00Z',
            recipients: ['support@hubebony.com', 'admin@hubebony.com'],
            metrics: ['NPS Score', 'CSAT', 'Retention Rate', 'Feedback Analysis']
          },
          {
            id: 'property_performance',
            name: 'Property Performance Metrics',
            description: 'Analysis of property listings and market trends',
            category: 'properties',
            frequency: 'weekly',
            isScheduled: false,
            lastGenerated: '2024-01-20T16:45:00Z',
            recipients: ['properties@hubebony.com'],
            metrics: ['Views per Property', 'Inquiry Rate', 'Price Trends', 'Availability']
          },
          {
            id: 'daily_dashboard',
            name: 'Daily Operations Dashboard',
            description: 'Daily snapshot of key operational metrics',
            category: 'performance',
            frequency: 'daily',
            isScheduled: true,
            lastGenerated: '2024-01-23T08:00:00Z',
            recipients: ['admin@hubebony.com'],
            metrics: ['Daily Traffic', 'New Leads', 'Active Deals', 'Support Tickets']
          }
        ],
        recentReports: [
          {
            id: 'rpt_001',
            name: 'Weekly Performance Summary',
            type: 'Performance Report',
            generatedAt: '2024-01-22T10:00:00Z',
            period: 'Jan 15-22, 2024',
            size: '2.3 MB',
            status: 'completed',
            downloadUrl: '/reports/weekly_performance_jan22.pdf'
          },
          {
            id: 'rpt_002',
            name: 'Property Market Analysis',
            type: 'Market Report',
            generatedAt: '2024-01-21T15:30:00Z',
            period: 'January 2024',
            size: '4.7 MB',
            status: 'completed',
            downloadUrl: '/reports/market_analysis_jan.pdf'
          },
          {
            id: 'rpt_003',
            name: 'Campaign Performance Q1',
            type: 'Marketing Report',
            generatedAt: '2024-01-20T11:15:00Z',
            period: 'Q1 2024',
            size: '1.8 MB',
            status: 'generating'
          },
          {
            id: 'rpt_004',
            name: 'Client Acquisition Report',
            type: 'Sales Report',
            generatedAt: '2024-01-19T14:20:00Z',
            period: 'Dec 2023',
            size: '3.1 MB',
            status: 'completed',
            downloadUrl: '/reports/client_acquisition_dec.pdf'
          },
          {
            id: 'rpt_005',
            name: 'Revenue Analytics',
            type: 'Financial Report',
            generatedAt: '2024-01-18T09:45:00Z',
            period: 'Jan 1-18, 2024',
            size: '2.9 MB',
            status: 'failed'
          }
        ],
        scheduledReports: 12,
        totalReports: 247,
        lastWeekReports: 8
      }
      
      setReports(demoData)
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateReport = () => {
    setCreateReportModalOpen(true)
  }

  const handleDownloadReport = async (report: GeneratedReport) => {
    setIsSubmitting(true)
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, this would trigger the actual download
      const link = document.createElement('a')
      link.href = report.downloadUrl || '#'
      link.download = `${report.name.replace(/\s+/g, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScheduleReport = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setScheduleModalOpen(true)
  }

  const handleEditTemplate = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setTemplateModalOpen(true)
  }

  const handleShareReport = (report: GeneratedReport) => {
    setSelectedReport(report)
    setShareModalOpen(true)
  }

  const handleReportSettings = () => {
    setSettingsModalOpen(true)
  }

  const handleGenerateReport = async (templateId: string, options: { name?: string; type?: string; period?: string }) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update reports list with new generated report
      const newReport: GeneratedReport = {
        id: `rpt_${Date.now()}`,
        name: options.name || 'Custom Report',
        type: options.type || 'Custom Report',
        generatedAt: new Date().toISOString(),
        period: options.period || 'Current',
        size: '2.1 MB',
        status: 'completed',
        downloadUrl: '/reports/custom_report.pdf'
      }
      
      setReports(prev => prev ? {
        ...prev,
        recentReports: [newReport, ...prev.recentReports],
        totalReports: prev.totalReports + 1
      } : null)
      
      setCreateReportModalOpen(false)
    } catch (error) {
      console.error('Report generation failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScheduleUpdate = async (templateId: string, scheduleData: { enabled: boolean; frequency?: string }) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update template schedule
      setReports(prev => prev ? {
        ...prev,
        templates: prev.templates.map(t => 
          t.id === templateId 
            ? { ...t, isScheduled: scheduleData.enabled, frequency: scheduleData.frequency }
            : t
        )
      } : null)
      
      setScheduleModalOpen(false)
      setSelectedTemplate(null)
    } catch (error) {
      console.error('Schedule update failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredTemplates = selectedCategory === 'all' 
    ? reports?.templates || []
    : reports?.templates.filter(t => t.category === selectedCategory) || []

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return BarChart3
      case 'sales': return DollarSign
      case 'marketing': return TrendingUp
      case 'clients': return Users
      case 'properties': return Building
      default: return FileText
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-800'
      case 'sales': return 'bg-green-100 text-green-800'
      case 'marketing': return 'bg-purple-100 text-purple-800'
      case 'clients': return 'bg-orange-100 text-orange-800'
      case 'properties': return 'bg-teal-100 text-teal-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      case 'generating': return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
      case 'failed': return <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      default: return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
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

  if (!reports) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports available</h3>
            <p className="text-gray-500 text-center">
              Create your first report template to get started.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleReportSettings}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button onClick={handleCreateReport}>
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              All time generated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.scheduledReports}</div>
            <p className="text-xs text-muted-foreground">
              Active schedules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.lastWeekReports}</div>
            <p className="text-xs text-green-600">
              ↗️ 2 more than last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.templates.length}</div>
            <p className="text-xs text-muted-foreground">
              Available templates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('generated')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'generated'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Generated Reports
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'scheduled'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Scheduled
          </button>
        </nav>
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Categories</option>
              <option value="performance">Performance</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="clients">Clients</option>
              <option value="properties">Properties</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => {
              const Icon = getCategoryIcon(template.category)
              return (
                <Card key={template.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Icon className="h-6 w-6 text-gray-400" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Frequency:</span>
                      <span className="capitalize">{template.frequency}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Status:</span>
                      <Badge variant={template.isScheduled ? "default" : "secondary"}>
                        {template.isScheduled ? 'Scheduled' : 'Manual'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Last Generated:</span>
                      <span>{new Date(template.lastGenerated).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Recipients:</span>
                      <div className="mt-1 space-y-1">
                        {template.recipients.map((email) => (
                          <div key={email} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {email}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEditTemplate(template)}>
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleScheduleReport(template)}
                      >
                        {template.isScheduled ? (
                          <>
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Schedule
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Generated Reports Tab */}
      {activeTab === 'generated' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Generated Reports</CardTitle>
            <CardDescription>Download and manage your generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(report.status)}
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-gray-500">
                        {report.type} • {report.period} • {report.size}
                      </p>
                      <p className="text-xs text-gray-400">
                        Generated {new Date(report.generatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        report.status === 'completed' ? 'default' :
                        report.status === 'generating' ? 'secondary' : 'destructive'
                      }
                    >
                      {report.status}
                    </Badge>
                    {report.status === 'completed' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareReport(report)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleDownloadReport(report)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scheduled Tab */}
      {activeTab === 'scheduled' && (
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>Manage your automated report schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.templates.filter(t => t.isScheduled).map((template) => {
                const Icon = getCategoryIcon(template.category)
                return (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Icon className="h-6 w-6 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-gray-500">
                          {template.frequency} • Next: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          Recipients: {template.recipients.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleScheduleReport(template)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Report Modal */}
      {createReportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create Custom Report</h2>
                <Button variant="ghost" size="sm" onClick={() => setCreateReportModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Report Configuration</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter report name..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="performance">Performance Analysis</option>
                        <option value="sales">Sales Report</option>
                        <option value="marketing">Marketing Campaign</option>
                        <option value="financial">Financial Summary</option>
                        <option value="client">Client Analytics</option>
                        <option value="property">Property Performance</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="last_7_days">Last 7 days</option>
                        <option value="last_30_days">Last 30 days</option>
                        <option value="last_90_days">Last 90 days</option>
                        <option value="current_month">Current month</option>
                        <option value="last_month">Last month</option>
                        <option value="current_quarter">Current quarter</option>
                        <option value="last_quarter">Last quarter</option>
                        <option value="current_year">Current year</option>
                        <option value="custom">Custom range</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="format" value="pdf" defaultChecked className="mr-2" />
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-red-600" />
                            <span className="text-sm font-medium">PDF</span>
                          </div>
                        </label>
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="format" value="excel" className="mr-2" />
                          <div className="flex items-center">
                            <BarChart3 className="h-4 w-4 mr-2 text-green-600" />
                            <span className="text-sm font-medium">Excel</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Metrics Selection</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Metrics</h4>
                      <div className="space-y-2">
                        {[
                          'Page Views & Sessions',
                          'Bounce Rate & Time on Site',
                          'Conversion Rate',
                          'Goal Completions',
                          'Traffic Sources'
                        ].map((metric) => (
                          <label key={metric} className="flex items-center">
                            <input type="checkbox" defaultChecked className="rounded mr-2" />
                            <span className="text-sm">{metric}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Business Metrics</h4>
                      <div className="space-y-2">
                        {[
                          'Revenue & Sales',
                          'Lead Generation',
                          'Customer Acquisition Cost',
                          'ROI & ROAS',
                          'Pipeline Performance'
                        ].map((metric) => (
                          <label key={metric} className="flex items-center">
                            <input type="checkbox" defaultChecked className="rounded mr-2" />
                            <span className="text-sm">{metric}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Property Metrics</h4>
                      <div className="space-y-2">
                        {[
                          'Property Views & Inquiries',
                          'Market Trends',
                          'Price Analysis',
                          'Location Performance',
                          'Competition Analysis'
                        ].map((metric) => (
                          <label key={metric} className="flex items-center">
                            <input type="checkbox" className="rounded mr-2" />
                            <span className="text-sm">{metric}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Delivery Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipients (Optional)</label>
                    <textarea 
                      placeholder="Enter email addresses separated by commas..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Save as template</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Schedule recurring generation</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Include executive summary</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setCreateReportModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleGenerateReport('custom', { name: 'Custom Report', type: 'Custom Analysis', period: 'Current' })}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Schedule Report: {selectedTemplate.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setScheduleModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Current Status</h3>
                        <p className="text-sm text-gray-600">
                          {selectedTemplate.isScheduled ? 'Active' : 'Paused'}
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${selectedTemplate.isScheduled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Next Generation</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                      </div>
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select 
                    defaultValue={selectedTemplate.frequency}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select className="px-3 py-2 border border-gray-300 rounded-md">
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md">
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                      <option value="GST">GST (Dubai)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                  <div className="space-y-2">
                    {selectedTemplate.recipients.map((email, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{email}</span>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        placeholder="Add recipient..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <Button size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Delivery Options</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Send email notification</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Include charts and visualizations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Attach PDF report</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Include raw data (Excel)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleScheduleUpdate(selectedTemplate.id, { enabled: false })}
                  disabled={isSubmitting}
                >
                  {selectedTemplate.isScheduled ? 'Pause' : 'Resume'} Schedule
                </Button>
                <Button 
                  onClick={() => handleScheduleUpdate(selectedTemplate.id, { enabled: true, frequency: 'weekly' })}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Save Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {templateModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Template: {selectedTemplate.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setTemplateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Template Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                      <input 
                        type="text" 
                        defaultValue={selectedTemplate.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea 
                        defaultValue={selectedTemplate.description}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select 
                        defaultValue={selectedTemplate.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="performance">Performance</option>
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="clients">Clients</option>
                        <option value="properties">Properties</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Frequency</label>
                      <select 
                        defaultValue={selectedTemplate.frequency}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Included Metrics</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Current Metrics</h4>
                      <div className="space-y-2">
                        {selectedTemplate.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                            <span className="text-sm">{metric}</span>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Add Metrics</h4>
                      <div className="space-y-2">
                        {[
                          'Page Views',
                          'Conversion Rate', 
                          'Revenue',
                          'Lead Quality Score',
                          'Customer Satisfaction',
                          'Market Share',
                          'Response Time'
                        ].filter(m => !selectedTemplate.metrics.includes(m)).map((metric) => (
                          <label key={metric} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                            <span className="text-sm">{metric}</span>
                            <Button variant="ghost" size="sm">
                              <Plus className="h-4 w-4 text-green-500" />
                            </Button>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Template Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked={selectedTemplate.isScheduled} className="rounded mr-2" />
                      <span className="text-sm">Enable scheduling by default</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Include charts and graphs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Include executive summary</span>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Export as PDF by default</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Include raw data</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Auto-archive old reports</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setTemplateModalOpen(false)}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Share Report: {selectedReport.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setShareModalOpen(false)}>
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
                        <h3 className="font-medium text-gray-900">Email Sharing</h3>
                        <p className="text-sm text-gray-600">Send via email</p>
                      </div>
                      <Send className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="mt-3">
                      <textarea 
                        placeholder="Enter email addresses..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <Button className="w-full mt-2" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Link Sharing</h3>
                        <p className="text-sm text-gray-600">Generate shareable link</p>
                      </div>
                      <Share className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="mt-3">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={`https://hubebony.com/reports/share/${selectedReport.id}`}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                        />
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center text-sm">
                        <input type="checkbox" className="rounded mr-2" />
                        Password protect
                      </label>
                      <label className="flex items-center text-sm">
                        <input type="checkbox" defaultChecked className="rounded mr-2" />
                        Expires in 30 days
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Export Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2 text-red-600" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart3 className="h-4 w-4 mr-2 text-green-600" />
                    Download Excel
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="h-4 w-4 mr-2 text-blue-600" />
                    Download ZIP
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Sharing Permissions</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="permission" value="view" defaultChecked className="mr-2" />
                    <span className="text-sm">View only</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="permission" value="download" className="mr-2" />
                    <span className="text-sm">View and download</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="permission" value="comment" className="mr-2" />
                    <span className="text-sm">View, download, and comment</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setShareModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Report Settings</h2>
                <Button variant="ghost" size="sm" onClick={() => setSettingsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Default Settings</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Export Format</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                        <option value="both">Both PDF and Excel</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Time Zone</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time</option>
                        <option value="PST">Pacific Time</option>
                        <option value="GST">Gulf Standard Time</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Report Retention Period</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="180">6 months</option>
                        <option value="365">1 year</option>
                        <option value="unlimited">Unlimited</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Default Options</h4>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Include charts by default</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Auto-generate executive summary</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Include raw data tables</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Brand reports with company logo</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Email Configuration</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
                      <input 
                        type="email" 
                        defaultValue="reports@hubebony.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
                      <input 
                        type="text" 
                        defaultValue="CommercialDXB Reports"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Recipients</label>
                      <textarea 
                        placeholder="Enter default email addresses..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Email Options</h4>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Send delivery confirmations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Include download links in emails</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Compress large attachments</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Performance & Storage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Storage Used</p>
                          <p className="text-lg font-bold text-blue-600">342 MB</p>
                        </div>
                        <Layers className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">34% of 1GB limit</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Reports This Month</p>
                          <p className="text-lg font-bold text-green-600">23</p>
                        </div>
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">77 remaining</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Avg Generation Time</p>
                          <p className="text-lg font-bold text-orange-600">2.3s</p>
                        </div>
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">↗️ 15% faster</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setSettingsModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}