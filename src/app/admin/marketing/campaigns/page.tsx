'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Target, 
  Search,
  Plus,
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  Mail,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
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
  FileText,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Share2,
  MessageSquare,
  Megaphone,
  TrendingDown
} from 'lucide-react'

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  startDate: string
  endDate: string
  targetAudience: string
  channel: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Downtown Dubai Premium Launch',
      type: 'Property Launch',
      status: 'active',
      budget: 50000,
      spent: 32400,
      impressions: 245000,
      clicks: 3200,
      conversions: 45,
      startDate: '2024-10-01',
      endDate: '2024-11-15',
      targetAudience: 'High Net Worth Individuals',
      channel: 'Multi-Channel'
    },
    {
      id: '2',
      name: 'Dubai Marina Investment Guide',
      type: 'Content Marketing',
      status: 'scheduled',
      budget: 25000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      startDate: '2024-10-25',
      endDate: '2024-12-01',
      targetAudience: 'International Investors',
      channel: 'Digital'
    },
    {
      id: '3',
      name: 'Business Bay ROI Campaign',
      type: 'Performance Marketing',
      status: 'active',
      budget: 75000,
      spent: 58200,
      impressions: 180000,
      clicks: 2850,
      conversions: 67,
      startDate: '2024-09-15',
      endDate: '2024-10-30',
      targetAudience: 'Business Investors',
      channel: 'Paid Social'
    },
    {
      id: '4',
      name: 'Palm Jumeirah Luxury Showcase',
      type: 'Brand Awareness',
      status: 'completed',
      budget: 40000,
      spent: 39500,
      impressions: 320000,
      clicks: 4100,
      conversions: 89,
      startDate: '2024-08-01',
      endDate: '2024-09-30',
      targetAudience: 'Luxury Buyers',
      channel: 'Display'
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
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [editForm, setEditForm] = useState<Partial<Campaign>>({})
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00'
  }

  const getConversionRate = (conversions: number, clicks: number) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : '0.00'
  }

  const getROAS = (conversions: number, spent: number) => {
    const avgDealValue = 2500000 // Average deal value in AED
    const revenue = conversions * avgDealValue
    return spent > 0 ? (revenue / spent).toFixed(2) : '0.00'
  }

  const handleCreateCampaign = () => {
    setNewCampaign({
      status: 'draft',
      budget: 10000,
      channel: 'Digital',
      type: 'Property Launch'
    })
    setCreateModalOpen(true)
  }

  const handleViewCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setViewModalOpen(true)
    }
  }

  const handleEditCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setEditForm(campaign)
      setEditModalOpen(true)
    }
  }

  const handlePlayPauseCampaign = (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    const updatedCampaigns = campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: newStatus }
        : campaign
    )
    setCampaigns(updatedCampaigns)
  }

  const handleViewAnalytics = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    if (campaign) {
      setSelectedCampaign(campaign)
      setAnalyticsModalOpen(true)
    }
  }

  const handleSaveCampaign = async () => {
    if (!selectedCampaign || !editForm.name) return
    
    setIsSubmitting(true)
    try {
      const updatedCampaigns = campaigns.map(campaign => 
        campaign.id === selectedCampaign.id 
          ? { ...campaign, ...editForm }
          : campaign
      )
      setCampaigns(updatedCampaigns)
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
    if (!newCampaign.name || !newCampaign.budget) return
    
    setIsSubmitting(true)
    try {
      const campaign: Campaign = {
        id: String(Date.now()),
        name: newCampaign.name!,
        type: newCampaign.type || 'Property Launch',
        status: newCampaign.status || 'draft',
        budget: newCampaign.budget!,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        startDate: newCampaign.startDate || new Date().toISOString().split('T')[0],
        endDate: newCampaign.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        targetAudience: newCampaign.targetAudience || 'General Audience',
        channel: newCampaign.channel || 'Digital'
      }
      setCampaigns([campaign, ...campaigns])
      setCreateModalOpen(false)
      setNewCampaign({})
    } catch (error) {
      console.error('Error creating campaign:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDuplicateCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    if (campaign) {
      const duplicated = {
        ...campaign,
        id: String(Date.now()),
        name: `${campaign.name} (Copy)`,
        status: 'draft',
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0
      }
      setCampaigns([duplicated, ...campaigns])
    }
  }

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId))
    }
  }

  const handleExportCampaigns = () => {
    const csvData = campaigns.map(campaign => ({
      Name: campaign.name,
      Type: campaign.type,
      Status: campaign.status,
      Budget: campaign.budget,
      Spent: campaign.spent,
      Impressions: campaign.impressions,
      Clicks: campaign.clicks,
      Conversions: campaign.conversions,
      CTR: getCTR(campaign.clicks, campaign.impressions),
      ConversionRate: getConversionRate(campaign.conversions, campaign.clicks),
      ROAS: getROAS(campaign.conversions, campaign.spent),
      StartDate: campaign.startDate,
      EndDate: campaign.endDate,
      Channel: campaign.channel,
      TargetAudience: campaign.targetAudience
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `campaigns-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCampaigns}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview Analytics
          </Button>
          <Button onClick={handleCreateCampaign}>
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-green-600">
                  {campaigns.filter(c => c.status === 'active').length}
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
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-blue-600">
                  AED {campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Conversions</p>
                <p className="text-2xl font-bold text-purple-600">
                  {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg CTR</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(() => {
                    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)
                    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0)
                    return getCTR(totalClicks, totalImpressions)
                  })()}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search campaigns..."
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
          <option value="active">Active</option>
          <option value="scheduled">Scheduled</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {campaign.name}
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                    <span>{campaign.type}</span>
                    <span>{campaign.channel}</span>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePlayPauseCampaign(campaign.id, campaign.status)}
                  >
                    {campaign.status === 'active' ? 
                      <Pause className="h-4 w-4 mr-1" /> : 
                      <Play className="h-4 w-4 mr-1" />
                    }
                    {campaign.status === 'active' ? 'Pause' : 'Activate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewAnalytics(campaign.id)}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
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
                  <h4 className="font-medium text-gray-900">Budget & Spend</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-medium">AED {campaign.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spent:</span>
                      <span className="font-medium">AED {campaign.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining:</span>
                      <span className="font-medium">AED {(campaign.budget - campaign.spent).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Performance</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Impressions:</span>
                      <span className="font-medium">{campaign.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clicks:</span>
                      <span className="font-medium">{campaign.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CTR:</span>
                      <span className="font-medium">{getCTR(campaign.clicks, campaign.impressions)}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Conversions</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Conversions:</span>
                      <span className="font-medium text-green-600">{campaign.conversions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conv. Rate:</span>
                      <span className="font-medium">{getConversionRate(campaign.conversions, campaign.clicks)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROAS:</span>
                      <span className="font-medium text-green-600">{getROAS(campaign.conversions, campaign.spent)}x</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Targeting</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Audience:</strong> {campaign.targetAudience}</p>
                    <p><strong>Channel:</strong> {campaign.channel}</p>
                    <p><strong>Duration:</strong> {Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCampaigns.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Create your first marketing campaign to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Campaign Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create New Campaign</h2>
                <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
                  <Input
                    value={newCampaign.name || ''}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter campaign name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type *</label>
                  <select
                    value={newCampaign.type || 'Property Launch'}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Property Launch">Property Launch</option>
                    <option value="Content Marketing">Content Marketing</option>
                    <option value="Performance Marketing">Performance Marketing</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Retargeting">Retargeting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (AED) *</label>
                  <Input
                    type="number"
                    value={newCampaign.budget || ''}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    placeholder="Enter budget amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel *</label>
                  <select
                    value={newCampaign.channel || 'Digital'}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, channel: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Digital">Digital</option>
                    <option value="Multi-Channel">Multi-Channel</option>
                    <option value="Paid Social">Paid Social</option>
                    <option value="Display">Display</option>
                    <option value="Search">Search</option>
                    <option value="Email">Email</option>
                    <option value="Traditional">Traditional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <Input
                    type="date"
                    value={newCampaign.startDate || ''}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                  <Input
                    type="date"
                    value={newCampaign.endDate || ''}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <select
                  value={newCampaign.targetAudience || 'General Audience'}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="General Audience">General Audience</option>
                  <option value="High Net Worth Individuals">High Net Worth Individuals</option>
                  <option value="International Investors">International Investors</option>
                  <option value="Business Investors">Business Investors</option>
                  <option value="Luxury Buyers">Luxury Buyers</option>
                  <option value="First-time Buyers">First-time Buyers</option>
                  <option value="Property Developers">Property Developers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Objectives</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Website Traffic', 'Engagement', 'App Downloads'].map(objective => (
                    <label key={objective} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{objective}</span>
                    </label>
                  ))}
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
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCampaign.name}</h2>
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
                        <p className="text-sm text-gray-600">Budget Utilization</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {((selectedCampaign.spent / selectedCampaign.budget) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Click-Through Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {getCTR(selectedCampaign.clicks, selectedCampaign.impressions)}%
                        </p>
                      </div>
                      <Activity className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Conversion Rate</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {getConversionRate(selectedCampaign.conversions, selectedCampaign.clicks)}%
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">ROAS</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {getROAS(selectedCampaign.conversions, selectedCampaign.spent)}x
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <span className="text-gray-600">Channel:</span>
                      <span className="font-semibold">{selectedCampaign.channel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Audience:</span>
                      <span className="font-semibold">{selectedCampaign.targetAudience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">
                        {Math.ceil((new Date(selectedCampaign.endDate).getTime() - new Date(selectedCampaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Impressions:</span>
                      <span className="font-semibold">{selectedCampaign.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clicks:</span>
                      <span className="font-semibold">{selectedCampaign.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversions:</span>
                      <span className="font-semibold text-green-600">{selectedCampaign.conversions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-semibold">AED {selectedCampaign.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spent:</span>
                      <span className="font-semibold">AED {selectedCampaign.spent.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-semibold ml-2">{new Date(selectedCampaign.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: `${Math.min(100, ((Date.now() - new Date(selectedCampaign.startDate).getTime()) / (new Date(selectedCampaign.endDate).getTime() - new Date(selectedCampaign.startDate).getTime())) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">End Date:</span>
                      <span className="font-semibold ml-2">{new Date(selectedCampaign.endDate).toLocaleDateString()}</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Edit Campaign - {selectedCampaign.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                  <Input
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter campaign name"
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
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (AED)</label>
                  <Input
                    type="number"
                    value={editForm.budget || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    placeholder="Enter budget amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                  <select
                    value={editForm.type || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Property Launch">Property Launch</option>
                    <option value="Content Marketing">Content Marketing</option>
                    <option value="Performance Marketing">Performance Marketing</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Retargeting">Retargeting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
                  <select
                    value={editForm.channel || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, channel: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Digital">Digital</option>
                    <option value="Multi-Channel">Multi-Channel</option>
                    <option value="Paid Social">Paid Social</option>
                    <option value="Display">Display</option>
                    <option value="Search">Search</option>
                    <option value="Email">Email</option>
                    <option value="Traditional">Traditional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <select
                    value={editForm.targetAudience || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="General Audience">General Audience</option>
                    <option value="High Net Worth Individuals">High Net Worth Individuals</option>
                    <option value="International Investors">International Investors</option>
                    <option value="Business Investors">Business Investors</option>
                    <option value="Luxury Buyers">Luxury Buyers</option>
                    <option value="First-time Buyers">First-time Buyers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={editForm.startDate || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <Input
                    type="date"
                    value={editForm.endDate || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, endDate: e.target.value }))}
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
                <h2 className="text-2xl font-bold text-gray-900">Campaign Analytics Overview</h2>
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
                        <p className="text-sm text-gray-600">Total Investment</p>
                        <p className="text-2xl font-bold text-blue-600">
                          AED {campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-green-600">
                          AED {campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}
                        </p>
                      </div>
                      <TrendingDown className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Conversions</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Overall ROAS</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {(() => {
                            const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
                            const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
                            return getROAS(totalConversions, totalSpent)
                          })()}x
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Performance by Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Property Launch', 'Content Marketing', 'Performance Marketing', 'Brand Awareness'].map(type => {
                      const typeCampaigns = campaigns.filter(c => c.type === type)
                      const typeConversions = typeCampaigns.reduce((sum, c) => sum + c.conversions, 0)
                      const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
                      const percentage = totalConversions > 0 ? (typeConversions / totalConversions) * 100 : 0
                      
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{type}</span>
                            <span className="text-sm text-gray-600">{typeConversions} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Channel Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Multi-Channel', 'Digital', 'Paid Social', 'Display'].map(channel => {
                      const channelCampaigns = campaigns.filter(c => c.channel === channel)
                      const channelROAS = channelCampaigns.length > 0 ? 
                        (channelCampaigns.reduce((sum, c) => sum + parseFloat(getROAS(c.conversions, c.spent)), 0) / channelCampaigns.length).toFixed(2) : 
                        '0.00'
                      
                      return (
                        <div key={channel} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{channel}</span>
                            <span className="text-sm text-gray-600">{channelROAS}x ROAS</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(100, parseFloat(channelROAS) * 20)}%` }}
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
                  <CardTitle>Key Insights & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Top Performers</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Performance Marketing shows highest ROAS</li>
                        <li>• Multi-channel campaigns drive more conversions</li>
                        <li>• Business Bay campaigns outperforming</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Optimization Areas</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Improve CTR in display campaigns</li>
                        <li>• Optimize targeting for content marketing</li>
                        <li>• Review budget allocation across channels</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Growth Opportunities</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Scale successful property launch campaigns</li>
                        <li>• Expand to new audience segments</li>
                        <li>• Test video content in campaigns</li>
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
                const report = `Campaign Analytics Report\\n\\nTotal Investment: AED ${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}\\nTotal Spent: AED ${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}\\nTotal Conversions: ${campaigns.reduce((sum, c) => sum + c.conversions, 0)}\\nOverall ROAS: ${getROAS(campaigns.reduce((sum, c) => sum + c.conversions, 0), campaigns.reduce((sum, c) => sum + c.spent, 0))}x`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `campaign-analytics-${new Date().toISOString().split('T')[0]}.txt`
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
    </div>
  )
}