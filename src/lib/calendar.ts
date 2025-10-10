import { google } from 'googleapis'

export const calendar = google.calendar({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY
})

export interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export interface BookingData {
  name: string
  email: string
  phone?: string
  company?: string
  date: string
  time: string
}

export class CalendarService {
  private calendarId: string

  constructor() {
    this.calendarId = process.env.CALENDAR_ID || 'primary'
  }

  // Get available time slots for a specific date
  async getAvailableSlots(date: string): Promise<TimeSlot[]> {
    try {
      const startTime = new Date(`${date}T${process.env.BUSINESS_HOURS_START || '09:00'}:00`)
      const endTime = new Date(`${date}T${process.env.BUSINESS_HOURS_END || '18:00'}:00`)
      
      // Get existing events for the day
      const events = await calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      })

      const existingEvents = events.data.items || []
      const slots: TimeSlot[] = []
      const duration = parseInt(process.env.CONSULTATION_DURATION || '30')

      // Generate 30-minute slots
      let currentTime = new Date(startTime)
      while (currentTime < endTime) {
        const slotEnd = new Date(currentTime.getTime() + duration * 60000)
        
        // Check if slot conflicts with existing events
        const isAvailable = !existingEvents.some(event => {
          const eventStart = new Date(event.start?.dateTime || event.start?.date || '')
          const eventEnd = new Date(event.end?.dateTime || event.end?.date || '')
          
          return (currentTime < eventEnd && slotEnd > eventStart)
        })

        slots.push({
          start: currentTime.toTimeString().slice(0, 5),
          end: slotEnd.toTimeString().slice(0, 5),
          available: isAvailable
        })

        currentTime = slotEnd
      }

      return slots
    } catch (error) {
      console.error('Error fetching available slots:', error)
      // Return mock slots if API fails
      return this.getMockSlots()
    }
  }

  // Create calendar event
  async createEvent(bookingData: BookingData): Promise<string | null> {
    try {
      const startDateTime = new Date(`${bookingData.date}T${bookingData.time}:00`)
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000) // 30 minutes

      const event = {
        summary: `Consultation with ${bookingData.name}`,
        description: `Commercial Property Consultation
        
Client: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone || 'Not provided'}
Company: ${bookingData.company || 'Not provided'}

This is a 30-minute consultation about Dubai commercial property investment opportunities.`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'Asia/Dubai',
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'Asia/Dubai',
        },
        attendees: [
          { email: bookingData.email },
        ],
        conferenceData: {
          createRequest: {
            requestId: `consultation-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      }

      const result = await calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: event,
        conferenceDataVersion: 1,
      })

      return result.data.id || null
    } catch (error) {
      console.error('Error creating calendar event:', error)
      return null
    }
  }

  // Mock slots for development/fallback
  private getMockSlots(): TimeSlot[] {
    return [
      { start: '09:00', end: '09:30', available: true },
      { start: '09:30', end: '10:00', available: false },
      { start: '10:00', end: '10:30', available: true },
      { start: '10:30', end: '11:00', available: true },
      { start: '11:00', end: '11:30', available: false },
      { start: '11:30', end: '12:00', available: true },
      { start: '14:00', end: '14:30', available: true },
      { start: '14:30', end: '15:00', available: true },
      { start: '15:00', end: '15:30', available: false },
      { start: '15:30', end: '16:00', available: true },
      { start: '16:00', end: '16:30', available: true },
      { start: '16:30', end: '17:00', available: true },
    ]
  }
}