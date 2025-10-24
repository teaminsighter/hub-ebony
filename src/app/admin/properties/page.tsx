'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Building, 
  Search,
  Plus,
  Eye,
  Edit,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  TrendingUp,
  Star,
  X,
  Save,
  Upload,
  Download,
  Calendar,
  Users,
  Settings,
  BarChart3,
  Camera,
  FileText,
  Home,
  Wrench,
  Bell,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  Calculator,
  PieChart,
  Activity,
  Target,
  Zap
} from 'lucide-react'

interface Property {
  id: string
  title: string
  description: string | null
  area: string
  propertyType: string
  bedrooms: number | null
  bathrooms: number | null
  sqft: number | null
  price: number
  currency: string
  roi: number | null
  rentalYield: number | null
  completionDate: string | null
  developer: string | null
  isActive: boolean
  isFeatured: boolean
  createdAt: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterArea, setFilterArea] = useState('all')
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false)
  const [marketingModalOpen, setMarketingModalOpen] = useState(false)
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [editForm, setEditForm] = useState<Partial<Property>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/admin/properties')
      if (response.ok) {
        const data = await response.json()
        setProperties(data)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.developer?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = filterArea === 'all' || property.area === filterArea
    return matchesSearch && matchesArea
  })

  const areas = [...new Set(properties.map(p => p.area))]

  const handleAddProperty = () => {
    setEditForm({
      title: '',
      description: '',
      area: '',
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1000,
      price: 500000,
      currency: 'AED',
      roi: 8,
      rentalYield: 6,
      completionDate: '',
      developer: '',
      isActive: true,
      isFeatured: false
    })
    setAddModalOpen(true)
  }

  const handleViewProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setViewModalOpen(true)
    }
  }

  const handleEditProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setEditForm(property)
      setEditModalOpen(true)
    }
  }

  const handleToggleFeatured = (propertyId: string) => {
    // Show professional success notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <div>
          <p class="font-semibold">Featured Status Updated</p>
          <p class="text-sm">Property featured status changed</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  const handleToggleActive = (propertyId: string) => {
    // Show professional success notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-semibold">Status Updated</p>
          <p class="text-sm">Property status changed successfully</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  const handleAnalytics = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setAnalyticsModalOpen(true)
    }
  }

  const handleDocuments = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setDocumentsModalOpen(true)
    }
  }

  const handleMarketing = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setMarketingModalOpen(true)
    }
  }

  const handleMaintenance = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setMaintenanceModalOpen(true)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
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
        <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
        <Button onClick={handleAddProperty}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Areas</option>
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {property.title}
                    <button 
                      onClick={() => handleToggleFeatured(property.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star className={`h-4 w-4 ${property.isFeatured ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    </button>
                    <button onClick={() => handleToggleActive(property.id)}>
                      <Badge 
                        variant={property.isActive ? 'default' : 'secondary'}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        {property.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </button>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {property.area}
                    </span>
                    <span>
                      {property.propertyType}
                    </span>
                    {property.developer && (
                      <span>
                        {property.developer}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    size="sm"
                    onClick={() => handleAnalytics(property.id)}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewProperty(property.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditProperty(property.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDocuments(property.id)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Docs
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMarketing(property.id)}
                  >
                    <Target className="h-4 w-4 mr-1" />
                    Marketing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMaintenance(property.id)}
                  >
                    <Wrench className="h-4 w-4 mr-1" />
                    Maintenance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Property Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {property.bedrooms && (
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4" />
                        {property.bedrooms} Bedrooms
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms} Bathrooms
                      </div>
                    )}
                    {property.sqft && (
                      <div className="flex items-center gap-2">
                        <Square className="h-4 w-4" />
                        {property.sqft.toLocaleString()} sq ft
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Pricing</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold text-lg text-gray-900">
                        {formatPrice(property.price, property.currency)}
                      </span>
                    </div>
                    {property.roi && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        ROI: {property.roi}%
                      </div>
                    )}
                    {property.rentalYield && (
                      <p>Rental Yield: {property.rentalYield}%</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Timeline</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {property.completionDate && (
                      <p>Completion: {new Date(property.completionDate).toLocaleDateString()}</p>
                    )}
                    <p>Listed: {new Date(property.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Description</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="line-clamp-3">
                      {property.description || 'No description available'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredProperties.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterArea !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Add your first property to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Professional Property Analytics Modal */}
      {analyticsModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Property Analytics - {selectedProperty.title}</h2>
              <button 
                onClick={() => setAnalyticsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {/* Key Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {selectedProperty.roi || 8.5}%
                    </div>
                    <div className="text-sm text-gray-600">Annual ROI</div>
                    <div className="text-lg font-medium text-green-600 mt-1">Excellent</div>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{selectedProperty.rentalYield || 6.2}%</div>
                        <div className="text-sm text-gray-600">Rental Yield</div>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{formatPrice(45000, 'AED')}</div>
                        <div className="text-sm text-gray-600">Monthly Rental</div>
                      </div>
                      <Home className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">156</div>
                        <div className="text-sm text-gray-600">View Count</div>
                      </div>
                      <Eye className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Performance Analysis */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Analysis</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-900">Market Performance</span>
                        </div>
                        <span className="font-bold text-blue-600">+12.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <div className="text-sm text-blue-800">
                        Property value increased 12.5% compared to area average
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-900">Rental Performance</span>
                        </div>
                        <span className="font-bold text-green-600">+8.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <div className="text-sm text-green-800">
                        Rental income increased 8.2% year-over-year
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-purple-900">Market Interest</span>
                        </div>
                        <span className="font-bold text-purple-600">High</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                      <div className="text-sm text-purple-800">
                        156 views this month, 24 inquiries received
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-yellow-900">Investment Score</span>
                        </div>
                        <span className="font-bold text-yellow-600">A+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                      <div className="text-sm text-yellow-800">
                        Excellent investment potential based on ROI and location
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Insights */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Market Insights</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Comparable Properties</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Average Price/sqft:</span>
                          <span className="font-medium">{formatPrice(520, 'AED')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>This Property:</span>
                          <span className="font-medium text-green-600">{formatPrice(500, 'AED')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Position:</span>
                          <span className="font-medium text-green-600">Below Market (-4%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <PieChart className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Investment Breakdown</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Purchase Price:</span>
                          <span className="font-medium">{formatPrice(selectedProperty.price, selectedProperty.currency)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Rental Income:</span>
                          <span className="font-medium">{formatPrice(540000, 'AED')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Expenses:</span>
                          <span className="font-medium">{formatPrice(125000, 'AED')}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Net Annual Return:</span>
                          <span className="font-medium text-green-600">{formatPrice(415000, 'AED')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Projections (5 Years)</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Projected Value:</span>
                          <span className="font-medium">{formatPrice(selectedProperty.price * 1.4, selectedProperty.currency)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Capital Appreciation:</span>
                          <span className="font-medium text-green-600">+40%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Return:</span>
                          <span className="font-medium text-purple-600">{formatPrice(selectedProperty.price * 0.6, selectedProperty.currency)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Quick Actions</span>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 text-sm">
                          • Generate investment report
                        </button>
                        <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 text-sm">
                          • Compare with similar properties
                        </button>
                        <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 text-sm">
                          • Schedule property valuation
                        </button>
                        <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 text-sm">
                          • Update rental price analysis
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setAnalyticsModalOpen(false)}>Close</Button>
              <div className="space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setAnalyticsModalOpen(false)
                    handleDocuments(selectedProperty.id)
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button 
                  onClick={() => {
                    setAnalyticsModalOpen(false)
                    handleMarketing(selectedProperty.id)
                  }}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional View Property Modal */}
      {viewModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Property Details - {selectedProperty.title}</h2>
              <button 
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-gray-400" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Property Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="font-medium">Type:</span> {selectedProperty.propertyType}</div>
                        <div><span className="font-medium">Area:</span> {selectedProperty.area}</div>
                        <div><span className="font-medium">Developer:</span> {selectedProperty.developer || 'N/A'}</div>
                        <div><span className="font-medium">Size:</span> {selectedProperty.sqft?.toLocaleString()} sq ft</div>
                        <div><span className="font-medium">Bedrooms:</span> {selectedProperty.bedrooms || 'N/A'}</div>
                        <div><span className="font-medium">Bathrooms:</span> {selectedProperty.bathrooms || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-600">{selectedProperty.description || 'No description available'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">Investment Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-bold">{formatPrice(selectedProperty.price, selectedProperty.currency)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ROI:</span>
                          <span className="font-medium text-green-600">{selectedProperty.roi || 'N/A'}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rental Yield:</span>
                          <span className="font-medium">{selectedProperty.rentalYield || 'N/A'}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Status</h3>
                      <div className="space-y-2">
                        <Badge variant={selectedProperty.isActive ? 'default' : 'secondary'}>
                          {selectedProperty.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {selectedProperty.isFeatured && (
                          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
              <Button onClick={() => {
                setViewModalOpen(false)
                handleEditProperty(selectedProperty.id)
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Property
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Document Management Modal */}
      {documentsModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Documents - {selectedProperty.title}</h2>
              <button 
                onClick={() => setDocumentsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Property Documents</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                          <div className="font-medium">Title Deed</div>
                          <div className="text-sm text-gray-500">Uploaded 2 weeks ago</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-green-500" />
                        <div className="flex-1">
                          <div className="font-medium">Property Valuation</div>
                          <div className="text-sm text-gray-500">Uploaded 1 month ago</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-purple-500" />
                        <div className="flex-1">
                          <div className="font-medium">Floor Plans</div>
                          <div className="text-sm text-gray-500">Uploaded 3 weeks ago</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Document</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Drag files here or click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPG up to 10MB</p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Generate Reports</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Property Investment Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Market Analysis Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calculator className="h-4 w-4 mr-2" />
                        ROI Calculation Sheet
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setDocumentsModalOpen(false)}>Close</Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Marketing Modal */}
      {marketingModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Marketing Campaign - {selectedProperty.title}</h2>
              <button 
                onClick={() => setMarketingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option>Property Launch</option>
                          <option>Investment Opportunity</option>
                          <option>Open House Event</option>
                          <option>Price Reduction</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option>High Net Worth Investors</option>
                          <option>First Time Buyers</option>
                          <option>Corporate Clients</option>
                          <option>International Investors</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget (AED)</label>
                        <Input type="number" defaultValue="50000" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Marketing Channels</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Social Media Advertising</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Email Marketing</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Print Advertising</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Property Portals</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-3">Campaign Preview</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div><strong>Property:</strong> {selectedProperty.title}</div>
                      <div><strong>Price:</strong> {formatPrice(selectedProperty.price, selectedProperty.currency)}</div>
                      <div><strong>Location:</strong> {selectedProperty.area}</div>
                      <div><strong>Type:</strong> {selectedProperty.propertyType}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-3">Estimated Reach</h3>
                    <div className="space-y-2 text-sm text-green-800">
                      <div className="flex justify-between">
                        <span>Social Media:</span>
                        <span className="font-medium">25,000 views</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">5,000 subscribers</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Property Portals:</span>
                        <span className="font-medium">15,000 views</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Total Reach:</span>
                        <span className="font-bold">45,000 people</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-medium text-yellow-900 mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Camera className="h-4 w-4 mr-2" />
                        Schedule Photography
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Create Virtual Tour
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Open House
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setMarketingModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setMarketingModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Campaign Created</p>
                      <p class="text-sm">Marketing campaign launched successfully</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Target className="h-4 w-4 mr-2" />
                Launch Campaign
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}