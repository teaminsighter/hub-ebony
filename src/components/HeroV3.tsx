'use client'

import { useState } from 'react'

export default function HeroV3() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const timeSlots = ['10:00am', '10:30am', '11:00am', '11:30am']

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const formatSelectedDate = () => {
    if (!selectedDate) return ''
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    setSelectedDate(null)
    setSelectedTime('')
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    setSelectedDate(null)
    setSelectedTime('')
  }

  const handleConfirm = () => {
    // Handle booking confirmation here - keep selected values for display
    setShowCalendar(false)
    // Don't clear selectedDate and selectedTime so they show in confirmation
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Discover Why Global Investors Are Moving Their Capital to Dubai
          </h1>
          <p className="text-lg text-gray-600">
            Let's talk about how you can tap into 8–10% net returns in one of the world's safest investment environments.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Photo & Features */}
          <div className="space-y-6">
            {/* Professional Photo */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-700 to-gray-900 relative flex items-center justify-center">
                {/* Professional photo background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-gray-800/50"></div>
                <div className="relative text-center text-white p-8">
                  <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">MM</span>
                  </div>
                  <div className="text-xl font-semibold mb-2">Max McCarthy</div>
                  <div className="text-sm opacity-90">Dubai Property Expert</div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span className="font-semibold text-gray-800 text-lg">8–10% Net Yields on Investment</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">%</span>
                </div>
                <span className="font-semibold text-gray-800 text-lg">0% Tax on Gains & Income</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="font-semibold text-gray-800 text-lg">Stable Local & International Tenants</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                  </svg>
                </div>
                <span className="font-semibold text-gray-800 text-lg">Super Safe Environment</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-5 scale-75 origin-top">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Let's Discuss Your Dubai Investment Strategy
              </h2>
            </div>

            {!showCalendar ? (
              <>
                {/* Selected Date & Time Confirmation */}
                {selectedDate && selectedTime && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-green-800">Appointment Confirmed</h4>
                        <p className="text-green-700">
                          {formatSelectedDate()} at {selectedTime}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowCalendar(true)}
                        className="text-green-600 hover:text-green-800 text-sm underline"
                      >
                        Change Time
                      </button>
                    </div>
                  </div>
                )}

                {/* Contact Form */}
                <div className="space-y-4 mb-8">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <span className="absolute right-3 top-3 text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* LETS TALK Button */}
                <button className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-lg mb-6 text-lg">
                  LETS TALK
                </button>

                {/* Three Action Buttons */}
                <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => setShowCalendar(true)}
                    className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Book Time</span>
                  </button>

                  <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-6 h-6 text-green-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Call Me Directly</span>
                  </button>

                  <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-6 h-6 text-gray-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Send Email</span>
                  </button>
                </div>
              </>
            ) : (
              /* Calendar Popup */
              <div className="space-y-4 scale-75 origin-top">
                {/* Calendar Header */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Date & Time</h3>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {months[currentMonth.getMonth()].toUpperCase()}
                  </h4>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {getCalendarDays().map((day, index) => (
                    <div key={index} className="aspect-square">
                      {day ? (
                        <button
                          onClick={() => setSelectedDate(day)}
                          className={`w-full h-full flex items-center justify-center text-sm rounded-full transition-colors ${
                            selectedDate === day
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {day}
                        </button>
                      ) : (
                        <div className="w-full h-full"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Selected Date Display */}
                {selectedDate && (
                  <div className="text-center mb-2">
                    <p className="text-sm font-medium text-blue-900">
                      {formatSelectedDate()}
                    </p>
                  </div>
                )}

                {/* Time Slots */}
                {selectedDate && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm border rounded transition-colors ${
                            selectedTime === time
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirm Button */}
                {selectedTime && (
                  <div className="mt-4">
                    <button
                      onClick={handleConfirm}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                )}

                {/* Close Calendar Button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    ← Back to form
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}