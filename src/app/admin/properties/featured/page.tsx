'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building, Star, MapPin, DollarSign, Eye, Edit, BarChart3, Target, Camera, Calendar, Users, TrendingUp, Activity, X, Save, Upload, Download, Settings, Zap, ArrowUp, ArrowDown, CheckCircle, Clock, Award, Home, Bed, Bath, Square, FileText, Mail, Phone, Calculator, PieChart, AlertCircle } from 'lucide-react'

interface FeaturedProperty {
  id: string
  title: string
  area: string
  type: string
  bedrooms: number
  bathrooms: number
  sqft: number
  price: number
  roi: number
  rentalYield: number
  developer: string
  status: string
  priority: number
  viewCount: number
  inquiries: number
  conversionRate: number
  featuredSince: string
  lastPromoted: string
}

export default function FeaturedPropertiesPage() {
  const [properties, setProperties] = useState<FeaturedProperty[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [promotionModalOpen, setPromotionModalOpen] = useState(false)
  const [priorityModalOpen, setPriorityModalOpen] = useState(false)
  const [performanceModalOpen, setPerformanceModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<FeaturedProperty | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    fetchFeaturedProperties()
  }, [])
  
  const fetchFeaturedProperties = () => {
    // Transform existing data to new format
    const featuredProperties = [
    {
      id: '1',
      title: "Luxury Penthouse - Burj Khalifa View",
      area: "Downtown Dubai",
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 5,
      sqft: 4500,
      price: 15500000,
      roi: 8.5,
      rentalYield: 6.8,
      developer: "Emaar Properties",
      status: "Available",
      priority: 1,
      viewCount: 2456,
      inquiries: 89,
      conversionRate: 12.5,
      featuredSince: '2024-10-01',
      lastPromoted: '2024-10-20'
    },
    {
      id: '2',
      title: "Waterfront Villa - Palm Jumeirah",
      area: "Palm Jumeirah", 
      type: "Villa",
      bedrooms: 6,
      bathrooms: 7,
      sqft: 8200,
      price: 28500000,
      roi: 9.2,
      rentalYield: 5.5,
      developer: "Nakheel",
      status: "Reserved",
      priority: 2,
      viewCount: 3241,
      inquiries: 156,
      conversionRate: 18.2,
      featuredSince: '2024-09-15',
      lastPromoted: '2024-10-18'
    },
    {
      id: '3',
      title: "Marina View Apartment",
      area: "Dubai Marina",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 4,
      sqft: 2100,
      price: 4200000,
      roi: 7.8,
      rentalYield: 7.2,
      developer: "Select Group",
      status: "Available",
      priority: 3,
      viewCount: 1876,
      inquiries: 67,
      conversionRate: 8.9,
      featuredSince: '2024-10-10',
      lastPromoted: '2024-10-22'
    }
    ]
    setProperties(featuredProperties)
    setLoading(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800'
      case 'Reserved': return 'bg-yellow-100 text-yellow-800'
      case 'Sold': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewDetails = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setViewModalOpen(true)
    }
  }

  const handleAnalytics = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setAnalyticsModalOpen(true)
    }
  }

  const handlePromotion = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setPromotionModalOpen(true)
    }
  }

  const handlePriority = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setPriorityModalOpen(true)
    }
  }

  const handlePerformance = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (property) {
      setSelectedProperty(property)
      setPerformanceModalOpen(true)
    }
  }

  const handleScheduleViewing = (propertyId: string) => {
    // Show professional success notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-semibold">Viewing Scheduled</p>
          <p class="text-sm">Property viewing booked successfully</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Featured Properties</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Properties</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Premium listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 187M</div>
            <p className="text-xs text-muted-foreground">
              Combined portfolio value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ROI</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground">
              Above market average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prime Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Premium areas covered
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {properties.map((property, index) => (
          <Card key={property.id} className="border-l-4 border-l-yellow-400">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    {property.title}
                    <Badge className={getStatusColor(property.status)}>
                      {property.status}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800">
                      Priority {property.priority}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {property.area}
                    </span>
                    <span>{property.type}</span>
                    <span>{property.developer}</span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    ROI: {property.roi}% | Yield: {property.rentalYield}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {property.viewCount} views | {property.inquiries} inquiries
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Property Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="h-3 w-3" />
                      {property.bedrooms} Bedrooms
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-3 w-3" />
                      {property.bathrooms} Bathrooms
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-3 w-3" />
                      {property.sqft.toLocaleString()} sq ft
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Performance</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {property.viewCount} views
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {property.inquiries} inquiries
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {property.conversionRate}% conversion
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Investment Returns</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Expected ROI: {property.roi}%</p>
                    <p>Rental Yield: {property.rentalYield}%</p>
                    <p>Capital Appreciation: High</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Featured Status</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Since: {new Date(property.featuredSince).toLocaleDateString()}</p>
                    <p>Last Promoted: {new Date(property.lastPromoted).toLocaleDateString()}</p>
                    <p>Priority Level: {property.priority}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Actions</h4>
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleAnalytics(property.id)}
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Analytics
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewDetails(property.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handlePromotion(property.id)}
                    >
                      <Target className="h-3 w-3 mr-1" />
                      Promote
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handlePriority(property.id)}
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Priority
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Professional Featured Property Analytics Modal */}
      {analyticsModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Featured Property Analytics - {selectedProperty.title}</h2>
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
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      #{selectedProperty.priority}
                    </div>
                    <div className="text-sm text-gray-600">Priority Ranking</div>
                    <div className="text-lg font-medium text-yellow-600 mt-1">Featured</div>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{selectedProperty.viewCount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Views</div>
                      </div>
                      <Eye className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{selectedProperty.inquiries}</div>
                        <div className="text-sm text-gray-600">Inquiries</div>
                      </div>
                      <Users className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{selectedProperty.conversionRate}%</div>
                        <div className="text-sm text-gray-600">Conversion Rate</div>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Performance Analysis */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Performance Analysis</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Eye className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-900">View Performance</span>
                        </div>
                        <span className="font-bold text-blue-600">+185%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <div className="text-sm text-blue-800">
                        185% increase in views since featuring, highest in category
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-900">Inquiry Rate</span>
                        </div>
                        <span className="font-bold text-green-600">{selectedProperty.conversionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: `${selectedProperty.conversionRate}%`}}></div>
                      </div>
                      <div className="text-sm text-green-800">
                        Excellent conversion rate, {selectedProperty.conversionRate > 15 ? 'above' : 'within'} industry benchmark
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-purple-900">Feature ROI</span>
                        </div>
                        <span className="font-bold text-purple-600">324%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <div className="text-sm text-purple-800">
                        Featured promotion generated 324% return on marketing investment
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-yellow-900">Priority Score</span>
                        </div>
                        <span className="font-bold text-yellow-600">A+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                      <div className="text-sm text-yellow-800">
                        Top-tier featured property with excellent market response
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Insights */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Strategy Insights</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Traffic Analysis</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Daily Views:</span>
                          <span className="font-medium">127 avg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Peak Hours:</span>
                          <span className="font-medium">2PM - 6PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Best Days:</span>
                          <span className="font-medium">Sat, Sun, Thu</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Source:</span>
                          <span className="font-medium">Featured Section (68%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Revenue Impact</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Feature Cost:</span>
                          <span className="font-medium">{formatPrice(15000)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Additional Views:</span>
                          <span className="font-medium">+1,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Extra Inquiries:</span>
                          <span className="font-medium">+{selectedProperty.inquiries - 23}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Feature ROI:</span>
                          <span className="font-medium text-green-600">324%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Competitive Position</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Ranking in Category:</span>
                          <span className="font-medium text-purple-600">#1 of 47</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Views vs Avg:</span>
                          <span className="font-medium text-green-600">+185%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price vs Market:</span>
                          <span className="font-medium text-blue-600">Premium +12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Share:</span>
                          <span className="font-medium">23.4%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Optimization Tips</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-white rounded border">• Promote during peak hours (2-6 PM)</div>
                        <div className="p-2 bg-white rounded border">• Target weekend traffic surge</div>
                        <div className="p-2 bg-white rounded border">• Update featured image gallery</div>
                        <div className="p-2 bg-white rounded border">• Schedule virtual tour promotion</div>
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
                    handlePromotion(selectedProperty.id)
                  }}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Boost Promotion
                </Button>
                <Button 
                  onClick={() => {
                    setAnalyticsModalOpen(false)
                    handlePriority(selectedProperty.id)
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Adjust Priority
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Property Promotion Modal */}
      {promotionModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Promote Featured Property - {selectedProperty.title}</h2>
              <button 
                onClick={() => setPromotionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Promotion Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option>Social Media Boost</option>
                          <option>Homepage Banner</option>
                          <option>Email Newsletter Feature</option>
                          <option>Search Engine Ads</option>
                          <option>Premium Listing Upgrade</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option>1 Week</option>
                          <option>2 Weeks</option>
                          <option>1 Month</option>
                          <option>3 Months</option>
                          <option>Until Sold</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget (AED)</label>
                        <Input type="number" defaultValue="25000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded mr-2" defaultChecked />
                            <span className="text-sm">High Net Worth Investors</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded mr-2" defaultChecked />
                            <span className="text-sm">International Buyers</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded mr-2" />
                            <span className="text-sm">Local Investors</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded mr-2" />
                            <span className="text-sm">Corporate Clients</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-3">Current Performance</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex justify-between">
                        <span>Views (Last 30 days):</span>
                        <span className="font-medium">{selectedProperty.viewCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inquiries:</span>
                        <span className="font-medium">{selectedProperty.inquiries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate:</span>
                        <span className="font-medium">{selectedProperty.conversionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Priority:</span>
                        <span className="font-medium">#{selectedProperty.priority}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-3">Projected Impact</h3>
                    <div className="space-y-2 text-sm text-green-800">
                      <div className="flex justify-between">
                        <span>Expected Views Increase:</span>
                        <span className="font-medium">+65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional Inquiries:</span>
                        <span className="font-medium">+45-60</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated ROI:</span>
                        <span className="font-medium text-green-600">280%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time to Sale (Est.):</span>
                        <span className="font-medium">-40% faster</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-medium text-yellow-900 mb-3">Promotion Features</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Premium badge display</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Featured in search results</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Social media campaigns</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Email newsletter inclusion</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setPromotionModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setPromotionModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Promotion Activated</p>
                      <p class="text-sm">Property promotion campaign started</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Target className="h-4 w-4 mr-2" />
                Launch Promotion
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}