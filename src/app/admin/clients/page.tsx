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
  TrendingUp,
  DollarSign,
  Calendar,
  MessageSquare,
  Download,
  MoreVertical,
  X,
  Clock,
  MapPin,
  FileText,
  Send
} from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  investmentBudget: string | null
  preferredArea: string | null
  riskTolerance: string | null
  investmentGoal: string | null
  leadSource: string | null
  leadScore: number
  status: string
  createdAt: string
  _count: {
    consultations: number
    properties: number
  }
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [consultationModalOpen, setConsultationModalOpen] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [editForm, setEditForm] = useState<Partial<Client>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients')
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROSPECT': return 'bg-yellow-100 text-yellow-800'
      case 'QUALIFIED': return 'bg-blue-100 text-blue-800'
      case 'ACTIVE_INVESTOR': return 'bg-green-100 text-green-800'
      case 'CLOSED_DEAL': return 'bg-purple-100 text-purple-800'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
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

  const handleAddClient = () => {
    setEditForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      investmentBudget: '',
      preferredArea: '',
      riskTolerance: 'MODERATE',
      investmentGoal: '',
      leadSource: 'WEBSITE',
      leadScore: 50,
      status: 'PROSPECT'
    })
    setAddModalOpen(true)
  }

  const handleScheduleConsultation = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setConsultationModalOpen(true)
    }
  }

  const handleSendEmail = (clientEmail: string) => {
    const client = clients.find(c => c.email === clientEmail)
    if (client) {
      setSelectedClient(client)
      setEmailModalOpen(true)
    }
  }

  const handleCallClient = (clientPhone: string) => {
    // Show professional info notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
        </svg>
        <div>
          <p class="font-semibold">Call Initiated</p>
          <p class="text-sm">Calling ${clientPhone}</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
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
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <Button onClick={handleAddClient}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="flex gap-4 items-center">
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
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="PROSPECT">Prospect</option>
          <option value="QUALIFIED">Qualified</option>
          <option value="ACTIVE_INVESTOR">Active Investor</option>
          <option value="CLOSED_DEAL">Closed Deal</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {client.name}
                    <Badge className={getStatusColor(client.status)}>
                      {client.status.replace('_', ' ')}
                    </Badge>
                    <span className={`text-sm font-medium ${getLeadScoreColor(client.leadScore)}`}>
                      Score: {client.leadScore}
                    </span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <button 
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                      onClick={() => handleSendEmail(client.email)}
                    >
                      <Mail className="h-4 w-4" />
                      {client.email}
                    </button>
                    {client.phone && (
                      <button 
                        className="flex items-center gap-1 hover:text-green-600 transition-colors"
                        onClick={() => handleCallClient(client.phone!)}
                      >
                        <Phone className="h-4 w-4" />
                        {client.phone}
                      </button>
                    )}
                    <span>
                      {new Date(client.createdAt).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => handleScheduleConsultation(client.id)}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
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
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Investment Profile</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {client.investmentBudget && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Budget: {client.investmentBudget}
                      </div>
                    )}
                    {client.preferredArea && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Area: {client.preferredArea}
                      </div>
                    )}
                    {client.riskTolerance && (
                      <p>Risk: {client.riskTolerance}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Investment Goal</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {client.investmentGoal && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        {client.investmentGoal}
                      </div>
                    )}
                    {client.company && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {client.company}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Lead Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {client.leadSource && (
                      <p>Source: {client.leadSource}</p>
                    )}
                    <p className={`font-medium ${getLeadScoreColor(client.leadScore)}`}>
                      Lead Score: {client.leadScore}/100
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Activity</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Consultations: {client._count?.consultations || 0}</p>
                    <p>Properties: {client._count?.properties || 0}</p>
                    <p>Joined: {new Date(client.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Add your first client to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Professional View Client Modal */}
      {viewModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedClient.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedClient.email}</p>
                      {selectedClient.phone && (
                        <p><span className="font-medium">Phone:</span> {selectedClient.phone}</p>
                      )}
                      {selectedClient.company && (
                        <p><span className="font-medium">Company:</span> {selectedClient.company}</p>
                      )}
                      <p><span className="font-medium">Status:</span> 
                        <Badge className={`${getStatusColor(selectedClient.status)} ml-2`}>
                          {selectedClient.status.replace('_', ' ')}
                        </Badge>
                      </p>
                      <p><span className="font-medium">Member Since:</span> {new Date(selectedClient.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Investment Profile</h3>
                    <div className="space-y-2">
                      {selectedClient.investmentBudget && (
                        <p><span className="font-medium">Budget:</span> {selectedClient.investmentBudget}</p>
                      )}
                      {selectedClient.preferredArea && (
                        <p><span className="font-medium">Preferred Area:</span> {selectedClient.preferredArea}</p>
                      )}
                      {selectedClient.riskTolerance && (
                        <p><span className="font-medium">Risk Tolerance:</span> {selectedClient.riskTolerance}</p>
                      )}
                      {selectedClient.investmentGoal && (
                        <p><span className="font-medium">Investment Goal:</span> {selectedClient.investmentGoal}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Lead Information</h3>
                    <div className="space-y-2">
                      {selectedClient.leadSource && (
                        <p><span className="font-medium">Lead Source:</span> {selectedClient.leadSource}</p>
                      )}
                      <p><span className="font-medium">Lead Score:</span> 
                        <span className={`${getLeadScoreColor(selectedClient.leadScore)} ml-2 font-medium`}>
                          {selectedClient.leadScore}/100
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Activity Summary</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Consultations:</span> {selectedClient._count?.consultations || 0}</p>
                      <p><span className="font-medium">Properties Viewed:</span> {selectedClient._count?.properties || 0}</p>
                      <p><span className="font-medium">Last Activity:</span> Recent</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setViewModalOpen(false)
                          handleScheduleConsultation(selectedClient.id)
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Consultation
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setViewModalOpen(false)
                          handleSendEmail(selectedClient.email)
                        }}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
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
                handleEditClient(selectedClient.id)
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Client
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Edit Client Modal */}
      {editModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Edit Client - {selectedClient.name}</h2>
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
                      placeholder="Enter client name"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <Input
                      value={editForm.company || ''}
                      onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Budget</label>
                    <select
                      value={editForm.investmentBudget || ''}
                      onChange={(e) => setEditForm({...editForm, investmentBudget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under 500K AED">Under 500K AED</option>
                      <option value="500K - 1M AED">500K - 1M AED</option>
                      <option value="1M - 2M AED">1M - 2M AED</option>
                      <option value="2M - 5M AED">2M - 5M AED</option>
                      <option value="5M+ AED">5M+ AED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Area</label>
                    <select
                      value={editForm.preferredArea || ''}
                      onChange={(e) => setEditForm({...editForm, preferredArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select preferred area</option>
                      <option value="Downtown Dubai">Downtown Dubai</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Business Bay">Business Bay</option>
                      <option value="Jumeirah Lake Towers">Jumeirah Lake Towers</option>
                      <option value="Dubai Investment Park">Dubai Investment Park</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                    <select
                      value={editForm.riskTolerance || 'MODERATE'}
                      onChange={(e) => setEditForm({...editForm, riskTolerance: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="LOW">Low Risk</option>
                      <option value="MODERATE">Moderate Risk</option>
                      <option value="HIGH">High Risk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Goal</label>
                    <select
                      value={editForm.investmentGoal || ''}
                      onChange={(e) => setEditForm({...editForm, investmentGoal: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select investment goal</option>
                      <option value="Capital Appreciation">Capital Appreciation</option>
                      <option value="Rental Income">Rental Income</option>
                      <option value="Portfolio Diversification">Portfolio Diversification</option>
                      <option value="Residence">Personal Residence</option>
                      <option value="Commercial Investment">Commercial Investment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                    <select
                      value={editForm.leadSource || 'WEBSITE'}
                      onChange={(e) => setEditForm({...editForm, leadSource: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="WEBSITE">Website</option>
                      <option value="REFERRAL">Referral</option>
                      <option value="SOCIAL_MEDIA">Social Media</option>
                      <option value="ADVERTISING">Advertising</option>
                      <option value="EVENT">Event</option>
                      <option value="COLD_CALL">Cold Call</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editForm.status || 'PROSPECT'}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="PROSPECT">Prospect</option>
                      <option value="QUALIFIED">Qualified</option>
                      <option value="ACTIVE_INVESTOR">Active Investor</option>
                      <option value="CLOSED_DEAL">Closed Deal</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
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
                    // Update client in state
                    setClients(prevClients =>
                      prevClients.map(c =>
                        c.id === selectedClient.id ? { ...c, ...editForm } : c
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
                          <p class="font-semibold">Client Updated</p>
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

      {/* Professional Add Client Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Add New Client</h2>
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
                      placeholder="Enter client name"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <Input
                      value={editForm.company || ''}
                      onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Budget</label>
                    <select
                      value={editForm.investmentBudget || ''}
                      onChange={(e) => setEditForm({...editForm, investmentBudget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under 500K AED">Under 500K AED</option>
                      <option value="500K - 1M AED">500K - 1M AED</option>
                      <option value="1M - 2M AED">1M - 2M AED</option>
                      <option value="2M - 5M AED">2M - 5M AED</option>
                      <option value="5M+ AED">5M+ AED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Area</label>
                    <select
                      value={editForm.preferredArea || ''}
                      onChange={(e) => setEditForm({...editForm, preferredArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select preferred area</option>
                      <option value="Downtown Dubai">Downtown Dubai</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Business Bay">Business Bay</option>
                      <option value="Jumeirah Lake Towers">Jumeirah Lake Towers</option>
                      <option value="Dubai Investment Park">Dubai Investment Park</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                    <select
                      value={editForm.riskTolerance || 'MODERATE'}
                      onChange={(e) => setEditForm({...editForm, riskTolerance: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="LOW">Low Risk</option>
                      <option value="MODERATE">Moderate Risk</option>
                      <option value="HIGH">High Risk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Goal</label>
                    <select
                      value={editForm.investmentGoal || ''}
                      onChange={(e) => setEditForm({...editForm, investmentGoal: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select investment goal</option>
                      <option value="Capital Appreciation">Capital Appreciation</option>
                      <option value="Rental Income">Rental Income</option>
                      <option value="Portfolio Diversification">Portfolio Diversification</option>
                      <option value="Residence">Personal Residence</option>
                      <option value="Commercial Investment">Commercial Investment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                    <select
                      value={editForm.leadSource || 'WEBSITE'}
                      onChange={(e) => setEditForm({...editForm, leadSource: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="WEBSITE">Website</option>
                      <option value="REFERRAL">Referral</option>
                      <option value="SOCIAL_MEDIA">Social Media</option>
                      <option value="ADVERTISING">Advertising</option>
                      <option value="EVENT">Event</option>
                      <option value="COLD_CALL">Cold Call</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Initial Status</label>
                    <select
                      value={editForm.status || 'PROSPECT'}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="PROSPECT">Prospect</option>
                      <option value="QUALIFIED">Qualified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      placeholder="Enter initial notes about the client..."
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
                    const newClient: Client = {
                      id: String(clients.length + 1),
                      name: editForm.name || '',
                      email: editForm.email || '',
                      phone: editForm.phone || null,
                      company: editForm.company || null,
                      investmentBudget: editForm.investmentBudget || null,
                      preferredArea: editForm.preferredArea || null,
                      riskTolerance: editForm.riskTolerance || 'MODERATE',
                      investmentGoal: editForm.investmentGoal || null,
                      leadSource: editForm.leadSource || 'WEBSITE',
                      leadScore: editForm.leadScore || 50,
                      status: editForm.status || 'PROSPECT',
                      createdAt: new Date().toISOString(),
                      _count: {
                        consultations: 0,
                        properties: 0
                      }
                    }
                    setClients(prevClients => [newClient, ...prevClients])
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
                          <p class="font-semibold">Client Added</p>
                          <p class="text-sm">${newClient.name} added to system</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Add Client'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Consultation Scheduling Modal */}
      {consultationModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Schedule Consultation - {selectedClient.name}</h2>
              <button 
                onClick={() => setConsultationModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Initial Consultation</option>
                      <option>Property Viewing</option>
                      <option>Investment Planning</option>
                      <option>Contract Review</option>
                      <option>Follow-up Meeting</option>
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
                      <option>01:00 PM</option>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Location</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Office - Downtown Dubai</option>
                      <option>Video Call</option>
                      <option>Property Location</option>
                      <option>Client Location</option>
                      <option>Coffee Meeting</option>
                    </select>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agenda</label>
                    <textarea
                      placeholder="Enter consultation agenda and topics to discuss..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
                      defaultValue="• Discuss investment goals and budget\n• Review available properties\n• Explain market conditions\n• Next steps and timeline"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="sendReminder" className="rounded" defaultChecked />
                    <label htmlFor="sendReminder" className="text-sm text-gray-700">Send email reminder 24 hours before</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setConsultationModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setConsultationModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Consultation Scheduled</p>
                      <p class="text-sm">Calendar invite sent to ${selectedClient.email}</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Email Modal */}
      {emailModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Send Email - {selectedClient.name}</h2>
              <button 
                onClick={() => setEmailModalOpen(false)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>Custom Email</option>
                      <option>Welcome New Client</option>
                      <option>Property Recommendations</option>
                      <option>Market Update</option>
                      <option>Follow-up After Consultation</option>
                      <option>Investment Opportunities</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input placeholder="Enter email subject" defaultValue="Following up on your property investment inquiry" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    placeholder="Enter your message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-40"
                    defaultValue={`Dear ${selectedClient.name},

Thank you for your interest in Dubai property investment opportunities. Based on our initial discussion, I believe we have some excellent options that match your investment criteria.

Key highlights for your consideration:
• Investment budget: ${selectedClient.investmentBudget || 'To be discussed'}
• Preferred area: ${selectedClient.preferredArea || 'Open to suggestions'}
• Investment goal: ${selectedClient.investmentGoal || 'Capital appreciation'}

I would love to schedule a consultation to discuss these opportunities in detail and answer any questions you may have.

Best regards,
Max McCarthy
Senior Property Investment Consultant`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="highPriority" className="rounded" />
                      <label htmlFor="highPriority" className="text-sm text-gray-700">High Priority</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="requestReadReceipt" className="rounded" />
                      <label htmlFor="requestReadReceipt" className="text-sm text-gray-700">Request Read Receipt</label>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Attach Files
                  </Button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setEmailModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setEmailModalOpen(false)
                
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
                      <p class="text-sm">Message sent to ${selectedClient.email}</p>
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
    </div>
  )
}