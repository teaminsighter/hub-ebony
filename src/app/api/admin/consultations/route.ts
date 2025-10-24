import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // DEVELOPMENT MODE: Skip authentication check
    // const session = await getServerSession(authOptions)
    // if (!session || !['SUPER_ADMIN', 'SALES_MANAGER', 'CONTENT_MANAGER'].includes(session.user.role)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const consultations = await prisma.consultation.findMany({
      include: {
        client: {
          select: {
            name: true,
            investmentBudget: true,
            preferredAreas: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(consultations)
  } catch (error) {
    console.error('Error fetching consultations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['SUPER_ADMIN', 'SALES_MANAGER'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      date,
      duration = 30,
      meetingType = 'video',
      notes
    } = body

    // Check if client exists, create if not
    let client = await prisma.client.findUnique({
      where: { email }
    })

    if (!client) {
      client = await prisma.client.create({
        data: {
          name,
          email,
          phone,
          company,
          leadSource: 'Admin',
          status: 'PROSPECT'
        }
      })
    }

    const consultation = await prisma.consultation.create({
      data: {
        clientId: client.id,
        name,
        email,
        phone,
        company,
        date: new Date(date),
        duration,
        meetingType,
        notes,
        status: 'SCHEDULED'
      },
      include: {
        client: {
          select: {
            name: true,
            investmentBudget: true,
            preferredAreas: true
          }
        }
      }
    })

    return NextResponse.json(consultation, { status: 201 })
  } catch (error) {
    console.error('Error creating consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}