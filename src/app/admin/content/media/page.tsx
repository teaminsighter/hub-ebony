'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Image as ImageIcon, 
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  Trash2,
  Upload,
  Video,
  FileText,
  Folder,
  Grid,
  List,
  Filter,
  Calendar,
  User,
  X,
  Save,
  RefreshCw,
  Settings,
  Copy,
  Archive,
  Share2,
  BarChart3,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap,
  Hash,
  Link,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Maximize,
  RotateCcw,
  Crop,
  Palette,
  Type,
  Play,
  Pause,
  Volume2,
  Info,
  Tag,
  Lock,
  Unlock,
  ExternalLink,
  Code,
  Scissors
} from 'lucide-react'

interface MediaItem {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  uploadedBy: string
  uploadedAt: string
  tags: string[]
  folder: string
  dimensions?: {
    width: number
    height: number
  }
  isPublic: boolean
  usageCount: number
  description?: string
  altText?: string
  lastModified?: string
  metadata?: Record<string, any>
  downloadCount?: number
  compressionLevel?: number
  optimized?: boolean
}

export default function MediaLibraryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      filename: 'downtown-dubai-hero.jpg',
      originalName: 'Downtown Dubai Skyline.jpg',
      mimeType: 'image/jpeg',
      size: 2048576,
      url: '/media/downtown-dubai-hero.jpg',
      thumbnailUrl: '/media/thumbs/downtown-dubai-hero.jpg',
      uploadedBy: 'Admin User',
      uploadedAt: '2024-10-20T10:30:00Z',
      tags: ['downtown', 'hero', 'skyline', 'property'],
      folder: 'hero-images',
      dimensions: { width: 1920, height: 1080 },
      isPublic: true,
      usageCount: 15
    },
    {
      id: '2',
      filename: 'dubai-marina-tour.mp4',
      originalName: 'Dubai Marina Virtual Tour.mp4',
      mimeType: 'video/mp4',
      size: 52428800,
      url: '/media/dubai-marina-tour.mp4',
      uploadedBy: 'Content Manager',
      uploadedAt: '2024-10-18T14:20:00Z',
      tags: ['marina', 'virtual-tour', 'video', 'property-showcase'],
      folder: 'property-videos',
      isPublic: true,
      usageCount: 8
    },
    {
      id: '3',
      filename: 'investment-guide.pdf',
      originalName: 'Dubai Property Investment Guide 2024.pdf',
      mimeType: 'application/pdf',
      size: 1536000,
      url: '/media/investment-guide.pdf',
      uploadedBy: 'Marketing Team',
      uploadedAt: '2024-10-15T09:45:00Z',
      tags: ['guide', 'investment', 'pdf', 'marketing'],
      folder: 'documents',
      isPublic: false,
      usageCount: 23
    },
    {
      id: '4',
      filename: 'palm-jumeirah-aerial.jpg',
      originalName: 'Palm Jumeirah Aerial View.jpg',
      mimeType: 'image/jpeg',
      size: 3145728,
      url: '/media/palm-jumeirah-aerial.jpg',
      thumbnailUrl: '/media/thumbs/palm-jumeirah-aerial.jpg',
      uploadedBy: 'Admin User',
      uploadedAt: '2024-10-12T16:15:00Z',
      tags: ['palm-jumeirah', 'aerial', 'luxury', 'property'],
      folder: 'property-images',
      dimensions: { width: 2560, height: 1440 },
      isPublic: true,
      usageCount: 12
    }
  ])
  
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterFolder, setFilterFolder] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Modal states
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [folderModalOpen, setFolderModalOpen] = useState(false)
  const [bulkModalOpen, setBulkModalOpen] = useState(false)
  const [optimizeModalOpen, setOptimizeModalOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [editForm, setEditForm] = useState<Partial<MediaItem>>({})
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newFolder, setNewFolder] = useState('')

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return ImageIcon
    if (mimeType.startsWith('video/')) return Video
    if (mimeType === 'application/pdf') return FileText
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileTypeColor = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'bg-green-100 text-green-800'
    if (mimeType.startsWith('video/')) return 'bg-purple-100 text-purple-800'
    if (mimeType === 'application/pdf') return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  const handleUpload = () => {
    setUploadModalOpen(true)
  }

  const handleViewMedia = (mediaId: string) => {
    const media = mediaItems.find(m => m.id === mediaId)
    if (media) {
      setSelectedMedia(media)
      setViewModalOpen(true)
    }
  }

  const handleEditMedia = (mediaId: string) => {
    const media = mediaItems.find(m => m.id === mediaId)
    if (media) {
      setSelectedMedia(media)
      setEditForm(media)
      setEditModalOpen(true)
    }
  }

  const handleDownload = (mediaId: string, filename: string) => {
    const media = mediaItems.find(m => m.id === mediaId)
    if (media) {
      // Update download count
      const updatedItems = mediaItems.map(item => 
        item.id === mediaId 
          ? { ...item, downloadCount: (item.downloadCount || 0) + 1 }
          : item
      )
      setMediaItems(updatedItems)
      
      // Simulate download
      const link = document.createElement('a')
      link.href = media.url
      link.download = filename
      link.click()
    }
  }

  const handleDeleteMedia = (mediaId: string) => {
    const media = mediaItems.find(m => m.id === mediaId)
    if (media && confirm(`Are you sure you want to delete "${media.originalName}"? This action cannot be undone.`)) {
      setMediaItems(mediaItems.filter(m => m.id !== mediaId))
    }
  }

  const handleCreateFolder = () => {
    setFolderModalOpen(true)
  }

  const handleBulkAction = () => {
    setBulkModalOpen(true)
  }

  const handleSaveMedia = async () => {
    if (!selectedMedia || !editForm.originalName) return
    
    setIsSubmitting(true)
    try {
      const updatedItems = mediaItems.map(item => 
        item.id === selectedMedia.id 
          ? { ...item, ...editForm, lastModified: new Date().toISOString() }
          : item
      )
      setMediaItems(updatedItems)
      setEditModalOpen(false)
      setSelectedMedia(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving media:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateFolderSubmit = () => {
    if (newFolder.trim()) {
      // Folder creation logic would go here
      setFolderModalOpen(false)
      setNewFolder('')
    }
  }

  const handleDuplicateMedia = (mediaId: string) => {
    const media = mediaItems.find(m => m.id === mediaId)
    if (media) {
      const duplicated = {
        ...media,
        id: String(Date.now()),
        filename: `${media.filename.split('.')[0]}_copy.${media.filename.split('.').pop()}`,
        originalName: `${media.originalName} (Copy)`,
        uploadedAt: new Date().toISOString(),
        usageCount: 0,
        downloadCount: 0
      }
      setMediaItems([duplicated, ...mediaItems])
    }
  }

  const handleOptimizeMedia = (mediaId: string) => {
    const media = mediaItems.find(m => m.id === mediaId)
    if (media) {
      setSelectedMedia(media)
      setOptimizeModalOpen(true)
    }
  }

  const handleBulkOptimize = () => {
    if (selectedItems.length > 0) {
      const updatedItems = mediaItems.map(item => 
        selectedItems.includes(item.id)
          ? { ...item, optimized: true, size: Math.floor(item.size * 0.7) }
          : item
      )
      setMediaItems(updatedItems)
      setSelectedItems([])
      setBulkModalOpen(false)
    }
  }

  const handleExportMedia = () => {
    const csvData = mediaItems.map(item => ({
      Filename: item.originalName,
      Type: item.mimeType,
      Size: formatFileSize(item.size),
      Folder: item.folder,
      UploadedBy: item.uploadedBy,
      UploadedAt: new Date(item.uploadedAt).toLocaleDateString(),
      UsageCount: item.usageCount,
      DownloadCount: item.downloadCount || 0,
      IsPublic: item.isPublic ? 'Yes' : 'No',
      Tags: item.tags.join(', '),
      Optimized: item.optimized ? 'Yes' : 'No'
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `media-library-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const folders = [...new Set(mediaItems.map(item => item.folder))]
  const fileTypes = [...new Set(mediaItems.map(item => item.mimeType.split('/')[0]))]

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || item.mimeType.startsWith(filterType)
    const matchesFolder = filterFolder === 'all' || item.folder === filterFolder
    return matchesSearch && matchesType && matchesFolder
  })

  const totalStats = {
    totalItems: mediaItems.length,
    totalSize: mediaItems.reduce((sum, item) => sum + item.size, 0),
    imageCount: mediaItems.filter(item => item.mimeType.startsWith('image/')).length,
    videoCount: mediaItems.filter(item => item.mimeType.startsWith('video/')).length,
    documentCount: mediaItems.filter(item => item.mimeType === 'application/pdf').length
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportMedia}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" onClick={handleCreateFolder}>
            <Folder className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.totalItems}</p>
              </div>
              <ImageIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-green-600">{formatFileSize(totalStats.totalSize)}</p>
              </div>
              <Folder className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Images</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.imageCount}</p>
              </div>
              <ImageIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-orange-600">{totalStats.videoCount}</p>
              </div>
              <Video className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search media..."
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
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="application">Documents</option>
        </select>
        <select
          value={filterFolder}
          onChange={(e) => setFilterFolder(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Folders</option>
          {folders.map(folder => (
            <option key={folder} value={folder}>{folder}</option>
          ))}
        </select>
        <div className="flex gap-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleBulkAction}>
          <Filter className="h-4 w-4 mr-1" />
          Bulk Actions
        </Button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredMedia.map((item) => {
            const FileIcon = getFileIcon(item.mimeType)
            
            return (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    {item.thumbnailUrl ? (
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileIcon className="h-12 w-12 text-gray-400" />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleViewMedia(item.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleDownload(item.id, item.filename)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm truncate" title={item.originalName}>
                      {item.originalName}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatFileSize(item.size)}</span>
                      <Badge className={getFileTypeColor(item.mimeType)} variant="secondary">
                        {item.mimeType.split('/')[0]}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">Used {item.usageCount} times</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMedia.map((item) => {
            const FileIcon = getFileIcon(item.mimeType)
            
            return (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.thumbnailUrl ? (
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.originalName}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <FileIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.originalName}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span>{formatFileSize(item.size)}</span>
                        <span className="flex items-center gap-1">
                          <Folder className="h-4 w-4" />
                          {item.folder}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {item.uploadedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {item.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getFileTypeColor(item.mimeType)}>
                        {item.mimeType.split('/')[0]}
                      </Badge>
                      <Badge variant={item.isPublic ? 'default' : 'secondary'}>
                        {item.isPublic ? 'Public' : 'Private'}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewMedia(item.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditMedia(item.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(item.id, item.filename)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicateMedia(item.id)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOptimizeMedia(item.id)}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Optimize
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMedia(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {filteredMedia.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
            <p className="text-gray-500 text-center">
              {searchTerm || filterType !== 'all' || filterFolder !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Upload your first media file to get started.'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upload Media Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Upload Media</h2>
                <Button variant="ghost" size="sm" onClick={() => setUploadModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here to upload</h3>
                  <p className="text-gray-600 mb-4">or click to browse files</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Select Files
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select folder...</option>
                    {folders.map(folder => (
                      <option key={folder} value={folder}>{folder}</option>
                    ))}
                    <option value="new">+ Create new folder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <Input placeholder="Add tags separated by commas..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Auto-optimize images</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Generate thumbnails</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Create multiple sizes</span>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Add watermark</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Extract metadata</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Bulk rename</span>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Upload Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Maximum file size: 50MB per file</li>
                  <li>• Supported formats: JPG, PNG, GIF, MP4, MOV, PDF, DOC</li>
                  <li>• Recommended image resolution: 1920x1080 or higher</li>
                  <li>• Use descriptive filenames for better organization</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Start Upload
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Media Modal */}
      {viewModalOpen && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedMedia.originalName}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setViewModalOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center" style={{ minHeight: '300px' }}>
                    {selectedMedia.mimeType.startsWith('image/') ? (
                      <img 
                        src={selectedMedia.url} 
                        alt={selectedMedia.originalName}
                        className="max-w-full max-h-full object-contain rounded"
                      />
                    ) : selectedMedia.mimeType.startsWith('video/') ? (
                      <video 
                        src={selectedMedia.url} 
                        controls
                        className="max-w-full max-h-full rounded"
                      />
                    ) : (
                      <div className="text-center">
                        <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">{selectedMedia.originalName}</p>
                        <Button className="mt-4" onClick={() => handleDownload(selectedMedia.id, selectedMedia.filename)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
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
                    <Button variant="outline" size="sm">
                      <Maximize className="h-4 w-4 mr-2" />
                      Fullscreen
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>File Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Filename:</span>
                        <span className="font-medium">{selectedMedia.filename}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <Badge className={getFileTypeColor(selectedMedia.mimeType)}>
                          {selectedMedia.mimeType}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{formatFileSize(selectedMedia.size)}</span>
                      </div>
                      {selectedMedia.dimensions && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dimensions:</span>
                          <span className="font-medium">{selectedMedia.dimensions.width} × {selectedMedia.dimensions.height}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Folder:</span>
                        <span className="font-medium">{selectedMedia.folder}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visibility:</span>
                        <Badge variant={selectedMedia.isPublic ? 'default' : 'secondary'}>
                          {selectedMedia.isPublic ? 'Public' : 'Private'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Usage Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Times Used:</span>
                        <span className="font-medium text-blue-600">{selectedMedia.usageCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Downloads:</span>
                        <span className="font-medium text-green-600">{selectedMedia.downloadCount || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded by:</span>
                        <span className="font-medium">{selectedMedia.uploadedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upload date:</span>
                        <span className="font-medium">{new Date(selectedMedia.uploadedAt).toLocaleDateString()}</span>
                      </div>
                      {selectedMedia.lastModified && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last modified:</span>
                          <span className="font-medium">{new Date(selectedMedia.lastModified).toLocaleDateString()}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedia.tags.map(tag => (
                          <Badge key={tag} variant="outline">
                            <Hash className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditMedia(selectedMedia.id)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" onClick={() => handleDuplicateMedia(selectedMedia.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline" onClick={() => handleDownload(selectedMedia.id, selectedMedia.filename)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Media Modal */}
      {editModalOpen && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Media - {selectedMedia.originalName}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Name</label>
                  <Input
                    value={editForm.originalName || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, originalName: e.target.value }))}
                    placeholder="File display name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
                  <select
                    value={editForm.folder || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, folder: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {folders.map(folder => (
                      <option key={folder} value={folder}>{folder}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                  placeholder="Brief description of this media file..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (for images)</label>
                <Input
                  value={editForm.altText || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, altText: e.target.value }))}
                  placeholder="Alternative text for accessibility"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <Input
                  value={editForm.tags?.join(', ') || ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
                    setEditForm(prev => ({ ...prev, tags }))
                  }}
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                  <select
                    value={editForm.isPublic ? 'public' : 'private'}
                    onChange={(e) => setEditForm(prev => ({ ...prev, isPublic: e.target.value === 'public' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Optimization</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={editForm.optimized || false}
                        onChange={(e) => setEditForm(prev => ({ ...prev, optimized: e.target.checked }))}
                      />
                      <span className="text-sm">Optimized</span>
                    </label>
                  </div>
                </div>
              </div>

              {selectedMedia.mimeType.startsWith('image/') && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Image Tools</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Crop className="h-4 w-4 mr-2" />
                      Crop
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Rotate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Palette className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <Zap className="h-4 w-4 mr-2" />
                      Optimize
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveMedia} disabled={isSubmitting}>
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
                <h2 className="text-2xl font-bold text-gray-900">Media Library Analytics</h2>
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
                        <p className="text-sm text-gray-600">Total Files</p>
                        <p className="text-2xl font-bold text-blue-600">{totalStats.totalItems}</p>
                      </div>
                      <ImageIcon className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Storage Used</p>
                        <p className="text-2xl font-bold text-green-600">{formatFileSize(totalStats.totalSize)}</p>
                      </div>
                      <Folder className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Downloads</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {mediaItems.reduce((sum, item) => sum + (item.downloadCount || 0), 0)}
                        </p>
                      </div>
                      <Download className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Usage</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {(mediaItems.reduce((sum, item) => sum + item.usageCount, 0) / mediaItems.length || 0).toFixed(1)}
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
                    <CardTitle>File Types Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { type: 'Images', count: totalStats.imageCount, color: 'green' },
                      { type: 'Videos', count: totalStats.videoCount, color: 'purple' },
                      { type: 'Documents', count: totalStats.documentCount, color: 'red' }
                    ].map(({ type, count, color }) => {
                      const percentage = totalStats.totalItems > 0 ? (count / totalStats.totalItems) * 100 : 0
                      
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{type}</span>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Most Used Media</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mediaItems
                      .sort((a, b) => b.usageCount - a.usageCount)
                      .slice(0, 5)
                      .map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                              {React.createElement(getFileIcon(item.mimeType), { className: "h-4 w-4 text-gray-600" })}
                            </div>
                            <span className="text-sm font-medium truncate">{item.originalName}</span>
                          </div>
                          <Badge variant="outline">{item.usageCount} uses</Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Media Library Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Storage Health</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {((mediaItems.filter(item => item.optimized).length / mediaItems.length) * 100 || 0).toFixed(0)}% files optimized</li>
                        <li>• {formatFileSize(totalStats.totalSize)} total storage used</li>
                        <li>• {((mediaItems.filter(item => item.isPublic).length / mediaItems.length) * 100).toFixed(0)}% public files</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Usage Trends</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Images are most frequently used</li>
                        <li>• Average {(mediaItems.reduce((sum, item) => sum + item.usageCount, 0) / mediaItems.length || 0).toFixed(1)} uses per file</li>
                        <li>• {mediaItems.reduce((sum, item) => sum + (item.downloadCount || 0), 0)} total downloads</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Recommendations</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Optimize {mediaItems.filter(item => !item.optimized).length} unoptimized files</li>
                        <li>• Add tags to improve searchability</li>
                        <li>• Organize files into folders</li>
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
                const report = `Media Library Analytics Report\\n\\nTotal Files: ${totalStats.totalItems}\\nStorage Used: ${formatFileSize(totalStats.totalSize)}\\nImages: ${totalStats.imageCount}\\nVideos: ${totalStats.videoCount}\\nDocuments: ${totalStats.documentCount}`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `media-analytics-${new Date().toISOString().split('T')[0]}.txt`
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

      {/* Create Folder Modal */}
      {folderModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Create New Folder</h2>
                <Button variant="ghost" size="sm" onClick={() => setFolderModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Folder Name</label>
                <Input
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  placeholder="Enter folder name"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                  placeholder="Optional folder description..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Auto-organize by file type</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span className="text-sm">Restrict upload permissions</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setFolderModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFolderSubmit} disabled={!newFolder.trim()}>
                <Folder className="h-4 w-4 mr-2" />
                Create Folder
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Bulk Actions</h2>
                <Button variant="ghost" size="sm" onClick={() => setBulkModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedItems.length} item(s) selected
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleBulkOptimize}>
                    <Zap className="h-4 w-4 mr-2" />
                    Optimize Selected
                  </Button>
                  <Button variant="outline">
                    <Archive className="h-4 w-4 mr-2" />
                    Move to Folder
                  </Button>
                  <Button variant="outline">
                    <Tag className="h-4 w-4 mr-2" />
                    Add Tags
                  </Button>
                  <Button variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    Change Visibility
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download ZIP
                  </Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm text-blue-800">Auto-generate alt text for images</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm text-blue-800">Create thumbnails for videos</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm text-blue-800">Extract metadata</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setBulkModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                Apply Actions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}