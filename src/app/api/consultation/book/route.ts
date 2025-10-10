import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CalendarService } from '@/lib/calendar'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, date, time } = body

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Name, email, date, and time are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create datetime for the consultation
    const consultationDateTime = new Date(`${date}T${time}:00`)
    
    // Check if the time slot is still available
    const calendarService = new CalendarService()
    const availableSlots = await calendarService.getAvailableSlots(date)
    const requestedSlot = availableSlots.find(slot => 
      slot.start === time && slot.available
    )

    if (!requestedSlot) {
      return NextResponse.json(
        { error: 'Selected time slot is no longer available' },
        { status: 409 }
      )
    }

    // Create Google Calendar event
    const googleEventId = await calendarService.createEvent({
      name,
      email,
      phone,
      company,
      date,
      time
    })

    // Save to database
    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        date: consultationDateTime,
        googleEventId,
        status: 'scheduled'
      }
    })

    // Send to GoHighLevel webhook (if configured)
    if (process.env.GOHIGHLEVEL_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOHIGHLEVEL_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone: phone || '',
            company: company || '',
            consultation_date: consultationDateTime.toISOString(),
            source: 'Dubai Property Landing Page',
            consultation_id: consultation.id
          })
        })
      } catch (webhookError) {
        console.error('GoHighLevel webhook failed:', webhookError)
        // Don't fail the booking if webhook fails
      }
    }

    return NextResponse.json({
      success: true,
      consultation: {
        id: consultation.id,
        name: consultation.name,
        email: consultation.email,
        date: consultation.date,
        status: consultation.status
      },
      googleEventId,
      message: 'Consultation booked successfully!'
    })

  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Failed to book consultation' },
      { status: 500 }
    )
  }
}