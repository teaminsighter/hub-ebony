'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Building2,
  Search,
  Plus,
  Eye,
  Edit,
  Building,
  DollarSign,
  TrendingUp,
  BarChart3,
  Users,
  Calendar,
  Star,
  Award,
  Target,
  Home,
  MapPin,
  RefreshCw,
  Download,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Save,
  Upload,
  Settings,
  PieChart,
  Calculator,
  FileText,
  TrendingDown,
  Gauge,
  Route,
  Activity,
  Zap,
  ArrowUp,
  ArrowDown,
  Filter
} from 'lucide-react'

interface Developer {
  id: string
  name: string
  description: string
  logo: string | null
  establishedYear: number
  headquarters: string
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalUnits: number
  averagePrice: number
  marketShare: number
  reputationScore: number
  onTimeDelivery: number
  qualityRating: number
  customerSatisfaction: number
  website: string
  phone: string
  email: string
  specialties: string[]
  recentProjects: string[]
  upcomingProjects: string[]
  preferredAreas: string[]
  priceRange: string
  targetMarket: string
  sustainability: boolean
  awards: string[]
  lastUpdated: string
  status: 'Active' | 'Inactive' | 'Suspended'
}

const developerStatuses = [
  { id: 'Active', name: 'Active', color: 'bg-green-100 text-green-800' },
  { id: 'Inactive', name: 'Inactive', color: 'bg-gray-100 text-gray-800' },
  { id: 'Suspended', name: 'Suspended', color: 'bg-red-100 text-red-800' }
]

