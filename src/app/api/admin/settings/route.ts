import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    // DEVELOPMENT MODE: Skip authentication check
    // const session = await getServerSession(authOptions)
    // if (!session || !['SUPER_ADMIN'].includes(session.user.role)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Return demo settings data
    const settings = {
      siteName: 'CommercialDXB',
      siteUrl: 'https://hubebony.com',
      contactEmail: 'contact@hubebony.com',
      businessHours: {
        start: '09:00',
        end: '18:00',
        timezone: 'Asia/Dubai'
      },
      consultationDuration: 30,
      emailNotifications: true,
      smsNotifications: false,
      autoBackup: true
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    // DEVELOPMENT MODE: Skip authentication check
    // const session = await getServerSession(authOptions)
    // if (!session || !['SUPER_ADMIN'].includes(session.user.role)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const settings = await request.json()
    
    // In a real app, you would save the settings to the database
    // For demo purposes, we'll just return success
    
    return NextResponse.json({ message: 'Settings updated successfully' })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}