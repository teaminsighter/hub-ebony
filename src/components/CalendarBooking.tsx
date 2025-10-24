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
        <p className="text-xs text-gray-600 mb-3">Prefer direct contact?</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://wa.me/971501234567?text=Hi, I'm interested in Dubai commercial property investment consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </a>
          <a
            href="mailto:info@commercialdxb.com?subject=Property Investment Inquiry"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}