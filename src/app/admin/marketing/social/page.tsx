'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Share2, 
  Search,
  Plus,
  Eye,
  Edit,
  Calendar,
  Heart,
  MessageCircle,
  Repeat2,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  Image as ImageIcon,
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
  Video,
  Zap,
  CheckCircle,
  AlertTriangle,
  Megaphone,
  Target,
  DollarSign,
  MousePointer,
  ExternalLink,
  Palette,
  Type,
  Link,
  Upload,
  Play,
  Pause,
  Send
} from 'lucide-react'

interface SocialPost {
  id: string
  content: string
  platform: string[]
  status: string
  scheduledDate: string | null
  publishedDate: string | null
  imageUrl: string | null
  likes: number
  comments: number
  shares: number
  reach: number
  engagement: number
  hashtags: string[]
  campaign: string | null
}

export default function SocialMediaPage() {
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: '1',
      content: 'Discover luxury living in Downtown Dubai! 🏢✨ New premium properties with stunning Burj Khalifa views now available. Perfect for investors seeking high ROI in the heart of the city.',
      platform: ['Instagram', 'Facebook', 'LinkedIn'],
      status: 'published',
      scheduledDate: null,
      publishedDate: '2024-10-20T12:00:00Z',
      imageUrl: '/images/downtown-dubai.jpg',
      likes: 245,
      comments: 18,
      shares: 32,
      reach: 15420,
      engagement: 295,
      hashtags: ['#DubaiRealEstate', '#DowntownDubai', '#PropertyInvestment', '#LuxuryLiving'],
      campaign: 'Downtown Launch'
    },
    {
      id: '2',
      content: 'Dubai Marina Investment Spotlight 🌊 Why smart investors are choosing waterfront properties. Our latest market analysis shows 12% annual growth potential.',
      platform: ['LinkedIn', 'Twitter'],
      status: 'scheduled',
      scheduledDate: '2024-10-25T15:00:00Z',
      publishedDate: null,
      imageUrl: '/images/dubai-marina.jpg',
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0,
      engagement: 0,
      hashtags: ['#DubaiMarina', '#RealEstateInvestment', '#PropertyGrowth', '#MarketAnalysis'],
      campaign: 'Marina Guide'
    },
    {
      id: '3',
      content: 'Business Bay Property Alert! 🏙️ Exclusive off-plan opportunities with guaranteed 8% rental yield. Limited units available for serious investors.',
      platform: ['Instagram', 'Facebook'],
      status: 'draft',
      scheduledDate: null,
      publishedDate: null,
      imageUrl: '/images/business-bay.jpg',
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0,
      engagement: 0,
      hashtags: ['#BusinessBay', '#OffPlan', '#RentalYield', '#PropertyAlert'],
      campaign: 'Business Bay ROI'
    },
    {
      id: '4',
      content: 'Palm Jumeirah Luxury Collection 🏝️ Beachfront villas and apartments that redefine sophisticated living. Your gateway to Dubai\'s most prestigious address.',
      platform: ['Instagram', 'Facebook', 'LinkedIn'],
      status: 'published',
      scheduledDate: null,
      publishedDate: '2024-10-18T10:30:00Z',
      imageUrl: '/images/palm-jumeirah.jpg',
      likes: 389,
      comments: 24,
      shares: 45,
      reach: 22150,
      engagement: 458,
      hashtags: ['#PalmJumeirah', '#LuxuryVillas', '#BeachfrontLiving', '#DubaiLuxury'],
      campaign: 'Palm Showcase'
    }
  ])
  
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [platformsModalOpen, setPlatformsModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null)
  const [editForm, setEditForm] = useState<Partial<SocialPost>>({})
  const [newPost, setNewPost] = useState<Partial<SocialPost>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return '📷'
      case 'Facebook': return '👥'
      case 'LinkedIn': return '💼'
      case 'Twitter': return '🐦'
      case 'YouTube': return '📺'
      default: return '📱'
    }
  }

  const getEngagementRate = (engagement: number, reach: number) => {
    return reach > 0 ? ((engagement / reach) * 100).toFixed(2) : '0.00'
  }

  const handleCreatePost = () => {
    setNewPost({
      status: 'draft',
      platform: ['Instagram'],
      hashtags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0,
      engagement: 0
    })
    setCreateModalOpen(true)
  }

  const handleViewPost = (postId: string) => {
    const post = socialPosts.find(p => p.id === postId)
    if (post) {
      setSelectedPost(post)
      setViewModalOpen(true)
    }
  }

  const handleEditPost = (postId: string) => {
    const post = socialPosts.find(p => p.id === postId)
    if (post) {
      setSelectedPost(post)
      setEditForm(post)
      setEditModalOpen(true)
    }
  }

  const handleSchedulePost = (postId: string) => {
    const post = socialPosts.find(p => p.id === postId)
    if (post) {
      setSelectedPost(post)
      setScheduleModalOpen(true)
    }
  }

  const handleViewAnalytics = (postId: string) => {
    const post = socialPosts.find(p => p.id === postId)
    if (post) {
      setSelectedPost(post)
      setAnalyticsModalOpen(true)
    }
  }

  const handleManagePlatforms = () => {
    setPlatformsModalOpen(true)
  }

  const handleSavePost = async () => {
    if (!selectedPost || !editForm.content) return
    
    setIsSubmitting(true)
    try {
      const updatedPosts = socialPosts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, ...editForm }
          : post
      )
      setSocialPosts(updatedPosts)
      setEditModalOpen(false)
      setSelectedPost(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreatePostSubmit = async () => {
    if (!newPost.content) return
    
    setIsSubmitting(true)
    try {
      const post: SocialPost = {
        id: String(Date.now()),
        content: newPost.content!,
        platform: newPost.platform || ['Instagram'],
        status: newPost.status || 'draft',
        scheduledDate: newPost.scheduledDate || null,
        publishedDate: null,
        imageUrl: newPost.imageUrl || null,
        likes: 0,
        comments: 0,
        shares: 0,
        reach: 0,
        engagement: 0,
        hashtags: newPost.hashtags || [],
        campaign: newPost.campaign || null
      }
      setSocialPosts([post, ...socialPosts])
      setCreateModalOpen(false)
      setNewPost({})
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDuplicatePost = (postId: string) => {
    const post = socialPosts.find(p => p.id === postId)
    if (post) {
      const duplicated = {
        ...post,
        id: String(Date.now()),
        content: `${post.content} (Copy)`,
        status: 'draft',
        publishedDate: null,
        scheduledDate: null,
        likes: 0,
        comments: 0,
        shares: 0,
        reach: 0,
        engagement: 0
      }
      setSocialPosts([duplicated, ...socialPosts])
    }
  }

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this social media post?')) {
      setSocialPosts(socialPosts.filter(p => p.id !== postId))
    }
  }

  const handlePublishNow = async (postId: string) => {
    const post = socialPosts.find(p => p.id === postId)
    if (post) {
      setIsSubmitting(true)
      try {
        const updatedPosts = socialPosts.map(p => 
          p.id === postId 
            ? { 
                ...p, 
                status: 'published', 
                publishedDate: new Date().toISOString(),
                scheduledDate: null
              }
            : p
        )
        setSocialPosts(updatedPosts)
        setScheduleModalOpen(false)
      } catch (error) {
        console.error('Error publishing post:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleExportPosts = () => {
    const csvData = socialPosts.map(post => ({
      Content: post.content,
      Platforms: post.platform.join(', '),
      Status: post.status,
      Likes: post.likes,
      Comments: post.comments,
      Shares: post.shares,
      Reach: post.reach,
      Engagement: post.engagement,
      EngagementRate: getEngagementRate(post.engagement, post.reach),
      Hashtags: post.hashtags.join(', '),
      Campaign: post.campaign || '',
      PublishedDate: post.publishedDate || '',
      ScheduledDate: post.scheduledDate || ''
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `social-posts-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredPosts = socialPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesPlatform = filterPlatform === 'all' || post.platform.includes(filterPlatform)
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus
    return matchesSearch && matchesPlatform && matchesStatus
  })

  const totalStats = {
    totalPosts: socialPosts.filter(p => p.status === 'published').length,
    totalReach: socialPosts.reduce((sum, p) => sum + p.reach, 0),
    totalEngagement: socialPosts.reduce((sum, p) => sum + p.engagement, 0),
    totalLikes: socialPosts.reduce((sum, p) => sum + p.likes, 0),
    totalComments: socialPosts.reduce((sum, p) => sum + p.comments, 0),
    totalShares: socialPosts.reduce((sum, p) => sum + p.shares, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Social Media</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPosts}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" onClick={handleManagePlatforms}>
            <Share2 className="h-4 w-4 mr-2" />
            Manage Platforms
          </Button>
          <Button onClick={handleCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.totalReach.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.totalEngagement.toLocaleString()}</p>
              </div>
              <Heart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
                <p className="text-2xl font-bold text-purple-600">
                  {getEngagementRate(totalStats.totalEngagement, totalStats.totalReach)}%
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
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-orange-600">{totalStats.totalPosts}</p>
              </div>
              <Share2 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Followers Growth</p>
                <p className="text-2xl font-bold text-green-600">+24%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Platforms</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Twitter">Twitter</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    <span className="line-clamp-1">{post.content.substring(0, 80)}...</span>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <span>Platforms:</span>
                      {post.platform.map(p => (
                        <span key={p} className="ml-1">{getPlatformIcon(p)}</span>
                      ))}
                    </span>
                    {post.publishedDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Published: {new Date(post.publishedDate).toLocaleDateString()}
                      </span>
                    )}
                    {post.scheduledDate && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Scheduled: {new Date(post.scheduledDate).toLocaleDateString()}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewPost(post.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditPost(post.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {post.status === 'draft' && (
                    <Button 
                      size="sm"
                      onClick={() => handleSchedulePost(post.id)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  )}
                  {post.status === 'published' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewAnalytics(post.id)}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDuplicatePost(post.id)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
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
                  <h4 className="font-medium text-gray-900">Content</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="line-clamp-3">{post.content}</p>
                    {post.imageUrl && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <ImageIcon className="h-4 w-4" />
                        <span>Image attached</span>
                      </div>
                    )}
                    {post.campaign && (
                      <p><strong>Campaign:</strong> {post.campaign}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Reach & Impressions</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Reach:</span>
                      <span className="font-medium">{post.reach.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engagement:</span>
                      <span className="font-medium">{post.engagement.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eng. Rate:</span>
                      <span className="font-medium text-green-600">
                        {getEngagementRate(post.engagement, post.reach)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Interactions</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        Likes:
                      </span>
                      <span className="font-medium">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        Comments:
                      </span>
                      <span className="font-medium">{post.comments.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Repeat2 className="h-4 w-4" />
                        Shares:
                      </span>
                      <span className="font-medium">{post.shares.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Hashtags & Platforms</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {post.hashtags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                      {post.hashtags.length > 3 && (
                        <span className="text-gray-500 text-xs">+{post.hashtags.length - 3} more</span>
                      )}
                    </div>
                    <div className="flex gap-1 mt-2">
                      {post.platform.map(platform => (
                        <span key={platform} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Share2 className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No social posts found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterPlatform !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Create your first social media post to engage with your audience.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Post Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create New Social Media Post</h2>
                <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Content *</label>
                <textarea
                  value={newPost.content || ''}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your engaging social media post here..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none"
                  maxLength={2200}
                />
                <p className="text-sm text-gray-500 mt-1">{(newPost.content || '').length}/2200 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platforms *</label>
                  <div className="space-y-2">
                    {['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'YouTube'].map(platform => (
                      <label key={platform} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={newPost.platform?.includes(platform) || false}
                          onChange={(e) => {
                            const platforms = newPost.platform || []
                            if (e.target.checked) {
                              setNewPost(prev => ({ ...prev, platform: [...platforms, platform] }))
                            } else {
                              setNewPost(prev => ({ ...prev, platform: platforms.filter(p => p !== platform) }))
                            }
                          }}
                        />
                        <span className="text-sm flex items-center gap-1">
                          {getPlatformIcon(platform)} {platform}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign (Optional)</label>
                  <select
                    value={newPost.campaign || ''}
                    onChange={(e) => setNewPost(prev => ({ ...prev, campaign: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">No Campaign</option>
                    <option value="Downtown Launch">Downtown Launch</option>
                    <option value="Marina Guide">Marina Guide</option>
                    <option value="Business Bay ROI">Business Bay ROI</option>
                    <option value="Palm Showcase">Palm Showcase</option>
                    <option value="Q4 Marketing">Q4 Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hashtags</label>
                <Input
                  value={newPost.hashtags?.join(' ') || ''}
                  onChange={(e) => {
                    const hashtags = e.target.value.split(' ').filter(tag => tag.trim() !== '')
                    setNewPost(prev => ({ ...prev, hashtags }))
                  }}
                  placeholder="#DubaiRealEstate #PropertyInvestment #LuxuryLiving"
                />
                <p className="text-sm text-gray-500 mt-1">Separate hashtags with spaces</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media Attachment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <Button variant="outline" size="sm" className="ml-2">
                        <Video className="h-4 w-4 mr-2" />
                        Upload Video
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="postOption" value="draft" defaultChecked />
                      <span className="text-sm">Save as Draft</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="postOption" value="schedule" />
                      <span className="text-sm">Schedule for Later</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="postOption" value="now" />
                      <span className="text-sm">Publish Now</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advanced Settings</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Auto-optimize posting times</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Enable auto-commenting</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Track engagement</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePostSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Post Details Modal */}
      {viewModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Post Performance</h2>
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
                        <p className="text-sm text-gray-600">Total Reach</p>
                        <p className="text-2xl font-bold text-blue-600">{selectedPost.reach.toLocaleString()}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Engagement</p>
                        <p className="text-2xl font-bold text-green-600">{selectedPost.engagement.toLocaleString()}</p>
                      </div>
                      <Heart className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Engagement Rate</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {getEngagementRate(selectedPost.engagement, selectedPost.reach)}%
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
                        <p className="text-sm text-gray-600">Shares</p>
                        <p className="text-2xl font-bold text-orange-600">{selectedPost.shares}</p>
                      </div>
                      <Repeat2 className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">{selectedPost.content}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedPost.hashtags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {selectedPost.platform.map(platform => (
                        <span key={platform} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                          {getPlatformIcon(platform)} {platform}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <Heart className="h-4 w-4" /> Likes
                        </span>
                        <span className="text-sm text-gray-600">{selectedPost.likes.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(selectedPost.likes / Math.max(selectedPost.engagement, 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" /> Comments
                        </span>
                        <span className="text-sm text-gray-600">{selectedPost.comments.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(selectedPost.comments / Math.max(selectedPost.engagement, 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <Repeat2 className="h-4 w-4" /> Shares
                        </span>
                        <span className="text-sm text-gray-600">{selectedPost.shares.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(selectedPost.shares / Math.max(selectedPost.engagement, 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Strong Performance</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• High engagement rate</li>
                        <li>• Effective hashtag usage</li>
                        <li>• Good cross-platform reach</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Audience Insights</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Peak engagement: 2-4 PM</li>
                        <li>• Top demographics: 25-45</li>
                        <li>• Mobile engagement: 78%</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Optimization Tips</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Add more visual content</li>
                        <li>• Include call-to-action</li>
                        <li>• Experiment with video</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditPost(selectedPost.id)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Post
                </Button>
                <Button variant="outline" onClick={() => handleDuplicatePost(selectedPost.id)}>
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

      {/* Analytics Modal */}
      {analyticsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Social Media Analytics</h2>
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
                        <p className="text-sm text-gray-600">Total Posts</p>
                        <p className="text-2xl font-bold text-blue-600">{socialPosts.length}</p>
                      </div>
                      <Share2 className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Reach</p>
                        <p className="text-2xl font-bold text-green-600">{totalStats.totalReach.toLocaleString()}</p>
                      </div>
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Engagement</p>
                        <p className="text-2xl font-bold text-purple-600">{totalStats.totalEngagement.toLocaleString()}</p>
                      </div>
                      <Heart className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Engagement</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {getEngagementRate(totalStats.totalEngagement, totalStats.totalReach)}%
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
                    <CardTitle>Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map(platform => {
                      const platformPosts = socialPosts.filter(p => p.platform.includes(platform))
                      const platformEngagement = platformPosts.reduce((sum, p) => sum + p.engagement, 0)
                      const totalEngagement = socialPosts.reduce((sum, p) => sum + p.engagement, 0)
                      const percentage = totalEngagement > 0 ? (platformEngagement / totalEngagement) * 100 : 0
                      
                      return (
                        <div key={platform} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium flex items-center gap-1">
                              {getPlatformIcon(platform)} {platform}
                            </span>
                            <span className="text-sm text-gray-600">{platformEngagement} ({percentage.toFixed(1)}%)</span>
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
                    <CardTitle>Content Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Property Launch Posts</span>
                        <span className="text-sm text-gray-600">Avg 18.2% engagement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Educational Content</span>
                        <span className="text-sm text-gray-600">Avg 12.5% engagement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '63%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Market Updates</span>
                        <span className="text-sm text-gray-600">Avg 8.7% engagement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '44%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Top Performing</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Instagram drives highest engagement</li>
                        <li>• Property showcases get most shares</li>
                        <li>• Visual content performs 3x better</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Growth Opportunities</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Expand video content strategy</li>
                        <li>• Increase LinkedIn B2B content</li>
                        <li>• Optimize posting schedules</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Action Items</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Improve Twitter engagement</li>
                        <li>• Create more interactive content</li>
                        <li>• Test new hashtag strategies</li>
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
                const report = `Social Media Analytics Report\\n\\nTotal Posts: ${socialPosts.length}\\nTotal Reach: ${totalStats.totalReach.toLocaleString()}\\nTotal Engagement: ${totalStats.totalEngagement.toLocaleString()}\\nAvg Engagement Rate: ${getEngagementRate(totalStats.totalEngagement, totalStats.totalReach)}%`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `social-analytics-${new Date().toISOString().split('T')[0]}.txt`
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

      {/* Platforms Management Modal */}
      {platformsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Social Platforms</h2>
                <Button variant="ghost" size="sm" onClick={() => setPlatformsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid gap-4">
                {[
                  { name: 'Instagram', icon: '📷', status: 'Connected', followers: '12.5K', engagement: '4.2%' },
                  { name: 'Facebook', icon: '👥', status: 'Connected', followers: '8.3K', engagement: '2.8%' },
                  { name: 'LinkedIn', icon: '💼', status: 'Connected', followers: '15.2K', engagement: '6.1%' },
                  { name: 'Twitter', icon: '🐦', status: 'Disconnected', followers: '0', engagement: '0%' },
                  { name: 'YouTube', icon: '📺', status: 'Disconnected', followers: '0', engagement: '0%' }
                ].map((platform, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{platform.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                            <p className="text-sm text-gray-600">{platform.followers} followers • {platform.engagement} avg engagement</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={platform.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {platform.status}
                          </Badge>
                          {platform.status === 'Connected' ? (
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Configure
                            </Button>
                          ) : (
                            <Button size="sm">
                              <Link className="h-4 w-4 mr-1" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Posting Schedule</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>Optimal times (AI-driven)</option>
                        <option>Custom schedule</option>
                        <option>Immediate posting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Auto-approve Comments</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>Review all comments</option>
                        <option>Auto-approve verified users</option>
                        <option>Auto-approve all</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Enable cross-platform posting</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Auto-add campaign hashtags</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Enable auto-engagement responses</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setPlatformsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Post Modal */}
      {scheduleModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Schedule Post</h2>
                <Button variant="ghost" size="sm" onClick={() => setScheduleModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">Post Content</p>
                <p className="text-sm text-blue-800 line-clamp-3">{selectedPost.content}</p>
                <div className="flex gap-2 mt-2">
                  {selectedPost.platform.map(platform => (
                    <span key={platform} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {getPlatformIcon(platform)} {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="radio" name="publishOption" value="now" defaultChecked />
                  <div>
                    <div className="font-medium">Publish Now</div>
                    <div className="text-sm text-gray-600">Post will be published immediately</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input type="radio" name="publishOption" value="optimal" />
                  <div>
                    <div className="font-medium">Schedule for Optimal Time</div>
                    <div className="text-sm text-gray-600">AI will choose the best time for engagement</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input type="radio" name="publishOption" value="custom" />
                  <div>
                    <div className="font-medium">Custom Schedule</div>
                    <div className="text-sm text-gray-600">Choose specific date and time</div>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800 mb-1">Recommended Times:</p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Instagram: 11 AM - 1 PM, 7 PM - 9 PM</li>
                      <li>• LinkedIn: 9 AM - 10 AM, 12 PM - 2 PM</li>
                      <li>• Facebook: 9 AM - 10 AM, 3 PM - 4 PM</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handlePublishNow(selectedPost.id)} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Publish Post
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