'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search,
  Plus,
  Eye,
  Edit,
  Mail,
  Phone,
  Building,
  DollarSign,
  TrendingUp,
  Calendar,
  Star,
  Activity,
  Target,
  CheckCircle,
  Clock,
  MapPin,
  FileText,
  MessageSquare,
  BarChart3,
  X,
  Send,
  Download,
  Upload,
  PieChart,
  Briefcase,
  Home,
  Calculator,
  Settings,
  Bell,
  AlertCircle,
  TrendingDown
} from 'lucide-react'

interface ActiveClient {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  investmentBudget: string
  preferredArea: string
  riskTolerance: string
  investmentGoal: string
  totalInvested: number
  portfolioValue: number
  roi: number
  activeProperties: number
  joinDate: string
  lastActivity: string
  nextMeeting: string | null
  status: string
  satisfaction: number
  notes: string
  assignedAgent: string
}

const investmentStatuses = [
  { id: 'active_investing', name: 'Active Investing', color: 'bg-green-100 text-green-800' },
  { id: 'portfolio_review', name: 'Portfolio Review', color: 'bg-blue-100 text-blue-800' },
  { id: 'expansion_ready', name: 'Expansion Ready', color: 'bg-purple-100 text-purple-800' },
  { id: 'maintenance_mode', name: 'Maintenance Mode', color: 'bg-yellow-100 text-yellow-800' }
]

