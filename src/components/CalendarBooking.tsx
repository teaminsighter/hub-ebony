'use client'

import { useState, useEffect } from 'react'

interface TimeSlot {
  start: string
  end: string
  available: boolean
}

interface BookingForm {
  name: string
  email: string
  phone: string
  company: string
}

export default function CalendarBooking() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const [form, setForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    company: ''
  })

  // Get today and tomorrow dates for initial display
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const formatDate = (date: Date) => date.toISOString().split('T')[0]
  const formatDisplayDate = (date: Date) => date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  })

  // Load available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate)
    }
  }, [selectedDate])

  const fetchAvailableSlots = async (date: string) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/calendar/availability?date=${date}`)
      const data = await response.json()
      
      if (response.ok) {
        setAvailableSlots(data.slots || [])
      } else {
        setError(data.error || 'Failed to load availability')
      }
    } catch (err) {
      setError('Failed to load availability')
      // Show mock slots for development
      setAvailableSlots([
        { start: '09:00', end: '09:30', available: true },
        { start: '10:00', end: '10:30', available: true },
        { start: '14:00', end: '14:30', available: true },
        { start: '15:30', end: '16:00', available: true },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!form.name || !form.email || !selectedDate || !selectedTime) {
      setError('Please fill in all required fields and select a time')
      return
    }

    setBooking(true)
    setError('')

    try {
      const response = await fetch('/api/consultation/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          date: selectedDate,
          time: selectedTime
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Reset form
        setForm({ name: '', email: '', phone: '', company: '' })
        setSelectedDate('')
        setSelectedTime('')
        setAvailableSlots([])
      } else {
        setError(data.error || 'Failed to book consultation')
      }
    } catch (err) {
      setError('Failed to book consultation')
    } finally {
      setBooking(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation Booked!</h3>
        <p className="text-gray-600 mb-4">
          Thank you! You'll receive a calendar invitation and confirmation email shortly.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-blue-600 hover:text-blue-800"
        >
          Book Another Consultation
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between">
      {/* Profile Section */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Max McCarthy</h3>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">(98 reviews)</span>
          </div>
        </div>
      </div>

      {/* Consultation Info */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>30-min consultation • Completely free</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Select Date</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setSelectedDate(formatDate(today))}
            className={`text-center p-3 border rounded-lg transition-colors ${
              selectedDate === formatDate(today)
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-xs font-semibold text-blue-600 uppercase">TODAY</div>
            <div className="font-bold">{formatDisplayDate(today)}</div>
          </button>
          <button
            onClick={() => setSelectedDate(formatDate(tomorrow))}
            className={`text-center p-3 border rounded-lg transition-colors ${
              selectedDate === formatDate(tomorrow)
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-xs font-semibold text-blue-600 uppercase">TOMORROW</div>
            <div className="font-bold">{formatDisplayDate(tomorrow)}</div>
          </button>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Available Times</h4>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {availableSlots.map((slot) => (
                <button
                  key={slot.start}
                  onClick={() => setSelectedTime(slot.start)}
                  className={`text-center p-2 border rounded transition-colors ${
                    selectedTime === slot.start
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm font-medium">{slot.start}</div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No available slots for this date</p>
          )}
        </div>
      )}

      {/* Booking Form */}
      {selectedTime && (
        <div className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
          />
          <input
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={form.company}
            onChange={(e) => setForm({...form, company: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Schedule Button */}
      <button
        onClick={handleBooking}
        disabled={!selectedTime || !form.name || !form.email || booking}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        {booking ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Booking...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            <span>Schedule Free Consultation</span>
          </>
        )}
      </button>

      {/* Additional Info */}
      <div className="mt-4 text-center text-xs text-gray-600">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <span className="flex items-center space-x-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Instant confirmation</span>
          </span>
          <span>•</span>
          <span>No obligation</span>
          <span>•</span>
          <span>Completely free</span>
        </div>
        <div>📞 47 consultations this week • ⭐ 4.95 rating</div>
      </div>

      {/* Contact Options */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600 mb-2">Prefer direct contact?</p>
        <div className="flex justify-center space-x-3">
          <button className="flex items-center space-x-1 px-3 py-1 border rounded text-xs hover:bg-gray-50">
            <span>📱</span>
            <span>WhatsApp</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1 border rounded text-xs hover:bg-gray-50">
            <span>📧</span>
            <span>Email</span>
          </button>
        </div>
      </div>
    </div>
  )
}