'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
  Search,
  Plus,
  Eye,
  Edit,
  Save,
  Globe,
  Layout,
  Type,
  BarChart3,
  X,
  RefreshCw,
  Download,
  Settings,
  Copy,
  Archive,
  Trash2,
  Filter,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Share2,
  Upload,
  Image,
  Video,
  Link,
  Code,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  ExternalLink,
  History,
  Target,
  Zap
} from 'lucide-react'

interface ContentItem {
  id: string
  pageKey: string
  content: string
  version: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  title?: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  slug?: string
  status?: 'draft' | 'published' | 'archived'
  author?: string
  lastModifiedBy?: string
  publishedAt?: string
  viewCount?: number
  type?: 'page' | 'post' | 'component'
}

export default function ContentPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [seoModalOpen, setSeoModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [editForm, setEditForm] = useState<Partial<ContentItem>>({})
  const [newPage, setNewPage] = useState<Partial<ContentItem>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content')
      if (response.ok) {
        const data = await response.json()
        setContentItems(data)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item.id)
    setEditContent(item.content)
  }

  const handleSave = async (itemId: string) => {
    try {
      const response = await fetch(`/api/admin/content/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: editContent })
      })

      if (response.ok) {
        await fetchContent()
        setEditingItem(null)
        setEditContent('')
      }
    } catch (error) {
      console.error('Error saving content:', error)
    }
  }

  const handleCancel = () => {
    setEditingItem(null)
    setEditContent('')
  }

  const handleAddContent = () => {
    setNewPage({
      pageKey: '',
      content: '',
      version: '1.0',
      isActive: false,
      status: 'draft',
      type: 'page',
      title: '',
      description: '',
      seoTitle: '',
      seoDescription: '',
      slug: ''
    })
    setCreateModalOpen(true)
  }

  const handlePreview = (item: ContentItem) => {
    setSelectedItem(item)
    setPreviewModalOpen(true)
  }

  const handleViewContent = (item: ContentItem) => {
    setSelectedItem(item)
    setViewModalOpen(true)
  }

  const handleEditContent = (item: ContentItem) => {
    setSelectedItem(item)
    setEditForm(item)
    setEditModalOpen(true)
  }

  const handleSEOEdit = (item: ContentItem) => {
    setSelectedItem(item)
    setEditForm(item)
    setSeoModalOpen(true)
  }

  const handleViewHistory = (item: ContentItem) => {
    setSelectedItem(item)
    setHistoryModalOpen(true)
  }

  const handleSaveContent = async () => {
    if (!selectedItem || !editForm.content) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/content/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      })

      if (response.ok) {
        await fetchContent()
        setEditModalOpen(false)
        setSelectedItem(null)
        setEditForm({})
      }
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateContentSubmit = async () => {
    if (!newPage.pageKey || !newPage.content) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newPage,
          id: String(Date.now()),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: 'Admin User'
        })
      })

      if (response.ok) {
        await fetchContent()
        setCreateModalOpen(false)
        setNewPage({})
      }
    } catch (error) {
      console.error('Error creating content:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDuplicateContent = (item: ContentItem) => {
    const duplicated = {
      ...item,
      id: String(Date.now()),
      pageKey: `${item.pageKey}-copy`,
      title: `${item.title || formatPageKey(item.pageKey)} (Copy)`,
      status: 'draft',
      isActive: false,
      version: '1.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setContentItems([duplicated, ...contentItems])
  }

  const handleDeleteContent = (itemId: string) => {
    if (confirm('Are you sure you want to delete this content item?')) {
      setContentItems(contentItems.filter(item => item.id !== itemId))
    }
  }

  const handlePublishContent = (itemId: string) => {
    const updatedItems = contentItems.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: 'published', 
            isActive: true,
            publishedAt: new Date().toISOString()
          }
        : item
    )
    setContentItems(updatedItems)
  }

  const handleExportContent = () => {
    const csvData = contentItems.map(item => ({
      PageKey: item.pageKey,
      Title: item.title || formatPageKey(item.pageKey),
      Status: item.status || (item.isActive ? 'published' : 'draft'),
      Type: item.type || 'page',
      Version: item.version,
      Author: item.author || 'Unknown',
      CreatedAt: item.createdAt,
      UpdatedAt: item.updatedAt,
      ViewCount: item.viewCount || 0
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `content-pages-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const getPageIcon = (pageKey: string) => {
    switch (pageKey) {
      case 'hero': return Layout
      case 'market-data': return BarChart3
      case 'faq': return FileText
      case 'about': return Type
      default: return Globe
    }
  }

  const formatPageKey = (pageKey: string) => {
    return pageKey.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const parseContent = (content: string) => {
    try {
      const parsed = JSON.parse(content)
      return JSON.stringify(parsed, null, 2)
    } catch {
      return content
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = 
      item.pageKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatPageKey(item.pageKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || 
      (item.status || (item.isActive ? 'published' : 'draft')) === filterStatus
    
    const matchesType = filterType === 'all' || (item.type || 'page') === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportContent}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button onClick={handleAddContent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Types</option>
          <option value="page">Pages</option>
          <option value="post">Posts</option>
          <option value="component">Components</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredContent.map((item) => {
          const PageIcon = getPageIcon(item.pageKey)
          const isEditing = editingItem === item.id

          return (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <PageIcon className="h-5 w-5" />
                      {item.title || formatPageKey(item.pageKey)}
                      <Badge className={getStatusColor(item.status || (item.isActive ? 'published' : 'draft'))}>
                        {(item.status || (item.isActive ? 'published' : 'draft')).toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        v{item.version}
                      </Badge>
                      <Badge variant="outline">
                        {item.type || 'page'}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span>
                        Key: {item.pageKey}
                      </span>
                      <span>
                        Updated: {new Date(item.updatedAt).toLocaleDateString()}
                      </span>
                      {item.author && (
                        <span>
                          Author: {item.author}
                        </span>
                      )}
                      {item.viewCount && (
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {item.viewCount} views
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewContent(item)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditContent(item)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreview(item)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    {(item.status === 'draft' || !item.isActive) && (
                      <Button 
                        size="sm"
                        onClick={() => handlePublishContent(item.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Publish
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDuplicateContent(item)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Duplicate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteContent(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content (JSON format)
                      </label>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm"
                        placeholder="Enter JSON content..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Content Preview</h4>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono overflow-x-auto max-h-40">
                          {parseContent(item.content)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {filteredContent.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm 
                  ? 'Try adjusting your search criteria.'
                  : 'Add your first content item to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Content Sections</CardTitle>
          <CardDescription>
            Manage dynamic content for your Dubai property investment platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Hero Section</h4>
              <p className="text-sm text-gray-500">Main landing page hero content</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Market Data</h4>
              <p className="text-sm text-gray-500">Dubai property market statistics</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">FAQ</h4>
              <p className="text-sm text-gray-500">Frequently asked questions</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">About</h4>
              <p className="text-sm text-gray-500">Company and expert information</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Investment Benefits</h4>
              <p className="text-sm text-gray-500">Dubai investment advantages</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Success Stories</h4>
              <p className="text-sm text-gray-500">Client testimonials and cases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Content Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create New Content</h2>
                <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Key *</label>
                  <Input
                    value={newPage.pageKey || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, pageKey: e.target.value }))}
                    placeholder="e.g., home-hero, about-us"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <Input
                    value={newPage.title || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Content title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newPage.type || 'page'}
                    onChange={(e) => setNewPage(prev => ({ ...prev, type: e.target.value as 'page' | 'post' | 'component' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="page">Page</option>
                    <option value="post">Post</option>
                    <option value="component">Component</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newPage.status || 'draft'}
                    onChange={(e) => setNewPage(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' | 'archived' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                  <Input
                    value={newPage.version || '1.0'}
                    onChange={(e) => setNewPage(prev => ({ ...prev, version: e.target.value }))}
                    placeholder="1.0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input
                  value={newPage.description || ''}
                  onChange={(e) => setNewPage(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the content"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <div className="border rounded-lg">
                  <div className="border-b p-3 bg-gray-50">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Code className="h-4 w-4 mr-2" />
                        JSON
                      </Button>
                      <Button variant="outline" size="sm">
                        <Type className="h-4 w-4 mr-2" />
                        Rich Text
                      </Button>
                      <Button variant="outline" size="sm">
                        <Layout className="h-4 w-4 mr-2" />
                        Visual Editor
                      </Button>
                    </div>
                  </div>
                  <textarea
                    value={newPage.content || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-48 p-3 border-0 rounded-b-lg font-mono text-sm resize-none"
                    placeholder="Enter JSON content or use visual editor..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                  <Input
                    value={newPage.seoTitle || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimized title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                  <Input
                    value={newPage.slug || ''}
                    onChange={(e) => setNewPage(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <textarea
                  value={newPage.seoDescription || ''}
                  onChange={(e) => setNewPage(prev => ({ ...prev, seoDescription: e.target.value }))}
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                  placeholder="SEO meta description (150-160 characters)"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">{(newPage.seoDescription || '').length}/160 characters</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateContentSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Content
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Content Modal */}
      {viewModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title || formatPageKey(selectedItem.pageKey)}</h2>
                <Button variant="ghost" size="sm" onClick={() => setViewModalOpen(false)}>
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
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge className={getStatusColor(selectedItem.status || (selectedItem.isActive ? 'published' : 'draft'))}>
                          {(selectedItem.status || (selectedItem.isActive ? 'published' : 'draft')).toUpperCase()}
                        </Badge>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Version</p>
                        <p className="text-2xl font-bold text-blue-600">v{selectedItem.version}</p>
                      </div>
                      <History className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Views</p>
                        <p className="text-2xl font-bold text-purple-600">{selectedItem.viewCount || 0}</p>
                      </div>
                      <Eye className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Page Key:</span>
                      <span className="font-medium">{selectedItem.pageKey}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedItem.type || 'page'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Author:</span>
                      <span className="font-medium">{selectedItem.author || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{new Date(selectedItem.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Updated:</span>
                      <span className="font-medium">{new Date(selectedItem.updatedAt).toLocaleDateString()}</span>
                    </div>
                    {selectedItem.publishedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Published:</span>
                        <span className="font-medium">{new Date(selectedItem.publishedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>SEO Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">SEO Title:</label>
                      <p className="text-sm text-gray-900">{selectedItem.seoTitle || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">URL Slug:</label>
                      <p className="text-sm text-gray-900">{selectedItem.slug || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Meta Description:</label>
                      <p className="text-sm text-gray-900">{selectedItem.seoDescription || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description:</label>
                      <p className="text-sm text-gray-900">{selectedItem.description || 'Not set'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Content Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                      {parseContent(selectedItem.content)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditContent(selectedItem)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Content
                </Button>
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleSEOEdit(selectedItem)}}>
                  <Target className="h-4 w-4 mr-2" />
                  Edit SEO
                </Button>
                <Button variant="outline" onClick={() => handleDuplicateContent(selectedItem)}>
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

      {/* Edit Content Modal */}
      {editModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Content - {selectedItem.title || formatPageKey(selectedItem.pageKey)}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Content title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.status || 'draft'}
                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' | 'archived' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <div className="border rounded-lg">
                  <div className="border-b p-3 bg-gray-50">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Code className="h-4 w-4 mr-2" />
                        JSON Editor
                      </Button>
                      <Button variant="outline" size="sm">
                        <Type className="h-4 w-4 mr-2" />
                        Rich Text
                      </Button>
                      <Button variant="outline" size="sm">
                        <Layout className="h-4 w-4 mr-2" />
                        Visual Editor
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  <textarea
                    value={editForm.content || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-64 p-3 border-0 rounded-b-lg font-mono text-sm resize-none"
                    placeholder="Enter content..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveContent} disabled={isSubmitting}>
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

      {/* Preview Modal */}
      {previewModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Preview - {selectedItem.title || formatPageKey(selectedItem.pageKey)}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Monitor className="h-4 w-4 mr-2" />
                    Desktop
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tablet className="h-4 w-4 mr-2" />
                    Tablet
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setPreviewModalOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="border rounded-lg bg-white" style={{ minHeight: '400px' }}>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedItem.title || formatPageKey(selectedItem.pageKey)}
                  </h1>
                  <div className="prose max-w-none">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Content Preview:</p>
                      <div className="text-gray-800">
                        {selectedItem.content ? (
                          <pre className="whitespace-pre-wrap font-sans text-sm">
                            {parseContent(selectedItem.content)}
                          </pre>
                        ) : (
                          <p className="text-gray-500 italic">No content available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setPreviewModalOpen(false)}>
                Close Preview
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
                <h2 className="text-2xl font-bold text-gray-900">Content Analytics</h2>
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
                        <p className="text-2xl font-bold text-blue-600">{contentItems.length}</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Published</p>
                        <p className="text-2xl font-bold text-green-600">
                          {contentItems.filter(item => item.status === 'published' || item.isActive).length}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Draft</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          {contentItems.filter(item => item.status === 'draft' || !item.isActive).length}
                        </p>
                      </div>
                      <Edit className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Views</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {contentItems.reduce((sum, item) => sum + (item.viewCount || 0), 0)}
                        </p>
                      </div>
                      <Eye className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content by Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['page', 'post', 'component'].map(type => {
                      const count = contentItems.filter(item => (item.type || 'page') === type).length
                      const percentage = contentItems.length > 0 ? (count / contentItems.length) * 100 : 0
                      
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium capitalize">{type}</span>
                            <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
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
                    <CardTitle>Content Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { status: 'published', color: 'green', label: 'Published' },
                      { status: 'draft', color: 'yellow', label: 'Draft' },
                      { status: 'archived', color: 'gray', label: 'Archived' }
                    ].map(({ status, color, label }) => {
                      const count = contentItems.filter(item => 
                        status === 'published' 
                          ? item.status === 'published' || item.isActive
                          : item.status === status
                      ).length
                      const percentage = contentItems.length > 0 ? (count / contentItems.length) * 100 : 0
                      
                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{label}</span>
                            <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-${color}-600 h-2 rounded-full`} 
                              style={{ width: `${percentage}%` }}
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
                  <CardTitle>Content Management Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Content Health</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {((contentItems.filter(item => item.seoTitle).length / contentItems.length) * 100).toFixed(0)}% have SEO titles</li>
                        <li>• {((contentItems.filter(item => item.seoDescription).length / contentItems.length) * 100).toFixed(0)}% have meta descriptions</li>
                        <li>• {((contentItems.filter(item => item.status === 'published' || item.isActive).length / contentItems.length) * 100).toFixed(0)}% published content</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Performance</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Average page views: {(contentItems.reduce((sum, item) => sum + (item.viewCount || 0), 0) / contentItems.length || 0).toFixed(0)}</li>
                        <li>• Most recent update: {contentItems.length > 0 ? new Date(Math.max(...contentItems.map(item => new Date(item.updatedAt).getTime()))).toLocaleDateString() : 'N/A'}</li>
                        <li>• Active content ratio: {((contentItems.filter(item => item.status === 'published' || item.isActive).length / contentItems.length) * 100 || 0).toFixed(0)}%</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Recommendations</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Publish {contentItems.filter(item => item.status === 'draft').length} draft items</li>
                        <li>• Add SEO metadata to content</li>
                        <li>• Update outdated content</li>
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
                const report = `Content Analytics Report\\n\\nTotal Pages: ${contentItems.length}\\nPublished: ${contentItems.filter(item => item.status === 'published' || item.isActive).length}\\nDraft: ${contentItems.filter(item => item.status === 'draft').length}\\nTotal Views: ${contentItems.reduce((sum, item) => sum + (item.viewCount || 0), 0)}`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `content-analytics-${new Date().toISOString().split('T')[0]}.txt`
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