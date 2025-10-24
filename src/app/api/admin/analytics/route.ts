import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    // DEVELOPMENT MODE: Skip authentication check
    // const session = await getServerSession(authOptions)
    // if (!session || !['SUPER_ADMIN', 'SALES_MANAGER', 'CONTENT_MANAGER'].includes(session.user.role)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    const daysBack = range === '7d' ? 7 : range === '30d' ? 30 : 90
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    // Get page views
    const pageViews = await prisma.pageView.findMany({
      where: {
        timestamp: {
          gte: startDate
        }
      }
    })

    // Get conversions
    const conversions = await prisma.conversion.findMany({
      where: {
        timestamp: {
          gte: startDate
        }
      }
    })

    // Get consultations
    const consultations = await prisma.consultation.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // Get clients
    const clients = await prisma.client.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    const allClients = await prisma.client.findMany()

    // Calculate analytics
    const analytics = {
      pageViews: {
        total: pageViews.length,
        byPage: Object.entries(
          pageViews.reduce((acc, pv) => {
            acc[pv.page] = (acc[pv.page] || 0) + 1
            return acc
          }, {} as Record<string, number>)
        ).map(([page, views]) => ({ page, views })),
        trend: 15 // Mock trend data
      },
      conversions: {
        total: conversions.length,
        rate: pageViews.length > 0 ? (conversions.length / pageViews.length) * 100 : 0,
        byType: Object.entries(
          conversions.reduce((acc, conv) => {
            acc[conv.type] = (acc[conv.type] || 0) + 1
            return acc
          }, {} as Record<string, number>)
        ).map(([type, count]) => ({ type, count }))
      },
      consultations: {
        total: consultations.length,
        completed: consultations.filter(c => c.status === 'COMPLETED').length,
        scheduled: consultations.filter(c => c.status === 'SCHEDULED').length,
        trend: 8 // Mock trend data
      },
      clients: {
        total: allClients.length,
        qualified: allClients.filter(c => c.status === 'QUALIFIED').length,
        activeInvestors: allClients.filter(c => c.status === 'ACTIVE_INVESTOR').length,
        trend: 12 // Mock trend data
      },
      monthlyStats: [] // Could be implemented for charts
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}