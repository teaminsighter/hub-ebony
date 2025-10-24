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
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  Zap,
  Settings,
  RefreshCw,
  Download,
  Filter,
  X,
  Send,
  Save,
  Sliders,
  Brain,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Gauge,
  Calculator,
  FileText,
  Bell,
  UserPlus,
  Route
} from 'lucide-react'

interface ClientScore {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  totalScore: number
  scoreBreakdown: {
    financial: number
    engagement: number
    timeline: number
    referral: number
    communication: number
  }
  scoreGrade: string
  lastUpdated: string
  conversionProbability: number
  recommendedActions: string[]
  status: string
  assignedAgent: string
  notes: string
  leadSource: string
  daysSinceContact: number
  interactions: number
}

const scoreGrades = [
  { grade: 'A+', min: 90, color: 'bg-green-100 text-green-800', priority: 'Highest' },
  { grade: 'A', min: 80, color: 'bg-green-100 text-green-800', priority: 'High' },
  { grade: 'B+', min: 70, color: 'bg-blue-100 text-blue-800', priority: 'Medium-High' },
  { grade: 'B', min: 60, color: 'bg-blue-100 text-blue-800', priority: 'Medium' },
  { grade: 'C+', min: 50, color: 'bg-yellow-100 text-yellow-800', priority: 'Medium-Low' },
  { grade: 'C', min: 40, color: 'bg-yellow-100 text-yellow-800', priority: 'Low' },
  { grade: 'D', min: 0, color: 'bg-red-100 text-red-800', priority: 'Very Low' }
]

