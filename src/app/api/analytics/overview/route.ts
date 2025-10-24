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
    const dateRange = searchParams.get('dateRange') || '7d'

    // Calculate date range
    const now = new Date()
    let startDate: Date
    
    switch (dateRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    // Get analytics data
    const [
      totalPageViews,
      totalConversions,
      consultations,
      newClients,
      activeProperties
    ] = await Promise.all([
      prisma.pageView.count({
        where: {
          timestamp: { gte: startDate }
        }
      }),
      prisma.conversion.count({
        where: {
          timestamp: { gte: startDate }
        }
      }),
      prisma.consultation.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      prisma.client.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      prisma.property.count({
        where: {
          isActive: true
        }
      })
    ])

    // Calculate conversion rate
    const conversionRate = totalPageViews > 0 ? (totalConversions / totalPageViews) * 100 : 0

    // Get daily breakdown for charts
    const dailyStats = []
    for (let i = parseInt(dateRange); i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      const dateEnd = new Date(dateStart.getTime() + 24 * 60 * 60 * 1000)

      const [views, conversions, bookings] = await Promise.all([
        prisma.pageView.count({
          where: {
            timestamp: { gte: dateStart, lt: dateEnd }
          }
        }),
        prisma.conversion.count({
          where: {
            timestamp: { gte: dateStart, lt: dateEnd }
          }
        }),
        prisma.consultation.count({
          where: {
            createdAt: { gte: dateStart, lt: dateEnd }
          }
        })
      ])

      dailyStats.push({
        date: dateStart.toISOString().split('T')[0],
        pageViews: views,
        conversions: conversions,
        consultations: bookings,
        conversionRate: views > 0 ? (conversions / views) * 100 : 0
      })
    }

    // Get top performing pages
    const topPages = await prisma.pageView.groupBy({
      by: ['page'],
      where: {
        timestamp: { gte: startDate }
      },
      _count: {
        page: true
      },
      orderBy: {
        _count: {
          page: 'desc'
        }
      },
      take: 5
    })

    // Get conversion sources
    const conversionSources = await prisma.conversion.groupBy({
      by: ['page'],
      where: {
        timestamp: { gte: startDate }
      },
      _count: {
        page: true
      },
      orderBy: {
        _count: {
          page: 'desc'
        }
      }
    })

    const analytics = {
      summary: {
        totalPageViews,
        totalConversions,
        consultations,
        newClients,
        activeProperties,
        conversionRate: parseFloat(conversionRate.toFixed(2)),
        dateRange
      },
      dailyStats,
      topPages: topPages.map(p => ({
        page: p.page,
        views: p._count.page
      })),
      conversionSources: conversionSources.map(c => ({
        source: c.page,
        conversions: c._count.page
      }))
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics overview:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}