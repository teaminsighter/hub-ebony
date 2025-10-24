'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Mail, 
  Search,
  Plus,
  Eye,
  Edit,
  Send,
  Users,
  Calendar,
  BarChart3,
  TrendingUp,
  Clock,
  FileText,
  X,
  Save,
  RefreshCw,
  Download,
  Settings,
  Copy,
  Archive,
  Trash2,
  Filter,
  PieChart,
  Activity,
  Globe,
  Hash,
  Image,
  Video,
  Zap,
  CheckCircle,
  AlertTriangle,
  Share2,
  MessageSquare,
  Megaphone,
  Target,
  DollarSign,
  MousePointer,
  ExternalLink,
  List,
  Layout,
  Palette,
  Type,
  Link
} from 'lucide-react'

interface EmailCampaign {
  id: string
  subject: string
  type: string
  status: string
  recipients: number
  sent: number
  delivered: number
  opened: number
  clicked: number
  unsubscribed: number
  scheduledDate: string | null
  sentDate: string | null
  template: string
  segment: string
}

export default function EmailMarketingPage() {
  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([
    {
      id: '1',
      subject: 'New Downtown Dubai Properties - Exclusive Preview',
      type: 'Property Launch',
      status: 'sent',
      recipients: 1245,
      sent: 1245,
      delivered: 1232,
      opened: 456,
      clicked: 87,
      unsubscribed: 3,
      scheduledDate: null,
      sentDate: '2024-10-20T09:00:00Z',
      template: 'Property Showcase',
      segment: 'High Net Worth'
    },
    {
      id: '2',
      subject: 'Dubai Marina Investment Guide - ROI Breakdown',
      type: 'Educational',
      status: 'scheduled',
      recipients: 892,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      scheduledDate: '2024-10-25T10:00:00Z',
      sentDate: null,
      template: 'Educational Content',
      segment: 'International Investors'
    },
    {
      id: '3',
      subject: 'Q4 Property Market Report - Dubai Insights',
      type: 'Newsletter',
      status: 'draft',
      recipients: 2847,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      scheduledDate: null,
      sentDate: null,
      template: 'Newsletter',
      segment: 'All Subscribers'
    },
    {
      id: '4',
      subject: 'Exclusive: Business Bay Premium Units Available',
      type: 'Promotional',
      status: 'sent',
      recipients: 567,
      sent: 567,
      delivered: 562,
      opened: 234,
      clicked: 45,
      unsubscribed: 2,
      scheduledDate: null,
      sentDate: '2024-10-18T14:00:00Z',
      template: 'Promotional',
      segment: 'Business Investors'
    }
  ])
  
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [segmentsModalOpen, setSegmentsModalOpen] = useState(false)
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null)
  const [editForm, setEditForm] = useState<Partial<EmailCampaign>>({})
  const [newCampaign, setNewCampaign] = useState<Partial<EmailCampaign>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOpenRate = (opened: number, delivered: number) => {
    return delivered > 0 ? ((opened / delivered) * 100).toFixed(1) : '0.0'
  }

  const getClickRate = (clicked: number, delivered: number) => {
    return delivered > 0 ? ((clicked / delivered) * 100).toFixed(1) : '0.0'
  }

  const getClickToOpenRate = (clicked: number, opened: number) => {
    return opened > 0 ? ((clicked / opened) * 100).toFixed(1) : '0.0'
  }

  const handleCreateCampaign = () => {
    setNewCampaign({
      status: 'draft',
      type: 'Newsletter',
      template: 'Newsletter',
      segment: 'All Subscribers',
      recipients: 2847
    })
    setCreateModalOpen(true)
  }

  const handleViewCampaign = (campaignId: string) => {
    const campaign = emailCampaigns.find(c => c.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setViewModalOpen(true)
    }
  }

  const handleEditCampaign = (campaignId: string) => {
    const campaign = emailCampaigns.find(c => c.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setEditForm(campaign)
      setEditModalOpen(true)
    }
  }

  const handleSendCampaign = (campaignId: string) => {
    const campaign = emailCampaigns.find(c => c.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setScheduleModalOpen(true)
    }
  }

  const handleViewTemplate = (template: string) => {
    setTemplatesModalOpen(true)
  }

  const handleManageSegments = () => {
    setSegmentsModalOpen(true)
  }

  const handleSaveCampaign = async () => {
    if (!selectedCampaign || !editForm.subject) return
    
    setIsSubmitting(true)
    try {
      const updatedCampaigns = emailCampaigns.map(campaign => 
        campaign.id === selectedCampaign.id 
          ? { ...campaign, ...editForm }
          : campaign
      )
      setEmailCampaigns(updatedCampaigns)
      setEditModalOpen(false)
      setSelectedCampaign(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving campaign:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateCampaignSubmit = async () => {
    if (!newCampaign.subject) return
    
    setIsSubmitting(true)
    try {
      const campaign: EmailCampaign = {
        id: String(Date.now()),
        subject: newCampaign.subject!,
        type: newCampaign.type || 'Newsletter',
        status: newCampaign.status || 'draft',
        recipients: newCampaign.recipients || 2847,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0,
        scheduledDate: newCampaign.scheduledDate || null,
        sentDate: null,
        template: newCampaign.template || 'Newsletter',
        segment: newCampaign.segment || 'All Subscribers'
      }
      setEmailCampaigns([campaign, ...emailCampaigns])
      setCreateModalOpen(false)
      setNewCampaign({})
    } catch (error) {
      console.error('Error creating campaign:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDuplicateCampaign = (campaignId: string) => {
    const campaign = emailCampaigns.find(c => c.id === campaignId)
    if (campaign) {
      const duplicated = {
        ...campaign,
        id: String(Date.now()),
        subject: `${campaign.subject} (Copy)`,
        status: 'draft',
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0,
        sentDate: null,
        scheduledDate: null
      }
      setEmailCampaigns([duplicated, ...emailCampaigns])
    }
  }

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm('Are you sure you want to delete this email campaign?')) {
      setEmailCampaigns(emailCampaigns.filter(c => c.id !== campaignId))
    }
  }

  const handleSendNow = async (campaignId: string) => {
    const campaign = emailCampaigns.find(c => c.id === campaignId)
    if (campaign) {
      setIsSubmitting(true)
      try {
        const updatedCampaigns = emailCampaigns.map(c => 
          c.id === campaignId 
            ? { 
                ...c, 
                status: 'sent', 
                sent: c.recipients,
                delivered: Math.floor(c.recipients * 0.95),
                sentDate: new Date().toISOString()
              }
            : c
        )
        setEmailCampaigns(updatedCampaigns)
        setScheduleModalOpen(false)
      } catch (error) {
        console.error('Error sending campaign:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleExportCampaigns = () => {
    const csvData = emailCampaigns.map(campaign => ({
      Subject: campaign.subject,
      Type: campaign.type,
      Status: campaign.status,
      Recipients: campaign.recipients,
      Sent: campaign.sent,
      Delivered: campaign.delivered,
      Opened: campaign.opened,
      Clicked: campaign.clicked,
      OpenRate: getOpenRate(campaign.opened, campaign.delivered),
      ClickRate: getClickRate(campaign.clicked, campaign.delivered),
      Template: campaign.template,
      Segment: campaign.segment,
      SentDate: campaign.sentDate || '',
      ScheduledDate: campaign.scheduledDate || ''
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `email-campaigns-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredCampaigns = emailCampaigns.filter(campaign => {
    const matchesSearch = campaign.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalStats = {
    totalSent: emailCampaigns.reduce((sum, c) => sum + c.sent, 0),
    totalDelivered: emailCampaigns.reduce((sum, c) => sum + c.delivered, 0),
    totalOpened: emailCampaigns.reduce((sum, c) => sum + c.opened, 0),
    totalClicked: emailCampaigns.reduce((sum, c) => sum + c.clicked, 0),
    totalUnsubscribed: emailCampaigns.reduce((sum, c) => sum + c.unsubscribed, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCampaigns}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" onClick={handleManageSegments}>
            <Users className="h-4 w-4 mr-2" />
            Manage Segments
          </Button>
          <Button onClick={handleCreateCampaign}>
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-blue-600">2,847</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.totalSent.toLocaleString()}</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {getOpenRate(totalStats.totalOpened, totalStats.totalDelivered)}%
                </p>
              </div>
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                <p className="text-2xl font-bold text-orange-600">
                  {getClickRate(totalStats.totalClicked, totalStats.totalDelivered)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">+18%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search email campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="sent">Sent</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Draft</option>
          <option value="sending">Sending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    {campaign.subject}
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {campaign.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {campaign.segment}
                    </span>
                    {campaign.sentDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Sent: {new Date(campaign.sentDate).toLocaleDateString()}
                      </span>
                    )}
                    {campaign.scheduledDate && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Scheduled: {new Date(campaign.scheduledDate).toLocaleDateString()}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewCampaign(campaign.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditCampaign(campaign.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {campaign.status === 'draft' && (
                    <Button 
                      size="sm"
                      onClick={() => handleSendCampaign(campaign.id)}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDuplicateCampaign(campaign.id)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Delivery</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Recipients:</span>
                      <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivered:</span>
                      <span className="font-medium">{campaign.delivered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Rate:</span>
                      <span className="font-medium">
                        {campaign.sent > 0 ? ((campaign.delivered / campaign.sent) * 100).toFixed(1) : '0.0'}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Engagement</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Opens:</span>
                      <span className="font-medium">{campaign.opened.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Open Rate:</span>
                      <span className="font-medium text-green-600">
                        {getOpenRate(campaign.opened, campaign.delivered)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clicks:</span>
                      <span className="font-medium">{campaign.clicked.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Performance</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Click Rate:</span>
                      <span className="font-medium text-blue-600">
                        {getClickRate(campaign.clicked, campaign.delivered)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Click-to-Open:</span>
                      <span className="font-medium">
                        {getClickToOpenRate(campaign.clicked, campaign.opened)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unsubscribed:</span>
                      <span className="font-medium text-red-600">{campaign.unsubscribed}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Template & Targeting</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Template:</strong> 
                      <button 
                        className="ml-1 text-blue-600 hover:underline"
                        onClick={() => handleViewTemplate(campaign.template)}
                      >
                        {campaign.template}
                      </button>
                    </p>
                    <p><strong>Segment:</strong> {campaign.segment}</p>
                    <p><strong>Type:</strong> {campaign.type}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCampaigns.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No email campaigns found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Create your first email campaign to engage with your subscribers.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Campaign Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create New Email Campaign</h2>
                <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line *</label>
                  <Input
                    value={newCampaign.subject || ''}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter compelling subject line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type *</label>
                  <select
                    value={newCampaign.type || 'Newsletter'}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Newsletter">Newsletter</option>
                    <option value="Property Launch">Property Launch</option>
                    <option value="Educational">Educational</option>
                    <option value="Promotional">Promotional</option>
                    <option value="Welcome Series">Welcome Series</option>
                    <option value="Drip Campaign">Drip Campaign</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Template *</label>
                  <select
                    value={newCampaign.template || 'Newsletter'}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, template: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Newsletter">Newsletter Template</option>
                    <option value="Property Showcase">Property Showcase</option>
                    <option value="Educational Content">Educational Content</option>
                    <option value="Promotional">Promotional Template</option>
                    <option value="Welcome Email">Welcome Email</option>
                    <option value="Market Update">Market Update</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Segment *</label>
                  <select
                    value={newCampaign.segment || 'All Subscribers'}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, segment: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="All Subscribers">All Subscribers (2,847)</option>
                    <option value="High Net Worth">High Net Worth (567)</option>
                    <option value="International Investors">International Investors (892)</option>
                    <option value="Business Investors">Business Investors (434)</option>
                    <option value="New Subscribers">New Subscribers (156)</option>
                    <option value="Engaged Users">Engaged Users (1,234)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-4 mb-3">
                    <Button variant="outline" size="sm">
                      <Layout className="h-4 w-4 mr-2" />
                      Visual Editor
                    </Button>
                    <Button variant="outline" size="sm">
                      <Type className="h-4 w-4 mr-2" />
                      HTML Editor
                    </Button>
                    <Button variant="outline" size="sm">
                      <Palette className="h-4 w-4 mr-2" />
                      Design Tools
                    </Button>
                  </div>
                  <textarea
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email content here or use the visual editor..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="schedule" value="draft" defaultChecked />
                      <span className="text-sm">Save as Draft</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="schedule" value="now" />
                      <span className="text-sm">Send Immediately</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="schedule" value="later" />
                      <span className="text-sm">Schedule for Later</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Settings</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Track Opens</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Track Clicks</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Enable A/B Testing</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaignSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Campaign Details Modal */}
      {viewModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCampaign.subject}</h2>
                <Button variant="ghost" size="sm" onClick={() => setViewModalOpen(false)}>
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
                        <p className="text-sm text-gray-600">Delivery Rate</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedCampaign.sent > 0 ? ((selectedCampaign.delivered / selectedCampaign.sent) * 100).toFixed(1) : '0.0'}%
                        </p>
                      </div>
                      <Send className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Open Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {getOpenRate(selectedCampaign.opened, selectedCampaign.delivered)}%
                        </p>
                      </div>
                      <Mail className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Click Rate</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {getClickRate(selectedCampaign.clicked, selectedCampaign.delivered)}%
                        </p>
                      </div>
                      <MousePointer className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Click-to-Open</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {getClickToOpenRate(selectedCampaign.clicked, selectedCampaign.opened)}%
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Recipients</span>
                        <span className="text-sm text-gray-600">{selectedCampaign.recipients.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Delivered</span>
                        <span className="text-sm text-gray-600">{selectedCampaign.delivered.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${selectedCampaign.sent > 0 ? (selectedCampaign.delivered / selectedCampaign.sent) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Opened</span>
                        <span className="text-sm text-gray-600">{selectedCampaign.opened.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${getOpenRate(selectedCampaign.opened, selectedCampaign.delivered)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Clicked</span>
                        <span className="text-sm text-gray-600">{selectedCampaign.clicked.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${getClickRate(selectedCampaign.clicked, selectedCampaign.delivered)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold">{selectedCampaign.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusColor(selectedCampaign.status)}>
                        {selectedCampaign.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Template:</span>
                      <span className="font-semibold">{selectedCampaign.template}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Segment:</span>
                      <span className="font-semibold">{selectedCampaign.segment}</span>
                    </div>
                    {selectedCampaign.sentDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sent Date:</span>
                        <span className="font-semibold">
                          {new Date(selectedCampaign.sentDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unsubscribes:</span>
                      <span className="font-semibold text-red-600">{selectedCampaign.unsubscribed}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Strong Performance</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Above average open rate</li>
                        <li>• High click-to-open ratio</li>
                        <li>• Low unsubscribe rate</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Engagement Trends</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Best time: 10 AM - 12 PM</li>
                        <li>• Most clicks on property links</li>
                        <li>• Mobile open rate: 68%</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Optimization Tips</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Test shorter subject lines</li>
                        <li>• Add more visual content</li>
                        <li>• Segment by location</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditCampaign(selectedCampaign.id)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Campaign
                </Button>
                <Button variant="outline" onClick={() => handleDuplicateCampaign(selectedCampaign.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
              </div>
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {editModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Campaign - {selectedCampaign.subject}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                  <Input
                    value={editForm.subject || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter subject line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.status || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="sent">Sent</option>
                    <option value="sending">Sending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                  <select
                    value={editForm.type || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Newsletter">Newsletter</option>
                    <option value="Property Launch">Property Launch</option>
                    <option value="Educational">Educational</option>
                    <option value="Promotional">Promotional</option>
                    <option value="Welcome Series">Welcome Series</option>
                    <option value="Drip Campaign">Drip Campaign</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                  <select
                    value={editForm.template || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, template: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Newsletter">Newsletter Template</option>
                    <option value="Property Showcase">Property Showcase</option>
                    <option value="Educational Content">Educational Content</option>
                    <option value="Promotional">Promotional Template</option>
                    <option value="Welcome Email">Welcome Email</option>
                    <option value="Market Update">Market Update</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Segment</label>
                  <select
                    value={editForm.segment || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, segment: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="All Subscribers">All Subscribers</option>
                    <option value="High Net Worth">High Net Worth</option>
                    <option value="International Investors">International Investors</option>
                    <option value="Business Investors">Business Investors</option>
                    <option value="New Subscribers">New Subscribers</option>
                    <option value="Engaged Users">Engaged Users</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                  <Input
                    type="number"
                    value={editForm.recipients || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, recipients: parseInt(e.target.value) }))}
                    placeholder="Number of recipients"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCampaign} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {analyticsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Email Marketing Analytics</h2>
                <Button variant="ghost" size="sm" onClick={() => setAnalyticsModalOpen(false)}>
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
                        <p className="text-sm text-gray-600">Total Campaigns</p>
                        <p className="text-2xl font-bold text-blue-600">{emailCampaigns.length}</p>
                      </div>
                      <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Open Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {getOpenRate(totalStats.totalOpened, totalStats.totalDelivered)}%
                        </p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Click Rate</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {getClickRate(totalStats.totalClicked, totalStats.totalDelivered)}%
                        </p>
                      </div>
                      <MousePointer className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Engagement Score</p>
                        <p className="text-2xl font-bold text-orange-600">85%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance by Campaign Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Newsletter', 'Property Launch', 'Educational', 'Promotional'].map(type => {
                      const typeCampaigns = emailCampaigns.filter(c => c.type === type)
                      const typeOpened = typeCampaigns.reduce((sum, c) => sum + c.opened, 0)
                      const typeDelivered = typeCampaigns.reduce((sum, c) => sum + c.delivered, 0)
                      const openRate = parseFloat(getOpenRate(typeOpened, typeDelivered))
                      
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{type}</span>
                            <span className="text-sm text-gray-600">{openRate}% open rate</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(100, openRate * 2)}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Segment Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['High Net Worth', 'International Investors', 'Business Investors', 'All Subscribers'].map(segment => {
                      const segmentCampaigns = emailCampaigns.filter(c => c.segment === segment)
                      const segmentClicked = segmentCampaigns.reduce((sum, c) => sum + c.clicked, 0)
                      const segmentDelivered = segmentCampaigns.reduce((sum, c) => sum + c.delivered, 0)
                      const clickRate = parseFloat(getClickRate(segmentClicked, segmentDelivered))
                      
                      return (
                        <div key={segment} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{segment}</span>
                            <span className="text-sm text-gray-600">{clickRate}% click rate</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(100, clickRate * 10)}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Email Marketing Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Best Practices</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Property launch emails perform best</li>
                        <li>• High net worth segment most engaged</li>
                        <li>• Personalized subject lines increase opens</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Growth Opportunities</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Increase mobile optimization</li>
                        <li>• Add video content to emails</li>
                        <li>• Implement automated drip campaigns</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Action Items</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Re-engage inactive subscribers</li>
                        <li>• A/B test email timing</li>
                        <li>• Improve educational content CTR</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAnalyticsModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                const report = `Email Marketing Analytics Report\\n\\nTotal Campaigns: ${emailCampaigns.length}\\nAvg Open Rate: ${getOpenRate(totalStats.totalOpened, totalStats.totalDelivered)}%\\nAvg Click Rate: ${getClickRate(totalStats.totalClicked, totalStats.totalDelivered)}%\\nTotal Subscribers: 2,847`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `email-analytics-${new Date().toISOString().split('T')[0]}.txt`
                link.click()
                window.URL.revokeObjectURL(url)
              }}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Segments Management Modal */}
      {segmentsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Email Segments</h2>
                <Button variant="ghost" size="sm" onClick={() => setSegmentsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Subscriber Segments</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Segment
                </Button>
              </div>

              <div className="grid gap-4">
                {[
                  { name: 'All Subscribers', count: 2847, description: 'All active subscribers', growth: '+5.2%' },
                  { name: 'High Net Worth', count: 567, description: 'Premium property investors', growth: '+12.8%' },
                  { name: 'International Investors', count: 892, description: 'Overseas property buyers', growth: '+8.1%' },
                  { name: 'Business Investors', count: 434, description: 'Commercial property investors', growth: '+6.3%' },
                  { name: 'New Subscribers', count: 156, description: 'Joined in last 30 days', growth: '+24.5%' },
                  { name: 'Engaged Users', count: 1234, description: 'Opened emails in last 90 days', growth: '+3.7%' }
                ].map((segment, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-900">{segment.name}</h4>
                          <p className="text-sm text-gray-600">{segment.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{segment.count.toLocaleString()}</p>
                          <p className="text-sm text-green-600">{segment.growth}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setSegmentsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Campaign Modal */}
      {scheduleModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Send Campaign</h2>
                <Button variant="ghost" size="sm" onClick={() => setScheduleModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">{selectedCampaign.subject}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Recipients:</span>
                    <span className="font-medium ml-2">{selectedCampaign.recipients.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Segment:</span>
                    <span className="font-medium ml-2">{selectedCampaign.segment}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Template:</span>
                    <span className="font-medium ml-2">{selectedCampaign.template}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Type:</span>
                    <span className="font-medium ml-2">{selectedCampaign.type}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="radio" name="sendOption" value="now" defaultChecked />
                  <div>
                    <div className="font-medium">Send Now</div>
                    <div className="text-sm text-gray-600">Campaign will be sent immediately</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input type="radio" name="sendOption" value="schedule" />
                  <div>
                    <div className="font-medium">Schedule for Later</div>
                    <div className="text-sm text-gray-600">Choose specific date and time</div>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 mb-1">Before Sending:</p>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• Preview email content and design</li>
                      <li>• Verify recipient segment is correct</li>
                      <li>• Check all links are working</li>
                      <li>• Ensure unsubscribe link is included</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSendNow(selectedCampaign.id)} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Campaign
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}