'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Check
} from 'lucide-react'

interface TimeSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

interface BusinessHours {
  monday: TimeSlot[]
  tuesday: TimeSlot[]
  wednesday: TimeSlot[]
  thursday: TimeSlot[]
  friday: TimeSlot[]
  saturday: TimeSlot[]
  sunday: TimeSlot[]
}

const daysOfWeek = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
]

const dayLabels = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
}

export default function AvailabilityPage() {
  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    monday: [{ id: '1', day: 'monday', startTime: '09:00', endTime: '17:00', isAvailable: true }],
    tuesday: [{ id: '2', day: 'tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true }],
    wednesday: [{ id: '3', day: 'wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true }],
    thursday: [{ id: '4', day: 'thursday', startTime: '09:00', endTime: '17:00', isAvailable: true }],
    friday: [{ id: '5', day: 'friday', startTime: '09:00', endTime: '17:00', isAvailable: true }],
    saturday: [{ id: '6', day: 'saturday', startTime: '10:00', endTime: '15:00', isAvailable: false }],
    sunday: [{ id: '7', day: 'sunday', startTime: '10:00', endTime: '15:00', isAvailable: false }]
  })
  
  const [consultationDuration, setConsultationDuration] = useState(30)
  const [bufferTime, setBufferTime] = useState(15)
  const [loading, setLoading] = useState(false)
  const [editingSlot, setEditingSlot] = useState<string | null>(null)

  const addTimeSlot = (day: keyof BusinessHours) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day,
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true
    }
    
    setBusinessHours(prev => ({
      ...prev,
      [day]: [...prev[day], newSlot]
    }))
  }

  const removeTimeSlot = (day: keyof BusinessHours, slotId: string) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: prev[day].filter(slot => slot.id !== slotId)
    }))
  }

  const updateTimeSlot = (day: keyof BusinessHours, slotId: string, updates: Partial<TimeSlot>) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: prev[day].map(slot => 
        slot.id === slotId ? { ...slot, ...updates } : slot
      )
    }))
  }

  const toggleAvailability = (day: keyof BusinessHours, slotId: string) => {
    updateTimeSlot(day, slotId, { 
      isAvailable: !businessHours[day].find(slot => slot.id === slotId)?.isAvailable 
    })
  }

  const saveAvailability = async () => {
    setLoading(true)
    try {
      // Here you would save to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      alert('Availability settings saved successfully!')
    } catch (error) {
      console.error('Error saving availability:', error)
      alert('Error saving availability settings')
    } finally {
      setLoading(false)
    }
  }

  const getAvailableSlots = (day: keyof BusinessHours) => {
    return businessHours[day].filter(slot => slot.isAvailable).length
  }

  const getTotalHours = (day: keyof BusinessHours) => {
    return businessHours[day]
      .filter(slot => slot.isAvailable)
      .reduce((total, slot) => {
        const start = new Date(`2000-01-01T${slot.startTime}:00`)
        const end = new Date(`2000-01-01T${slot.endTime}:00`)
        return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      }, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Consultation Availability</h1>
        <Button onClick={saveAvailability} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Configure your consultation preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Consultation Duration (minutes)
              </label>
              <Input
                type="number"
                value={consultationDuration}
                onChange={(e) => setConsultationDuration(parseInt(e.target.value))}
                min="15"
                max="120"
                step="15"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buffer Time Between Consultations (minutes)
              </label>
              <Input
                type="number"
                value={bufferTime}
                onChange={(e) => setBufferTime(parseInt(e.target.value))}
                min="0"
                max="60"
                step="5"
              />
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium text-gray-900 mb-3">Weekly Summary</h4>
              <div className="space-y-2 text-sm">
                {daysOfWeek.map(day => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize">{day}:</span>
                    <span className={getAvailableSlots(day as keyof BusinessHours) > 0 ? 'text-green-600' : 'text-gray-400'}>
                      {getTotalHours(day as keyof BusinessHours).toFixed(1)}h
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>
                Set your available hours for each day of the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {daysOfWeek.map(day => (
                  <div key={day} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900 capitalize">
                        {dayLabels[day as keyof typeof dayLabels]}
                      </h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => addTimeSlot(day as keyof BusinessHours)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Slot
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {businessHours[day as keyof BusinessHours].map((slot) => (
                        <div key={slot.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <button
                            onClick={() => toggleAvailability(day as keyof BusinessHours, slot.id)}
                            className={`p-1 rounded ${
                              slot.isAvailable 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {slot.isAvailable ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                          </button>

                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateTimeSlot(day as keyof BusinessHours, slot.id, { startTime: e.target.value })}
                              className="w-32"
                              disabled={!slot.isAvailable}
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateTimeSlot(day as keyof BusinessHours, slot.id, { endTime: e.target.value })}
                              className="w-32"
                              disabled={!slot.isAvailable}
                            />
                          </div>

                          <div className="text-sm text-gray-500">
                            {slot.isAvailable ? (
                              <span className="text-green-600 font-medium">Available</span>
                            ) : (
                              <span className="text-gray-400">Unavailable</span>
                            )}
                          </div>

                          {businessHours[day as keyof BusinessHours].length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeTimeSlot(day as keyof BusinessHours, slot.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Availability Preview</CardTitle>
          <CardDescription>
            How your availability will appear to clients booking consultations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {daysOfWeek.map(day => {
              const availableSlots = businessHours[day as keyof BusinessHours].filter(slot => slot.isAvailable)
              
              return (
                <div key={day} className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2 capitalize">
                    {day.slice(0, 3)}
                  </h4>
                  {availableSlots.length > 0 ? (
                    <div className="space-y-1 text-sm">
                      {availableSlots.map(slot => (
                        <div key={slot.id} className="text-green-600">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      ))}
                      <div className="text-xs text-gray-500 mt-2">
                        {getTotalHours(day as keyof BusinessHours).toFixed(1)} hours
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      Unavailable
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}