export default function ActiveClientsPage() {
  const [clients, setClients] = useState<ActiveClient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('portfolio_value')
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [meetingModalOpen, setMeetingModalOpen] = useState(false)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ActiveClient | null>(null)
  const [editForm, setEditForm] = useState<Partial<ActiveClient>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchActiveClients()
  }, [])

  const fetchActiveClients = async () => {
    try {
      // Demo data for active investors
      const demoClients: ActiveClient[] = [
        {
          id: '1',
          name: 'Ahmed Al Mansouri',
          email: 'ahmed.almansouri@email.com',
          phone: '+971501234567',
          company: 'Al Mansouri Holdings',
          investmentBudget: '5M-10M',
          preferredArea: 'Downtown',
          riskTolerance: 'Medium',
          investmentGoal: 'Capital Growth',
          totalInvested: 8500000,
          portfolioValue: 9200000,
          roi: 8.2,
          activeProperties: 3,
          joinDate: '2024-06-15',
          lastActivity: '2025-10-20',
          nextMeeting: '2025-10-25',
          status: 'active_investing',
          satisfaction: 92,
          notes: 'Excellent client, always pays on time, looking to expand portfolio',
          assignedAgent: 'Max McCarthy'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+971502345678',
          company: 'Johnson Investments Ltd',
          investmentBudget: '10M+',
          preferredArea: 'Marina',
          riskTolerance: 'High',
          investmentGoal: 'Mixed',
          totalInvested: 15200000,
          portfolioValue: 16800000,
          roi: 10.5,
          activeProperties: 5,
          joinDate: '2024-03-20',
          lastActivity: '2025-10-22',
          nextMeeting: '2025-10-28',
          status: 'expansion_ready',
          satisfaction: 95,
          notes: 'Top-tier client, interested in luxury properties, excellent relationship',
          assignedAgent: 'Max McCarthy'
        },
        {
          id: '3',
          name: 'Robert Wilson',
          email: 'robert.wilson@email.com',
          phone: '+971503456789',
          company: null,
          investmentBudget: '2M-5M',
          preferredArea: 'Palm Jumeirah',
          riskTolerance: 'Low',
          investmentGoal: 'Rental Income',
          totalInvested: 3800000,
          portfolioValue: 4100000,
          roi: 7.9,
          activeProperties: 2,
          joinDate: '2024-08-10',
          lastActivity: '2025-10-18',
          nextMeeting: null,
          status: 'portfolio_review',
          satisfaction: 88,
          notes: 'Conservative investor, prefers stable returns, quarterly reviews',
          assignedAgent: 'Max McCarthy'
        },
        {
          id: '4',
          name: 'Fatima Al Zahra',
          email: 'fatima.alzahra@email.com',
          phone: '+971504567890',
          company: 'Al Zahra Real Estate',
          investmentBudget: '1M-2M',
          preferredArea: 'Business Bay',
          riskTolerance: 'Medium',
          investmentGoal: 'Capital Growth',
          totalInvested: 1200000,
          portfolioValue: 1320000,
          roi: 10.0,
          activeProperties: 1,
          joinDate: '2024-09-05',
          lastActivity: '2025-10-19',
          nextMeeting: '2025-10-30',
          status: 'active_investing',
          satisfaction: 90,
          notes: 'New but promising client, very engaged, looking to scale up',
          assignedAgent: 'Max McCarthy'
        },
        {
          id: '5',
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          phone: '+971505678901',
          company: 'Chen Capital',
          investmentBudget: '3M-5M',
          preferredArea: 'DIFC',
          riskTolerance: 'High',
          investmentGoal: 'Mixed',
          totalInvested: 4500000,
          portfolioValue: 4950000,
          roi: 10.0,
          activeProperties: 2,
          joinDate: '2024-04-12',
          lastActivity: '2025-10-21',
          nextMeeting: '2025-11-02',
          status: 'maintenance_mode',
          satisfaction: 85,
          notes: 'Satisfied with current portfolio, regular maintenance meetings',
          assignedAgent: 'Max McCarthy'
        }
      ]
      setClients(demoClients)
    } catch (error) {
      console.error('Error fetching active clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (statusId: string) => {
    return investmentStatuses.find(status => status.id === statusId) || investmentStatuses[0]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 90) return 'text-green-600'
    if (satisfaction >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleViewClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setViewModalOpen(true)
    }
  }

  const handleEditClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setEditForm(client)
      setEditModalOpen(true)
    }
  }

  const handleScheduleMeeting = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setMeetingModalOpen(true)
    }
  }

  const handleSendMessage = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setMessageModalOpen(true)
    }
  }

  const handleGenerateReport = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setReportModalOpen(true)
    }
  }

  const handleViewPortfolio = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setPortfolioModalOpen(true)
    }
  }

  const handleAddClient = () => {
    setEditForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      investmentBudget: '1M-2M',
      preferredArea: 'Downtown',
      riskTolerance: 'Medium',
      investmentGoal: 'Capital Growth',
      totalInvested: 0,
      portfolioValue: 0,
      roi: 0,
      activeProperties: 0,
      status: 'active_investing',
      satisfaction: 80,
      notes: '',
      assignedAgent: 'Max McCarthy'
    })
    setAddModalOpen(true)
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Sort clients
  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'portfolio_value':
        return b.portfolioValue - a.portfolioValue
      case 'roi':
        return b.roi - a.roi
      case 'satisfaction':
        return b.satisfaction - a.satisfaction
      case 'join_date':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      default:
        return a.name.localeCompare(b.name)
    }
  })

  // Calculate summary statistics
  const totalPortfolioValue = filteredClients.reduce((sum, client) => sum + client.portfolioValue, 0)
  const totalInvestment = filteredClients.reduce((sum, client) => sum + client.totalInvested, 0)
  const avgROI = filteredClients.length > 0 
    ? filteredClients.reduce((sum, client) => sum + client.roi, 0) / filteredClients.length 
    : 0
  const avgSatisfaction = filteredClients.length > 0 
    ? filteredClients.reduce((sum, client) => sum + client.satisfaction, 0) / filteredClients.length 
    : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Active Investors</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Active Investors</h1>
        <Button onClick={handleAddClient}>
          <Plus className="h-4 w-4 mr-2" />
          Add Active Client
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalPortfolioValue)}
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
                <p className="text-sm font-medium text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(totalInvestment)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg ROI</p>
                <p className="text-2xl font-bold text-purple-600">
                  {avgROI.toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className={`text-2xl font-bold ${getSatisfactionColor(avgSatisfaction)}`}>
                  {avgSatisfaction.toFixed(0)}%
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Sorting */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search active clients..."
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
          {investmentStatuses.map(status => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="portfolio_value">Portfolio Value</option>
          <option value="roi">ROI</option>
          <option value="satisfaction">Satisfaction</option>
          <option value="join_date">Join Date</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Active Clients List */}
      <div className="space-y-4">
        {sortedClients.map((client) => {
          const statusInfo = getStatusInfo(client.status)
          
          return (
            <Card key={client.id} className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-xl">{client.name}</h4>
                      <Badge className={statusInfo.color}>
                        {statusInfo.name}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className={`h-4 w-4 ${getSatisfactionColor(client.satisfaction)}`} />
                        <span className={`text-sm font-medium ${getSatisfactionColor(client.satisfaction)}`}>
                          {client.satisfaction}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Contact & Company</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {client.email}
                          </div>
                          {client.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {client.phone}
                            </div>
                          )}
                          {client.company && (
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {client.company}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Agent: {client.assignedAgent}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Investment Profile</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            Budget: {client.investmentBudget}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Area: {client.preferredArea}
                          </div>
                          <div>Risk: {client.riskTolerance}</div>
                          <div>Goal: {client.investmentGoal}</div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Portfolio Performance</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Invested:</span>
                            <span className="font-medium">{formatCurrency(client.totalInvested)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Value:</span>
                            <span className="font-medium text-green-600">{formatCurrency(client.portfolioValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">ROI:</span>
                            <span className="font-medium text-purple-600">{client.roi}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Properties:</span>
                            <span className="font-medium">{client.activeProperties}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Activity & Schedule</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Joined: {new Date(client.joinDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Last: {new Date(client.lastActivity).toLocaleDateString()}
                          </div>
                          {client.nextMeeting && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Calendar className="h-4 w-4" />
                              Next: {new Date(client.nextMeeting).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div className="text-sm">
                          <strong>Notes:</strong> {client.notes}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button 
                      size="sm"
                      onClick={() => handleViewPortfolio(client.id)}
                    >
                      <PieChart className="h-4 w-4 mr-1" />
                      Portfolio
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateReport(client.id)}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleScheduleMeeting(client.id)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Meeting
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendMessage(client.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewClient(client.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClient(client.id)}
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

        {sortedClients.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Activity className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active clients found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Active investor clients will appear here.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Professional Portfolio Modal */}
      {portfolioModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Portfolio Overview - {selectedClient.name}</h2>
              <button 
                onClick={() => setPortfolioModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {/* Portfolio Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {formatCurrency(selectedClient.portfolioValue)}
                    </div>
                    <div className="text-sm text-gray-600">Current Value</div>
                    <div className="text-lg font-medium text-green-600 mt-1">
                      +{((selectedClient.portfolioValue - selectedClient.totalInvested) / selectedClient.totalInvested * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{formatCurrency(selectedClient.totalInvested)}</div>
                        <div className="text-sm text-gray-600">Total Invested</div>
                      </div>
                      <DollarSign className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{selectedClient.roi}%</div>
                        <div className="text-sm text-gray-600">Annual ROI</div>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{selectedClient.activeProperties}</div>
                        <div className="text-sm text-gray-600">Properties</div>
                      </div>
                      <Home className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Property Portfolio */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Property Portfolio</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">Downtown Apartment Tower</h4>
                          <p className="text-sm text-gray-600">Downtown Dubai • Acquired: Jan 2024</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Performing</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Investment:</span>
                          <div className="font-medium">{formatCurrency(3500000)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Value:</span>
                          <div className="font-medium text-green-600">{formatCurrency(3850000)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">ROI:</span>
                          <div className="font-medium text-purple-600">10.0%</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">Marina Residential Complex</h4>
                          <p className="text-sm text-gray-600">Dubai Marina • Acquired: Mar 2024</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Growing</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Investment:</span>
                          <div className="font-medium">{formatCurrency(2800000)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Value:</span>
                          <div className="font-medium text-green-600">{formatCurrency(3100000)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">ROI:</span>
                          <div className="font-medium text-purple-600">10.7%</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">Business Bay Office</h4>
                          <p className="text-sm text-gray-600">Business Bay • Acquired: Jun 2024</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Monitoring</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Investment:</span>
                          <div className="font-medium">{formatCurrency(2200000)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Value:</span>
                          <div className="font-medium text-green-600">{formatCurrency(2250000)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">ROI:</span>
                          <div className="font-medium text-purple-600">2.3%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Analytics */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Analytics</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Portfolio Growth</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>6 Months:</span>
                          <span className="font-medium text-green-600">+12.5%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>12 Months:</span>
                          <span className="font-medium text-green-600">+18.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>YTD:</span>
                          <span className="font-medium text-green-600">+8.2%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Income Streams</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rental Income (Monthly):</span>
                          <span className="font-medium">{formatCurrency(45000)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Capital Appreciation:</span>
                          <span className="font-medium">{formatCurrency(700000)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Returns (YTD):</span>
                          <span className="font-medium text-green-600">{formatCurrency(1240000)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Investment Goals</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Target Portfolio Value:</span>
                            <span className="font-medium">{formatCurrency(12000000)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{width: '77%'}}></div>
                          </div>
                          <div className="text-xs text-purple-600 mt-1">77% Complete</div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Annual ROI Target:</span>
                            <span className="font-medium">12%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '68%'}}></div>
                          </div>
                          <div className="text-xs text-green-600 mt-1">Current: 8.2%</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Risk Assessment</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Portfolio Diversification:</span>
                          <span className="font-medium text-green-600">Good</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Exposure:</span>
                          <span className="font-medium text-yellow-600">Medium</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Liquidity Score:</span>
                          <span className="font-medium text-blue-600">7.5/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setPortfolioModalOpen(false)}>Close</Button>
              <div className="space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setPortfolioModalOpen(false)
                    handleGenerateReport(selectedClient.id)
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button 
                  onClick={() => {
                    setPortfolioModalOpen(false)
                    handleScheduleMeeting(selectedClient.id)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Report Generation Modal */}
      {reportModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Generate Portfolio Report - {selectedClient.name}</h2>
              <button 
                onClick={() => setReportModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Comprehensive Portfolio Review</option>
                      <option>Performance Summary</option>
                      <option>Investment Analysis</option>
                      <option>Risk Assessment</option>
                      <option>Tax Planning Report</option>
                      <option>Market Comparison</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Last 3 Months</option>
                      <option>Last 6 Months</option>
                      <option>Last 12 Months</option>
                      <option>Year to Date</option>
                      <option>Since Inception</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>PDF (Recommended)</option>
                      <option>Excel Spreadsheet</option>
                      <option>PowerPoint Presentation</option>
                      <option>Web Dashboard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include Sections</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Executive Summary</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Portfolio Performance</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Individual Property Analysis</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Risk Metrics</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Market Comparison</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Future Projections</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Report Preview</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex justify-between">
                        <span>Portfolio Value:</span>
                        <span className="font-medium">{formatCurrency(selectedClient.portfolioValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total ROI:</span>
                        <span className="font-medium">{selectedClient.roi}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Properties:</span>
                        <span className="font-medium">{selectedClient.activeProperties}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Satisfaction Score:</span>
                        <span className="font-medium">{selectedClient.satisfaction}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Distribution Options</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Email to Client ({selectedClient.email})</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">CC Agent ({selectedClient.assignedAgent})</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Save to Client Portal</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Schedule Automatic Updates</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-medium text-yellow-900 mb-2">Additional Notes</h3>
                    <textarea
                      placeholder="Add any specific notes or focus areas for this report..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                      defaultValue="Focus on Q4 performance and upcoming market opportunities."
                    />
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h3 className="font-medium text-purple-900 mb-2">Estimated Generation Time</h3>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-purple-800">2-3 minutes for comprehensive report</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setReportModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setReportModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Report Generation Started</p>
                      <p class="text-sm">Report will be ready in 2-3 minutes</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Message Modal */}
      {messageModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Send Message - {selectedClient.name}</h2>
              <button 
                onClick={() => setMessageModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <Input value={selectedClient.email} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Communication Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Email</option>
                      <option>WhatsApp Message</option>
                      <option>SMS</option>
                      <option>Client Portal Message</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Template</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Custom Message</option>
                      <option>Portfolio Update</option>
                      <option>Market Insights</option>
                      <option>Investment Opportunity</option>
                      <option>Meeting Follow-up</option>
                      <option>Annual Review Invitation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input placeholder="Enter message subject" defaultValue="Your Portfolio Performance Update - October 2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    placeholder="Enter your message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-40"
                    defaultValue={`Dear ${selectedClient.name},

I hope this message finds you well. I wanted to provide you with an update on your investment portfolio performance.

Your portfolio has shown excellent growth this quarter:
• Current Portfolio Value: ${formatCurrency(selectedClient.portfolioValue)}
• Total ROI: ${selectedClient.roi}%
• Number of Properties: ${selectedClient.activeProperties}

Key highlights:
- Strong performance in Downtown Dubai properties
- Consistent rental income generation
- Market value appreciation exceeding expectations

I would be happy to schedule a detailed review meeting to discuss your portfolio performance and potential new investment opportunities.

Best regards,
${selectedClient.assignedAgent}
Senior Investment Consultant`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Drag files here or click to upload</p>
                      <p className="text-xs text-gray-500">Portfolio reports, market insights, property details</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quick Actions</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" />
                          <span className="text-sm">Schedule follow-up reminder</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" defaultChecked />
                          <span className="text-sm">Track message opens</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" />
                          <span className="text-sm">Request read receipt</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" />
                          <span className="text-sm">Add to client activity log</span>
                        </label>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Suggested Content</h4>
                      <div className="space-y-1 text-sm text-blue-800">
                        <button className="block hover:underline">• Market outlook for Q4 2024</button>
                        <button className="block hover:underline">• New investment opportunities</button>
                        <button className="block hover:underline">• Property management updates</button>
                        <button className="block hover:underline">• Tax planning considerations</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setMessageModalOpen(false)}>Cancel</Button>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => {
                setMessageModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Message Sent</p>
                      <p class="text-sm">Message sent to ${selectedClient.email}</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Meeting Scheduling Modal */}
      {meetingModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Schedule Meeting - {selectedClient.name}</h2>
              <button 
                onClick={() => setMeetingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Portfolio Review Meeting</option>
                      <option>Investment Consultation</option>
                      <option>Property Viewing</option>
                      <option>Contract Signing</option>
                      <option>Market Update Session</option>
                      <option>Tax Planning Discussion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Location</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Office Visit</option>
                      <option>Client Location</option>
                      <option>Video Conference</option>
                      <option>Property Site Visit</option>
                      <option>Restaurant/Coffee Shop</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <Input
                      type="date"
                      defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                      <option>04:00 PM</option>
                      <option>05:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>1 hour</option>
                      <option>1.5 hours</option>
                      <option>2 hours</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                    <div className="space-y-2">
                      <Input value={selectedClient.name} disabled className="bg-gray-50" />
                      <Input value={selectedClient.assignedAgent} disabled className="bg-gray-50" />
                      <Input placeholder="Add additional attendees..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Agenda</label>
                    <textarea
                      placeholder="Enter meeting agenda and key discussion points..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
                      defaultValue={`Portfolio Review Meeting Agenda:

1. Review Q3 performance results
2. Discuss current market conditions
3. Evaluate new investment opportunities
4. Plan Q4 investment strategy
5. Address any client questions/concerns`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Notes</label>
                    <textarea
                      placeholder="Add any preparation notes or context..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-16"
                      defaultValue="Prepare latest market reports and ROI projections for review."
                    />
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Meeting Preparation</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Generate portfolio report</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Prepare market analysis</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Prepare investment proposals</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Book conference room</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Reminders</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Email reminder 24 hours before</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">SMS reminder 2 hours before</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Calendar invitation</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setMeetingModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setMeetingModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Meeting Scheduled</p>
                      <p class="text-sm">Invitations sent to ${selectedClient.email}</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional View Client Modal */}
      {viewModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Client Profile - {selectedClient.name}</h2>
              <button 
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Client Information */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Contact Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{selectedClient.email}</span>
                        </div>
                        {selectedClient.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{selectedClient.phone}</span>
                          </div>
                        )}
                        {selectedClient.company && (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span>{selectedClient.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>Agent: {selectedClient.assignedAgent}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Investment Profile</h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div><strong>Budget:</strong> {selectedClient.investmentBudget}</div>
                        <div><strong>Area:</strong> {selectedClient.preferredArea}</div>
                        <div><strong>Risk:</strong> {selectedClient.riskTolerance}</div>
                        <div><strong>Goal:</strong> {selectedClient.investmentGoal}</div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Relationship Status</h4>
                      <div className="space-y-2 text-sm text-green-800">
                        <div><strong>Joined:</strong> {new Date(selectedClient.joinDate).toLocaleDateString()}</div>
                        <div><strong>Last Activity:</strong> {new Date(selectedClient.lastActivity).toLocaleDateString()}</div>
                        {selectedClient.nextMeeting && (
                          <div><strong>Next Meeting:</strong> {new Date(selectedClient.nextMeeting).toLocaleDateString()}</div>
                        )}
                        <div className="flex items-center gap-2">
                          <Star className={`h-4 w-4 ${getSatisfactionColor(selectedClient.satisfaction)}`} />
                          <span><strong>Satisfaction:</strong> {selectedClient.satisfaction}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Overview */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio Overview</h3>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-3 bg-white border rounded-lg text-center">
                      <div className="text-xl font-bold text-green-600">{formatCurrency(selectedClient.portfolioValue)}</div>
                      <div className="text-xs text-gray-600">Portfolio Value</div>
                    </div>
                    <div className="p-3 bg-white border rounded-lg text-center">
                      <div className="text-xl font-bold text-blue-600">{formatCurrency(selectedClient.totalInvested)}</div>
                      <div className="text-xs text-gray-600">Total Invested</div>
                    </div>
                    <div className="p-3 bg-white border rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-600">{selectedClient.roi}%</div>
                      <div className="text-xs text-gray-600">ROI</div>
                    </div>
                    <div className="p-3 bg-white border rounded-lg text-center">
                      <div className="text-xl font-bold text-orange-600">{selectedClient.activeProperties}</div>
                      <div className="text-xs text-gray-600">Properties</div>
                    </div>
                  </div>

                  {/* Activity Timeline */}
                  <div className="p-4 bg-gray-50 rounded-lg mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Oct 22, 2024</span>
                        <span>Portfolio performance review completed</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Oct 20, 2024</span>
                        <span>Monthly market update sent</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Oct 18, 2024</span>
                        <span>New investment opportunity discussed</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-600">Oct 15, 2024</span>
                        <span>Client meeting scheduled</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Agent Notes</h4>
                    <p className="text-sm text-yellow-800">{selectedClient.notes}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
              <div className="space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setViewModalOpen(false)
                    handleViewPortfolio(selectedClient.id)
                  }}
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  View Portfolio
                </Button>
                <Button 
                  onClick={() => {
                    setViewModalOpen(false)
                    handleEditClient(selectedClient.id)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Client
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}