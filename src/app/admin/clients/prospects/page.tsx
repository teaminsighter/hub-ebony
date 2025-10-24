'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Target, 
  Mail, 
  Phone, 
  Calendar, 
  Search,
  Plus,
  Eye,
  Edit,
  X,
  Send,
  Star,
  MessageCircle,
  Building,
  DollarSign,
  MapPin,
  BarChart3,
  Activity,
  Award,
  TrendingDown
} from 'lucide-react'

interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  leadScore: number
  source: string
  budget: string
  area: string
  status: string
  createdAt: string
  lastContact?: string
  notes?: string
  priority: string
}

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+971501234567",
      leadScore: 85,
      source: "Website",
      budget: "500K - 1M AED",
      area: "Downtown Dubai",
      status: "Hot Lead",
      createdAt: "2024-10-20",
      lastContact: "2024-10-23",
      notes: "Very interested in luxury apartments, looking to invest in Q1 2025",
      priority: "High"
    },
    {
      id: "2", 
      name: "Lisa Chen",
      email: "lisa.chen@example.com", 
      phone: "+971507654321",
      leadScore: 72,
      source: "Social Media",
      budget: "1M+ AED",
      area: "Dubai Marina",
      status: "Warm Lead",
      createdAt: "2024-10-21",
      lastContact: "2024-10-22",
      notes: "Looking for rental income properties, prefers Marina location",
      priority: "Medium"
    },
    {
      id: "3",
      name: "Ahmed Al-Rashid",
      email: "ahmed.rashid@example.com",
      phone: "+971509876543",
      leadScore: 45,
      source: "Referral",
      budget: "500K - 1M AED",
      area: "Palm Jumeirah",
      status: "Cold Lead",
      createdAt: "2024-10-19",
      notes: "Initial inquiry, needs more nurturing",
      priority: "Low"
    }
  ])

  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [leadScoringModalOpen, setLeadScoringModalOpen] = useState(false)
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null)
  const [editForm, setEditForm] = useState<Partial<Prospect>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getScoreCategory = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot Lead': return 'bg-red-100 text-red-800'
      case 'Warm Lead': return 'bg-yellow-100 text-yellow-800'
      case 'Cold Lead': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600'
      case 'Medium': return 'text-yellow-600'
      case 'Low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  // Handler functions
  const handleContactProspect = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId)
    if (prospect) {
      setSelectedProspect(prospect)
      setContactModalOpen(true)
    }
  }

  const handleScheduleCall = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId)
    if (prospect) {
      setSelectedProspect(prospect)
      setScheduleModalOpen(true)
    }
  }

  const handleViewProspect = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId)
    if (prospect) {
      setSelectedProspect(prospect)
      setViewModalOpen(true)
    }
  }

  const handleEditProspect = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId)
    if (prospect) {
      setSelectedProspect(prospect)
      setEditForm(prospect)
      setEditModalOpen(true)
    }
  }

  const handleAddProspect = () => {
    setEditForm({
      name: '',
      email: '',
      phone: '',
      leadScore: 50,
      source: 'Website',
      budget: '',
      area: '',
      status: 'Cold Lead',
      priority: 'Medium',
      notes: ''
    })
    setAddModalOpen(true)
  }

  const handleCall = (phone: string) => {
    // Show professional call notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
        </svg>
        <div>
          <p class="font-semibold">Call Initiated</p>
          <p class="text-sm">Calling ${phone}</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  const handleLeadScoring = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId)
    if (prospect) {
      setSelectedProspect(prospect)
      setLeadScoringModalOpen(true)
    }
  }

  // Filter prospects
  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || prospect.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Prospects</h1>
        <Button onClick={handleAddProspect}>
          <Plus className="h-4 w-4 mr-2" />
          Add Prospect
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search prospects..."
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
          <option value="all">All Status</option>
          <option value="Hot Lead">Hot Lead</option>
          <option value="Warm Lead">Warm Lead</option>
          <option value="Cold Lead">Cold Lead</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">
              +23 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              Score 80+
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2%</div>
            <p className="text-xs text-muted-foreground">
              Above target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              Within SLA
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Prospects</CardTitle>
          <CardDescription>
            New prospects interested in Dubai property investment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProspects.map((prospect) => (
              <div key={prospect.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-lg">{prospect.name}</h4>
                    <Badge className={getStatusColor(prospect.status)}>
                      {prospect.status}
                    </Badge>
                    <button 
                      className={`text-sm font-medium ${getScoreColor(prospect.leadScore)} hover:underline transition-colors`}
                      onClick={() => handleLeadScoring(prospect.id)}
                    >
                      <BarChart3 className="h-3 w-3 inline mr-1" />
                      Score: {prospect.leadScore}
                    </button>
                    <span className={`text-sm font-medium ${getPriorityColor(prospect.priority)}`}>
                      <Star className="h-3 w-3 inline mr-1" />
                      {prospect.priority}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Contact</p>
                      <button 
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors mb-1"
                        onClick={() => handleContactProspect(prospect.id)}
                      >
                        <Mail className="h-3 w-3" />
                        {prospect.email}
                      </button>
                      <button 
                        className="flex items-center gap-1 hover:text-green-600 transition-colors"
                        onClick={() => handleCall(prospect.phone)}
                      >
                        <Phone className="h-3 w-3" />
                        {prospect.phone}
                      </button>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Investment</p>
                      <div className="flex items-center gap-1 mb-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{prospect.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{prospect.area}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Lead Info</p>
                      <p>Source: {prospect.source}</p>
                      <p>Added: {new Date(prospect.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Activity</p>
                      <p>Last Contact: {prospect.lastContact ? new Date(prospect.lastContact).toLocaleDateString() : 'Never'}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {prospect.notes && prospect.notes.length > 30 
                          ? prospect.notes.substring(0, 30) + '...'
                          : prospect.notes || 'No notes'}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Next Steps</p>
                      <p className="text-xs">Follow up on investment goals</p>
                      <p className="text-xs text-gray-500">Suggested: Property viewing</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    size="sm"
                    onClick={() => handleContactProspect(prospect.id)}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleScheduleCall(prospect.id)}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewProspect(prospect.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditProspect(prospect.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleLeadScoring(prospect.id)}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Score
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredProspects.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No prospects found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Add your first prospect to get started.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional Contact Modal */}
      {contactModalOpen && selectedProspect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Contact Prospect - {selectedProspect.name}</h2>
              <button 
                onClick={() => setContactModalOpen(false)}
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
                    <Input value={selectedProspect.email} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Custom Email</option>
                      <option>Initial Contact</option>
                      <option>Follow-up</option>
                      <option>Property Recommendations</option>
                      <option>Investment Opportunity</option>
                      <option>Market Update</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input placeholder="Enter email subject" defaultValue="Welcome to Dubai Property Investment Opportunities" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    placeholder="Enter your message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-40"
                    defaultValue={`Dear ${selectedProspect.name},

Thank you for your interest in Dubai property investment opportunities. I noticed you're looking for properties in ${selectedProspect.area} with a budget of ${selectedProspect.budget}.

We have some excellent investment opportunities that match your criteria:
• Premium properties in ${selectedProspect.area}
• Strong ROI potential
• Flexible payment plans
• Professional property management services

I would love to schedule a consultation to discuss these opportunities in detail and understand your investment goals better.

Best regards,
Max McCarthy
Senior Property Investment Consultant`}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="highPriority" className="rounded" />
                    <label htmlFor="highPriority" className="text-sm text-gray-700">High Priority</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="trackOpens" className="rounded" defaultChecked />
                    <label htmlFor="trackOpens" className="text-sm text-gray-700">Track Opens</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setContactModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setContactModalOpen(false)
                
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
                      <p class="font-semibold">Email Sent</p>
                      <p class="text-sm">Message sent to ${selectedProspect.email}</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Schedule Modal */}
      {scheduleModalOpen && selectedProspect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Schedule Call - {selectedProspect.name}</h2>
              <button 
                onClick={() => setScheduleModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Call Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Initial Discovery Call</option>
                      <option>Follow-up Call</option>
                      <option>Investment Consultation</option>
                      <option>Property Presentation</option>
                      <option>Closing Call</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <Input
                      type="date"
                      defaultValue={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
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
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>1 hour</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input value={selectedProspect.phone} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Max McCarthy</option>
                      <option>Sarah Johnson</option>
                      <option>Ahmed Al-Rashid</option>
                      <option>Lisa Chen</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Call Agenda</label>
                    <textarea
                      placeholder="Enter call agenda and talking points..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
                      defaultValue={`• Understand investment goals and timeline
• Discuss budget and financing options
• Present suitable properties in ${selectedProspect.area}
• Explain market conditions and ROI potential
• Schedule property viewing if interested`}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="sendReminder" className="rounded" defaultChecked />
                    <label htmlFor="sendReminder" className="text-sm text-gray-700">Send SMS reminder 1 hour before</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setScheduleModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Call Scheduled</p>
                      <p class="text-sm">Reminder set for ${selectedProspect.name}</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional View Modal */}
      {viewModalOpen && selectedProspect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Prospect Profile - {selectedProspect.name}</h2>
              <button 
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedProspect.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedProspect.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedProspect.phone}</p>
                      <p><span className="font-medium">Status:</span> 
                        <Badge className={`${getStatusColor(selectedProspect.status)} ml-2`}>
                          {selectedProspect.status}
                        </Badge>
                      </p>
                      <p><span className="font-medium">Priority:</span> 
                        <span className={`${getPriorityColor(selectedProspect.priority)} ml-2 font-medium`}>
                          {selectedProspect.priority}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Investment Profile</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Budget:</span> {selectedProspect.budget}</p>
                      <p><span className="font-medium">Preferred Area:</span> {selectedProspect.area}</p>
                      <p><span className="font-medium">Lead Score:</span> 
                        <span className={`${getScoreColor(selectedProspect.leadScore)} ml-2 font-medium`}>
                          {selectedProspect.leadScore}/100
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Lead Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Source:</span> {selectedProspect.source}</p>
                      <p><span className="font-medium">Added:</span> {new Date(selectedProspect.createdAt).toLocaleDateString()}</p>
                      <p><span className="font-medium">Last Contact:</span> {selectedProspect.lastContact ? new Date(selectedProspect.lastContact).toLocaleDateString() : 'Never'}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedProspect.notes || 'No notes available'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setViewModalOpen(false)
                          handleContactProspect(selectedProspect.id)
                        }}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setViewModalOpen(false)
                          handleScheduleCall(selectedProspect.id)
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
              <Button onClick={() => {
                setViewModalOpen(false)
                handleEditProspect(selectedProspect.id)
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Prospect
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Edit Modal */}
      {editModalOpen && selectedProspect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Edit Prospect - {selectedProspect.name}</h2>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <Input
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Enter prospect name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Budget</label>
                    <select
                      value={editForm.budget || ''}
                      onChange={(e) => setEditForm({...editForm, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under 500K AED">Under 500K AED</option>
                      <option value="500K - 1M AED">500K - 1M AED</option>
                      <option value="1M - 2M AED">1M - 2M AED</option>
                      <option value="2M+ AED">2M+ AED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Area</label>
                    <select
                      value={editForm.area || ''}
                      onChange={(e) => setEditForm({...editForm, area: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select preferred area</option>
                      <option value="Downtown Dubai">Downtown Dubai</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Business Bay">Business Bay</option>
                      <option value="Palm Jumeirah">Palm Jumeirah</option>
                      <option value="Jumeirah Lake Towers">Jumeirah Lake Towers</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Score (0-100)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={editForm.leadScore || 50}
                      onChange={(e) => setEditForm({...editForm, leadScore: parseInt(e.target.value)})}
                      placeholder="Enter lead score"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                    <select
                      value={editForm.source || ''}
                      onChange={(e) => setEditForm({...editForm, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Website">Website</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Referral">Referral</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Event">Event</option>
                      <option value="Cold Call">Cold Call</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Hot Lead">Hot Lead</option>
                      <option value="Warm Lead">Warm Lead</option>
                      <option value="Cold Lead">Cold Lead</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={editForm.priority || ''}
                      onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      value={editForm.notes || ''}
                      onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                      placeholder="Enter prospect notes..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  setIsSubmitting(true)
                  setTimeout(() => {
                    setProspects(prevProspects =>
                      prevProspects.map(p =>
                        p.id === selectedProspect.id ? { ...p, ...editForm } : p
                      )
                    )
                    setIsSubmitting(false)
                    setEditModalOpen(false)
                    
                    // Show professional success notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">Prospect Updated</p>
                          <p class="text-sm">Changes saved successfully</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Add Prospect Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Add New Prospect</h2>
              <button 
                onClick={() => setAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <Input
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Enter prospect name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Budget</label>
                    <select
                      value={editForm.budget || ''}
                      onChange={(e) => setEditForm({...editForm, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under 500K AED">Under 500K AED</option>
                      <option value="500K - 1M AED">500K - 1M AED</option>
                      <option value="1M - 2M AED">1M - 2M AED</option>
                      <option value="2M+ AED">2M+ AED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Area</label>
                    <select
                      value={editForm.area || ''}
                      onChange={(e) => setEditForm({...editForm, area: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select preferred area</option>
                      <option value="Downtown Dubai">Downtown Dubai</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Business Bay">Business Bay</option>
                      <option value="Palm Jumeirah">Palm Jumeirah</option>
                      <option value="Jumeirah Lake Towers">Jumeirah Lake Towers</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Score (0-100)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={editForm.leadScore || 50}
                      onChange={(e) => setEditForm({...editForm, leadScore: parseInt(e.target.value)})}
                      placeholder="Enter lead score"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                    <select
                      value={editForm.source || 'Website'}
                      onChange={(e) => setEditForm({...editForm, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Website">Website</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Referral">Referral</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Event">Event</option>
                      <option value="Cold Call">Cold Call</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Initial Status</label>
                    <select
                      value={editForm.status || 'Cold Lead'}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Hot Lead">Hot Lead</option>
                      <option value="Warm Lead">Warm Lead</option>
                      <option value="Cold Lead">Cold Lead</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={editForm.priority || 'Medium'}
                      onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Initial Notes</label>
                    <textarea
                      value={editForm.notes || ''}
                      onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                      placeholder="Enter initial notes about the prospect..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  if (!editForm.name || !editForm.email) {
                    // Show professional error notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">Required Fields Missing</p>
                          <p class="text-sm">Please fill in name and email</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                    return
                  }
                  setIsSubmitting(true)
                  setTimeout(() => {
                    const newProspect: Prospect = {
                      id: String(prospects.length + 1),
                      name: editForm.name || '',
                      email: editForm.email || '',
                      phone: editForm.phone || '',
                      leadScore: editForm.leadScore || 50,
                      source: editForm.source || 'Website',
                      budget: editForm.budget || '',
                      area: editForm.area || '',
                      status: editForm.status || 'Cold Lead',
                      priority: editForm.priority || 'Medium',
                      createdAt: new Date().toISOString().split('T')[0],
                      notes: editForm.notes || ''
                    }
                    setProspects(prevProspects => [newProspect, ...prevProspects])
                    setIsSubmitting(false)
                    setAddModalOpen(false)
                    
                    // Show professional success notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">Prospect Added</p>
                          <p class="text-sm">${newProspect.name} added to system</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Add Prospect'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Lead Scoring Modal */}
      {leadScoringModalOpen && selectedProspect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Lead Scoring Analysis - {selectedProspect.name}</h2>
              <button 
                onClick={() => setLeadScoringModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {/* Score Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className={`p-6 rounded-lg border-2 ${getScoreBackgroundColor(selectedProspect.leadScore)}`}>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(selectedProspect.leadScore)} mb-2`}>
                      {selectedProspect.leadScore}
                    </div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                    <div className={`text-lg font-medium ${getScoreColor(selectedProspect.leadScore)} mt-1`}>
                      {getScoreCategory(selectedProspect.leadScore)}
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">A+</div>
                        <div className="text-sm text-gray-600">Investment Profile</div>
                      </div>
                      <Building className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-600">92%</div>
                        <div className="text-sm text-gray-600">Budget Match</div>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">High</div>
                        <div className="text-sm text-gray-600">Engagement</div>
                      </div>
                      <Activity className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Scoring Factors */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Scoring Factors</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Budget Qualification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">25/25</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Location Interest</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '88%'}}></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600">22/25</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Engagement Level</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '80%'}}></div>
                        </div>
                        <span className="text-sm font-medium text-purple-600">20/25</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">Timeline Urgency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{width: '72%'}}></div>
                        </div>
                        <span className="text-sm font-medium text-orange-600">18/25</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Score Breakdown</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800">Strengths</div>
                        <ul className="text-green-700 mt-1 space-y-1">
                          <li>• Excellent budget qualification</li>
                          <li>• Strong location match</li>
                          <li>• Previous investment experience</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="font-medium text-orange-800">Areas to Improve</div>
                        <ul className="text-orange-700 mt-1 space-y-1">
                          <li>• Timeline flexibility</li>
                          <li>• Decision-making speed</li>
                          <li>• Response frequency</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">AI Recommendations</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Priority Actions</span>
                      </div>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Schedule property viewing within 48 hours</li>
                        <li>• Prepare investment ROI presentation</li>
                        <li>• Connect with mortgage advisor</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Conversion Probability</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>
                        <span className="text-green-700 font-medium">85%</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">High likelihood to convert within 30 days</p>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Suggested Properties</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-white rounded border">
                          <span className="font-medium">Emirates Hills Villa</span>
                          <div className="text-purple-700">95% match • 1.2M AED • ROI: 8.5%</div>
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <span className="font-medium">Downtown Apartment</span>
                          <div className="text-purple-700">88% match • 950K AED • ROI: 7.2%</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Communication Strategy</span>
                      </div>
                      <ul className="text-yellow-800 text-sm space-y-1">
                        <li>• Follow up within 24 hours</li>
                        <li>• Use WhatsApp for quick responses</li>
                        <li>• Share market insights weekly</li>
                        <li>• Arrange virtual property tours</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Score History</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Oct 24, 2024</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="font-medium">85</span>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Oct 22, 2024</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '72%'}}></div>
                          </div>
                          <span className="font-medium">72</span>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Oct 20, 2024</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-red-500 h-1.5 rounded-full" style={{width: '45%'}}></div>
                          </div>
                          <span className="font-medium">45</span>
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setLeadScoringModalOpen(false)}>Close</Button>
              <div className="space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setLeadScoringModalOpen(false)
                    handleScheduleCall(selectedProspect.id)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <Button 
                  onClick={() => {
                    setLeadScoringModalOpen(false)
                    handleContactProspect(selectedProspect.id)
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Proposal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}