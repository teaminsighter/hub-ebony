'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Layout, 
  Search,
  Plus,
  Eye,
  Edit,
  Copy,
  Trash2,
  Save,
  FileText,
  Mail,
  Globe,
  Smartphone,
  Monitor,
  Settings,
  Calendar,
  User,
  X,
  RefreshCw,
  Download,
  BarChart3,
  Code,
  Palette,
  Database,
  PlayCircle,
  StopCircle,
  Zap,
  Image,
  Type,
  AlignLeft,
  MousePointer,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Hash,
  Layers,
  PaintBucket,
  Wrench
} from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  type: string
  category: string
  content: string
  thumbnail: string
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  usageCount: number
  devices: string[]
  variables: string[]
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Property Landing Page Hero',
      description: 'Hero section template for property landing pages with dynamic content areas',
      type: 'page',
      category: 'landing-pages',
      content: '{"title": "{{property.name}}", "subtitle": "{{property.description}}", "cta": "Book Consultation", "background": "{{property.hero_image}}"}',
      thumbnail: '/templates/hero-template.jpg',
      isActive: true,
      createdBy: 'Design Team',
      createdAt: '2024-10-15T10:00:00Z',
      updatedAt: '2024-10-20T14:30:00Z',
      usageCount: 25,
      devices: ['desktop', 'tablet', 'mobile'],
      variables: ['property.name', 'property.description', 'property.hero_image']
    },
    {
      id: '2',
      name: 'Investment Email Newsletter',
      description: 'Weekly newsletter template for Dubai property investment updates',
      type: 'email',
      category: 'newsletters',
      content: '{"subject": "Dubai Property Weekly - {{week_date}}", "header": "Market Updates", "sections": ["featured_properties", "market_insights", "expert_tips"]}',
      thumbnail: '/templates/newsletter-template.jpg',
      isActive: true,
      createdBy: 'Marketing Team',
      createdAt: '2024-10-10T09:15:00Z',
      updatedAt: '2024-10-18T16:45:00Z',
      usageCount: 18,
      devices: ['desktop', 'mobile'],
      variables: ['week_date', 'featured_properties', 'market_insights']
    },
    {
      id: '3',
      name: 'Property Details Page',
      description: 'Comprehensive property details template with gallery, specs, and investment metrics',
      type: 'page',
      category: 'property-pages',
      content: '{"layout": "grid", "sections": ["gallery", "specifications", "investment_metrics", "location_map", "similar_properties"]}',
      thumbnail: '/templates/property-details-template.jpg',
      isActive: true,
      createdBy: 'Development Team',
      createdAt: '2024-10-08T11:20:00Z',
      updatedAt: '2024-10-19T10:15:00Z',
      usageCount: 42,
      devices: ['desktop', 'tablet', 'mobile'],
      variables: ['property.gallery', 'property.specs', 'property.metrics']
    },
    {
      id: '4',
      name: 'Consultation Booking Popup',
      description: 'Modal template for consultation booking with calendar integration',
      type: 'component',
      category: 'popups',
      content: '{"trigger": "exit_intent", "content": {"title": "Schedule Your Free Consultation", "form_fields": ["name", "email", "phone", "preferred_time"]}}',
      thumbnail: '/templates/booking-popup-template.jpg',
      isActive: false,
      createdBy: 'UX Team',
      createdAt: '2024-10-05T13:45:00Z',
      updatedAt: '2024-10-12T09:30:00Z',
      usageCount: 7,
      devices: ['desktop', 'tablet'],
      variables: ['user.name', 'available_slots']
    }
  ])
  
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [variablesModalOpen, setVariablesModalOpen] = useState(false)
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [editForm, setEditForm] = useState<Partial<Template>>({})
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({})
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return Globe
      case 'email': return Mail
      case 'component': return Layout
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page': return 'bg-blue-100 text-blue-800'
      case 'email': return 'bg-green-100 text-green-800'
      case 'component': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return Monitor
      case 'tablet': return Layout
      case 'mobile': return Smartphone
      default: return Monitor
    }
  }

  const handleCreateTemplate = () => {
    setNewTemplate({
      type: 'page',
      category: 'landing-pages',
      isActive: true,
      devices: ['desktop', 'tablet', 'mobile'],
      variables: []
    })
    setCreateModalOpen(true)
  }

  const handleViewTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
      setViewModalOpen(true)
    }
  }

  const handleEditTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
      setEditForm(template)
      setEditModalOpen(true)
    }
  }

  const handleDuplicateTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      const duplicated = {
        ...template,
        id: String(Date.now()),
        name: `${template.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0
      }
      setTemplates([duplicated, ...templates])
    }
  }

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      setTemplates(templates.filter(t => t.id !== templateId))
    }
  }

  const handlePreviewTemplate = (templateId: string, device: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
      setPreviewDevice(device)
      setPreviewModalOpen(true)
    }
  }

  const handleManageVariables = () => {
    setVariablesModalOpen(true)
  }

  const handleSaveTemplate = async () => {
    if (!selectedTemplate || !editForm.name) return
    
    setIsSubmitting(true)
    try {
      const updatedTemplates = templates.map(template => 
        template.id === selectedTemplate.id 
          ? { ...template, ...editForm, updatedAt: new Date().toISOString() }
          : template
      )
      setTemplates(updatedTemplates)
      setEditModalOpen(false)
      setSelectedTemplate(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving template:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateTemplateSubmit = async () => {
    if (!newTemplate.name || !newTemplate.content) return
    
    setIsSubmitting(true)
    try {
      const template: Template = {
        id: String(Date.now()),
        name: newTemplate.name!,
        description: newTemplate.description || '',
        type: newTemplate.type || 'page',
        category: newTemplate.category || 'landing-pages',
        content: newTemplate.content!,
        thumbnail: newTemplate.thumbnail || '/templates/default-template.jpg',
        isActive: newTemplate.isActive ?? true,
        createdBy: 'Admin User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0,
        devices: newTemplate.devices || ['desktop', 'tablet', 'mobile'],
        variables: newTemplate.variables || []
      }
      setTemplates([template, ...templates])
      setCreateModalOpen(false)
      setNewTemplate({})
    } catch (error) {
      console.error('Error creating template:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleTemplateStatus = (templateId: string) => {
    const updatedTemplates = templates.map(template => 
      template.id === templateId 
        ? { ...template, isActive: !template.isActive, updatedAt: new Date().toISOString() }
        : template
    )
    setTemplates(updatedTemplates)
  }

  const handleExportTemplates = () => {
    const csvData = templates.map(template => ({
      Name: template.name,
      Type: template.type,
      Category: template.category,
      Status: template.isActive ? 'Active' : 'Inactive',
      UsageCount: template.usageCount,
      CreatedBy: template.createdBy,
      CreatedDate: new Date(template.createdAt).toLocaleDateString(),
      UpdatedDate: new Date(template.updatedAt).toLocaleDateString(),
      Devices: template.devices.join('; '),
      Variables: template.variables.join('; ')
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `templates-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const categories = [...new Set(templates.map(template => template.category))]
  const types = [...new Set(templates.map(template => template.type))]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || template.type === filterType
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory
    return matchesSearch && matchesType && matchesCategory
  })

  const totalStats = {
    totalTemplates: templates.length,
    activeTemplates: templates.filter(t => t.isActive).length,
    totalUsage: templates.reduce((sum, t) => sum + t.usageCount, 0),
    pageTemplates: templates.filter(t => t.type === 'page').length,
    emailTemplates: templates.filter(t => t.type === 'email').length,
    componentTemplates: templates.filter(t => t.type === 'component').length
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportTemplates}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" onClick={handleManageVariables}>
            <Settings className="h-4 w-4 mr-2" />
            Manage Variables
          </Button>
          <Button onClick={handleCreateTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.totalTemplates}</p>
              </div>
              <Layout className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Templates</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.activeTemplates}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.totalUsage}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Templates</p>
                <p className="text-2xl font-bold text-orange-600">{totalStats.pageTemplates}</p>
              </div>
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
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
          {types.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {filteredTemplates.map((template) => {
          const TypeIcon = getTypeIcon(template.type)
          
          return (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TypeIcon className="h-5 w-5" />
                      {template.name}
                      <Badge className={getTypeColor(template.type)}>
                        {template.type.toUpperCase()}
                      </Badge>
                      <Badge variant={template.isActive ? 'default' : 'secondary'}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {template.createdBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Updated: {new Date(template.updatedAt).toLocaleDateString()}
                      </span>
                      <span>Used {template.usageCount} times</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewTemplate(template.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditTemplate(template.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleTemplateStatus(template.id)}
                    >
                      {template.isActive ? (
                        <StopCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <PlayCircle className="h-4 w-4 mr-1" />
                      )}
                      {template.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDuplicateTemplate(template.id)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Duplicate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteTemplate(template.id)}
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
                    <h4 className="font-medium text-gray-900">Description</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {template.category.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Device Support</h4>
                    <div className="flex gap-2">
                      {template.devices.map(device => {
                        const DeviceIcon = getDeviceIcon(device)
                        return (
                          <button
                            key={device}
                            onClick={() => handlePreviewTemplate(template.id, device)}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                          >
                            <DeviceIcon className="h-4 w-4" />
                            {device}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Variables</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {template.variables.slice(0, 3).map(variable => (
                        <div key={variable} className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                          {'{{'}{variable}{'}}'}
                        </div>
                      ))}
                      {template.variables.length > 3 && (
                        <p className="text-xs text-gray-500">+{template.variables.length - 3} more variables</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Usage & Stats</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Times used:</span>
                        <span className="font-medium">{template.usageCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`font-medium ${template.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-medium">{template.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Template Structure Preview</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <pre className="text-xs text-gray-600 font-mono overflow-x-auto">
                      {JSON.stringify(JSON.parse(template.content), null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Layout className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterType !== 'all' || filterCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Create your first template to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Template Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create New Template</h2>
                <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
                  <Input
                    value={newTemplate.name || ''}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Type *</label>
                  <select
                    value={newTemplate.type || 'page'}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="page">Page Template</option>
                    <option value="email">Email Template</option>
                    <option value="component">Component Template</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={newTemplate.category || 'landing-pages'}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="landing-pages">Landing Pages</option>
                    <option value="property-pages">Property Pages</option>
                    <option value="newsletters">Newsletters</option>
                    <option value="popups">Popups</option>
                    <option value="forms">Forms</option>
                    <option value="headers">Headers</option>
                    <option value="footers">Footers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                  <Input
                    value={newTemplate.thumbnail || ''}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, thumbnail: e.target.value }))}
                    placeholder="Template thumbnail URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTemplate.description || ''}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Template description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Device Support</label>
                <div className="flex gap-4">
                  {['desktop', 'tablet', 'mobile'].map(device => (
                    <label key={device} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={(newTemplate.devices || []).includes(device)}
                        onChange={(e) => {
                          const devices = newTemplate.devices || []
                          if (e.target.checked) {
                            setNewTemplate(prev => ({ ...prev, devices: [...devices, device] }))
                          } else {
                            setNewTemplate(prev => ({ ...prev, devices: devices.filter(d => d !== device) }))
                          }
                        }}
                        className="rounded" 
                      />
                      <span className="text-sm capitalize">{device}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Content (JSON) *</label>
                <textarea
                  value={newTemplate.content || ''}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                  placeholder='{"title": "{{property.name}}", "description": "{{property.description}}"}'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-40 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Variables</label>
                <Input
                  value={(newTemplate.variables || []).join(', ')}
                  onChange={(e) => setNewTemplate(prev => ({ 
                    ...prev, 
                    variables: e.target.value.split(',').map(v => v.trim()).filter(v => v) 
                  }))}
                  placeholder="property.name, property.description, user.email"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated list of variables used in this template</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplateSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Template Modal */}
      {viewModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
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
                        <p className="text-sm text-gray-600">Usage Count</p>
                        <p className="text-2xl font-bold text-blue-600">{selectedTemplate.usageCount}</p>
                      </div>
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className={`text-2xl font-bold ${selectedTemplate.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                          {selectedTemplate.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                      {selectedTemplate.isActive ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : (
                        <Clock className="h-8 w-8 text-gray-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Variables</p>
                        <p className="text-2xl font-bold text-purple-600">{selectedTemplate.variables.length}</p>
                      </div>
                      <Hash className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Template Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <Badge className={getTypeColor(selectedTemplate.type)}>
                        {selectedTemplate.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold">{selectedTemplate.category.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created By:</span>
                      <span className="font-semibold">{selectedTemplate.createdBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-semibold">{new Date(selectedTemplate.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-semibold">{new Date(selectedTemplate.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Device Support & Variables</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Supported Devices</h4>
                      <div className="flex gap-2">
                        {selectedTemplate.devices.map(device => {
                          const DeviceIcon = getDeviceIcon(device)
                          return (
                            <div key={device} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">
                              <DeviceIcon className="h-4 w-4" />
                              {device}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Template Variables</h4>
                      <div className="space-y-1">
                        {selectedTemplate.variables.map(variable => (
                          <div key={variable} className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                            {'{{'}{variable}{'}}'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Template Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedTemplate.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="text-sm text-gray-600 font-mono overflow-x-auto">
                      {JSON.stringify(JSON.parse(selectedTemplate.content), null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditTemplate(selectedTemplate.id)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Template
                </Button>
                <Button variant="outline" onClick={() => handleDuplicateTemplate(selectedTemplate.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline" onClick={() => {setViewModalOpen(false); setPreviewModalOpen(true)}}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Template Modal */}
      {editModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Template - {selectedTemplate.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                  <Input
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Template name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Type</label>
                  <select
                    value={editForm.type || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="page">Page Template</option>
                    <option value="email">Email Template</option>
                    <option value="component">Component Template</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editForm.category || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="landing-pages">Landing Pages</option>
                    <option value="property-pages">Property Pages</option>
                    <option value="newsletters">Newsletters</option>
                    <option value="popups">Popups</option>
                    <option value="forms">Forms</option>
                    <option value="headers">Headers</option>
                    <option value="footers">Footers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setEditForm(prev => ({ ...prev, isActive: e.target.value === 'active' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Content (JSON)</label>
                <textarea
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-40 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Variables</label>
                <Input
                  value={(editForm.variables || []).join(', ')}
                  onChange={(e) => setEditForm(prev => ({ 
                    ...prev, 
                    variables: e.target.value.split(',').map(v => v.trim()).filter(v => v) 
                  }))}
                  placeholder="property.name, property.description, user.email"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTemplate} disabled={isSubmitting}>
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

      {/* Variables Management Modal */}
      {variablesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Template Variables</h2>
                <Button variant="ghost" size="sm" onClick={() => setVariablesModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Global Variables</CardTitle>
                    <CardDescription>Variables available across all templates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['user.name', 'user.email', 'user.phone', 'company.name', 'company.address', 'current.date', 'current.time'].map(variable => (
                      <div key={variable} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-600" />
                          <code className="text-sm font-mono">{'{{'}{variable}{'}}'})</code>
                        </div>
                        <Badge variant="outline">Global</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Property Variables</CardTitle>
                    <CardDescription>Real estate specific variables</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['property.name', 'property.price', 'property.location', 'property.type', 'property.bedrooms', 'property.bathrooms', 'property.area'].map(variable => (
                      <div key={variable} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-green-600" />
                          <code className="text-sm font-mono">{'{{'}{variable}{'}}'})</code>
                        </div>
                        <Badge variant="outline">Property</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Variable Usage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">14</p>
                      <p className="text-sm text-gray-600">Total Variables</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-gray-600">Active Variables</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">92</p>
                      <p className="text-sm text-gray-600">Total Usage</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">7</p>
                      <p className="text-sm text-gray-600">Most Used</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setVariablesModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Template Analytics Modal */}
      {analyticsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Template Analytics</h2>
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
                        <p className="text-sm text-gray-600">Total Templates</p>
                        <p className="text-2xl font-bold text-blue-600">{totalStats.totalTemplates}</p>
                      </div>
                      <Layout className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Templates</p>
                        <p className="text-2xl font-bold text-green-600">{totalStats.activeTemplates}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Usage</p>
                        <p className="text-2xl font-bold text-purple-600">{totalStats.totalUsage}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Usage</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {(totalStats.totalUsage / totalStats.totalTemplates).toFixed(1)}
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
                    <CardTitle>Template Usage by Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {types.map(type => {
                      const typeTemplates = templates.filter(t => t.type === type)
                      const typeUsage = typeTemplates.reduce((sum, t) => sum + t.usageCount, 0)
                      const percentage = totalStats.totalUsage > 0 ? (typeUsage / totalStats.totalUsage) * 100 : 0
                      
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium capitalize">{type}</span>
                            <span className="text-sm text-gray-600">{typeUsage} uses ({percentage.toFixed(1)}%)</span>
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
                    <CardTitle>Most Popular Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {templates
                      .sort((a, b) => b.usageCount - a.usageCount)
                      .slice(0, 5)
                      .map(template => (
                        <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            {React.createElement(getTypeIcon(template.type), { className: "h-4 w-4" })}
                            <span className="font-medium">{template.name}</span>
                          </div>
                          <Badge variant="outline">{template.usageCount} uses</Badge>
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
                const report = `Template Analytics Report\\n\\nTotal Templates: ${totalStats.totalTemplates}\\nActive Templates: ${totalStats.activeTemplates}\\nTotal Usage: ${totalStats.totalUsage}\\nAverage Usage: ${(totalStats.totalUsage / totalStats.totalTemplates).toFixed(1)}`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `template-analytics-${new Date().toISOString().split('T')[0]}.txt`
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

      {/* Preview Template Modal */}
      {previewModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Preview: {selectedTemplate.name}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {selectedTemplate.devices.map(device => (
                      <Button
                        key={device}
                        variant={previewDevice === device ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewDevice(device)}
                      >
                        {React.createElement(getDeviceIcon(device), { className: "h-4 w-4 mr-1" })}
                        {device}
                      </Button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setPreviewModalOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center">
                <div 
                  className={`border-2 border-gray-300 bg-white rounded-lg overflow-hidden ${
                    previewDevice === 'mobile' ? 'w-80 h-96' :
                    previewDevice === 'tablet' ? 'w-96 h-80' :
                    'w-full h-96'
                  }`}
                >
                  <div className="p-4 h-full bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Template Preview</h3>
                      <p className="text-gray-600 mb-4">
                        Viewing {selectedTemplate.name} on {previewDevice}
                      </p>
                      <div className="bg-white p-4 rounded border">
                        <pre className="text-xs text-left">
                          {JSON.stringify(JSON.parse(selectedTemplate.content), null, 2)}
                        </pre>
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
    </div>
  )
}