export default function PropertyDevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('reputation')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [projectsModalOpen, setProjectsModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null)
  const [editForm, setEditForm] = useState<Partial<Developer>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchDevelopers()
  }, [])

  const fetchDevelopers = async () => {
    try {
      // Demo data for Dubai developers
      const demoDevelopers: Developer[] = [
        {
          id: '1',
          name: 'Emaar Properties',
          description: 'Leading real estate developer in the Middle East, creator of Downtown Dubai',
          logo: null,
          establishedYear: 1997,
          headquarters: 'Dubai, UAE',
          totalProjects: 85,
          activeProjects: 12,
          completedProjects: 73,
          totalUnits: 45000,
          averagePrice: 3200000,
          marketShare: 25.5,
          reputationScore: 95,
          onTimeDelivery: 92,
          qualityRating: 94,
          customerSatisfaction: 88,
          website: 'www.emaar.com',
          phone: '+971 4 367 3333',
          email: 'info@emaar.ae',
          specialties: ['Luxury Residential', 'Mixed-Use', 'Commercial', 'Hospitality'],
          recentProjects: ['Creek Harbour', 'Dubai Hills Estate', 'Emaar Beachfront'],
          upcomingProjects: ['The Valley', 'Rashid Yachts & Marina', 'Dubai Creek Residences'],
          preferredAreas: ['Downtown Dubai', 'Dubai Hills', 'Creek Harbour', 'Dubai Marina'],
          priceRange: '1M - 50M AED',
          targetMarket: 'Luxury & Premium',
          sustainability: true,
          awards: ['Best Developer - MENA', 'Sustainability Award 2024', 'Innovation in Design'],
          lastUpdated: '2025-10-22',
          status: 'Active'
        },
        {
          id: '2',
          name: 'DAMAC Properties',
          description: 'Luxury real estate developer known for premium lifestyle destinations',
          logo: null,
          establishedYear: 2002,
          headquarters: 'Dubai, UAE',
          totalProjects: 68,
          activeProjects: 15,
          completedProjects: 53,
          totalUnits: 32000,
          averagePrice: 2800000,
          marketShare: 18.2,
          reputationScore: 88,
          onTimeDelivery: 85,
          qualityRating: 90,
          customerSatisfaction: 84,
          website: 'www.damacproperties.com',
          phone: '+971 4 420 0000',
          email: 'info@damac.ae',
          specialties: ['Luxury Apartments', 'Villas', 'Golf Communities', 'Branded Residences'],
          recentProjects: ['DAMAC Hills 2', 'DAMAC Lagoons', 'Paramount Tower'],
          upcomingProjects: ['DAMAC Islands', 'Cavalli Tower', 'Riverside'],
          preferredAreas: ['Business Bay', 'DAMAC Hills', 'JVC', 'Al Furjan'],
          priceRange: '800K - 25M AED',
          targetMarket: 'Luxury & Mid-Luxury',
          sustainability: true,
          awards: ['Best Luxury Developer', 'Design Excellence Award', 'Customer Choice Award'],
          lastUpdated: '2025-10-22',
          status: 'Active'
        },
        {
          id: '3',
          name: 'Nakheel',
          description: 'Master developer behind iconic projects like Palm Jumeirah',
          logo: null,
          establishedYear: 2000,
          headquarters: 'Dubai, UAE',
          totalProjects: 45,
          activeProjects: 8,
          completedProjects: 37,
          totalUnits: 28000,
          averagePrice: 4500000,
          marketShare: 15.8,
          reputationScore: 92,
          onTimeDelivery: 88,
          qualityRating: 91,
          customerSatisfaction: 87,
          website: 'www.nakheel.com',
          phone: '+971 4 390 3333',
          email: 'info@nakheel.ae',
          specialties: ['Master Communities', 'Waterfront Projects', 'Iconic Developments'],
          recentProjects: ['Deira Islands', 'The Pointe', 'Dragon Towers'],
          upcomingProjects: ['Deira Mall', 'Palm 360', 'Nad Al Sheba Gardens'],
          preferredAreas: ['Palm Jumeirah', 'Deira Islands', 'The World', 'Jumeirah Islands'],
          priceRange: '2M - 100M AED',
          targetMarket: 'Ultra-Luxury & Premium',
          sustainability: true,
          awards: ['Master Developer Award', 'Iconic Project Award', 'Innovation Leader'],
          lastUpdated: '2025-10-21',
          status: 'Active'
        },
        {
          id: '4',
          name: 'Dubai Properties',
          description: 'Government-backed developer focusing on integrated communities',
          logo: null,
          establishedYear: 2004,
          headquarters: 'Dubai, UAE',
          totalProjects: 38,
          activeProjects: 6,
          completedProjects: 32,
          totalUnits: 22000,
          averagePrice: 2100000,
          marketShare: 12.3,
          reputationScore: 86,
          onTimeDelivery: 90,
          qualityRating: 88,
          customerSatisfaction: 85,
          website: 'www.dubaiproperties.ae',
          phone: '+971 4 390 7777',
          email: 'info@dubaiproperties.ae',
          specialties: ['Mixed-Use Communities', 'Affordable Housing', 'Commercial Spaces'],
          recentProjects: ['Dubailand Oasis', 'Mudon', 'Remraam'],
          upcomingProjects: ['Serenia Residences', 'Arabian Ranches III', 'Villanova'],
          preferredAreas: ['Dubailand', 'Dubai South', 'Arabian Ranches', 'Motor City'],
          priceRange: '600K - 8M AED',
          targetMarket: 'Mid-Market & Affordable',
          sustainability: true,
          awards: ['Community Development Award', 'Affordable Housing Recognition'],
          lastUpdated: '2025-10-21',
          status: 'Active'
        },
        {
          id: '5',
          name: 'Meraas',
          description: 'Dubai-based holding company creating innovative lifestyle destinations',
          logo: null,
          establishedYear: 2007,
          headquarters: 'Dubai, UAE',
          totalProjects: 25,
          activeProjects: 7,
          completedProjects: 18,
          totalUnits: 15000,
          averagePrice: 3800000,
          marketShare: 8.7,
          reputationScore: 89,
          onTimeDelivery: 86,
          qualityRating: 92,
          customerSatisfaction: 90,
          website: 'www.meraas.com',
          phone: '+971 4 375 8888',
          email: 'info@meraas.ae',
          specialties: ['Lifestyle Destinations', 'Beachfront Living', 'Entertainment Hubs'],
          recentProjects: ['Bluewaters Island', 'La Mer', 'City Walk'],
          upcomingProjects: ['Port de La Mer', 'Marsa Al Arab', 'Al Seef Extension'],
          preferredAreas: ['JBR', 'Al Sufouh', 'Jumeirah', 'Al Seef'],
          priceRange: '1.5M - 40M AED',
          targetMarket: 'Luxury & Premium Lifestyle',
          sustainability: true,
          awards: ['Lifestyle Development Award', 'Design Innovation Award', 'Tourism Excellence'],
          lastUpdated: '2025-10-20',
          status: 'Active'
        },
        {
          id: '6',
          name: 'Sobha Realty',
          description: 'International developer known for luxury and craftsmanship',
          logo: null,
          establishedYear: 1995,
          headquarters: 'Bangalore, India / Dubai, UAE',
          totalProjects: 22,
          activeProjects: 5,
          completedProjects: 17,
          totalUnits: 12000,
          averagePrice: 2600000,
          marketShare: 6.2,
          reputationScore: 84,
          onTimeDelivery: 92,
          qualityRating: 95,
          customerSatisfaction: 89,
          website: 'www.sobharealty.com',
          phone: '+971 4 418 8888',
          email: 'info@sobharealty.ae',
          specialties: ['Luxury Apartments', 'Premium Finishes', 'Golf Communities'],
          recentProjects: ['Sobha Hartland', 'One at Palm Jumeirah', 'Sobha Creek Vistas'],
          upcomingProjects: ['Sobha Seahaven', '330 Riverside Crescent', 'Sobha Siniya Island'],
          preferredAreas: ['Mohammed Bin Rashid City', 'Palm Jumeirah', 'Dubai Water Canal'],
          priceRange: '1M - 30M AED',
          targetMarket: 'Luxury & Ultra-Luxury',
          sustainability: false,
          awards: ['Quality Excellence Award', 'Luxury Development Award', 'Craftsmanship Recognition'],
          lastUpdated: '2025-10-20',
          status: 'Active'
        }
      ]
      setDevelopers(demoDevelopers)
    } catch (error) {
      console.error('Error fetching developers:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status: string) => {
    return developerStatuses.find(s => s.id === status) || developerStatuses[0]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleViewDeveloper = (developerId: string) => {
    const developer = developers.find(d => d.id === developerId)
    if (developer) {
      setSelectedDeveloper(developer)
      setViewModalOpen(true)
    }
  }

  const handleEditDeveloper = (developerId: string) => {
    const developer = developers.find(d => d.id === developerId)
    if (developer) {
      setSelectedDeveloper(developer)
      setEditForm(developer)
      setEditModalOpen(true)
    }
  }

  const handleViewProjects = (developerId: string) => {
    const developer = developers.find(d => d.id === developerId)
    if (developer) {
      setSelectedDeveloper(developer)
      setProjectsModalOpen(true)
    }
  }

  const handleContactDeveloper = (email: string, phone: string) => {
    const developer = developers.find(d => d.email === email)
    if (developer) {
      setSelectedDeveloper(developer)
      setContactModalOpen(true)
    }
  }

  const handleAnalyzePerformance = (developerId: string) => {
    const developer = developers.find(d => d.id === developerId)
    if (developer) {
      setSelectedDeveloper(developer)
      setAnalyticsModalOpen(true)
    }
  }

  const handleRefreshData = () => {
    setLoading(true)
    setTimeout(() => {
      fetchDevelopers()
    }, 1000)
  }

  const handleExportReport = () => {
    const csvData = developers.map(dev => ({
      Name: dev.name,
      ReputationScore: dev.reputationScore,
      MarketShare: dev.marketShare,
      TotalProjects: dev.totalProjects,
      ActiveProjects: dev.activeProjects,
      OnTimeDelivery: dev.onTimeDelivery,
      QualityRating: dev.qualityRating,
      CustomerSatisfaction: dev.customerSatisfaction,
      AveragePrice: dev.averagePrice,
      TargetMarket: dev.targetMarket,
      Status: dev.status
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `developers-report-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleSaveDeveloper = async () => {
    if (!selectedDeveloper || !editForm.name) return
    
    setIsSubmitting(true)
    try {
      const updatedDevelopers = developers.map(dev => 
        dev.id === selectedDeveloper.id 
          ? { ...dev, ...editForm }
          : dev
      )
      setDevelopers(updatedDevelopers)
      setEditModalOpen(false)
      setSelectedDeveloper(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving developer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddNewDeveloper = () => {
    setSelectedDeveloper(null)
    setEditForm({})
    setAddModalOpen(true)
  }

  const filteredDevelopers = developers.filter(developer => {
    const matchesSearch = developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         developer.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || developer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Sort developers
  const sortedDevelopers = [...filteredDevelopers].sort((a, b) => {
    switch (sortBy) {
      case 'reputation':
        return b.reputationScore - a.reputationScore
      case 'market_share':
        return b.marketShare - a.marketShare
      case 'projects':
        return b.totalProjects - a.totalProjects
      case 'satisfaction':
        return b.customerSatisfaction - a.customerSatisfaction
      case 'delivery':
        return b.onTimeDelivery - a.onTimeDelivery
      default:
        return a.name.localeCompare(b.name)
    }
  })

  // Calculate summary statistics
  const totalProjects = filteredDevelopers.reduce((sum, dev) => sum + dev.totalProjects, 0)
  const avgReputation = filteredDevelopers.length > 0 
    ? filteredDevelopers.reduce((sum, dev) => sum + dev.reputationScore, 0) / filteredDevelopers.length 
    : 0
  const totalMarketShare = filteredDevelopers.reduce((sum, dev) => sum + dev.marketShare, 0)

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Property Developers</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Property Developers</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleAddNewDeveloper}>
            <Plus className="h-4 w-4 mr-2" />
            Add Developer
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Developers</p>
                <p className="text-2xl font-bold text-blue-600">{filteredDevelopers.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-green-600">{totalProjects}</p>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Market Coverage</p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalMarketShare.toFixed(1)}%
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
                <p className="text-sm font-medium text-gray-600">Avg Reputation</p>
                <p className={`text-2xl font-bold ${getScoreColor(avgReputation)}`}>
                  {avgReputation.toFixed(0)}
                </p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Sorting */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search developers..."
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
          <option value="all">All Statuses</option>
          {developerStatuses.map(status => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="reputation">Reputation Score</option>
          <option value="market_share">Market Share</option>
          <option value="projects">Total Projects</option>
          <option value="satisfaction">Customer Satisfaction</option>
          <option value="delivery">On-Time Delivery</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Developers List */}
      <div className="space-y-4">
        {sortedDevelopers.map((developer) => {
          const statusInfo = getStatusInfo(developer.status)
          
          return (
            <Card key={developer.id} className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-purple-600" />
                      <h4 className="font-medium text-xl">{developer.name}</h4>
                      <Badge className={statusInfo.color}>
                        {statusInfo.name}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className={`h-4 w-4 ${getScoreColor(developer.reputationScore)}`} />
                        <span className={`text-sm font-medium ${getScoreColor(developer.reputationScore)}`}>
                          {developer.reputationScore}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {developer.marketShare}% market share
                      </span>
                    </div>
                    
                    <p className="text-gray-600">{developer.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Company Info</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Established:</span>
                            <span className="font-medium">{developer.establishedYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">HQ:</span>
                            <span className="font-medium">{developer.headquarters}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Target:</span>
                            <span className="font-medium">{developer.targetMarket}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {developer.sustainability ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-gray-400" />
                            )}
                            <span className="text-xs">Sustainability</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Projects & Performance</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Projects:</span>
                            <span className="font-medium">{developer.totalProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Active:</span>
                            <span className="font-medium text-green-600">{developer.activeProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Completed:</span>
                            <span className="font-medium text-blue-600">{developer.completedProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Units:</span>
                            <span className="font-medium">{developer.totalUnits.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Ratings & Metrics</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">On-Time Delivery:</span>
                            <span className={`font-medium ${getScoreColor(developer.onTimeDelivery)}`}>
                              {developer.onTimeDelivery}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Quality Rating:</span>
                            <span className={`font-medium ${getScoreColor(developer.qualityRating)}`}>
                              {developer.qualityRating}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Customer Satisfaction:</span>
                            <span className={`font-medium ${getScoreColor(developer.customerSatisfaction)}`}>
                              {developer.customerSatisfaction}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg Price:</span>
                            <span className="font-medium">{formatCurrency(developer.averagePrice)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Specialties & Contact</h5>
                        <div className="space-y-2 text-xs">
                          <div>
                            <strong>Specialties:</strong>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {developer.specialties.slice(0, 2).map((specialty, index) => (
                                <span key={index} className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">
                                  {specialty}
                                </span>
                              ))}
                              {developer.specialties.length > 2 && (
                                <span className="text-gray-500">+{developer.specialties.length - 2}</span>
                              )}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <button 
                              className="flex items-center gap-1 hover:text-blue-600 transition-colors text-xs"
                              onClick={() => handleContactDeveloper(developer.email, developer.phone)}
                            >
                              <Mail className="h-3 w-3" />
                              {developer.email}
                            </button>
                            <button 
                              className="flex items-center gap-1 hover:text-green-600 transition-colors text-xs"
                              onClick={() => handleContactDeveloper(developer.email, developer.phone)}
                            >
                              <Phone className="h-3 w-3" />
                              {developer.phone}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {developer.awards.length > 0 && (
                      <div className="p-3 bg-yellow-50 rounded-md">
                        <div className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div className="text-sm">
                            <strong>Recent Awards:</strong>
                            <div className="mt-1 text-gray-600">
                              {developer.awards.slice(0, 3).join(' • ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button 
                      size="sm"
                      onClick={() => handleAnalyzePerformance(developer.id)}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analyze
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProjects(developer.id)}
                    >
                      <Building className="h-4 w-4 mr-1" />
                      Projects
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDeveloper(developer.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditDeveloper(developer.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {sortedDevelopers.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No developers found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Developer data will appear here.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* View Developer Details Modal */}
      {viewModalOpen && selectedDeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDeveloper.name} - Developer Profile</h2>
                <Button variant="ghost" size="sm" onClick={() => setViewModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-purple-600" />
                      Company Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Established:</span>
                      <span className="font-semibold">{selectedDeveloper.establishedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Headquarters:</span>
                      <span className="font-semibold">{selectedDeveloper.headquarters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Share:</span>
                      <span className="font-semibold text-purple-600">{selectedDeveloper.marketShare}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusInfo(selectedDeveloper.status).color}>
                        {selectedDeveloper.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reputation Score:</span>
                      <span className={`font-semibold ${getScoreColor(selectedDeveloper.reputationScore)}`}>
                        {selectedDeveloper.reputationScore}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quality Rating:</span>
                      <span className={`font-semibold ${getScoreColor(selectedDeveloper.qualityRating)}`}>
                        {selectedDeveloper.qualityRating}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">On-Time Delivery:</span>
                      <span className={`font-semibold ${getScoreColor(selectedDeveloper.onTimeDelivery)}`}>
                        {selectedDeveloper.onTimeDelivery}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Satisfaction:</span>
                      <span className={`font-semibold ${getScoreColor(selectedDeveloper.customerSatisfaction)}`}>
                        {selectedDeveloper.customerSatisfaction}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      Project Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Projects:</span>
                      <span className="font-semibold">{selectedDeveloper.totalProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Projects:</span>
                      <span className="font-semibold text-green-600">{selectedDeveloper.activeProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold text-blue-600">{selectedDeveloper.completedProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Units:</span>
                      <span className="font-semibold">{selectedDeveloper.totalUnits.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Specialties & Target Market</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Core Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDeveloper.specialties.map((specialty, index) => (
                          <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Market Focus</h4>
                      <p className="text-gray-600">{selectedDeveloper.targetMarket}</p>
                      <p className="text-sm text-gray-500 mt-1">Price Range: {selectedDeveloper.priceRange}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <a href={`https://${selectedDeveloper.website}`} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        {selectedDeveloper.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span>{selectedDeveloper.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <span>{selectedDeveloper.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>{selectedDeveloper.headquarters}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedDeveloper.recentProjects.map((project, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{project}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedDeveloper.upcomingProjects.map((project, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">{project}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedDeveloper.awards.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      Awards & Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {selectedDeveloper.awards.map((award, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                          <Award className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">{award}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="text-sm text-gray-500">
                Last updated: {new Date(selectedDeveloper.lastUpdated).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditDeveloper(selectedDeveloper.id)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Developer
                </Button>
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleAnalyzePerformance(selectedDeveloper.id)}}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Performance Analysis
                </Button>
                <Button onClick={() => {setViewModalOpen(false); handleContactDeveloper(selectedDeveloper.email, selectedDeveloper.phone)}}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Developer Modal */}
      {editModalOpen && selectedDeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Developer - {selectedDeveloper.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <Input
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.status || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value as 'Active' | 'Inactive' | 'Suspended' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Headquarters</label>
                  <Input
                    value={editForm.headquarters || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, headquarters: e.target.value }))}
                    placeholder="Enter headquarters location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>
                  <Input
                    value={editForm.targetMarket || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, targetMarket: e.target.value }))}
                    placeholder="Enter target market"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <Input
                    value={editForm.website || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="Enter website URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <Input
                    value={editForm.priceRange || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, priceRange: e.target.value }))}
                    placeholder="Enter price range"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reputation Score (0-100)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.reputationScore || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, reputationScore: parseInt(e.target.value) }))}
                    placeholder="Enter reputation score"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quality Rating (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.qualityRating || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, qualityRating: parseInt(e.target.value) }))}
                    placeholder="Enter quality rating"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Satisfaction (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.customerSatisfaction || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, customerSatisfaction: parseInt(e.target.value) }))}
                    placeholder="Enter satisfaction percentage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">On-Time Delivery (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.onTimeDelivery || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, onTimeDelivery: parseInt(e.target.value) }))}
                    placeholder="Enter delivery percentage"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter company description"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sustainability"
                  checked={editForm.sustainability || false}
                  onChange={(e) => setEditForm(prev => ({ ...prev, sustainability: e.target.checked }))}
                  className="h-4 w-4"
                />
                <label htmlFor="sustainability" className="text-sm font-medium text-gray-700">
                  Sustainability Certified
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveDeveloper} disabled={isSubmitting}>
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

      {/* Performance Analytics Modal */}
      {analyticsModalOpen && selectedDeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDeveloper.name} - Performance Analytics</h2>
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
                        <p className="text-sm text-gray-600">Developer Grade</p>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedDeveloper.reputationScore >= 90 ? 'A+' :
                           selectedDeveloper.reputationScore >= 85 ? 'A' :
                           selectedDeveloper.reputationScore >= 80 ? 'B+' : 'B'}
                        </p>
                      </div>
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Market Position</p>
                        <p className="text-2xl font-bold text-blue-600">{selectedDeveloper.marketShare}%</p>
                      </div>
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Project Success</p>
                        <p className="text-2xl font-bold text-purple-600">{Math.round(selectedDeveloper.completedProjects / selectedDeveloper.totalProjects * 100)}%</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Portfolio Value</p>
                        <p className="text-2xl font-bold text-orange-600">{formatCurrency(selectedDeveloper.averagePrice * selectedDeveloper.totalUnits)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-blue-600" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Reputation Score</span>
                        <span className={`font-semibold ${getScoreColor(selectedDeveloper.reputationScore)}`}>
                          {selectedDeveloper.reputationScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${selectedDeveloper.reputationScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Quality Rating</span>
                        <span className={`font-semibold ${getScoreColor(selectedDeveloper.qualityRating)}`}>
                          {selectedDeveloper.qualityRating}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${selectedDeveloper.qualityRating}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">On-Time Delivery</span>
                        <span className={`font-semibold ${getScoreColor(selectedDeveloper.onTimeDelivery)}`}>
                          {selectedDeveloper.onTimeDelivery}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${selectedDeveloper.onTimeDelivery}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Customer Satisfaction</span>
                        <span className={`font-semibold ${getScoreColor(selectedDeveloper.customerSatisfaction)}`}>
                          {selectedDeveloper.customerSatisfaction}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${selectedDeveloper.customerSatisfaction}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-green-600" />
                      Portfolio Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedDeveloper.totalProjects}</div>
                        <div className="text-sm text-gray-600">Total Projects</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedDeveloper.activeProjects}</div>
                        <div className="text-sm text-gray-600">Active Projects</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Project Success Rate:</span>
                        <span className="font-semibold text-green-600">
                          {Math.round(selectedDeveloper.completedProjects / selectedDeveloper.totalProjects * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Units Delivered:</span>
                        <span className="font-semibold">{selectedDeveloper.totalUnits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Project Size:</span>
                        <span className="font-semibold">{Math.round(selectedDeveloper.totalUnits / selectedDeveloper.totalProjects)} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Years in Market:</span>
                        <span className="font-semibold">{new Date().getFullYear() - selectedDeveloper.establishedYear} years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Market Intelligence & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Strengths</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• High reputation score ({selectedDeveloper.reputationScore})</li>
                        <li>• Strong market presence ({selectedDeveloper.marketShare}%)</li>
                        <li>• {selectedDeveloper.totalProjects} projects portfolio</li>
                        <li>• {selectedDeveloper.sustainability ? 'Sustainability certified' : 'Quality focused'}</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Opportunities</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Expand to new areas</li>
                        <li>• Improve delivery timelines</li>
                        <li>• Enhance customer satisfaction</li>
                        <li>• Diversify project types</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Investment Rating</span>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {selectedDeveloper.reputationScore >= 90 && selectedDeveloper.onTimeDelivery >= 85 ? 'A+' :
                           selectedDeveloper.reputationScore >= 85 && selectedDeveloper.onTimeDelivery >= 80 ? 'A' :
                           selectedDeveloper.reputationScore >= 80 && selectedDeveloper.onTimeDelivery >= 75 ? 'B+' : 'B'}
                        </div>
                        <div className="text-sm text-gray-600">Partnership Grade</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Risk Level: {selectedDeveloper.reputationScore >= 85 ? 'Low' : 'Medium'}
                        </div>
                      </div>
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
                const report = `Performance Analysis Report - ${selectedDeveloper.name}\\n\\nKey Metrics:\\n- Reputation Score: ${selectedDeveloper.reputationScore}/100\\n- Market Share: ${selectedDeveloper.marketShare}%\\n- Quality Rating: ${selectedDeveloper.qualityRating}%\\n- On-Time Delivery: ${selectedDeveloper.onTimeDelivery}%\\n- Customer Satisfaction: ${selectedDeveloper.customerSatisfaction}%\\n- Partnership Grade: ${selectedDeveloper.reputationScore >= 90 && selectedDeveloper.onTimeDelivery >= 85 ? 'A+' : selectedDeveloper.reputationScore >= 85 && selectedDeveloper.onTimeDelivery >= 80 ? 'A' : 'B+'}`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `${selectedDeveloper.name}-performance-analysis.txt`
                link.click()
                window.URL.revokeObjectURL(url)
              }}>
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Developer Projects Modal */}
      {projectsModalOpen && selectedDeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDeveloper.name} - Project Portfolio</h2>
                <Button variant="ghost" size="sm" onClick={() => setProjectsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Total Projects: <strong>{selectedDeveloper.totalProjects}</strong></span>
                  <span>Active: <strong className="text-green-600">{selectedDeveloper.activeProjects}</strong></span>
                  <span>Completed: <strong className="text-blue-600">{selectedDeveloper.completedProjects}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedDeveloper.recentProjects.map((project, index) => (
                        <Card key={index} className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4 text-green-600" />
                                  <h4 className="font-medium">{project}</h4>
                                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                                </div>
                                <p className="text-sm text-gray-600">Premium development project</p>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <span className="text-gray-600">Status: </span>
                                    <span className="font-medium text-green-600">Delivered</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Units: </span>
                                    <span className="font-medium">{100 + (index * 50)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedDeveloper.upcomingProjects.map((project, index) => (
                        <Card key={index} className="border-l-4 border-l-orange-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-orange-600" />
                                  <h4 className="font-medium">{project}</h4>
                                  <Badge className="bg-orange-100 text-orange-800">In Development</Badge>
                                </div>
                                <p className="text-sm text-gray-600">Upcoming development project</p>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <span className="text-gray-600">Status: </span>
                                    <span className="font-medium text-orange-600">Planning</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Expected: </span>
                                    <span className="font-medium">Q{Math.ceil(Math.random() * 4)} 2025</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Preferred Development Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedDeveloper.preferredAreas.map((area, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setProjectsModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Project
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Developer Modal */}
      {contactModalOpen && selectedDeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Contact {selectedDeveloper.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setContactModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Direct Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" onClick={() => window.location.href = `mailto:${selectedDeveloper.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email: {selectedDeveloper.email}
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = `tel:${selectedDeveloper.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call: {selectedDeveloper.phone}
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => window.open(`https://${selectedDeveloper.website}`, '_blank')}>
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website: {selectedDeveloper.website}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>Partnership Inquiry</option>
                        <option>Project Discussion</option>
                        <option>Investment Opportunity</option>
                        <option>General Information</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={4}
                        placeholder="Enter your message..."
                      />
                    </div>
                    <Button className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Meeting Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>In-Person Meeting</option>
                      <option>Video Conference</option>
                      <option>Phone Call</option>
                      <option>Site Visit</option>
                    </select>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setContactModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Save Contact
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}