'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  MapPin,
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
  Activity,
  Target,
  Home,
  Zap,
  RefreshCw,
  Download,
  Filter,
  X,
  Save,
  Upload,
  Settings,
  PieChart,
  Calculator,
  FileText,
  Mail,
  Phone,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Clock,
  Award,
  AlertCircle,
  TrendingDown,
  Gauge,
  Globe,
  Route,
  Train,
  Car,
  Plane
} from 'lucide-react'

interface Area {
  id: string
  name: string
  description: string
  totalProperties: number
  activeListings: number
  soldThisMonth: number
  averagePrice: number
  averagePricePerSqft: number
  averageROI: number
  rentalYield: number
  marketTrend: 'up' | 'down' | 'stable'
  popularityScore: number
  priceGrowth: number
  demandLevel: 'High' | 'Medium' | 'Low'
  supplyLevel: 'High' | 'Medium' | 'Low'
  investorInterest: number
  amenities: string[]
  nearbyLandmarks: string[]
  transportLinks: string[]
  developmentStatus: string
  lastUpdated: string
}

const marketTrends = [
  { id: 'up', name: 'Rising', color: 'text-green-600', icon: TrendingUp },
  { id: 'down', name: 'Declining', color: 'text-red-600', icon: TrendingUp },
  { id: 'stable', name: 'Stable', color: 'text-blue-600', icon: Activity }
]

const demandColors = {
  'High': 'bg-red-100 text-red-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'Low': 'bg-green-100 text-green-800'
}

