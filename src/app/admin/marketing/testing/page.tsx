'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Beaker, 
  Search,
  Plus,
  Eye,
  Edit,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
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
  AlertTriangle,
  Share2,
  MessageSquare,
  Megaphone,
  DollarSign,
  MousePointer,
  ExternalLink,
  List,
  Layout,
  Palette,
  Type,
  Link,
  Upload,
  Send,
  Flag,
  Trophy
} from 'lucide-react'

interface ABTest {
  id: string
  name: string
  type: string
  status: string
  startDate: string
  endDate: string | null
  variantA: {
    name: string
    visitors: number
    conversions: number
    conversionRate: number
    revenue: number
  }
  variantB: {
    name: string
    visitors: number
    conversions: number
    conversionRate: number
    revenue: number
  }
  confidence: number
  winner: 'A' | 'B' | 'inconclusive' | null
  significance: number
  testGoal: string
  trafficSplit: number
}

export default function ABTestingPage() {
  const [abTests, setABTests] = useState<ABTest[]>([
    {
      id: '1',
      name: 'Downtown Dubai Landing Page Headlines',
      type: 'Landing Page',
      status: 'completed',
      startDate: '2024-10-01',
      endDate: '2024-10-15',
      variantA: {
        name: 'Luxury Awaits in Downtown Dubai',
        visitors: 2547,
        conversions: 89,
        conversionRate: 3.49,
        revenue: 22250000
      },
      variantB: {
        name: 'Invest in Downtown Dubai Excellence',
        visitors: 2612,
        conversions: 127,
        conversionRate: 4.86,
        revenue: 31750000
      },
      confidence: 95.2,
      winner: 'B',
      significance: 0.023,
      testGoal: 'Increase consultation bookings',
      trafficSplit: 50
    },
    {
      id: '2',
      name: 'Email Subject Line Performance',
      type: 'Email Campaign',
      status: 'running',
      startDate: '2024-10-18',
      endDate: null,
      variantA: {
        name: 'New Dubai Properties Available',
        visitors: 1245,
        conversions: 156,
        conversionRate: 12.53,
        revenue: 0
      },
      variantB: {
        name: 'Exclusive Dubai Investment Opportunities',
        visitors: 1287,
        conversions: 198,
        conversionRate: 15.38,
        revenue: 0
      },
      confidence: 87.4,
      winner: null,
      significance: 0.067,
      testGoal: 'Improve email open rates',
      trafficSplit: 50
    },
    {
      id: '3',
      name: 'CTA Button Color and Text',
      type: 'Website Element',
      status: 'running',
      startDate: '2024-10-20',
      endDate: null,
      variantA: {
        name: 'Blue Button - "Book Consultation"',
        visitors: 856,
        conversions: 34,
        conversionRate: 3.97,
        revenue: 8500000
      },
      variantB: {
        name: 'Green Button - "Get Expert Advice"',
        visitors: 892,
        conversions: 28,
        conversionRate: 3.14,
        revenue: 7000000
      },
      confidence: 71.2,
      winner: null,
      significance: 0.124,
      testGoal: 'Increase consultation requests',
      trafficSplit: 50
    },
    {
      id: '4',
      name: 'Property Card Layout Design',
      type: 'UI/UX',
      status: 'draft',
      startDate: '2024-10-25',
      endDate: null,
      variantA: {
        name: 'Horizontal Layout with Large Image',
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
        revenue: 0
      },
      variantB: {
        name: 'Vertical Layout with Multiple Images',
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
        revenue: 0
      },
      confidence: 0,
      winner: null,
      significance: 0,
      testGoal: 'Improve property engagement',
      trafficSplit: 50
    }
  ])
  
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [winnerModalOpen, setWinnerModalOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null)
  const [editForm, setEditForm] = useState<Partial<ABTest>>({})
  const [newTest, setNewTest] = useState<Partial<ABTest>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getWinnerIcon = (winner: string | null, variant: 'A' | 'B') => {
    if (!winner) return <Minus className="h-4 w-4 text-gray-400" />
    if (winner === variant) return <ArrowUp className="h-4 w-4 text-green-600" />
    return <ArrowDown className="h-4 w-4 text-red-600" />
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const calculateLift = (variantA: number, variantB: number) => {
    if (variantA === 0) return 0
    return ((variantB - variantA) / variantA * 100)
  }

  const handleCreateTest = () => {
    setNewTest({
      status: 'draft',
      type: 'Landing Page',
      trafficSplit: 50,
      variantA: {
        name: 'Control',
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
        revenue: 0
      },
      variantB: {
        name: 'Variation',
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
        revenue: 0
      },
      confidence: 0,
      significance: 0,
      winner: null
    })
    setCreateModalOpen(true)
  }

  const handleViewTest = (testId: string) => {
    const test = abTests.find(t => t.id === testId)
    if (test) {
      setSelectedTest(test)
      setViewModalOpen(true)
    }
  }

  const handleEditTest = (testId: string) => {
    const test = abTests.find(t => t.id === testId)
    if (test) {
      setSelectedTest(test)
      setEditForm(test)
      setEditModalOpen(true)
    }
  }

  const handleStartStopTest = (testId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'running' ? 'paused' : 'running'
    const updatedTests = abTests.map(test => 
      test.id === testId 
        ? { ...test, status: newStatus }
        : test
    )
    setABTests(updatedTests)
  }

  const handleDeclareWinner = (testId: string) => {
    const test = abTests.find(t => t.id === testId)
    if (test) {
      setSelectedTest(test)
      setWinnerModalOpen(true)
    }
  }

  const handleViewAnalytics = (testId: string) => {
    const test = abTests.find(t => t.id === testId)
    if (test) {
      setSelectedTest(test)
      setAnalyticsModalOpen(true)
    }
  }

  const handleSaveTest = async () => {
    if (!selectedTest || !editForm.name) return
    
    setIsSubmitting(true)
    try {
      const updatedTests = abTests.map(test => 
        test.id === selectedTest.id 
          ? { ...test, ...editForm }
          : test
      )
      setABTests(updatedTests)
      setEditModalOpen(false)
      setSelectedTest(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving test:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateTestSubmit = async () => {
    if (!newTest.name || !newTest.testGoal) return
    
    setIsSubmitting(true)
    try {
      const test: ABTest = {
        id: String(Date.now()),
        name: newTest.name!,
        type: newTest.type || 'Landing Page',
        status: newTest.status || 'draft',
        startDate: newTest.startDate || new Date().toISOString().split('T')[0],
        endDate: newTest.endDate || null,
        variantA: newTest.variantA || {
          name: 'Control',
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
          revenue: 0
        },
        variantB: newTest.variantB || {
          name: 'Variation',
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
          revenue: 0
        },
        confidence: 0,
        winner: null,
        significance: 0,
        testGoal: newTest.testGoal!,
        trafficSplit: newTest.trafficSplit || 50
      }
      setABTests([test, ...abTests])
      setCreateModalOpen(false)
      setNewTest({})
    } catch (error) {
      console.error('Error creating test:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDuplicateTest = (testId: string) => {
    const test = abTests.find(t => t.id === testId)
    if (test) {
      const duplicated = {
        ...test,
        id: String(Date.now()),
        name: `${test.name} (Copy)`,
        status: 'draft',
        variantA: { ...test.variantA, visitors: 0, conversions: 0, revenue: 0 },
        variantB: { ...test.variantB, visitors: 0, conversions: 0, revenue: 0 },
        confidence: 0,
        significance: 0,
        winner: null
      }
      setABTests([duplicated, ...abTests])
    }
  }

  const handleDeleteTest = (testId: string) => {
    if (confirm('Are you sure you want to delete this A/B test?')) {
      setABTests(abTests.filter(t => t.id !== testId))
    }
  }

  const handleFinalizeWinner = async (winner: 'A' | 'B') => {
    if (!selectedTest) return
    
    setIsSubmitting(true)
    try {
      const updatedTests = abTests.map(test => 
        test.id === selectedTest.id 
          ? { ...test, status: 'completed', winner, endDate: new Date().toISOString().split('T')[0] }
          : test
      )
      setABTests(updatedTests)
      setWinnerModalOpen(false)
      setSelectedTest(null)
    } catch (error) {
      console.error('Error finalizing winner:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExportTests = () => {
    const csvData = abTests.map(test => ({
      Name: test.name,
      Type: test.type,
      Status: test.status,
      Goal: test.testGoal,
      StartDate: test.startDate,
      EndDate: test.endDate || '',
      VariantAName: test.variantA.name,
      VariantAVisitors: test.variantA.visitors,
      VariantAConversions: test.variantA.conversions,
      VariantAConversionRate: test.variantA.conversionRate,
      VariantBName: test.variantB.name,
      VariantBVisitors: test.variantB.visitors,
      VariantBConversions: test.variantB.conversions,
      VariantBConversionRate: test.variantB.conversionRate,
      Confidence: test.confidence,
      Winner: test.winner || '',
      Significance: test.significance
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ab-tests-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredTests = abTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.testGoal.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus
    const matchesType = filterType === 'all' || test.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const totalStats = {
    totalTests: abTests.length,
    runningTests: abTests.filter(t => t.status === 'running').length,
    completedTests: abTests.filter(t => t.status === 'completed').length,
    avgConfidence: abTests.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.confidence, 0) / abTests.filter(t => t.status === 'completed').length || 0
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">A/B Testing</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportTests}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button onClick={handleCreateTest}>
            <Plus className="h-4 w-4 mr-2" />
            Create Test
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.totalTests}</p>
              </div>
              <Beaker className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Running Tests</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.runningTests}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.completedTests}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-orange-600">
                  {totalStats.avgConfidence.toFixed(1)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tests..."
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
          <option value="Landing Page">Landing Page</option>
          <option value="Email Campaign">Email Campaign</option>
          <option value="Website Element">Website Element</option>
          <option value="UI/UX">UI/UX</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredTests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="h-5 w-5" />
                    {test.name}
                    <Badge className={getStatusColor(test.status)}>
                      {test.status.toUpperCase()}
                    </Badge>
                    {test.winner && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Winner: Variant {test.winner}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Started: {new Date(test.startDate).toLocaleDateString()}
                    </span>
                    <span>{test.type}</span>
                    <span><strong>Goal:</strong> {test.testGoal}</span>
                    {test.confidence > 0 && (
                      <span className={`font-medium ${getConfidenceColor(test.confidence)}`}>
                        {test.confidence.toFixed(1)}% Confidence
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewTest(test.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditTest(test.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {test.status !== 'completed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStartStopTest(test.id, test.status)}
                    >
                      {test.status === 'running' ? 
                        <Pause className="h-4 w-4 mr-1" /> : 
                        <Play className="h-4 w-4 mr-1" />
                      }
                      {test.status === 'running' ? 'Stop' : 'Start'}
                    </Button>
                  )}
                  {test.status === 'running' && test.confidence >= 95 && (
                    <Button 
                      size="sm"
                      onClick={() => handleDeclareWinner(test.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Declare Winner
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewAnalytics(test.id)}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDuplicateTest(test.id)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteTest(test.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Variant A */}
                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      {getWinnerIcon(test.winner, 'A')}
                      Variant A: {test.variantA.name}
                    </h4>
                    <span className="text-sm text-gray-500">50% Traffic</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Visitors</p>
                      <p className="font-bold text-lg">{test.variantA.visitors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversions</p>
                      <p className="font-bold text-lg">{test.variantA.conversions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversion Rate</p>
                      <p className="font-bold text-lg text-blue-600">{test.variantA.conversionRate.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-bold text-lg">AED {(test.variantA.revenue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                </div>

                {/* Variant B */}
                <div className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      {getWinnerIcon(test.winner, 'B')}
                      Variant B: {test.variantB.name}
                    </h4>
                    <span className="text-sm text-gray-500">50% Traffic</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Visitors</p>
                      <p className="font-bold text-lg">{test.variantB.visitors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversions</p>
                      <p className="font-bold text-lg">{test.variantB.conversions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversion Rate</p>
                      <p className="font-bold text-lg text-green-600">{test.variantB.conversionRate.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-bold text-lg">AED {(test.variantB.revenue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistical Analysis */}
              {test.variantA.visitors > 0 && test.variantB.visitors > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Statistical Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Conversion Rate Lift</p>
                      <p className={`font-bold ${calculateLift(test.variantA.conversionRate, test.variantB.conversionRate) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {calculateLift(test.variantA.conversionRate, test.variantB.conversionRate) > 0 ? '+' : ''}
                        {calculateLift(test.variantA.conversionRate, test.variantB.conversionRate).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Statistical Confidence</p>
                      <p className={`font-bold ${getConfidenceColor(test.confidence)}`}>
                        {test.confidence.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">P-Value</p>
                      <p className="font-bold">
                        {test.significance.toFixed(3)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Test Status</p>
                      <p className="font-bold">
                        {test.confidence >= 95 ? 'Statistically Significant' : 'Needs More Data'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredTests.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Beaker className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No A/B tests found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Create your first A/B test to optimize your marketing performance.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Test Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create New A/B Test</h2>
                <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Name *</label>
                  <Input
                    value={newTest.name || ''}
                    onChange={(e) => setNewTest(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter descriptive test name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Type *</label>
                  <select
                    value={newTest.type || 'Landing Page'}
                    onChange={(e) => setNewTest(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Landing Page">Landing Page</option>
                    <option value="Email Campaign">Email Campaign</option>
                    <option value="Website Element">Website Element</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="CTA Button">CTA Button</option>
                    <option value="Form">Form</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Goal *</label>
                <Input
                  value={newTest.testGoal || ''}
                  onChange={(e) => setNewTest(prev => ({ ...prev, testGoal: e.target.value }))}
                  placeholder="e.g., Increase consultation bookings"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 mb-3">Variant A (Control)</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Variant Name</label>
                    <Input
                      value={newTest.variantA?.name || ''}
                      onChange={(e) => setNewTest(prev => ({ 
                        ...prev, 
                        variantA: { ...prev.variantA, name: e.target.value } as any
                      }))}
                      placeholder="Control version name"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      rows={3}
                      placeholder="Describe the control variant..."
                    />
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-gray-900 mb-3">Variant B (Variation)</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Variant Name</label>
                    <Input
                      value={newTest.variantB?.name || ''}
                      onChange={(e) => setNewTest(prev => ({ 
                        ...prev, 
                        variantB: { ...prev.variantB, name: e.target.value } as any
                      }))}
                      placeholder="Variation version name"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      rows={3}
                      placeholder="Describe the variation..."
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Split</label>
                  <select
                    value={newTest.trafficSplit || 50}
                    onChange={(e) => setNewTest(prev => ({ ...prev, trafficSplit: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value={50}>50/50 Split</option>
                    <option value={70}>70/30 Split</option>
                    <option value={80}>80/20 Split</option>
                    <option value={90}>90/10 Split</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={newTest.startDate || ''}
                    onChange={(e) => setNewTest(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                  <Input
                    type="date"
                    value={newTest.endDate || ''}
                    onChange={(e) => setNewTest(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Configuration</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Track conversions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Track revenue</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Enable auto-winner declaration</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Statistical significance at 95%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Email notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Advanced segmentation</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTestSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Test
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Test Details Modal */}
      {viewModalOpen && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTest.name}</h2>
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
                        <p className="text-sm text-gray-600">Statistical Confidence</p>
                        <p className={`text-2xl font-bold ${getConfidenceColor(selectedTest.confidence)}`}>
                          {selectedTest.confidence.toFixed(1)}%
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
                        <p className="text-sm text-gray-600">Total Visitors</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {(selectedTest.variantA.visitors + selectedTest.variantB.visitors).toLocaleString()}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Conversions</p>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedTest.variantA.conversions + selectedTest.variantB.conversions}
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
                        <p className="text-sm text-gray-600">Conversion Lift</p>
                        <p className={`text-2xl font-bold ${calculateLift(selectedTest.variantA.conversionRate, selectedTest.variantB.conversionRate) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {calculateLift(selectedTest.variantA.conversionRate, selectedTest.variantB.conversionRate) > 0 ? '+' : ''}
                          {calculateLift(selectedTest.variantA.conversionRate, selectedTest.variantB.conversionRate).toFixed(1)}%
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
                    <CardTitle className="flex items-center gap-2">
                      {getWinnerIcon(selectedTest.winner, 'A')}
                      Variant A: {selectedTest.variantA.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Visitors</p>
                        <p className="text-lg font-bold">{selectedTest.variantA.visitors.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Conversions</p>
                        <p className="text-lg font-bold">{selectedTest.variantA.conversions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Conversion Rate</p>
                        <p className="text-lg font-bold text-blue-600">{selectedTest.variantA.conversionRate.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-lg font-bold">AED {(selectedTest.variantA.revenue / 1000000).toFixed(1)}M</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full" 
                        style={{ width: `${selectedTest.variantA.conversionRate * 10}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getWinnerIcon(selectedTest.winner, 'B')}
                      Variant B: {selectedTest.variantB.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Visitors</p>
                        <p className="text-lg font-bold">{selectedTest.variantB.visitors.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Conversions</p>
                        <p className="text-lg font-bold">{selectedTest.variantB.conversions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Conversion Rate</p>
                        <p className="text-lg font-bold text-green-600">{selectedTest.variantB.conversionRate.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-lg font-bold">AED {(selectedTest.variantB.revenue / 1000000).toFixed(1)}M</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-600 h-3 rounded-full" 
                        style={{ width: `${selectedTest.variantB.conversionRate * 10}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Statistical Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Test Results</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Confidence: {selectedTest.confidence.toFixed(1)}%</li>
                        <li>• P-value: {selectedTest.significance.toFixed(3)}</li>
                        <li>• {selectedTest.confidence >= 95 ? 'Statistically significant' : 'More data needed'}</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Performance Insights</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Conversion lift: {calculateLift(selectedTest.variantA.conversionRate, selectedTest.variantB.conversionRate).toFixed(1)}%</li>
                        <li>• Revenue impact: AED {((selectedTest.variantB.revenue - selectedTest.variantA.revenue) / 1000000).toFixed(1)}M</li>
                        <li>• Sample size: {(selectedTest.variantA.visitors + selectedTest.variantB.visitors).toLocaleString()} visitors</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Recommendations</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {selectedTest.winner ? `Implement Variant ${selectedTest.winner}` : 'Continue testing'}</li>
                        <li>• Monitor long-term effects</li>
                        <li>• Consider segment analysis</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {setViewModalOpen(false); handleEditTest(selectedTest.id)}}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Test
                </Button>
                <Button variant="outline" onClick={() => handleDuplicateTest(selectedTest.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                {selectedTest.status === 'running' && selectedTest.confidence >= 95 && (
                  <Button onClick={() => handleDeclareWinner(selectedTest.id)}>
                    <Trophy className="h-4 w-4 mr-2" />
                    Declare Winner
                  </Button>
                )}
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
                <h2 className="text-2xl font-bold text-gray-900">A/B Testing Analytics</h2>
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
                        <p className="text-sm text-gray-600">Total Tests</p>
                        <p className="text-2xl font-bold text-blue-600">{abTests.length}</p>
                      </div>
                      <Beaker className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Success Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {((abTests.filter(t => t.winner).length / abTests.filter(t => t.status === 'completed').length) * 100 || 0).toFixed(0)}%
                        </p>
                      </div>
                      <Trophy className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Confidence</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {totalStats.avgConfidence.toFixed(1)}%
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
                        <p className="text-sm text-gray-600">Total Revenue Impact</p>
                        <p className="text-2xl font-bold text-orange-600">
                          AED {(abTests.reduce((sum, t) => sum + (t.variantB.revenue - t.variantA.revenue), 0) / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Test Performance by Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Landing Page', 'Email Campaign', 'Website Element', 'UI/UX'].map(type => {
                      const typeTests = abTests.filter(t => t.type === type)
                      const avgConfidence = typeTests.reduce((sum, t) => sum + t.confidence, 0) / typeTests.length || 0
                      
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{type}</span>
                            <span className="text-sm text-gray-600">{avgConfidence.toFixed(1)}% avg confidence</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${avgConfidence}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Test Status Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { status: 'running', color: 'green', label: 'Running Tests' },
                      { status: 'completed', color: 'blue', label: 'Completed Tests' },
                      { status: 'draft', color: 'gray', label: 'Draft Tests' },
                      { status: 'paused', color: 'yellow', label: 'Paused Tests' }
                    ].map(({ status, color, label }) => {
                      const count = abTests.filter(t => t.status === status).length
                      const percentage = (count / abTests.length) * 100 || 0
                      
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
                  <CardTitle>A/B Testing Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Best Practices</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Landing page tests show highest impact</li>
                        <li>• 95% confidence level maintains quality</li>
                        <li>• Email tests convert faster</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Optimization Areas</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Test more UI/UX elements</li>
                        <li>• Increase sample sizes for accuracy</li>
                        <li>• Focus on revenue-driving tests</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Action Items</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Complete paused tests</li>
                        <li>• Implement winning variants</li>
                        <li>• Plan next quarter's test roadmap</li>
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
                const report = `A/B Testing Analytics Report\\n\\nTotal Tests: ${abTests.length}\\nRunning Tests: ${totalStats.runningTests}\\nCompleted Tests: ${totalStats.completedTests}\\nAvg Confidence: ${totalStats.avgConfidence.toFixed(1)}%`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `ab-testing-analytics-${new Date().toISOString().split('T')[0]}.txt`
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

      {/* Winner Declaration Modal */}
      {winnerModalOpen && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Declare Test Winner</h2>
                <Button variant="ghost" size="sm" onClick={() => setWinnerModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-900">Test Ready for Winner Declaration</span>
                </div>
                <p className="text-sm text-green-800">
                  This test has reached statistical significance with {selectedTest.confidence.toFixed(1)}% confidence.
                  You can now safely declare a winner and implement the results.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-2">Variant A</h3>
                      <p className="text-sm text-gray-600 mb-3">{selectedTest.variantA.name}</p>
                      <div className="space-y-2">
                        <p><span className="font-medium">Conversion Rate:</span> {selectedTest.variantA.conversionRate.toFixed(2)}%</p>
                        <p><span className="font-medium">Conversions:</span> {selectedTest.variantA.conversions}</p>
                        <p><span className="font-medium">Revenue:</span> AED {(selectedTest.variantA.revenue / 1000000).toFixed(1)}M</p>
                      </div>
                      <Button 
                        className="mt-4 w-full" 
                        variant={selectedTest.variantA.conversionRate > selectedTest.variantB.conversionRate ? "default" : "outline"}
                        onClick={() => handleFinalizeWinner('A')}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Declaring...' : 'Declare Winner A'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-2">Variant B</h3>
                      <p className="text-sm text-gray-600 mb-3">{selectedTest.variantB.name}</p>
                      <div className="space-y-2">
                        <p><span className="font-medium">Conversion Rate:</span> {selectedTest.variantB.conversionRate.toFixed(2)}%</p>
                        <p><span className="font-medium">Conversions:</span> {selectedTest.variantB.conversions}</p>
                        <p><span className="font-medium">Revenue:</span> AED {(selectedTest.variantB.revenue / 1000000).toFixed(1)}M</p>
                      </div>
                      <Button 
                        className="mt-4 w-full" 
                        variant={selectedTest.variantB.conversionRate > selectedTest.variantA.conversionRate ? "default" : "outline"}
                        onClick={() => handleFinalizeWinner('B')}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Declaring...' : 'Declare Winner B'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 mb-1">Important:</p>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• Declaring a winner will end this test permanently</li>
                      <li>• The winning variant should be implemented on your website</li>
                      <li>• Consider running additional tests to validate results</li>
                      <li>• Monitor long-term performance after implementation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setWinnerModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}