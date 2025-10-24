'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Search,
  Plus,
  Eye,
  Edit,
  X,
  Save,
  RefreshCw,
  Download,
  Filter,
  BarChart3,
  CheckCircle,
  AlertCircle,
  FileText,
  Trash2,
  Video,
  PhoneCall,
  MapPin,
  DollarSign,
  Target,
  Users,
  BookOpen,
  Star,
  MessageSquare,
  Send,
  Copy,
  ExternalLink,
  Archive,
  Bell,
  CalendarPlus
} from 'lucide-react'

interface Consultation {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  date: string
  duration: number
  status: string
  meetingType: string
  notes: string | null
  outcome: string | null
  client?: {
    name: string
    investmentBudget: string | null
    preferredArea: string | null
  }
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Modal states
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [editForm, setEditForm] = useState<Partial<Consultation>>({})
  const [newConsultation, setNewConsultation] = useState<Partial<Consultation>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      // Demo data for consultations
      const demoConsultations: Consultation[] = [
        {
          id: '1',
          name: 'Ahmed Al-Rashid',
          email: 'ahmed.rashid@email.com',
          phone: '+971 50 123 4567',
          company: 'Emirates Trading LLC',
          date: '2025-10-25T10:00:00Z',
          duration: 60,
          status: 'SCHEDULED',
          meetingType: 'video',
          notes: 'Interested in luxury apartments in Downtown Dubai',
          outcome: null,
          client: {
            name: 'Ahmed Al-Rashid',
            investmentBudget: '5M - 10M AED',
            preferredArea: 'Downtown Dubai'
          }
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@gmail.com',
          phone: '+971 55 987 6543',
          company: null,
          date: '2025-10-24T14:30:00Z',
          duration: 45,
          status: 'COMPLETED',
          meetingType: 'in-person',
          notes: 'First-time buyer looking for family home',
          outcome: 'Scheduled property viewing for next week',
          client: {
            name: 'Sarah Johnson',
            investmentBudget: '2M - 3M AED',
            preferredArea: 'Dubai Hills'
          }
        },
        {
          id: '3',
          name: 'Mohammed Hassan',
          email: 'm.hassan@company.ae',
          phone: '+971 52 456 7890',
          company: 'Hassan Investments',
          date: '2025-10-26T16:00:00Z',
          duration: 90,
          status: 'SCHEDULED',
          meetingType: 'phone',
          notes: 'Portfolio diversification consultation',
          outcome: null,
          client: {
            name: 'Mohammed Hassan',
            investmentBudget: '15M+ AED',
            preferredArea: 'Business Bay'
          }
        },
        {
          id: '4',
          name: 'Elena Rodriguez',
          email: 'elena.r@email.com',
          phone: null,
          company: null,
          date: '2025-10-23T11:00:00Z',
          duration: 30,
          status: 'NO_SHOW',
          meetingType: 'video',
          notes: 'Investment consultation for rental properties',
          outcome: 'No show - rescheduling needed',
          client: {
            name: 'Elena Rodriguez',
            investmentBudget: '1M - 2M AED',
            preferredArea: 'JVC'
          }
        },
        {
          id: '5',
          name: 'David Kim',
          email: 'david.kim@tech.com',
          phone: '+971 56 789 0123',
          company: 'Tech Solutions Dubai',
          date: '2025-10-22T09:30:00Z',
          duration: 75,
          status: 'COMPLETED',
          meetingType: 'in-person',
          notes: 'Relocation assistance and property search',
          outcome: 'Provided market overview and property shortlist',
          client: {
            name: 'David Kim',
            investmentBudget: '3M - 5M AED',
            preferredArea: 'Dubai Marina'
          }
        }
      ]
      setConsultations(demoConsultations)
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800'
      case 'COMPLETED': return 'bg-green-100 text-green-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      case 'NO_SHOW': return 'bg-gray-100 text-gray-800'
      case 'RESCHEDULED': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '📹'
      case 'phone': return '📞'
      case 'in-person': return '🏢'
      default: return '📅'
    }
  }

  const handleScheduleNew = () => {
    setNewConsultation({
      status: 'SCHEDULED',
      meetingType: 'video',
      duration: 60
    })
    setScheduleModalOpen(true)
  }

  const handleViewConsultation = (consultationId: string) => {
    const consultation = consultations.find(c => c.id === consultationId)
    if (consultation) {
      setSelectedConsultation(consultation)
      setViewModalOpen(true)
    }
  }

  const handleEditConsultation = (consultationId: string) => {
    const consultation = consultations.find(c => c.id === consultationId)
    if (consultation) {
      setSelectedConsultation(consultation)
      setEditForm(consultation)
      setEditModalOpen(true)
    }
  }

  const handleSendEmail = (email: string) => {
    const consultation = consultations.find(c => c.email === email)
    if (consultation) {
      setSelectedConsultation(consultation)
      setEmailModalOpen(true)
    }
  }

  const handleCallClient = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleSaveConsultation = async () => {
    if (!selectedConsultation || !editForm.name || !editForm.email) return
    
    setIsSubmitting(true)
    try {
      const updatedConsultations = consultations.map(consultation => 
        consultation.id === selectedConsultation.id 
          ? { ...consultation, ...editForm }
          : consultation
      )
      setConsultations(updatedConsultations)
      setEditModalOpen(false)
      setSelectedConsultation(null)
      setEditForm({})
    } catch (error) {
      console.error('Error saving consultation:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateConsultation = async () => {
    if (!newConsultation.name || !newConsultation.email || !newConsultation.date) return
    
    setIsSubmitting(true)
    try {
      const consultation: Consultation = {
        id: String(Date.now()),
        name: newConsultation.name!,
        email: newConsultation.email!,
        phone: newConsultation.phone || null,
        company: newConsultation.company || null,
        date: newConsultation.date!,
        duration: newConsultation.duration || 60,
        status: newConsultation.status || 'SCHEDULED',
        meetingType: newConsultation.meetingType || 'video',
        notes: newConsultation.notes || null,
        outcome: null
      }
      setConsultations([consultation, ...consultations])
      setScheduleModalOpen(false)
      setNewConsultation({})
    } catch (error) {
      console.error('Error creating consultation:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExportConsultations = () => {
    const csvData = consultations.map(consultation => ({
      Name: consultation.name,
      Email: consultation.email,
      Phone: consultation.phone || '',
      Company: consultation.company || '',
      Date: new Date(consultation.date).toLocaleDateString(),
      Time: new Date(consultation.date).toLocaleTimeString(),
      Duration: consultation.duration,
      Status: consultation.status,
      MeetingType: consultation.meetingType,
      Notes: consultation.notes || '',
      Outcome: consultation.outcome || ''
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `consultations-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Consultations</h1>
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
        <h1 className="text-3xl font-bold text-gray-900">Consultations</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportConsultations}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setAnalyticsModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button onClick={handleScheduleNew}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule New
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search consultations..."
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
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="NO_SHOW">No Show</option>
          <option value="RESCHEDULED">Rescheduled</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredConsultations.map((consultation) => (
          <Card key={consultation.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {consultation.name}
                    <Badge className={getStatusColor(consultation.status)}>
                      {consultation.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(consultation.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(consultation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span>
                      {getMeetingTypeIcon(consultation.meetingType)} {consultation.meetingType}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewConsultation(consultation.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditConsultation(consultation.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <button 
                      className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                      onClick={() => handleSendEmail(consultation.email)}
                    >
                      <Mail className="h-4 w-4" />
                      {consultation.email}
                    </button>
                    {consultation.phone && (
                      <button 
                        className="flex items-center gap-2 hover:text-green-600 transition-colors"
                        onClick={() => handleCallClient(consultation.phone!)}
                      >
                        <Phone className="h-4 w-4" />
                        {consultation.phone}
                      </button>
                    )}
                    {consultation.company && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {consultation.company}
                      </div>
                    )}
                  </div>
                </div>

                {consultation.client && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Client Profile</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {consultation.client.investmentBudget && (
                        <p>Budget: {consultation.client.investmentBudget}</p>
                      )}
                      {consultation.client.preferredArea && (
                        <p>Preferred Area: {consultation.client.preferredArea}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Meeting Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Duration: {consultation.duration} minutes</p>
                    {consultation.outcome && (
                      <p>Outcome: {consultation.outcome}</p>
                    )}
                    {consultation.notes && (
                      <p>Notes: {consultation.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredConsultations.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No consultations found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Schedule your first consultation to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Schedule New Consultation Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Schedule New Consultation</h2>
                <Button variant="ghost" size="sm" onClick={() => setScheduleModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                  <Input
                    value={newConsultation.name || ''}
                    onChange={(e) => setNewConsultation(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <Input
                    type="email"
                    value={newConsultation.email || ''}
                    onChange={(e) => setNewConsultation(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input
                    value={newConsultation.phone || ''}
                    onChange={(e) => setNewConsultation(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <Input
                    value={newConsultation.company || ''}
                    onChange={(e) => setNewConsultation(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
                  <Input
                    type="datetime-local"
                    value={newConsultation.date || ''}
                    onChange={(e) => setNewConsultation(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <select
                    value={newConsultation.duration || 60}
                    onChange={(e) => setNewConsultation(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                    <option value={120}>120 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                  <select
                    value={newConsultation.meetingType || 'video'}
                    onChange={(e) => setNewConsultation(prev => ({ ...prev, meetingType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newConsultation.status || 'SCHEDULED'}
                    onChange={(e) => setNewConsultation(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="RESCHEDULED">Rescheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newConsultation.notes || ''}
                  onChange={(e) => setNewConsultation(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter consultation notes or agenda"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateConsultation} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Schedule Consultation
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Consultation Details Modal */}
      {viewModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Consultation Details - {selectedConsultation.name}</h2>
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
                      <User className="h-5 w-5 text-blue-600" />
                      Client Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold">{selectedConsultation.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold">{selectedConsultation.email}</span>
                    </div>
                    {selectedConsultation.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-semibold">{selectedConsultation.phone}</span>
                      </div>
                    )}
                    {selectedConsultation.company && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company:</span>
                        <span className="font-semibold">{selectedConsultation.company}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusColor(selectedConsultation.status)}>
                        {selectedConsultation.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      Meeting Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold">{new Date(selectedConsultation.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold">{new Date(selectedConsultation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{selectedConsultation.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <div className="flex items-center gap-1">
                        {selectedConsultation.meetingType === 'video' && <Video className="h-4 w-4" />}
                        {selectedConsultation.meetingType === 'phone' && <PhoneCall className="h-4 w-4" />}
                        {selectedConsultation.meetingType === 'in-person' && <MapPin className="h-4 w-4" />}
                        <span className="font-semibold capitalize">{selectedConsultation.meetingType}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {selectedConsultation.client && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        Investment Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedConsultation.client.investmentBudget && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-semibold">{selectedConsultation.client.investmentBudget}</span>
                        </div>
                      )}
                      {selectedConsultation.client.preferredArea && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Preferred Area:</span>
                          <span className="font-semibold">{selectedConsultation.client.preferredArea}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Client Type:</span>
                        <span className="font-semibold">{selectedConsultation.company ? 'Corporate' : 'Individual'}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {selectedConsultation.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                      Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedConsultation.notes}</p>
                  </CardContent>
                </Card>
              )}

              {selectedConsultation.outcome && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Outcome
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedConsultation.outcome}</p>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <Button className="w-full" onClick={() => handleSendEmail(selectedConsultation.email)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                {selectedConsultation.phone && (
                  <Card>
                    <CardContent className="p-4">
                      <Button className="w-full" variant="outline" onClick={() => handleCallClient(selectedConsultation.phone!)}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Client
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="p-4">
                    <Button className="w-full" variant="outline" onClick={() => {setViewModalOpen(false); handleEditConsultation(selectedConsultation.id)}}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Consultation Modal */}
      {editModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Consultation - {selectedConsultation.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <Input
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <Input
                    value={editForm.company || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={editForm.date || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <select
                    value={editForm.duration || 60}
                    onChange={(e) => setEditForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                    <option value={120}>120 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                  <select
                    value={editForm.meetingType || 'video'}
                    onChange={(e) => setEditForm(prev => ({ ...prev, meetingType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.status || 'SCHEDULED'}
                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="NO_SHOW">No Show</option>
                    <option value="RESCHEDULED">Rescheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editForm.notes || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter consultation notes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outcome</label>
                <textarea
                  value={editForm.outcome || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, outcome: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Enter consultation outcome"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveConsultation} disabled={isSubmitting}>
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

      {/* Email Consultation Modal */}
      {emailModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Send Email - {selectedConsultation.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEmailModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <Input
                  value={selectedConsultation.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Consultation Confirmation</option>
                  <option>Consultation Reminder</option>
                  <option>Consultation Follow-up</option>
                  <option>Property Recommendations</option>
                  <option>Schedule Reschedule</option>
                  <option>Thank You Message</option>
                  <option>Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={8}
                  placeholder={`Dear ${selectedConsultation.name},\n\nThank you for scheduling a consultation with us. This email is to confirm your upcoming appointment:\n\nDate: ${new Date(selectedConsultation.date).toLocaleDateString()}\nTime: ${new Date(selectedConsultation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\nType: ${selectedConsultation.meetingType}\n\nWe look forward to discussing your real estate needs.\n\nBest regards,\nCommercialDXB Team`}
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="copyMe" className="h-4 w-4" />
                <label htmlFor="copyMe" className="text-sm text-gray-600">Send me a copy</label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEmailModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                window.location.href = `mailto:${selectedConsultation.email}?subject=Consultation Confirmation&body=Dear ${selectedConsultation.name},%0D%0A%0D%0AThank you for scheduling a consultation with us.`
                setEmailModalOpen(false)
              }}>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {analyticsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Consultation Analytics</h2>
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
                        <p className="text-sm text-gray-600">Total Consultations</p>
                        <p className="text-2xl font-bold text-blue-600">{consultations.length}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Scheduled</p>
                        <p className="text-2xl font-bold text-green-600">
                          {consultations.filter(c => c.status === 'SCHEDULED').length}
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
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {consultations.filter(c => c.status === 'COMPLETED').length}
                        </p>
                      </div>
                      <Star className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Success Rate</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {Math.round((consultations.filter(c => c.status === 'COMPLETED').length / consultations.length) * 100)}%
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Consultation Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'].map(status => {
                      const count = consultations.filter(c => c.status === status).length
                      const percentage = (count / consultations.length) * 100
                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{status}</span>
                            <span className="text-sm text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
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
                    <CardTitle>Meeting Type Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['video', 'phone', 'in-person'].map(type => {
                      const count = consultations.filter(c => c.meetingType === type).length
                      const percentage = (count / consultations.length) * 100
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium capitalize">{type}</span>
                            <span className="text-sm text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
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
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">Strengths</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• High completion rate</li>
                        <li>• Diverse meeting preferences</li>
                        <li>• Active client engagement</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Opportunities</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Reduce no-show rates</li>
                        <li>• Improve follow-up process</li>
                        <li>• Optimize scheduling</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Recommendations</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Send automated reminders</li>
                        <li>• Implement feedback system</li>
                        <li>• Track conversion rates</li>
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
                const report = `Consultation Analytics Report\\n\\nTotal Consultations: ${consultations.length}\\nScheduled: ${consultations.filter(c => c.status === 'SCHEDULED').length}\\nCompleted: ${consultations.filter(c => c.status === 'COMPLETED').length}\\nSuccess Rate: ${Math.round((consultations.filter(c => c.status === 'COMPLETED').length / consultations.length) * 100)}%`
                const blob = new Blob([report], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `consultation-analytics-${new Date().toISOString().split('T')[0]}.txt`
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
    </div>
  )
}