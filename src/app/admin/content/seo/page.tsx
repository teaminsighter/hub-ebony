'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search as SearchIcon, 
  Search,
  Plus,
  Eye,
  Edit,
  Save,
  Globe,
  TrendingUp,
  Target,
  BarChart3,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  FileText,
  Calendar,
  Users,
  X,
  RefreshCw,
  Download,
  Settings,
  Zap,
  Hash,
  Link,
  Image,
  Share2,
  Activity,
  Layers,
  Monitor,
  Smartphone,
  Clock,
  ArrowUp,
  ArrowDown,
  Filter,
  Copy,
  Trash2,
  PlayCircle,
  PauseCircle,
  Info,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Gauge
} from 'lucide-react'

interface SEOPage {
  id: string
  url: string
  title: string
  metaDescription: string
  keywords: string[]
  canonicalUrl: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  lastUpdated: string
  status: string
  seoScore: number
  issues: string[]
  analytics: {
    impressions: number
    clicks: number
    ctr: number
    avgPosition: number
  }
}

export default function SEOPage() {
  const [seoPages, setSeoPages] = useState<SEOPage[]>([
    {
      id: '1',
      url: '/properties/downtown-dubai',
      title: 'Downtown Dubai Properties for Sale | Premium Investment Opportunities',
      metaDescription: 'Discover luxury properties in Downtown Dubai. Premium apartments and penthouses with Burj Khalifa views. Expert investment guidance and exclusive deals.',
      keywords: ['downtown dubai properties', 'burj khalifa view', 'luxury apartments', 'dubai investment', 'premium real estate'],
      canonicalUrl: 'https://hubebony.com/properties/downtown-dubai',
      ogTitle: 'Downtown Dubai Luxury Properties | Hub Ebony',
      ogDescription: 'Premium Downtown Dubai properties with stunning skyline views. Professional investment consultation and exclusive property access.',
      ogImage: 'https://hubebony.com/images/downtown-dubai-og.jpg',
      twitterTitle: 'Downtown Dubai Premium Properties',
      twitterDescription: 'Luxury apartments in Downtown Dubai with Burj Khalifa views.',
      twitterImage: 'https://hubebony.com/images/downtown-dubai-twitter.jpg',
      lastUpdated: '2024-10-20T10:00:00Z',
      status: 'optimized',
      seoScore: 92,
      issues: [],
      analytics: {
        impressions: 15420,
        clicks: 892,
        ctr: 5.78,
        avgPosition: 3.2
      }
    },
    {
      id: '2',
      url: '/investment-guide',
      title: 'Dubai Property Investment Guide 2024',
      metaDescription: 'Complete guide to investing in Dubai real estate. Market insights, ROI analysis, legal requirements, and expert tips for property investors.',
      keywords: ['dubai property investment', 'real estate guide', 'property roi', 'dubai market analysis', 'investment tips'],
      canonicalUrl: 'https://hubebony.com/investment-guide',
      ogTitle: 'Dubai Property Investment Guide 2024 | Hub Ebony',
      ogDescription: 'Comprehensive Dubai property investment guide with market analysis, ROI calculations, and expert recommendations.',
      ogImage: 'https://hubebony.com/images/investment-guide-og.jpg',
      twitterTitle: 'Dubai Property Investment Guide 2024',
      twitterDescription: 'Everything you need to know about investing in Dubai real estate.',
      twitterImage: 'https://hubebony.com/images/investment-guide-twitter.jpg',
      lastUpdated: '2024-10-18T14:30:00Z',
      status: 'needs-review',
      seoScore: 78,
      issues: ['meta description too short', 'missing h1 tag'],
      analytics: {
        impressions: 8930,
        clicks: 445,
        ctr: 4.98,
        avgPosition: 5.7
      }
    },
    {
      id: '3',
      url: '/properties/palm-jumeirah',
      title: 'Palm Jumeirah Villas and Apartments for Sale',
      metaDescription: 'Exclusive Palm Jumeirah properties including luxury villas and waterfront apartments. Premium beachfront living with world-class amenities.',
      keywords: ['palm jumeirah properties', 'luxury villas', 'waterfront apartments', 'beachfront living', 'dubai luxury real estate'],
      canonicalUrl: 'https://hubebony.com/properties/palm-jumeirah',
      ogTitle: 'Palm Jumeirah Luxury Properties | Hub Ebony',
      ogDescription: 'Luxury Palm Jumeirah villas and apartments with private beach access and stunning water views.',
      ogImage: 'https://hubebony.com/images/palm-jumeirah-og.jpg',
      twitterTitle: 'Palm Jumeirah Luxury Properties',
      twitterDescription: 'Exclusive beachfront properties on Palm Jumeirah with private beach access.',
      twitterImage: 'https://hubebony.com/images/palm-jumeirah-twitter.jpg',
      lastUpdated: '2024-10-15T09:45:00Z',
      status: 'warning',
      seoScore: 65,
      issues: ['duplicate meta description', 'missing alt tags', 'slow page speed'],
      analytics: {
        impressions: 12350,
        clicks: 567,
        ctr: 4.59,
        avgPosition: 7.1
      }
    }
  ])
  
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [editingPage, setEditingPage] = useState<string | null>(null)
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [auditModalOpen, setAuditModalOpen] = useState(false)
  const [keywordModalOpen, setKeywordModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null)
  const [editForm, setEditForm] = useState<Partial<SEOPage>>({})
  const [newPage, setNewPage] = useState<Partial<SEOPage>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized': return 'bg-green-100 text-green-800'
      case 'needs-review': return 'bg-yellow-100 text-yellow-800'
      case 'warning': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized': return CheckCircle
      case 'needs-review': return AlertCircle
      case 'warning': return AlertCircle
      default: return AlertCircle
    }
  }

  const handleCreateSEOPage = () => {
    setNewPage({
      status: 'draft',
      seoScore: 0,
      issues: [],
      keywords: [],
      analytics: {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        avgPosition: 0
      }
    })
    setCreateModalOpen(true)
  }

  const handleEditSEOPage = (pageId: string) => {
    const page = seoPages.find(p => p.id === pageId)
    if (page) {
      setSelectedPage(page)
      setEditForm(page)
      setEditModalOpen(true)
    }
  }

  const handleViewSEOPage = (pageId: string) => {
    const page = seoPages.find(p => p.id === pageId)
    if (page) {
      setSelectedPage(page)
      setViewModalOpen(true)
    }
  }

  const handleAnalyzePage = (pageId: string) => {
    const page = seoPages.find(p => p.id === pageId)
    if (page) {
      setSelectedPage(page)
      setAuditModalOpen(true)
    }
  }

  const handleViewInSearch = (url: string) => {
    window.open(`https://www.google.com/search?q=site:${url}`, '_blank')
  }

  const handleSEOAudit = () => {
    setAuditModalOpen(true)
  }

  const handleKeywordResearch = () => {
    setKeywordModalOpen(true)
  }

  const handleSavePage = async () => {
    if (!selectedPage || !editForm.title) return
    
    setIsSubmitting(true)
    try {
      const updatedPages = seoPages.map(page => 
        page.id === selectedPage.id 
          ? { ...page, ...editForm, lastUpdated: new Date().toISOString() }
          : page
      )
      setSeoPages(updatedPages)
      setEditModalOpen(false)
      setSelectedPage(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving SEO page:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreatePageSubmit = async () => {
    if (!newPage.url || !newPage.title) return
    
    setIsSubmitting(true)
    try {
      const page: SEOPage = {
        id: String(Date.now()),
        url: newPage.url!,
        title: newPage.title!,
        metaDescription: newPage.metaDescription || '',
        keywords: newPage.keywords || [],
        canonicalUrl: newPage.canonicalUrl || '',
        ogTitle: newPage.ogTitle || newPage.title!,
        ogDescription: newPage.ogDescription || newPage.metaDescription || '',
        ogImage: newPage.ogImage || '',
        twitterTitle: newPage.twitterTitle || newPage.title!,
        twitterDescription: newPage.twitterDescription || newPage.metaDescription || '',
        twitterImage: newPage.twitterImage || '',
        lastUpdated: new Date().toISOString(),
        status: newPage.status || 'draft',
        seoScore: 0,
        issues: [],
        analytics: {
          impressions: 0,
          clicks: 0,
          ctr: 0,
          avgPosition: 0
        }
      }
      setSeoPages([page, ...seoPages])
      setCreateModalOpen(false)
      setNewPage({})
    } catch (error) {
      console.error('Error creating SEO page:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePage = (pageId: string) => {
    if (confirm('Are you sure you want to delete this SEO page configuration?')) {
      setSeoPages(seoPages.filter(p => p.id !== pageId))
    }
  }

  const handleExportSEOData = () => {
    const csvData = seoPages.map(page => ({
      URL: page.url,
      Title: page.title,
      MetaDescription: page.metaDescription,
      Keywords: page.keywords.join('; '),
      Status: page.status,
      SEOScore: page.seoScore,
      Impressions: page.analytics.impressions,
      Clicks: page.analytics.clicks,
      CTR: page.analytics.ctr,
      AvgPosition: page.analytics.avgPosition,
      Issues: page.issues.join('; '),
      LastUpdated: new Date(page.lastUpdated).toLocaleDateString()
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `seo-data-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredPages = seoPages.filter(page => {
    const matchesSearch = page.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || page.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalStats = {
    totalPages: seoPages.length,
    avgScore: Math.round(seoPages.reduce((sum, page) => sum + page.seoScore, 0) / seoPages.length),
    totalImpressions: seoPages.reduce((sum, page) => sum + page.analytics.impressions, 0),
    totalClicks: seoPages.reduce((sum, page) => sum + page.analytics.clicks, 0),
    avgCTR: (seoPages.reduce((sum, page) => sum + page.analytics.ctr, 0) / seoPages.length).toFixed(2),
    optimizedPages: seoPages.filter(page => page.status === 'optimized').length,
    issuesCount: seoPages.reduce((sum, page) => sum + page.issues.length, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">SEO Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportSEOData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" onClick={handleKeywordResearch}>
            <Target className="h-4 w-4 mr-2" />
            Keywords
          </Button>
          <Button variant="outline" onClick={handleSEOAudit}>
            <Gauge className="h-4 w-4 mr-2" />
            SEO Audit
          </Button>
          <Button onClick={handleCreateSEOPage}>
            <Plus className="h-4 w-4 mr-2" />
            Add SEO Page
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.totalPages}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg SEO Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(totalStats.avgScore)}`}>
                  {totalStats.avgScore}/100
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
                <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.totalImpressions.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg CTR</p>
                <p className="text-2xl font-bold text-orange-600">{totalStats.avgCTR}%</p>
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
            placeholder="Search pages..."
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
          <option value="optimized">Optimized</option>
          <option value="needs-review">Needs Review</option>
          <option value="warning">Warning</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredPages.map((page) => {
          const StatusIcon = getStatusIcon(page.status)
          
          return (
            <Card key={page.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      {page.title}
                      <Badge className={getStatusColor(page.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {page.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span className={`text-sm font-medium ${getScoreColor(page.seoScore)}`}>
                        Score: {page.seoScore}/100
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <button 
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleViewInSearch(page.url)}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {page.url}
                      </button>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Updated: {new Date(page.lastUpdated).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewSEOPage(page.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditSEOPage(page.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAnalyzePage(page.id)}
                    >
                      <SearchIcon className="h-4 w-4 mr-1" />
                      Analyze
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Meta Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <strong>Title:</strong>
                        <p className="text-xs mt-1 bg-gray-100 p-2 rounded">{page.title}</p>
                      </div>
                      <div>
                        <strong>Description:</strong>
                        <p className="text-xs mt-1 bg-gray-100 p-2 rounded">{page.metaDescription}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Keywords</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-1">
                        {page.keywords.slice(0, 3).map(keyword => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {page.keywords.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{page.keywords.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Search Performance</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Impressions:</span>
                        <span className="font-medium">{page.analytics.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clicks:</span>
                        <span className="font-medium">{page.analytics.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CTR:</span>
                        <span className="font-medium">{page.analytics.ctr.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Position:</span>
                        <span className="font-medium">{page.analytics.avgPosition.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Issues & Status</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {page.issues.length > 0 ? (
                        <div className="space-y-1">
                          {page.issues.slice(0, 3).map((issue, index) => (
                            <div key={index} className="flex items-center gap-1 text-red-600">
                              <AlertCircle className="h-3 w-3" />
                              <span className="text-xs">{issue}</span>
                            </div>
                          ))}
                          {page.issues.length > 3 && (
                            <p className="text-xs text-gray-500">+{page.issues.length - 3} more issues</p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          <span className="text-xs">No issues found</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Social Media Meta Tags</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Open Graph:</strong>
                      <div className="bg-gray-50 p-2 rounded mt-1">
                        <p className="text-xs"><strong>Title:</strong> {page.ogTitle}</p>
                        <p className="text-xs"><strong>Description:</strong> {page.ogDescription}</p>
                        <p className="text-xs"><strong>Image:</strong> {page.ogImage}</p>
                      </div>
                    </div>
                    <div>
                      <strong>Twitter Cards:</strong>
                      <div className="bg-gray-50 p-2 rounded mt-1">
                        <p className="text-xs"><strong>Title:</strong> {page.twitterTitle}</p>
                        <p className="text-xs"><strong>Description:</strong> {page.twitterDescription}</p>
                        <p className="text-xs"><strong>Image:</strong> {page.twitterImage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredPages.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <SearchIcon className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No SEO pages found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Add your first SEO page configuration to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create SEO Page Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Add SEO Page Configuration</h2>
                <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page URL *</label>
                  <Input
                    value={newPage.url || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="/properties/downtown-dubai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Title *</label>
                  <Input
                    value={newPage.title || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Downtown Dubai Properties for Sale"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={newPage.metaDescription || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="Discover luxury properties in Downtown Dubai..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">{(newPage.metaDescription || '').length}/160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                  <Input
                    value={newPage.canonicalUrl || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                    placeholder="https://hubebony.com/properties/downtown-dubai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newPage.status || 'draft'}
                    onChange={(e) => setNewPage(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="needs-review">Needs Review</option>
                    <option value="optimized">Optimized</option>
                    <option value="warning">Warning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <Input
                  value={(newPage.keywords || []).join(', ')}
                  onChange={(e) => setNewPage(prev => ({ 
                    ...prev, 
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
                  }))}
                  placeholder="downtown dubai properties, luxury apartments, dubai investment"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Open Graph Tags</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
                    <Input
                      value={newPage.ogTitle || ''}
                      onChange={(e) => setNewPage(prev => ({ ...prev, ogTitle: e.target.value }))}
                      placeholder="Downtown Dubai Luxury Properties | Hub Ebony"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                    <textarea
                      value={newPage.ogDescription || ''}
                      onChange={(e) => setNewPage(prev => ({ ...prev, ogDescription: e.target.value }))}
                      placeholder="Premium Downtown Dubai properties..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md h-16"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                    <Input
                      value={newPage.ogImage || ''}
                      onChange={(e) => setNewPage(prev => ({ ...prev, ogImage: e.target.value }))}
                      placeholder="https://hubebony.com/images/og-image.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Twitter Cards</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Title</label>
                    <Input
                      value={newPage.twitterTitle || ''}
                      onChange={(e) => setNewPage(prev => ({ ...prev, twitterTitle: e.target.value }))}
                      placeholder="Downtown Dubai Premium Properties"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Description</label>
                    <textarea
                      value={newPage.twitterDescription || ''}
                      onChange={(e) => setNewPage(prev => ({ ...prev, twitterDescription: e.target.value }))}
                      placeholder="Luxury apartments in Downtown Dubai..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md h-16"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Image URL</label>
                    <Input
                      value={newPage.twitterImage || ''}
                      onChange={(e) => setNewPage(prev => ({ ...prev, twitterImage: e.target.value }))}
                      placeholder="https://hubebony.com/images/twitter-image.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePageSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create SEO Page
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View SEO Page Modal */}
      {viewModalOpen && selectedPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">SEO Details: {selectedPage.title}</h2>
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
                        <p className="text-sm text-gray-600">SEO Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(selectedPage.seoScore)}`}>
                          {selectedPage.seoScore}/100
                        </p>
                      </div>
                      <Gauge className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Impressions</p>
                        <p className="text-2xl font-bold text-purple-600">{selectedPage.analytics.impressions.toLocaleString()}</p>
                      </div>
                      <Eye className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Clicks</p>
                        <p className="text-2xl font-bold text-green-600">{selectedPage.analytics.clicks.toLocaleString()}</p>
                      </div>
                      <Activity className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Position</p>
                        <p className="text-2xl font-bold text-orange-600">{selectedPage.analytics.avgPosition.toFixed(1)}</p>
                      </div>
                      <Target className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic SEO Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-gray-600 font-medium">URL:</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded font-mono">{selectedPage.url}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Title ({selectedPage.title.length} chars):</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded">{selectedPage.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Meta Description ({selectedPage.metaDescription.length} chars):</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded">{selectedPage.metaDescription}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Canonical URL:</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded font-mono">{selectedPage.canonicalUrl}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Keywords & Issues</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Target Keywords</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedPage.keywords.map(keyword => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">SEO Issues</h4>
                      {selectedPage.issues.length > 0 ? (
                        <div className="space-y-1">
                          {selectedPage.issues.map((issue, index) => (
                            <div key={index} className="flex items-center gap-2 text-red-600 text-sm">
                              <AlertCircle className="h-4 w-4" />
                              <span>{issue}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          <span>No issues found</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Open Graph Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-gray-600 font-medium">OG Title:</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded">{selectedPage.ogTitle}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">OG Description:</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded">{selectedPage.ogDescription}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">OG Image:</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded font-mono">{selectedPage.ogImage}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Twitter Cards</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-gray-600 font-medium">Twitter Title:</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded">{selectedPage.twitterTitle}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Twitter Description:</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded">{selectedPage.twitterDescription}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Twitter Image:</span>
                      <p className="text-sm mt-1 bg-gray-100 p-2 rounded font-mono">{selectedPage.twitterImage}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditSEOPage(selectedPage.id)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit SEO
                </Button>
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleAnalyzePage(selectedPage.id)}}>
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Run Analysis
                </Button>
                <Button variant="outline" onClick={() => handleViewInSearch(selectedPage.url)}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View in Search
                </Button>
              </div>
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit SEO Page Modal */}
      {editModalOpen && selectedPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit SEO: {selectedPage.title}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                  <Input
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Page title"
                  />
                  <p className="text-xs text-gray-500 mt-1">{(editForm.title || '').length} characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.status || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="needs-review">Needs Review</option>
                    <option value="optimized">Optimized</option>
                    <option value="warning">Warning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  value={editForm.metaDescription || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">{(editForm.metaDescription || '').length}/160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <Input
                  value={(editForm.keywords || []).join(', ')}
                  onChange={(e) => setEditForm(prev => ({ 
                    ...prev, 
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
                  }))}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                <Input
                  value={editForm.canonicalUrl || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  placeholder="https://example.com/page"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
                  <Input
                    value={editForm.ogTitle || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, ogTitle: e.target.value }))}
                    placeholder="Open Graph title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Title</label>
                  <Input
                    value={editForm.twitterTitle || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, twitterTitle: e.target.value }))}
                    placeholder="Twitter card title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                  <textarea
                    value={editForm.ogDescription || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, ogDescription: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-16"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Description</label>
                  <textarea
                    value={editForm.twitterDescription || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, twitterDescription: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-16"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                  <Input
                    value={editForm.ogImage || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, ogImage: e.target.value }))}
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Image URL</label>
                  <Input
                    value={editForm.twitterImage || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, twitterImage: e.target.value }))}
                    placeholder="https://example.com/twitter-image.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePage} disabled={isSubmitting}>
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

      {/* SEO Audit Modal */}
      {auditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedPage ? `SEO Audit: ${selectedPage.title}` : 'Full SEO Audit'}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setAuditModalOpen(false)}>
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
                        <p className="text-sm text-gray-600">Technical SEO</p>
                        <p className="text-2xl font-bold text-green-600">85/100</p>
                      </div>
                      <Settings className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Content Quality</p>
                        <p className="text-2xl font-bold text-yellow-600">72/100</p>
                      </div>
                      <FileText className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Performance</p>
                        <p className="text-2xl font-bold text-red-600">58/100</p>
                      </div>
                      <Zap className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Passed Checks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Title tag present and optimized',
                      'Meta description within ideal length',
                      'H1 tag present and unique',
                      'Images have alt attributes',
                      'Canonical URL properly set',
                      'Open Graph tags configured',
                      'Twitter Cards implemented'
                    ].map((check, index) => (
                      <div key={index} className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>{check}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      Issues Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Page load speed could be improved',
                      'Missing schema markup',
                      'Some images lack descriptive alt text',
                      'Internal linking could be enhanced',
                      'Meta keywords tag is deprecated'
                    ].map((issue, index) => (
                      <div key={index} className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">High Priority</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Optimize page loading speed</li>
                        <li>• Add structured data markup</li>
                        <li>• Improve mobile responsiveness</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Medium Priority</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Enhance internal linking</li>
                        <li>• Update image alt attributes</li>
                        <li>• Optimize content length</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Low Priority</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Remove deprecated meta tags</li>
                        <li>• Add FAQ schema markup</li>
                        <li>• Optimize URL structure</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAuditModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                const report = `SEO Audit Report\\n\\nTechnical SEO: 85/100\\nContent Quality: 72/100\\nPerformance: 58/100\\n\\nRecommendations:\\n- Optimize page loading speed\\n- Add structured data markup\\n- Improve mobile responsiveness`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `seo-audit-${new Date().toISOString().split('T')[0]}.txt`
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

      {/* Keyword Research Modal */}
      {keywordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Keyword Research</h2>
                <Button variant="ghost" size="sm" onClick={() => setKeywordModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter seed keyword (e.g., 'dubai properties')"
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Research
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Keywords</p>
                        <p className="text-2xl font-bold text-blue-600">2,847</p>
                      </div>
                      <Hash className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">High Volume</p>
                        <p className="text-2xl font-bold text-green-600">342</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Low Competition</p>
                        <p className="text-2xl font-bold text-purple-600">1,205</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Opportunities</p>
                        <p className="text-2xl font-bold text-orange-600">89</p>
                      </div>
                      <Lightbulb className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Keyword Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { keyword: 'luxury apartments dubai', volume: '18.1K', difficulty: 'Medium', cpc: '$2.45' },
                      { keyword: 'dubai property investment', volume: '12.4K', difficulty: 'Low', cpc: '$3.21' },
                      { keyword: 'downtown dubai properties', volume: '8.9K', difficulty: 'High', cpc: '$4.15' },
                      { keyword: 'dubai real estate guide', volume: '6.7K', difficulty: 'Low', cpc: '$1.89' },
                      { keyword: 'palm jumeirah villas', volume: '5.2K', difficulty: 'Medium', cpc: '$5.67' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.keyword}</p>
                          <p className="text-sm text-gray-600">{item.volume} searches/month</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={item.difficulty === 'Low' ? 'default' : item.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                            className="mb-1"
                          >
                            {item.difficulty}
                          </Badge>
                          <p className="text-sm text-gray-600">{item.cpc} CPC</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trending Keywords</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { keyword: 'sustainable properties dubai', trend: '+156%', volume: '2.1K' },
                      { keyword: 'smart homes dubai', trend: '+89%', volume: '3.4K' },
                      { keyword: 'off plan properties dubai', trend: '+67%', volume: '7.8K' },
                      { keyword: 'dubai waterfront apartments', trend: '+45%', volume: '4.2K' },
                      { keyword: 'investment visa dubai property', trend: '+34%', volume: '1.9K' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.keyword}</p>
                          <p className="text-sm text-gray-600">{item.volume} searches/month</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <ArrowUp className="h-4 w-4" />
                            <span className="font-medium">{item.trend}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setKeywordModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SEO Analytics Modal */}
      {analyticsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">SEO Analytics Overview</h2>
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
                        <p className="text-sm text-gray-600">Total Pages</p>
                        <p className="text-2xl font-bold text-blue-600">{totalStats.totalPages}</p>
                      </div>
                      <Globe className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg SEO Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(totalStats.avgScore)}`}>
                          {totalStats.avgScore}/100
                        </p>
                      </div>
                      <Gauge className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Issues</p>
                        <p className="text-2xl font-bold text-red-600">{totalStats.issuesCount}</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Optimized Pages</p>
                        <p className="text-2xl font-bold text-green-600">{totalStats.optimizedPages}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Score Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { range: '90-100', count: seoPages.filter(p => p.seoScore >= 90).length, color: 'bg-green-600' },
                      { range: '70-89', count: seoPages.filter(p => p.seoScore >= 70 && p.seoScore < 90).length, color: 'bg-yellow-600' },
                      { range: '50-69', count: seoPages.filter(p => p.seoScore >= 50 && p.seoScore < 70).length, color: 'bg-orange-600' },
                      { range: '0-49', count: seoPages.filter(p => p.seoScore < 50).length, color: 'bg-red-600' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.range} Score</span>
                          <span className="text-sm text-gray-600">{item.count} pages</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${(item.count / seoPages.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Pages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {seoPages
                      .sort((a, b) => b.analytics.clicks - a.analytics.clicks)
                      .slice(0, 5)
                      .map(page => (
                        <div key={page.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{page.title}</p>
                            <p className="text-xs text-gray-600">{page.url}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{page.analytics.clicks} clicks</p>
                            <p className="text-xs text-gray-600">{page.analytics.ctr.toFixed(2)}% CTR</p>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAnalyticsModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                const report = `SEO Analytics Report\\n\\nTotal Pages: ${totalStats.totalPages}\\nAverage SEO Score: ${totalStats.avgScore}/100\\nTotal Issues: ${totalStats.issuesCount}\\nOptimized Pages: ${totalStats.optimizedPages}`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `seo-analytics-${new Date().toISOString().split('T')[0]}.txt`
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