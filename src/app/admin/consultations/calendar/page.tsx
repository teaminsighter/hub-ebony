'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Phone, Mail, Video, MapPin, Plus, Edit, Check, X, Save, RefreshCw, Download, BarChart3, Filter, ChevronLeft, ChevronRight, Eye, MessageSquare, Settings, CalendarDays, Grid, List, Search } from 'lucide-react'

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
  client: {
    name: string
    investmentBudget: string | null
    preferredArea: string | null
  } | null
}

export default function CalendarViewPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day')
  
  // Modal states
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [completeModalOpen, setCompleteModalOpen] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [editForm, setEditForm] = useState<Partial<Consultation>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      // Demo data for calendar view
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
          date: '2025-10-25T14:30:00Z',
          duration: 45,
          status: 'SCHEDULED',
          meetingType: 'in-person',
          notes: 'First-time buyer looking for family home',
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
          date: '2025-10-24T11:00:00Z',
          duration: 30,
          status: 'COMPLETED',
          meetingType: 'video',
          notes: 'Investment consultation for rental properties',
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
          date: '2025-10-25T09:30:00Z',
          duration: 75,
          status: 'SCHEDULED',
          meetingType: 'in-person',
          notes: 'Relocation assistance and property search',
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

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'phone': return <Phone className="h-4 w-4" />
      case 'in-person': return <MapPin className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  // Filter consultations for selected date
  const filteredConsultations = consultations.filter(consultation => {
    const consultationDate = new Date(consultation.date).toISOString().split('T')[0]
    return consultationDate === selectedDate
  })

  // Sort by time
  const sortedConsultations = filteredConsultations.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const handleScheduleNew = () => {
    setScheduleModalOpen(true)
  }

  const handleEditConsultation = (consultationId: string) => {
    const consultation = consultations.find(c => c.id === consultationId)
    if (consultation) {
      setSelectedConsultation(consultation)
      setEditForm(consultation)
      setEditModalOpen(true)
    }
  }

  const handleCompleteConsultation = (consultationId: string) => {
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

  const handleCompleteConsultationSubmit = async (outcome: string) => {
    if (!selectedConsultation) return
    
    setIsSubmitting(true)
    try {
      const updatedConsultations = consultations.map(consultation => 
        consultation.id === selectedConsultation.id 
          ? { ...consultation, status: 'COMPLETED', outcome }
          : consultation
      )
      setConsultations(updatedConsultations)
      setCompleteModalOpen(false)
      setSelectedConsultation(null)
    } catch (error) {
      console.error('Error completing consultation:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate)
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      currentDate.setDate(currentDate.getDate() + 1)
    }
    setSelectedDate(currentDate.toISOString().split('T')[0])
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Calendar View</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Calendar View</h1>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 border rounded-md">
            <Button 
              variant={viewMode === 'day' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
            <Button 
              variant={viewMode === 'week' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button 
              variant={viewMode === 'month' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
          <Button onClick={handleScheduleNew}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule New
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Date Selector */}
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Navigation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
              />
              <Button size="sm" variant="outline" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Consultations:</span>
                <span className="font-semibold">{consultations.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Selected Date:</span>
                <span className="font-semibold text-blue-600">{filteredConsultations.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Scheduled:</span>
                <span className="font-semibold text-green-600">
                  {filteredConsultations.filter(c => c.status === 'SCHEDULED').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completed:</span>
                <span className="font-semibold text-purple-600">
                  {filteredConsultations.filter(c => c.status === 'COMPLETED').length}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t">
              <Button size="sm" variant="outline" className="w-full" onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}>
                <CalendarDays className="h-4 w-4 mr-2" />
                Today
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Consultations List */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                Consultations for {new Date(selectedDate).toLocaleDateString()}
              </CardTitle>
              <CardDescription>
                {sortedConsultations.length} consultation(s) scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedConsultations.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No consultations</h3>
                  <p className="text-gray-500">No consultations scheduled for this date.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedConsultations.map((consultation) => (
                    <Card key={consultation.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <h4 className="font-medium">{consultation.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                                {consultation.status}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {new Date(consultation.date).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                              <div className="flex items-center gap-1">
                                {getMeetingTypeIcon(consultation.meetingType)}
                                {consultation.meetingType}
                              </div>
                              <div>{consultation.duration} min</div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
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
                            </div>

                            {consultation.client && (
                              <div className="text-sm text-gray-600">
                                {consultation.client.investmentBudget && (
                                  <span>Budget: {consultation.client.investmentBudget}</span>
                                )}
                                {consultation.client.preferredArea && (
                                  <span className="ml-4">Area: {consultation.client.preferredArea}</span>
                                )}
                              </div>
                            )}

                            {consultation.notes && (
                              <div className="text-sm text-gray-600">
                                <strong>Notes:</strong> {consultation.notes}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditConsultation(consultation.id)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCompleteConsultation(consultation.id)}
                            >
                              Complete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
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
              <p className="text-gray-600">Select a time slot for {new Date(selectedDate).toLocaleDateString()}</p>
              
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input 
                    type="time" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter consultation notes"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input 
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <input 
                    type="datetime-local"
                    value={editForm.date || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select 
                    value={editForm.duration || 60}
                    onChange={(e) => setEditForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
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

      {/* Complete Consultation Modal */}
      {completeModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Complete Consultation</h2>
                <Button variant="ghost" size="sm" onClick={() => setCompleteModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  {selectedConsultation.name} - {new Date(selectedConsultation.date).toLocaleString()}
                </h3>
                <p className="text-sm text-gray-600">{selectedConsultation.notes}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Outcome *</label>
                <textarea 
                  id="outcome"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Enter the consultation outcome, next steps, and any follow-up required..."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="followUp" className="h-4 w-4" />
                <label htmlFor="followUp" className="text-sm text-gray-600">Schedule follow-up meeting</label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCompleteModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                const outcome = (document.getElementById('outcome') as HTMLTextAreaElement)?.value
                if (outcome) {
                  handleCompleteConsultationSubmit(outcome)
                }
              }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Mark Complete
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
                <h2 className="text-xl font-bold text-gray-900">Send Email - {selectedConsultation.name}</h2>
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
                  <option>Consultation Reminder</option>
                  <option>Meeting Confirmation</option>
                  <option>Reschedule Request</option>
                  <option>Follow-up Information</option>
                  <option>Custom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={8}
                  placeholder={`Dear ${selectedConsultation.name},\n\nThis is a reminder about your upcoming consultation scheduled for ${new Date(selectedConsultation.date).toLocaleString()}.\n\nMeeting Type: ${selectedConsultation.meetingType}\nDuration: ${selectedConsultation.duration} minutes\n\nWe look forward to speaking with you.\n\nBest regards,\nHub Ebony Team`}
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEmailModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                window.location.href = `mailto:${selectedConsultation.email}?subject=Consultation Reminder&body=Dear ${selectedConsultation.name},%0D%0A%0D%0AThis is a reminder about your upcoming consultation.`
                setEmailModalOpen(false)
              }}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}