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

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Get basic counts
    const [
      totalClients,
      totalConsultations,
      totalProperties,
      monthlyConsultations,
      monthlyPageViews,
      monthlyConversions
    ] = await Promise.all([
      prisma.client.count(),
      prisma.consultation.count(),
      prisma.property.count(),
      prisma.consultation.count({
        where: {
          createdAt: {
            gte: startOfMonth
          }
        }
      }),
      prisma.pageView.count({
        where: {
          timestamp: {
            gte: startOfMonth
          }
        }
      }),
      prisma.conversion.count({
        where: {
          timestamp: {
            gte: startOfMonth
          }
        }
      })
    ])

    // Calculate conversion rate
    const conversionRate = monthlyPageViews > 0 ? (monthlyConversions / monthlyPageViews) * 100 : 0

    return NextResponse.json({
      totalClients,
      totalConsultations: monthlyConsultations,
      totalProperties,
      monthlyConversions,
      pageViews: monthlyPageViews,
      conversionRate
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}