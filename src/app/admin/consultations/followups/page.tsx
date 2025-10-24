'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search,
  Calendar,
  Phone,
  Mail,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  X,
  Save,
  RefreshCw,
  Download,
  BarChart3,
  Send,
  MessageSquare,
  CalendarPlus,
  Target,
  FileText,
  Settings,
  Filter,
  Bell,
  Activity
} from 'lucide-react'

interface Consultation {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  date: string
  status: string
  followUpDate: string | null
  outcome: string | null
  notes: string | null
  client: {
    name: string
    investmentBudget: string | null
    preferredArea: string | null
  } | null
}

export default function FollowupsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Modal states
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
  const [completeModalOpen, setCompleteModalOpen] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      // Demo data for follow-ups
      const demoConsultations: Consultation[] = [
        {
          id: '1',
          name: 'Ahmed Al-Rashid',
          email: 'ahmed.rashid@email.com',
          phone: '+971 50 123 4567',
          company: 'Emirates Trading LLC',
          date: '2025-10-22T10:00:00Z',
          status: 'COMPLETED',
          followUpDate: '2025-10-23T10:00:00Z', // Overdue
          outcome: 'Client interested in Downtown Dubai properties. Needs financing details.',
          notes: 'High-value client. Priority follow-up required.',
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
          date: '2025-10-23T14:30:00Z',
          status: 'COMPLETED',
          followUpDate: '2025-10-25T14:30:00Z', // Due soon
          outcome: 'Scheduled property viewing. Needs market analysis report.',
          notes: 'First-time buyer. Requires guidance through process.',
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
          date: '2025-10-21T16:00:00Z',
          status: 'COMPLETED',
          followUpDate: '2025-10-28T16:00:00Z', // Scheduled future
          outcome: 'Portfolio diversification discussion. Interested in commercial properties.',
          notes: 'Sophisticated investor. Focus on ROI and market trends.',
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
          date: '2025-10-20T11:00:00Z',
          status: 'COMPLETED',
          followUpDate: null, // No follow-up scheduled
          outcome: 'Needs more time to consider investment options.',
          notes: 'Follow-up needed to maintain engagement.',
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
          date: '2025-10-19T09:30:00Z',
          status: 'COMPLETED',
          followUpDate: '2025-10-26T09:30:00Z', // Due soon
          outcome: 'Ready to proceed with property purchase. Needs final documentation.',
          notes: 'Hot lead. Close to closing deal.',
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
      case 'NO_SHOW': return 'bg-orange-100 text-orange-800'
      case 'RESCHEDULED': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityLevel = (consultation: Consultation) => {
    const now = new Date()
    const followUpDate = consultation.followUpDate ? new Date(consultation.followUpDate) : null
    const consultationDate = new Date(consultation.date)
    
    // High priority: Follow-up is overdue
    if (followUpDate && followUpDate < now) {
      return { level: 'high', icon: AlertCircle, color: 'text-red-600' }
    }
    
    // Medium priority: Follow-up is due today or within 2 days
    if (followUpDate) {
      const daysDiff = Math.ceil((followUpDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff <= 2) {
        return { level: 'medium', icon: Clock, color: 'text-yellow-600' }
      }
    }
    
    // Low priority: Follow-up is scheduled for future
    if (followUpDate) {
      return { level: 'low', icon: CheckCircle, color: 'text-green-600' }
    }
    
    // No follow-up date set
    return { level: 'none', icon: XCircle, color: 'text-gray-400' }
  }

  const handleScheduleFollowUp = () => {
    setScheduleModalOpen(true)
  }

  const handleContactClient = (consultationId: string, email: string) => {
    const consultation = consultations.find(c => c.id === consultationId)
    if (consultation) {
      setSelectedConsultation(consultation)
      setContactModalOpen(true)
    }
  }

  const handleRescheduleFollowUp = (consultationId: string) => {
    const consultation = consultations.find(c => c.id === consultationId)
    if (consultation) {
      setSelectedConsultation(consultation)
      setRescheduleModalOpen(true)
    }
  }

  const handleCompleteFollowUp = (consultationId: string) => {
    const consultation = consultations.find(c => c.id === consultationId)
    if (consultation) {
      setSelectedConsultation(consultation)
      setCompleteModalOpen(true)
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

  const handleCompleteFollowUpSubmit = async (outcome: string, nextFollowUp?: string) => {
    if (!selectedConsultation) return
    
    setIsSubmitting(true)
    try {
      const updatedConsultations = consultations.map(consultation => 
        consultation.id === selectedConsultation.id 
          ? { 
              ...consultation, 
              outcome: outcome,
              followUpDate: nextFollowUp || null,
              notes: consultation.notes + ` | Follow-up completed: ${new Date().toLocaleDateString()}`
            }
          : consultation
      )
      setConsultations(updatedConsultations)
      setCompleteModalOpen(false)
      setSelectedConsultation(null)
    } catch (error) {
      console.error('Error completing follow-up:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRescheduleSubmit = async (newDate: string) => {
    if (!selectedConsultation) return
    
    setIsSubmitting(true)
    try {
      const updatedConsultations = consultations.map(consultation => 
        consultation.id === selectedConsultation.id 
          ? { ...consultation, followUpDate: newDate }
          : consultation
      )
      setConsultations(updatedConsultations)
      setRescheduleModalOpen(false)
      setSelectedConsultation(null)
    } catch (error) {
      console.error('Error rescheduling follow-up:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'all') return matchesSearch
    
    const priority = getPriorityLevel(consultation)
    return matchesSearch && priority.level === filterStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Follow-ups</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Follow-ups</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            const csvData = consultations.map(consultation => ({
              Name: consultation.name,
              Email: consultation.email,
              Phone: consultation.phone || '',
              OriginalDate: new Date(consultation.date).toLocaleDateString(),
              FollowUpDate: consultation.followUpDate ? new Date(consultation.followUpDate).toLocaleDateString() : '',
              Status: consultation.status,
              Outcome: consultation.outcome || '',
              Priority: getPriorityLevel(consultation).level
            }))
            
            const csv = [
              Object.keys(csvData[0]).join(','),
              ...csvData.map(row => Object.values(row).map(value => `\"${value}\"`).join(','))
            ].join('\\n')
            
            const blob = new Blob([csv], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `follow-ups-${new Date().toISOString().split('T')[0]}.csv`
            link.click()
            window.URL.revokeObjectURL(url)
          }}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleScheduleFollowUp}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Follow-up
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {consultations.filter(c => getPriorityLevel(c).level === 'high').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Soon</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {consultations.filter(c => getPriorityLevel(c).level === 'medium').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-green-600">
                  {consultations.filter(c => getPriorityLevel(c).level === 'low').length}
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
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {consultations.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search follow-ups..."
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
          <option value="all">All Priorities</option>
          <option value="high">Overdue</option>
          <option value="medium">Due Soon</option>
          <option value="low">Scheduled</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredConsultations.map((consultation) => {
          const priority = getPriorityLevel(consultation)
          const PriorityIcon = priority.icon

          return (
            <Card key={consultation.id} className={`border-l-4 ${
              priority.level === 'high' ? 'border-l-red-500' :
              priority.level === 'medium' ? 'border-l-yellow-500' :
              priority.level === 'low' ? 'border-l-green-500' : 'border-l-gray-300'
            }`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <PriorityIcon className={`h-5 w-5 ${priority.color}`} />
                      {consultation.name}
                      <Badge className={getStatusColor(consultation.status)}>
                        {consultation.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <button 
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleSendEmail(consultation.email)}
                      >
                        <Mail className="h-4 w-4" />
                        {consultation.email}
                      </button>
                      {consultation.phone && (
                        <button 
                          className="flex items-center gap-1 hover:text-green-600 transition-colors"
                          onClick={() => handleCallClient(consultation.phone!)}
                        >
                          <Phone className="h-4 w-4" />
                          {consultation.phone}
                        </button>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleContactClient(consultation.id, consultation.email)}
                    >
                      Contact
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRescheduleFollowUp(consultation.id)}
                    >
                      Reschedule
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleCompleteFollowUp(consultation.id)}
                    >
                      Complete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Original Consultation</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(consultation.date).toLocaleDateString()} at{' '}
                      {new Date(consultation.date).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {consultation.outcome && (
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Outcome:</strong> {consultation.outcome}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Follow-up Details</h4>
                    {consultation.followUpDate ? (
                      <p className="text-sm text-gray-600">
                        Due: {new Date(consultation.followUpDate).toLocaleDateString()}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No follow-up scheduled</p>
                    )}
                    {consultation.client && (
                      <div className="text-sm text-gray-600 mt-1">
                        {consultation.client.investmentBudget && (
                          <p>Budget: {consultation.client.investmentBudget}</p>
                        )}
                        {consultation.client.preferredArea && (
                          <p>Area: {consultation.client.preferredArea}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    {consultation.notes ? (
                      <p className="text-sm text-gray-600">{consultation.notes}</p>
                    ) : (
                      <p className="text-sm text-gray-500">No notes available</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredConsultations.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No follow-ups found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'All follow-ups are complete or no follow-ups are scheduled.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Schedule Follow-up Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Schedule New Follow-up</h2>
                <Button variant="ghost" size="sm" onClick={() => setScheduleModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date *</label>
                  <input 
                    type="datetime-local" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="call">Phone Call</option>
                    <option value="email">Email</option>
                    <option value="meeting">In-Person Meeting</option>
                    <option value="video">Video Call</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Purpose</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Describe the purpose and objectives of this follow-up"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Additional notes or context"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <CalendarPlus className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Client Modal */}
      {contactModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Contact {selectedConsultation.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setContactModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" onClick={() => {
                      setContactModalOpen(false)
                      handleSendEmail(selectedConsultation.email)
                    }}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email: {selectedConsultation.email}
                    </Button>
                    {selectedConsultation.phone && (
                      <Button className="w-full justify-start" variant="outline" onClick={() => handleCallClient(selectedConsultation.phone!)}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call: {selectedConsultation.phone}
                      </Button>
                    )}
                    <Button className="w-full justify-start" variant="outline" onClick={() => {
                      setContactModalOpen(false)
                      handleRescheduleFollowUp(selectedConsultation.id)
                    }}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Reschedule Follow-up
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Client Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Original Consultation:</span>
                      <p className="font-medium">{new Date(selectedConsultation.date).toLocaleDateString()}</p>
                    </div>
                    {selectedConsultation.followUpDate && (
                      <div className="text-sm">
                        <span className="text-gray-600">Follow-up Due:</span>
                        <p className="font-medium">{new Date(selectedConsultation.followUpDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedConsultation.client && (
                      <>
                        {selectedConsultation.client.investmentBudget && (
                          <div className="text-sm">
                            <span className="text-gray-600">Budget:</span>
                            <p className="font-medium">{selectedConsultation.client.investmentBudget}</p>
                          </div>
                        )}
                        {selectedConsultation.client.preferredArea && (
                          <div className="text-sm">
                            <span className="text-gray-600">Preferred Area:</span>
                            <p className="font-medium">{selectedConsultation.client.preferredArea}</p>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {selectedConsultation.outcome && (
                <Card>
                  <CardHeader>
                    <CardTitle>Last Outcome</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedConsultation.outcome}</p>
                  </CardContent>
                </Card>
              )}

              {selectedConsultation.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedConsultation.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setContactModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Follow-up Modal */}
      {rescheduleModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Reschedule Follow-up</h2>
                <Button variant="ghost" size="sm" onClick={() => setRescheduleModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{selectedConsultation.name}</h3>
                <p className="text-sm text-gray-600">
                  Current follow-up: {selectedConsultation.followUpDate ? 
                    new Date(selectedConsultation.followUpDate).toLocaleDateString() : 
                    'Not scheduled'
                  }
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Follow-up Date *</label>
                <input 
                  id="newFollowUpDate"
                  type="datetime-local" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Rescheduling</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter reason for rescheduling (optional)"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setRescheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                const newDate = (document.getElementById('newFollowUpDate') as HTMLInputElement)?.value
                if (newDate) {
                  handleRescheduleSubmit(newDate)
                }
              }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Rescheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Reschedule
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Follow-up Modal */}
      {completeModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Complete Follow-up</h2>
                <Button variant="ghost" size="sm" onClick={() => setCompleteModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{selectedConsultation.name}</h3>
                <p className="text-sm text-gray-600">
                  Follow-up due: {selectedConsultation.followUpDate ? 
                    new Date(selectedConsultation.followUpDate).toLocaleDateString() : 
                    'Not scheduled'
                  }
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Outcome *</label>
                <textarea 
                  id="followUpOutcome"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Describe the outcome of this follow-up, next steps, and any decisions made..."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="scheduleNext" className="h-4 w-4" />
                <label htmlFor="scheduleNext" className="text-sm text-gray-600">Schedule next follow-up</label>
              </div>
              
              <div id="nextFollowUpSection" className="hidden">
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow-up Date</label>
                <input 
                  id="nextFollowUpDate"
                  type="datetime-local" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCompleteModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                const outcome = (document.getElementById('followUpOutcome') as HTMLTextAreaElement)?.value
                const scheduleNext = (document.getElementById('scheduleNext') as HTMLInputElement)?.checked
                const nextDate = scheduleNext ? (document.getElementById('nextFollowUpDate') as HTMLInputElement)?.value : undefined
                
                if (outcome) {
                  handleCompleteFollowUpSubmit(outcome, nextDate)
                }
              }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Follow-up
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {emailModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Send Follow-up Email - {selectedConsultation.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEmailModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input 
                  value={selectedConsultation.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Follow-up on Your Real Estate Consultation</option>
                  <option>Property Updates Based on Your Requirements</option>
                  <option>Next Steps in Your Property Investment Journey</option>
                  <option>Market Analysis and Recommendations</option>
                  <option>Scheduling Your Property Viewing</option>
                  <option>Custom Subject</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={10}
                  placeholder={`Dear ${selectedConsultation.name},\n\nI hope this email finds you well. I wanted to follow up on our consultation regarding your real estate investment interests in ${selectedConsultation.client?.preferredArea || 'Dubai'}.\n\nBased on our discussion, I understand you're looking for properties with a budget of ${selectedConsultation.client?.investmentBudget || 'your specified range'}. I have some exciting updates and recommendations that align with your requirements.\n\nKey points from our last conversation:\n${selectedConsultation.outcome || 'Previous consultation outcomes'}\n\nI would love to schedule a follow-up meeting to discuss:\n- New property listings that match your criteria\n- Market updates and investment opportunities\n- Next steps in your property search\n\nWhen would be a convenient time for you this week?\n\nBest regards,\nHub Ebony Team`}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="ccMe" className="h-4 w-4" />
                <label htmlFor="ccMe" className="text-sm text-gray-600">CC me on this email</label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEmailModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                window.location.href = `mailto:${selectedConsultation.email}?subject=Follow-up on Your Real Estate Consultation&body=Dear ${selectedConsultation.name},%0D%0A%0D%0AI hope this email finds you well. I wanted to follow up on our consultation.`
                setEmailModalOpen(false)
              }}>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('change', function(e) {
            if (e.target.id === 'scheduleNext') {
              const section = document.getElementById('nextFollowUpSection');
              if (section) {
                section.classList.toggle('hidden', !e.target.checked);
              }
            }
          });
        `
      }} />
    </div>
  )
}