export default function ClientScoringPage() {
  const [clients, setClients] = useState<ClientScore[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState('all')
  const [sortBy, setSortBy] = useState('total_score')
  
  // Modal states
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false)
  const [editScoreModalOpen, setEditScoreModalOpen] = useState(false)
  const [configureModalOpen, setConfigureModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [automationModalOpen, setAutomationModalOpen] = useState(false)
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientScore | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchClientScores()
  }, [])

  const fetchClientScores = async () => {
    try {
      // Demo data for client scoring
      const demoClients: ClientScore[] = [
        {
          id: '1',
          name: 'Ahmed Al Mansouri',
          email: 'ahmed.almansouri@email.com',
          phone: '+971501234567',
          company: 'Al Mansouri Holdings',
          totalScore: 92,
          scoreBreakdown: {
            financial: 95,
            engagement: 90,
            timeline: 88,
            referral: 100,
            communication: 87
          },
          scoreGrade: 'A+',
          lastUpdated: '2025-10-22',
          conversionProbability: 85,
          recommendedActions: [
            'Schedule immediate consultation',
            'Prepare premium property portfolio',
            'Assign senior agent'
          ],
          status: 'hot_lead',
          assignedAgent: 'Max McCarthy',
          notes: 'Very high net worth individual, excellent engagement',
          leadSource: 'Referral',
          daysSinceContact: 1,
          interactions: 12
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+971502345678',
          company: 'Johnson Investments Ltd',
          totalScore: 88,
          scoreBreakdown: {
            financial: 92,
            engagement: 85,
            timeline: 90,
            referral: 80,
            communication: 93
          },
          scoreGrade: 'A',
          lastUpdated: '2025-10-21',
          conversionProbability: 78,
          recommendedActions: [
            'Send detailed market analysis',
            'Schedule property viewing',
            'Follow up within 24 hours'
          ],
          status: 'qualified',
          assignedAgent: 'Max McCarthy',
          notes: 'Corporate investor, strong financial background',
          leadSource: 'Website',
          daysSinceContact: 2,
          interactions: 8
        },
        {
          id: '3',
          name: 'Robert Wilson',
          email: 'robert.wilson@email.com',
          phone: '+971503456789',
          company: null,
          totalScore: 75,
          scoreBreakdown: {
            financial: 70,
            engagement: 80,
            timeline: 75,
            referral: 60,
            communication: 90
          },
          scoreGrade: 'B+',
          lastUpdated: '2025-10-20',
          conversionProbability: 65,
          recommendedActions: [
            'Qualify financial capacity',
            'Provide investment education',
            'Schedule discovery call'
          ],
          status: 'nurturing',
          assignedAgent: 'Max McCarthy',
          notes: 'First-time investor, needs guidance and education',
          leadSource: 'Social Media',
          daysSinceContact: 3,
          interactions: 5
        },
        {
          id: '4',
          name: 'Emily Davis',
          email: 'emily.davis@email.com',
          phone: '+971504567890',
          company: 'Davis Consulting',
          totalScore: 68,
          scoreBreakdown: {
            financial: 60,
            engagement: 75,
            timeline: 70,
            referral: 50,
            communication: 85
          },
          scoreGrade: 'B',
          lastUpdated: '2025-10-19',
          conversionProbability: 55,
          recommendedActions: [
            'Send targeted content',
            'Assess timeline flexibility',
            'Provide market insights'
          ],
          status: 'developing',
          assignedAgent: 'Max McCarthy',
          notes: 'Interested but cautious, needs more information',
          leadSource: 'Email Campaign',
          daysSinceContact: 4,
          interactions: 3
        },
        {
          id: '5',
          name: 'Michael Brown',
          email: 'michael.brown@email.com',
          phone: '+971505678901',
          company: null,
          totalScore: 45,
          scoreBreakdown: {
            financial: 40,
            engagement: 50,
            timeline: 30,
            referral: 60,
            communication: 45
          },
          scoreGrade: 'C',
          lastUpdated: '2025-10-15',
          conversionProbability: 25,
          recommendedActions: [
            'Re-qualify interest level',
            'Provide basic education',
            'Consider long-term nurturing'
          ],
          status: 'cold',
          assignedAgent: 'Max McCarthy',
          notes: 'Low engagement, uncertain timeline',
          leadSource: 'Cold Call',
          daysSinceContact: 8,
          interactions: 1
        }
      ]
      setClients(demoClients)
    } catch (error) {
      console.error('Error fetching client scores:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGradeInfo = (score: number) => {
    return scoreGrades.find(grade => score >= grade.min) || scoreGrades[scoreGrades.length - 1]
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPriorityIcon = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return <Award className="h-4 w-4" />
    if (grade === 'B+' || grade === 'B') return <Zap className="h-4 w-4" />
    if (grade === 'C+' || grade === 'C') return <Clock className="h-4 w-4" />
    return <AlertCircle className="h-4 w-4" />
  }

  const handleViewClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setViewDetailsModalOpen(true)
    }
  }

  const handleEditScore = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setEditScoreModalOpen(true)
    }
  }

  const handleRecalculateScore = (clientId: string) => {
    // Show professional success notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-semibold">Score Recalculated</p>
          <p class="text-sm">Lead score updated with latest data</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  const handleBulkRecalculate = () => {
    setAutomationModalOpen(true)
  }

  const handleExportScores = () => {
    setExportModalOpen(true)
  }

  const handleConfigureScoring = () => {
    setConfigureModalOpen(true)
  }

  const handleAssignLeads = () => {
    setAssignmentModalOpen(true)
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === 'all' || client.scoreGrade === filterGrade
    return matchesSearch && matchesGrade
  })

  // Sort clients
  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'total_score':
        return b.totalScore - a.totalScore
      case 'conversion_probability':
        return b.conversionProbability - a.conversionProbability
      case 'last_updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case 'interactions':
        return b.interactions - a.interactions
      default:
        return a.name.localeCompare(b.name)
    }
  })

  // Calculate summary statistics
  const avgScore = filteredClients.length > 0 
    ? filteredClients.reduce((sum, client) => sum + client.totalScore, 0) / filteredClients.length 
    : 0
  const highPriorityClients = filteredClients.filter(client => client.totalScore >= 80).length
  const avgConversionProb = filteredClients.length > 0 
    ? filteredClients.reduce((sum, client) => sum + client.conversionProbability, 0) / filteredClients.length 
    : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Lead Scoring</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Lead Scoring System</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAssignLeads}>
            <Route className="h-4 w-4 mr-2" />
            Auto-Assign
          </Button>
          <Button variant="outline" onClick={handleBulkRecalculate}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalculate All
          </Button>
          <Button variant="outline" onClick={handleExportScores}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleConfigureScoring}>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>
                  {avgScore.toFixed(0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-green-600">
                  {highPriorityClients}
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
                <p className="text-sm font-medium text-gray-600">Avg Conversion</p>
                <p className="text-2xl font-bold text-purple-600">
                  {avgConversionProb.toFixed(0)}%
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
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredClients.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scoring Model Info */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Model Overview</CardTitle>
          <CardDescription>How client scores are calculated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Financial (25%)</h4>
              <p className="text-sm text-gray-600">Investment capacity, budget range</p>
            </div>
            <div className="text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium">Engagement (25%)</h4>
              <p className="text-sm text-gray-600">Website activity, email opens</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium">Timeline (20%)</h4>
              <p className="text-sm text-gray-600">Purchase urgency, timeline</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-medium">Referral (15%)</h4>
              <p className="text-sm text-gray-600">Source quality, referral strength</p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <h4 className="font-medium">Communication (15%)</h4>
              <p className="text-sm text-gray-600">Response rate, interaction quality</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sorting */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Grades</option>
          {scoreGrades.map(grade => (
            <option key={grade.grade} value={grade.grade}>{grade.grade} Grade</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="total_score">Total Score</option>
          <option value="conversion_probability">Conversion Probability</option>
          <option value="last_updated">Last Updated</option>
          <option value="interactions">Interactions</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Client Scoring List */}
      <div className="space-y-4">
        {sortedClients.map((client) => {
          const gradeInfo = getGradeInfo(client.totalScore)
          
          return (
            <Card key={client.id} className={`border-l-4 ${
              client.totalScore >= 80 ? 'border-l-green-500' :
              client.totalScore >= 60 ? 'border-l-blue-500' :
              client.totalScore >= 40 ? 'border-l-yellow-500' : 'border-l-red-500'
            }`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      {getPriorityIcon(client.scoreGrade)}
                      <h4 className="font-medium text-xl">{client.name}</h4>
                      <Badge className={gradeInfo.color}>
                        Grade {client.scoreGrade}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800">
                        {client.conversionProbability}% conversion
                      </Badge>
                      <span className={`text-2xl font-bold ${getScoreColor(client.totalScore)}`}>
                        {client.totalScore}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Contact Info</h5>
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
                          <div>Source: {client.leadSource}</div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Score Breakdown</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Financial:</span>
                            <span className={getScoreColor(client.scoreBreakdown.financial)}>{client.scoreBreakdown.financial}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Engagement:</span>
                            <span className={getScoreColor(client.scoreBreakdown.engagement)}>{client.scoreBreakdown.engagement}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Timeline:</span>
                            <span className={getScoreColor(client.scoreBreakdown.timeline)}>{client.scoreBreakdown.timeline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Referral:</span>
                            <span className={getScoreColor(client.scoreBreakdown.referral)}>{client.scoreBreakdown.referral}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Communication:</span>
                            <span className={getScoreColor(client.scoreBreakdown.communication)}>{client.scoreBreakdown.communication}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Activity Metrics</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>Last Updated: {new Date(client.lastUpdated).toLocaleDateString()}</div>
                          <div>Days Since Contact: {client.daysSinceContact}</div>
                          <div>Total Interactions: {client.interactions}</div>
                          <div>Assigned to: {client.assignedAgent}</div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Recommended Actions</h5>
                        <div className="space-y-1 text-xs">
                          {client.recommendedActions.map((action, index) => (
                            <div key={index} className="flex items-start gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm">
                        <strong>Notes:</strong> {client.notes}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button 
                      size="sm"
                      onClick={() => handleRecalculateScore(client.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Recalculate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewClient(client.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditScore(client.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Adjust Score
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
              <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No scored clients found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterGrade !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Client scoring data will appear here once leads are scored.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Professional Lead Scoring Details Modal */}
      {viewDetailsModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Lead Scoring Analysis - {selectedClient.name}</h2>
              <button 
                onClick={() => setViewDetailsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {/* Score Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className={`p-6 rounded-lg border-2 ${
                  selectedClient.totalScore >= 80 ? 'bg-green-50 border-green-200' :
                  selectedClient.totalScore >= 60 ? 'bg-blue-50 border-blue-200' :
                  selectedClient.totalScore >= 40 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(selectedClient.totalScore)}`}>
                      {selectedClient.totalScore}
                    </div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                    <div className={`text-lg font-medium mt-1 ${
                      selectedClient.totalScore >= 80 ? 'text-green-600' :
                      selectedClient.totalScore >= 60 ? 'text-blue-600' :
                      selectedClient.totalScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      Grade {selectedClient.scoreGrade}
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{selectedClient.conversionProbability}%</div>
                        <div className="text-sm text-gray-600">Conversion Rate</div>
                      </div>
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{selectedClient.interactions}</div>
                        <div className="text-sm text-gray-600">Interactions</div>
                      </div>
                      <Activity className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{selectedClient.daysSinceContact}</div>
                        <div className="text-sm text-gray-600">Days Since Contact</div>
                      </div>
                      <Clock className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Detailed Score Breakdown */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Score Breakdown</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-900">Financial Capacity (25%)</span>
                        </div>
                        <span className={`font-bold ${getScoreColor(selectedClient.scoreBreakdown.financial)}`}>
                          {selectedClient.scoreBreakdown.financial}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: `${selectedClient.scoreBreakdown.financial}%`}}></div>
                      </div>
                      <div className="text-sm text-green-800">
                        Budget qualification, investment capacity, financial stability
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-900">Engagement Level (25%)</span>
                        </div>
                        <span className={`font-bold ${getScoreColor(selectedClient.scoreBreakdown.engagement)}`}>
                          {selectedClient.scoreBreakdown.engagement}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: `${selectedClient.scoreBreakdown.engagement}%`}}></div>
                      </div>
                      <div className="text-sm text-blue-800">
                        Website activity, email opens, document downloads, interaction frequency
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-purple-900">Timeline Urgency (20%)</span>
                        </div>
                        <span className={`font-bold ${getScoreColor(selectedClient.scoreBreakdown.timeline)}`}>
                          {selectedClient.scoreBreakdown.timeline}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: `${selectedClient.scoreBreakdown.timeline}%`}}></div>
                      </div>
                      <div className="text-sm text-purple-800">
                        Purchase timeline, decision urgency, immediate availability
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-orange-600" />
                          <span className="font-medium text-orange-900">Referral Quality (15%)</span>
                        </div>
                        <span className={`font-bold ${getScoreColor(selectedClient.scoreBreakdown.referral)}`}>
                          {selectedClient.scoreBreakdown.referral}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{width: `${selectedClient.scoreBreakdown.referral}%`}}></div>
                      </div>
                      <div className="text-sm text-orange-800">
                        Lead source quality, referral strength, channel reliability
                      </div>
                    </div>

                    <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-pink-600" />
                          <span className="font-medium text-pink-900">Communication (15%)</span>
                        </div>
                        <span className={`font-bold ${getScoreColor(selectedClient.scoreBreakdown.communication)}`}>
                          {selectedClient.scoreBreakdown.communication}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{width: `${selectedClient.scoreBreakdown.communication}%`}}></div>
                      </div>
                      <div className="text-sm text-pink-800">
                        Response rate, communication quality, interaction depth
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights and Recommendations */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights & Recommendations</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Priority Actions</span>
                      </div>
                      <div className="space-y-2">
                        {selectedClient.recommendedActions.map((action, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-blue-800 text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Conversion Probability</span>
                      </div>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{width: `${selectedClient.conversionProbability}%`}}></div>
                          </div>
                        </div>
                        <span className="text-green-700 font-medium">{selectedClient.conversionProbability}%</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        {selectedClient.conversionProbability >= 70 ? 'High likelihood to convert within 30 days' :
                         selectedClient.conversionProbability >= 50 ? 'Moderate conversion potential with proper nurturing' :
                         selectedClient.conversionProbability >= 30 ? 'Requires significant engagement to convert' :
                         'Low conversion probability, consider long-term nurturing'}
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Gauge className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Score Trend Analysis</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Last 7 days:</span>
                          <div className="flex items-center gap-1">
                            <ArrowUp className="h-3 w-3 text-green-500" />
                            <span className="text-green-600 font-medium">+5 points</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Last 30 days:</span>
                          <div className="flex items-center gap-1">
                            <ArrowUp className="h-3 w-3 text-green-500" />
                            <span className="text-green-600 font-medium">+12 points</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Overall trend:</span>
                          <span className="text-green-600 font-medium">Improving</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Next Best Actions</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-white rounded border">
                          <span className="font-medium">Immediate (24hrs):</span>
                          <div className="text-purple-700">Send personalized follow-up email with market insights</div>
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <span className="font-medium">Short-term (3-7 days):</span>
                          <div className="text-purple-700">Schedule consultation call to discuss investment goals</div>
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <span className="font-medium">Medium-term (2 weeks):</span>
                          <div className="text-purple-700">Present curated property portfolio matching their criteria</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setViewDetailsModalOpen(false)}>Close</Button>
              <div className="space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setViewDetailsModalOpen(false)
                    handleEditScore(selectedClient.id)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Adjust Score
                </Button>
                <Button 
                  onClick={() => {
                    handleRecalculateScore(selectedClient.id)
                    setViewDetailsModalOpen(false)
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recalculate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Configure Scoring Modal */}
      {configureModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Configure Lead Scoring Model</h2>
              <button 
                onClick={() => setConfigureModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Scoring Weights */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Scoring Category Weights</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-900">Financial Capacity</span>
                        </div>
                        <span className="text-green-600 font-bold">25%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        defaultValue="25" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget Range:</span>
                          <span className="font-medium">High Impact (40%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Income Level:</span>
                          <span className="font-medium">Medium Impact (35%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Credit Score:</span>
                          <span className="font-medium">Medium Impact (25%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-900">Engagement Level</span>
                        </div>
                        <span className="text-blue-600 font-bold">25%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        defaultValue="25" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Website Activity:</span>
                          <span className="font-medium">High Impact (40%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email Engagement:</span>
                          <span className="font-medium">Medium Impact (35%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Content Downloads:</span>
                          <span className="font-medium">Medium Impact (25%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-purple-900">Timeline Urgency</span>
                        </div>
                        <span className="text-purple-600 font-bold">20%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        defaultValue="20" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Purchase Timeline:</span>
                          <span className="font-medium">High Impact (50%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Decision Urgency:</span>
                          <span className="font-medium">High Impact (30%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Move-in Date:</span>
                          <span className="font-medium">Low Impact (20%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-orange-600" />
                          <span className="font-medium text-orange-900">Referral Quality</span>
                        </div>
                        <span className="text-orange-600 font-bold">15%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        defaultValue="15" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-pink-600" />
                          <span className="font-medium text-pink-900">Communication</span>
                        </div>
                        <span className="text-pink-600 font-bold">15%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        defaultValue="15" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Configuration */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Scoring Rules</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-3">Score Decay Settings</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Days without activity before decay starts</label>
                          <input type="number" defaultValue="7" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Daily decay rate (%)</label>
                          <input type="number" defaultValue="2" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum score threshold</label>
                          <input type="number" defaultValue="10" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-3">Bonus Point Rules</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" defaultChecked />
                          <span className="text-sm">+10 points for referral leads</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" defaultChecked />
                          <span className="text-sm">+15 points for repeat inquiries</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" />
                          <span className="text-sm">+5 points for social media engagement</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" defaultChecked />
                          <span className="text-sm">+20 points for direct contact attempts</span>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-3">Grade Thresholds</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">A+ Grade:</span>
                          <input type="number" defaultValue="90" className="w-16 px-2 py-1 border border-gray-300 rounded text-sm" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">A Grade:</span>
                          <input type="number" defaultValue="80" className="w-16 px-2 py-1 border border-gray-300 rounded text-sm" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">B+ Grade:</span>
                          <input type="number" defaultValue="70" className="w-16 px-2 py-1 border border-gray-300 rounded text-sm" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">B Grade:</span>
                          <input type="number" defaultValue="60" className="w-16 px-2 py-1 border border-gray-300 rounded text-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-3">Automation Settings</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" defaultChecked />
                          <span className="text-sm">Auto-assign high-score leads</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" defaultChecked />
                          <span className="text-sm">Send notifications for score changes</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" />
                          <span className="text-sm">Daily score recalculation</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" defaultChecked />
                          <span className="text-sm">Weekly scoring reports</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setConfigureModalOpen(false)}>Cancel</Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Save as Template
              </Button>
              <Button onClick={() => {
                setConfigureModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Scoring Model Updated</p>
                      <p class="text-sm">New settings applied successfully</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Export Lead Scoring Report</h2>
              <button 
                onClick={() => setExportModalOpen(false)}
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
                      <option>Complete Scoring Report</option>
                      <option>High Priority Leads Only</option>
                      <option>Score Trends Analysis</option>
                      <option>Performance Summary</option>
                      <option>Custom Report</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                      <option>Year to date</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Excel (.xlsx)</option>
                      <option>CSV (.csv)</option>
                      <option>PDF Report</option>
                      <option>PowerPoint Presentation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include Data</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Score breakdown details</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Contact information</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Recommended actions</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Score history trends</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Agent assignments</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Report Preview</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex justify-between">
                        <span>Total Leads:</span>
                        <span className="font-medium">{clients.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High Priority (A+/A):</span>
                        <span className="font-medium">{highPriorityClients}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Score:</span>
                        <span className="font-medium">{avgScore.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Conversion Rate:</span>
                        <span className="font-medium">{avgConversionProb.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Distribution</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Email to management team</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Send to all agents</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Upload to shared drive</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Schedule recurring reports</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-medium text-yellow-900 mb-2">Custom Fields</h3>
                    <textarea
                      placeholder="Add any custom notes or focus areas for this report..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-16"
                      defaultValue="Weekly lead scoring analysis for sales team review."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setExportModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setExportModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Export Started</p>
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
    </div>
  )
}