export default function PropertyAreasPage() {
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [filterDemand, setFilterDemand] = useState('all')
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [propertiesModalOpen, setPropertiesModalOpen] = useState(false)
  const [compareModalOpen, setCompareModalOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState<Area | null>(null)
  const [editForm, setEditForm] = useState<Partial<Area>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchAreas()
  }, [])

  const fetchAreas = async () => {
    try {
      // Demo data for Dubai areas
      const demoAreas: Area[] = [
        {
          id: '1',
          name: 'Downtown Dubai',
          description: 'Premium urban district with iconic landmarks and luxury living',
          totalProperties: 245,
          activeListings: 89,
          soldThisMonth: 23,
          averagePrice: 3200000,
          averagePricePerSqft: 1200,
          averageROI: 8.5,
          rentalYield: 6.2,
          marketTrend: 'up',
          popularityScore: 95,
          priceGrowth: 12.5,
          demandLevel: 'High',
          supplyLevel: 'Medium',
          investorInterest: 92,
          amenities: ['Burj Khalifa', 'Dubai Mall', 'Metro Station', 'Fine Dining', 'Luxury Hotels'],
          nearbyLandmarks: ['Burj Khalifa', 'Dubai Mall', 'Opera House', 'DIFC'],
          transportLinks: ['Dubai Metro Red Line', 'Major Bus Routes', 'Sheikh Zayed Road'],
          developmentStatus: 'Mature',
          lastUpdated: '2025-10-22'
        },
        {
          id: '2',
          name: 'Dubai Marina',
          description: 'Waterfront living with stunning views and vibrant nightlife',
          totalProperties: 189,
          activeListings: 67,
          soldThisMonth: 18,
          averagePrice: 2800000,
          averagePricePerSqft: 1050,
          averageROI: 7.8,
          rentalYield: 6.8,
          marketTrend: 'up',
          popularityScore: 88,
          priceGrowth: 8.2,
          demandLevel: 'High',
          supplyLevel: 'High',
          investorInterest: 85,
          amenities: ['Marina Walk', 'Beach Access', 'Restaurants', 'Metro Station', 'Shopping'],
          nearbyLandmarks: ['JBR Beach', 'Ain Dubai', 'Marina Mall', 'Yacht Club'],
          transportLinks: ['Dubai Metro Red Line', 'Tram System', 'Water Taxi'],
          developmentStatus: 'Mature',
          lastUpdated: '2025-10-22'
        },
        {
          id: '3',
          name: 'Palm Jumeirah',
          description: 'Exclusive island lifestyle with luxury villas and apartments',
          totalProperties: 156,
          activeListings: 45,
          soldThisMonth: 12,
          averagePrice: 5200000,
          averagePricePerSqft: 1400,
          averageROI: 9.2,
          rentalYield: 5.8,
          marketTrend: 'up',
          popularityScore: 92,
          priceGrowth: 15.3,
          demandLevel: 'High',
          supplyLevel: 'Low',
          investorInterest: 95,
          amenities: ['Private Beach', 'Luxury Resorts', 'Fine Dining', 'Spa Services', 'Water Sports'],
          nearbyLandmarks: ['Atlantis Hotel', 'Nakheel Mall', 'Pointe', 'Club Vista Mare'],
          transportLinks: ['Palm Monorail', 'Private Car Access', 'Water Taxi'],
          developmentStatus: 'Mature',
          lastUpdated: '2025-10-22'
        },
        {
          id: '4',
          name: 'Business Bay',
          description: 'Modern business district with mixed-use developments',
          totalProperties: 134,
          activeListings: 52,
          soldThisMonth: 15,
          averagePrice: 1900000,
          averagePricePerSqft: 950,
          averageROI: 7.2,
          rentalYield: 7.5,
          marketTrend: 'stable',
          popularityScore: 78,
          priceGrowth: 5.8,
          demandLevel: 'Medium',
          supplyLevel: 'High',
          investorInterest: 72,
          amenities: ['Business Hub', 'Canal Views', 'Metro Access', 'Shopping', 'Dining'],
          nearbyLandmarks: ['Business Bay Metro', 'Dubai Canal', 'DIFC', 'Burj Khalifa'],
          transportLinks: ['Dubai Metro Red Line', 'Major Road Access', 'RTA Bus'],
          developmentStatus: 'Growing',
          lastUpdated: '2025-10-21'
        },
        {
          id: '5',
          name: 'JBR (Jumeirah Beach Residence)',
          description: 'Beachfront community with resort-style living',
          totalProperties: 98,
          activeListings: 38,
          soldThisMonth: 10,
          averagePrice: 2400000,
          averagePricePerSqft: 1100,
          averageROI: 6.9,
          rentalYield: 6.5,
          marketTrend: 'stable',
          popularityScore: 82,
          priceGrowth: 4.2,
          demandLevel: 'Medium',
          supplyLevel: 'Medium',
          investorInterest: 78,
          amenities: ['Beach Access', 'The Walk', 'Restaurants', 'Tram Station', 'Retail'],
          nearbyLandmarks: ['The Beach', 'Ain Dubai', 'Marina Walk', 'Bluewaters Island'],
          transportLinks: ['Dubai Tram', 'Metro Access', 'Beach Road'],
          developmentStatus: 'Mature',
          lastUpdated: '2025-10-21'
        },
        {
          id: '6',
          name: 'DIFC (Dubai International Financial Centre)',
          description: 'Premium financial district with luxury residential options',
          totalProperties: 67,
          activeListings: 22,
          soldThisMonth: 8,
          averagePrice: 4100000,
          averagePricePerSqft: 1350,
          averageROI: 8.8,
          rentalYield: 5.2,
          marketTrend: 'up',
          popularityScore: 89,
          priceGrowth: 11.7,
          demandLevel: 'High',
          supplyLevel: 'Low',
          investorInterest: 88,
          amenities: ['Financial Hub', 'Art Gallery', 'Fine Dining', 'Metro Access', 'Premium Offices'],
          nearbyLandmarks: ['Emirates Towers', 'Gate Village', 'ICD Brookfield', 'DIFC Courts'],
          transportLinks: ['Emirates Towers Metro', 'Financial Centre Metro', 'Sheikh Zayed Road'],
          developmentStatus: 'Established',
          lastUpdated: '2025-10-22'
        }
      ]
      setAreas(demoAreas)
    } catch (error) {
      console.error('Error fetching areas:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTrendInfo = (trend: string) => {
    return marketTrends.find(t => t.id === trend) || marketTrends[2]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getPopularityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleViewArea = (areaId: string) => {
    const area = areas.find(a => a.id === areaId)
    if (area) {
      setSelectedArea(area)
      setViewModalOpen(true)
    }
  }

  const handleEditArea = (areaId: string) => {
    const area = areas.find(a => a.id === areaId)
    if (area) {
      setSelectedArea(area)
      setEditForm(area)
      setEditModalOpen(true)
    }
  }

  const handleViewProperties = (areaId: string) => {
    const area = areas.find(a => a.id === areaId)
    if (area) {
      setSelectedArea(area)
      setPropertiesModalOpen(true)
    }
  }

  const handleAnalyzeMarket = (areaId: string) => {
    const area = areas.find(a => a.id === areaId)
    if (area) {
      setSelectedArea(area)
      setAnalyticsModalOpen(true)
    }
  }

  const handleRefreshData = () => {
    setLoading(true)
    setTimeout(() => {
      fetchAreas()
    }, 1000)
  }

  const handleExportReport = () => {
    const csvData = areas.map(area => ({
      Name: area.name,
      TotalProperties: area.totalProperties,
      ActiveListings: area.activeListings,
      AveragePrice: area.averagePrice,
      ROI: area.averageROI,
      RentalYield: area.rentalYield,
      PopularityScore: area.popularityScore,
      PriceGrowth: area.priceGrowth,
      DemandLevel: area.demandLevel,
      MarketTrend: area.marketTrend
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `areas-report-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleSaveArea = async () => {
    if (!selectedArea || !editForm.name) return
    
    setIsSubmitting(true)
    try {
      const updatedAreas = areas.map(area => 
        area.id === selectedArea.id 
          ? { ...area, ...editForm }
          : area
      )
      setAreas(updatedAreas)
      setEditModalOpen(false)
      setSelectedArea(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving area:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddNewArea = () => {
    setSelectedArea(null)
    setEditForm({})
    setAddModalOpen(true)
  }

  const filteredAreas = areas.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         area.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDemand = filterDemand === 'all' || area.demandLevel === filterDemand
    return matchesSearch && matchesDemand
  })

  // Sort areas
  const sortedAreas = [...filteredAreas].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularityScore - a.popularityScore
      case 'price':
        return b.averagePrice - a.averagePrice
      case 'roi':
        return b.averageROI - a.averageROI
      case 'growth':
        return b.priceGrowth - a.priceGrowth
      case 'properties':
        return b.totalProperties - a.totalProperties
      default:
        return a.name.localeCompare(b.name)
    }
  })

  // Calculate summary statistics
  const totalProperties = filteredAreas.reduce((sum, area) => sum + area.totalProperties, 0)
  const avgPrice = filteredAreas.length > 0 
    ? filteredAreas.reduce((sum, area) => sum + area.averagePrice, 0) / filteredAreas.length 
    : 0
  const avgROI = filteredAreas.length > 0 
    ? filteredAreas.reduce((sum, area) => sum + area.averageROI, 0) / filteredAreas.length 
    : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Property Areas</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Property Areas Analysis</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleAddNewArea}>
            <Plus className="h-4 w-4 mr-2" />
            Add Area
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-blue-600">{totalProperties}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Areas Tracked</p>
                <p className="text-2xl font-bold text-green-600">{filteredAreas.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Property Price</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(avgPrice)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg ROI</p>
                <p className="text-2xl font-bold text-orange-600">
                  {avgROI.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Sorting */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search areas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={filterDemand}
          onChange={(e) => setFilterDemand(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Demand Levels</option>
          <option value="High">High Demand</option>
          <option value="Medium">Medium Demand</option>
          <option value="Low">Low Demand</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="popularity">Popularity Score</option>
          <option value="price">Average Price</option>
          <option value="roi">ROI</option>
          <option value="growth">Price Growth</option>
          <option value="properties">Property Count</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Areas List */}
      <div className="space-y-4">
        {sortedAreas.map((area) => {
          const trendInfo = getTrendInfo(area.marketTrend)
          const TrendIcon = trendInfo.icon
          
          return (
            <Card key={area.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium text-xl">{area.name}</h4>
                      <Badge className={demandColors[area.demandLevel]}>
                        {area.demandLevel} Demand
                      </Badge>
                      <div className="flex items-center gap-1">
                        <TrendIcon className={`h-4 w-4 ${trendInfo.color}`} />
                        <span className={`text-sm font-medium ${trendInfo.color}`}>
                          {trendInfo.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className={`h-4 w-4 ${getPopularityColor(area.popularityScore)}`} />
                        <span className={`text-sm font-medium ${getPopularityColor(area.popularityScore)}`}>
                          {area.popularityScore}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600">{area.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Market Metrics</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Properties:</span>
                            <span className="font-medium">{area.totalProperties}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Active:</span>
                            <span className="font-medium text-green-600">{area.activeListings}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sold (Month):</span>
                            <span className="font-medium text-blue-600">{area.soldThisMonth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Supply:</span>
                            <span className="font-medium">{area.supplyLevel}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Pricing & Returns</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg Price:</span>
                            <span className="font-medium">{formatCurrency(area.averagePrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Per Sqft:</span>
                            <span className="font-medium">{formatCurrency(area.averagePricePerSqft)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">ROI:</span>
                            <span className="font-medium text-purple-600">{area.averageROI}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rental Yield:</span>
                            <span className="font-medium text-green-600">{area.rentalYield}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Growth & Interest</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price Growth:</span>
                            <span className="font-medium text-green-600">+{area.priceGrowth}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Investor Interest:</span>
                            <span className="font-medium">{area.investorInterest}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Development:</span>
                            <span className="font-medium">{area.developmentStatus}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Updated:</span>
                            <span className="text-gray-500">{new Date(area.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Key Features</h5>
                        <div className="space-y-1 text-xs">
                          <div>
                            <strong>Amenities:</strong>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {area.amenities.slice(0, 3).map((amenity, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                  {amenity}
                                </span>
                              ))}
                              {area.amenities.length > 3 && (
                                <span className="text-gray-500">+{area.amenities.length - 3} more</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <strong>Transport:</strong>
                            <div className="text-gray-600">{area.transportLinks.slice(0, 2).join(', ')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button 
                      size="sm"
                      onClick={() => handleAnalyzeMarket(area.id)}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analyze
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProperties(area.id)}
                    >
                      <Building className="h-4 w-4 mr-1" />
                      Properties
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewArea(area.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditArea(area.id)}
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

        {sortedAreas.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No areas found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterDemand !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Property area data will appear here.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* View Area Details Modal */}
      {viewModalOpen && selectedArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedArea.name} - Area Analysis</h2>
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
                      <Building className="h-5 w-5 text-blue-600" />
                      Property Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Properties:</span>
                      <span className="font-semibold">{selectedArea.totalProperties}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Listings:</span>
                      <span className="font-semibold text-green-600">{selectedArea.activeListings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sold This Month:</span>
                      <span className="font-semibold text-blue-600">{selectedArea.soldThisMonth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Supply Level:</span>
                      <Badge className={demandColors[selectedArea.supplyLevel as keyof typeof demandColors]}>
                        {selectedArea.supplyLevel}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Financial Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Price:</span>
                      <span className="font-semibold">{formatCurrency(selectedArea.averagePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price/Sqft:</span>
                      <span className="font-semibold">{formatCurrency(selectedArea.averagePricePerSqft)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-semibold text-purple-600">{selectedArea.averageROI}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rental Yield:</span>
                      <span className="font-semibold text-green-600">{selectedArea.rentalYield}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      Market Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price Growth:</span>
                      <span className="font-semibold text-green-600">+{selectedArea.priceGrowth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Popularity Score:</span>
                      <span className={`font-semibold ${getPopularityColor(selectedArea.popularityScore)}`}>
                        {selectedArea.popularityScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investor Interest:</span>
                      <span className="font-semibold">{selectedArea.investorInterest}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Demand Level:</span>
                      <Badge className={demandColors[selectedArea.demandLevel]}>
                        {selectedArea.demandLevel}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedArea.amenities.map((amenity, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transport Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedArea.transportLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Train className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{link}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Nearby Landmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedArea.nearbyLandmarks.map((landmark, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span className="text-sm">{landmark}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="text-sm text-gray-500">
                Last updated: {new Date(selectedArea.lastUpdated).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditArea(selectedArea.id)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Area
                </Button>
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleAnalyzeMarket(selectedArea.id)}}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Market Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Area Modal */}
      {editModalOpen && selectedArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Area - {selectedArea.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area Name</label>
                  <Input
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter area name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Development Status</label>
                  <select
                    value={editForm.developmentStatus || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, developmentStatus: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Status</option>
                    <option value="Mature">Mature</option>
                    <option value="Growing">Growing</option>
                    <option value="Established">Established</option>
                    <option value="Emerging">Emerging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Demand Level</label>
                  <select
                    value={editForm.demandLevel || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, demandLevel: e.target.value as 'High' | 'Medium' | 'Low' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Demand</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supply Level</label>
                  <select
                    value={editForm.supplyLevel || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, supplyLevel: e.target.value as 'High' | 'Medium' | 'Low' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Supply</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Average Price (AED)</label>
                  <Input
                    type="number"
                    value={editForm.averagePrice || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, averagePrice: parseInt(e.target.value) }))}
                    placeholder="Enter average price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ROI (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editForm.averageROI || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, averageROI: parseFloat(e.target.value) }))}
                    placeholder="Enter ROI percentage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rental Yield (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editForm.rentalYield || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, rentalYield: parseFloat(e.target.value) }))}
                    placeholder="Enter rental yield"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Popularity Score</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.popularityScore || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, popularityScore: parseInt(e.target.value) }))}
                    placeholder="Enter score (0-100)"
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
                  placeholder="Enter area description"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveArea} disabled={isSubmitting}>
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

      {/* Market Analytics Modal */}
      {analyticsModalOpen && selectedArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedArea.name} - Market Analytics</h2>
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
                        <p className="text-sm text-gray-600">Market Score</p>
                        <p className="text-2xl font-bold text-green-600">{selectedArea.popularityScore}/100</p>
                      </div>
                      <Gauge className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Price Velocity</p>
                        <p className="text-2xl font-bold text-blue-600">+{selectedArea.priceGrowth}%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Investment Rating</p>
                        <p className="text-2xl font-bold text-purple-600">{selectedArea.investorInterest}%</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Market Liquidity</p>
                        <p className="text-2xl font-bold text-orange-600">{Math.round((selectedArea.soldThisMonth / selectedArea.activeListings) * 100)}%</p>
                      </div>
                      <Activity className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-blue-600" />
                      Supply & Demand Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Demand Pressure</span>
                        <Badge className={demandColors[selectedArea.demandLevel]}>
                          {selectedArea.demandLevel}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${selectedArea.demandLevel === 'High' ? 80 : selectedArea.demandLevel === 'Medium' ? 50 : 20}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Supply Volume</span>
                        <Badge className={demandColors[selectedArea.supplyLevel as keyof typeof demandColors]}>
                          {selectedArea.supplyLevel}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${selectedArea.supplyLevel === 'High' ? 80 : selectedArea.supplyLevel === 'Medium' ? 50 : 20}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Market Balance Score:</span>
                        <span className="font-semibold text-purple-600">
                          {selectedArea.demandLevel === 'High' && selectedArea.supplyLevel === 'Low' ? '95/100' :
                           selectedArea.demandLevel === 'High' && selectedArea.supplyLevel === 'Medium' ? '85/100' :
                           selectedArea.demandLevel === 'Medium' && selectedArea.supplyLevel === 'Medium' ? '70/100' : '60/100'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-green-600" />
                      Investment Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedArea.averageROI}%</div>
                        <div className="text-sm text-gray-600">Annual ROI</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedArea.rentalYield}%</div>
                        <div className="text-sm text-gray-600">Rental Yield</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price Appreciation (YoY):</span>
                        <span className="font-semibold text-green-600">+{selectedArea.priceGrowth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Market Cap Rate:</span>
                        <span className="font-semibold">{(selectedArea.rentalYield - 2).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Payback Period:</span>
                        <span className="font-semibold">{Math.round(100/selectedArea.averageROI)} years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Market Recommendations
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
                        <li>• High popularity score ({selectedArea.popularityScore})</li>
                        <li>• Strong ROI performance ({selectedArea.averageROI}%)</li>
                        <li>• Growing market trend</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Opportunities</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Monitor supply levels</li>
                        <li>• Track price movements</li>
                        <li>• Assess new developments</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Investment Grade</span>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {selectedArea.averageROI > 8 && selectedArea.popularityScore > 85 ? 'A+' :
                           selectedArea.averageROI > 7 && selectedArea.popularityScore > 80 ? 'A' :
                           selectedArea.averageROI > 6 && selectedArea.popularityScore > 70 ? 'B+' : 'B'}
                        </div>
                        <div className="text-sm text-gray-600">Investment Rating</div>
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
                const report = `Market Analysis Report - ${selectedArea.name}\\n\\nKey Metrics:\\n- ROI: ${selectedArea.averageROI}%\\n- Popularity: ${selectedArea.popularityScore}\\n- Price Growth: ${selectedArea.priceGrowth}%\\n- Investment Grade: ${selectedArea.averageROI > 8 && selectedArea.popularityScore > 85 ? 'A+' : selectedArea.averageROI > 7 && selectedArea.popularityScore > 80 ? 'A' : 'B+'}`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `${selectedArea.name}-market-analysis.txt`
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

      {/* Properties in Area Modal */}
      {propertiesModalOpen && selectedArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Properties in {selectedArea.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setPropertiesModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Total Properties: <strong>{selectedArea.totalProperties}</strong></span>
                  <span>Active Listings: <strong className="text-green-600">{selectedArea.activeListings}</strong></span>
                  <span>Sold This Month: <strong className="text-blue-600">{selectedArea.soldThisMonth}</strong></span>
                </div>
              </div>

              <div className="space-y-4">
                {[1,2,3,4,5].map((index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Home className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium">Luxury Apartment {index} - {selectedArea.name}</h4>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                          <p className="text-gray-600">Premium residential unit with modern amenities</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Price: </span>
                              <span className="font-medium">{formatCurrency(selectedArea.averagePrice + (index * 100000))}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Size: </span>
                              <span className="font-medium">{1200 + (index * 100)} sqft</span>
                            </div>
                            <div>
                              <span className="text-gray-600">ROI: </span>
                              <span className="font-medium text-green-600">{(selectedArea.averageROI + (index * 0.2)).toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Showing 5 of {selectedArea.totalProperties} properties</span>
                  <Button variant="outline" size="sm">
                    View All Properties
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPropertiesModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property to Area
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}