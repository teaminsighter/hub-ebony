import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Create admin user if doesn't exist
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: 'admin@hubebony.com' }
    })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      await prisma.adminUser.create({
        data: {
          email: 'admin@hubebony.com',
          password: hashedPassword,
          name: 'Super Admin',
          role: 'SUPER_ADMIN'
        }
      })
    }

    // Seed some sample data
    const sampleClient = await prisma.client.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+971501234567',
        investmentBudget: '500k-1M',
        preferredArea: 'Downtown',
        riskTolerance: 'Medium',
        investmentGoal: 'Capital Growth',
        leadSource: 'Website',
        leadScore: 75,
        status: 'QUALIFIED'
      }
    })

    const sampleProperty = await prisma.property.upsert({
      where: { id: 'sample-property-1' },
      update: {},
      create: {
        id: 'sample-property-1',
        title: 'Luxury Apartment in Downtown Dubai',
        description: 'Modern 2-bedroom apartment with stunning Burj Khalifa views',
        area: 'Downtown',
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        price: 2500000,
        currency: 'AED',
        roi: 8.5,
        rentalYield: 6.2,
        completionDate: new Date('2024-12-31'),
        developer: 'Emaar Properties',
        features: JSON.stringify(['Balcony', 'Gym', 'Pool', 'Parking']),
        isFeatured: true
      }
    })

    await prisma.consultation.upsert({
      where: { id: 'sample-consultation-1' },
      update: {},
      create: {
        id: 'sample-consultation-1',
        clientId: sampleClient.id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+971501234567',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        status: 'SCHEDULED',
        meetingType: 'video'
      }
    })

    // Add some analytics data
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      
      await prisma.pageView.create({
        data: {
          page: Math.random() > 0.5 ? 'home' : 'version-2',
          timestamp: date
        }
      })
      
      if (Math.random() > 0.9) {
        await prisma.conversion.create({
          data: {
            page: 'home',
            type: 'consultation_booking',
            clientEmail: 'sample@example.com',
            timestamp: date
          }
        })
      }
    }

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      adminCredentials: {
        email: 'admin@hubebony.com',
        password: 'admin123'
      }
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}