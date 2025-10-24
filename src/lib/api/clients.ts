import { prisma } from '@/lib/prisma'
import type { 
  ClientCreate, 
  ClientUpdate, 
  ClientQuery,
  Pagination 
} from './types'
import { 
  calculatePagination, 
  getPaginationParams,
  generateSearchConditions,
  generateSortConditions,
  formatRecord,
  parseJSONField
} from './utils'
import { NotFoundError, ConflictError } from './errors'

// Get clients with advanced filtering and pagination
export async function getClients(query: ClientQuery): Promise<{
  clients: any[]
  pagination: Pagination
}> {
  const {
    page = 1,
    limit = 20,
    search,
    status,
    stage,
    priority,
    leadSource,
    assignedTo,
    investmentBudget,
    riskTolerance,
    investmentGoal,
    createdAfter,
    createdBefore,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = query

  // Build where conditions
  const where: any = {
    isActive: true,
    ...(status && { status }),
    ...(stage && { stage }),
    ...(priority && { priority }),
    ...(leadSource && { leadSource }),
    ...(assignedTo && { assignedTo }),
    ...(investmentBudget && { investmentBudget }),
    ...(riskTolerance && { riskTolerance }),
    ...(investmentGoal && { investmentGoal }),
  }

  // Date range filter
  if (createdAfter || createdBefore) {
    where.createdAt = {}
    if (createdAfter) where.createdAt.gte = new Date(createdAfter)
    if (createdBefore) where.createdAt.lte = new Date(createdBefore)
  }

  // Search conditions
  if (search) {
    const searchConditions = generateSearchConditions(search, [
      'name',
      'email',
      'phone',
      'company',
      'nationality',
      'profession'
    ])
    Object.assign(where, searchConditions)
  }

  // Pagination
  const { skip, take } = getPaginationParams(page, limit)

  // Sort conditions
  const orderBy = generateSortConditions(sortBy, sortOrder)

  // Execute queries
  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        _count: {
          select: {
            consultations: true,
            properties: true,
            investments: true,
            tours: true,
            interactions: true
          }
        }
      }
    }),
    prisma.client.count({ where })
  ])

  // Format clients
  const formattedClients = clients.map(client => ({
    ...formatRecord(client),
    preferredAreas: parseJSONField(client.preferredAreas, []),
    tags: parseJSONField(client.tags, []),
    consultationCount: client._count.consultations,
    propertyInterestCount: client._count.properties,
    investmentCount: client._count.investments,
    tourCount: client._count.tours,
    interactionCount: client._count.interactions
  }))

  const pagination = calculatePagination(page, limit, total)

  return {
    clients: formattedClients,
    pagination
  }
}

// Get single client by ID
export async function getClientById(id: string): Promise<any> {
  const client = await prisma.client.findUnique({
    where: { id, isActive: true },
    include: {
      consultations: {
        orderBy: { date: 'desc' },
        take: 5
      },
      properties: {
        include: {
          property: {
            select: {
              id: true,
              title: true,
              price: true,
              propertyType: true,
              area: { select: { name: true } },
              images: true
            }
          }
        }
      },
      investments: {
        include: {
          property: {
            select: {
              id: true,
              title: true,
              price: true,
              area: { select: { name: true } }
            }
          }
        },
        orderBy: { investmentDate: 'desc' }
      },
      tours: {
        include: {
          property: {
            select: {
              id: true,
              title: true,
              area: { select: { name: true } }
            }
          }
        },
        orderBy: { scheduledAt: 'desc' },
        take: 10
      },
      interactions: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      documents: {
        select: {
          id: true,
          name: true,
          type: true,
          isVerified: true,
          createdAt: true
        }
      },
      _count: {
        select: {
          consultations: true,
          properties: true,
          investments: true,
          tours: true,
          interactions: true
        }
      }
    }
  })

  if (!client) {
    throw new NotFoundError('Client', id)
  }

  return {
    ...formatRecord(client),
    preferredAreas: parseJSONField(client.preferredAreas, []),
    tags: parseJSONField(client.tags, []),
    properties: client.properties.map(cp => ({
      ...cp,
      property: {
        ...cp.property,
        images: parseJSONField(cp.property.images, [])
      }
    })),
    totalInvestmentValue: client.investments.reduce((sum, inv) => sum + inv.amount, 0),
    totalConsultations: client._count.consultations,
    totalPropertyInterests: client._count.properties,
    totalInvestments: client._count.investments,
    totalTours: client._count.tours,
    totalInteractions: client._count.interactions
  }
}

// Create new client
export async function createClient(data: ClientCreate): Promise<any> {
  // Check if email already exists
  const existingClient = await prisma.client.findUnique({
    where: { email: data.email }
  })

  if (existingClient) {
    throw new ConflictError('A client with this email already exists')
  }

  const client = await prisma.client.create({
    data: {
      ...data,
      preferredAreas: data.preferredAreas ? JSON.stringify(data.preferredAreas) : null,
      tags: data.tags ? JSON.stringify(data.tags) : null,
      leadScore: calculateLeadScore(data),
    }
  })

  return {
    ...formatRecord(client),
    preferredAreas: parseJSONField(client.preferredAreas, []),
    tags: parseJSONField(client.tags, []),
  }
}

// Update client
export async function updateClient(id: string, data: ClientUpdate): Promise<any> {
  let updateData = { ...data }

  // Convert arrays to JSON strings
  if (data.preferredAreas) updateData.preferredAreas = JSON.stringify(data.preferredAreas)
  if (data.tags) updateData.tags = JSON.stringify(data.tags)

  // Recalculate lead score if relevant fields changed
  if (data.investmentBudget || data.riskTolerance || data.investmentGoal || data.leadSource) {
    const existingClient = await prisma.client.findUnique({ where: { id } })
    if (existingClient) {
      const updatedClientData = { ...existingClient, ...data }
      updateData.leadScore = calculateLeadScore(updatedClientData)
    }
  }

  const client = await prisma.client.update({
    where: { id },
    data: updateData
  })

  return {
    ...formatRecord(client),
    preferredAreas: parseJSONField(client.preferredAreas, []),
    tags: parseJSONField(client.tags, []),
  }
}

// Soft delete client
export async function deleteClient(id: string): Promise<void> {
  await prisma.client.update({
    where: { id },
    data: { isActive: false }
  })
}

// Calculate lead score based on client data
function calculateLeadScore(client: Partial<ClientCreate | ClientUpdate>): number {
  let score = 0

  // Investment budget scoring
  if (client.investmentBudget) {
    const budgetScores = {
      'UNDER_500K': 10,
      'FROM_500K_TO_1M': 20,
      'FROM_1M_TO_2M': 30,
      'FROM_2M_TO_5M': 40,
      'ABOVE_5M': 50
    }
    score += budgetScores[client.investmentBudget] || 0
  }

  // Lead source scoring
  if (client.leadSource) {
    const sourceScores = {
      'WEBSITE': 15,
      'REFERRAL': 25,
      'SOCIAL_MEDIA': 10,
      'COLD_OUTREACH': 5,
      'EVENT': 20,
      'ADVERTISEMENT': 10,
      'PARTNER': 20
    }
    score += sourceScores[client.leadSource] || 0
  }

  // Investment goal scoring
  if (client.investmentGoal) {
    const goalScores = {
      'CAPITAL_GROWTH': 15,
      'RENTAL_INCOME': 20,
      'MIXED': 25,
      'PORTFOLIO_DIVERSIFICATION': 20,
      'RESIDENCY_VISA': 15
    }
    score += goalScores[client.investmentGoal] || 0
  }

  // Risk tolerance scoring
  if (client.riskTolerance) {
    const riskScores = {
      'CONSERVATIVE': 10,
      'MODERATE': 15,
      'AGGRESSIVE': 20
    }
    score += riskScores[client.riskTolerance] || 0
  }

  // Bonus points for complete profile
  let completeness = 0
  if (client.phone) completeness += 5
  if (client.company) completeness += 5
  if (client.nationality) completeness += 5
  if (client.profession) completeness += 5
  if (client.preferredAreas && Array.isArray(client.preferredAreas) && client.preferredAreas.length > 0) completeness += 10

  score += completeness

  return Math.min(score, 100) // Cap at 100
}

// Get client analytics
export async function getClientAnalytics(id: string): Promise<any> {
  const [client, recentActivity, investmentHistory, tourHistory] = await Promise.all([
    prisma.client.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        leadScore: true,
        status: true,
        stage: true,
        createdAt: true
      }
    }),
    prisma.clientInteraction.findMany({
      where: { clientId: id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        type: true,
        channel: true,
        subject: true,
        createdAt: true,
        outcome: true
      }
    }),
    prisma.investment.findMany({
      where: { clientId: id },
      orderBy: { investmentDate: 'desc' },
      include: {
        property: {
          select: { title: true, area: { select: { name: true } } }
        },
        transactions: {
          select: { type: true, amount: true, status: true }
        }
      }
    }),
    prisma.propertyTour.findMany({
      where: { clientId: id },
      orderBy: { scheduledAt: 'desc' },
      include: {
        property: {
          select: { title: true, area: { select: { name: true } } }
        }
      }
    })
  ])

  if (!client) {
    throw new NotFoundError('Client', id)
  }

  // Calculate metrics
  const totalInvestmentValue = investmentHistory.reduce((sum, inv) => sum + inv.amount, 0)
  const completedInvestments = investmentHistory.filter(inv => inv.status === 'COMPLETED').length
  const averageTourRating = tourHistory.filter(t => t.rating).reduce((sum, t) => sum + (t.rating || 0), 0) / tourHistory.filter(t => t.rating).length || 0
  const interestRate = tourHistory.filter(t => t.interested).length / tourHistory.length || 0

  // Calculate engagement score
  const daysSinceCreated = Math.floor((Date.now() - client.createdAt.getTime()) / (1000 * 60 * 60 * 24))
  const engagementScore = Math.min(
    ((recentActivity.length * 5) + (tourHistory.length * 10) + (investmentHistory.length * 20)) / Math.max(daysSinceCreated, 1),
    100
  )

  return {
    client,
    metrics: {
      totalInvestmentValue,
      totalInvestments: investmentHistory.length,
      completedInvestments,
      averageTourRating: Math.round(averageTourRating * 10) / 10,
      interestRate: Math.round(interestRate * 100),
      totalTours: tourHistory.length,
      completedTours: tourHistory.filter(t => t.status === 'COMPLETED').length,
      totalInteractions: recentActivity.length,
      engagementScore: Math.round(engagementScore),
      daysSinceCreated
    },
    recentActivity,
    investmentSummary: investmentHistory.map(inv => ({
      id: inv.id,
      amount: inv.amount,
      status: inv.status,
      property: inv.property,
      investmentDate: inv.investmentDate,
      paidAmount: inv.transactions
        .filter(t => t.status === 'COMPLETED')
        .reduce((sum, t) => sum + t.amount, 0)
    })),
    tourSummary: tourHistory.map(tour => ({
      id: tour.id,
      property: tour.property,
      scheduledAt: tour.scheduledAt,
      status: tour.status,
      rating: tour.rating,
      interested: tour.interested
    }))
  }
}

// Get client dashboard stats
export async function getClientDashboardStats(): Promise<any> {
  const [
    totalClients,
    newClientsThisMonth,
    activeClients,
    vipClients,
    statusDistribution,
    stageDistribution,
    leadSourceDistribution,
    monthlyGrowth
  ] = await Promise.all([
    prisma.client.count({ where: { isActive: true } }),
    prisma.client.count({
      where: {
        isActive: true,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    prisma.client.count({
      where: {
        isActive: true,
        status: { in: ['QUALIFIED', 'ACTIVE_INVESTOR'] }
      }
    }),
    prisma.client.count({
      where: {
        isActive: true,
        priority: 'VIP'
      }
    }),
    prisma.client.groupBy({
      by: ['status'],
      where: { isActive: true },
      _count: { _all: true }
    }),
    prisma.client.groupBy({
      by: ['stage'],
      where: { isActive: true },
      _count: { _all: true }
    }),
    prisma.client.groupBy({
      by: ['leadSource'],
      where: { isActive: true, leadSource: { not: null } },
      _count: { _all: true }
    }),
    // Get last 12 months of client creation
    prisma.$queryRaw`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as count
      FROM clients 
      WHERE is_active = 1 
        AND created_at >= date('now', '-12 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month
    `
  ])

  return {
    overview: {
      totalClients,
      newClientsThisMonth,
      activeClients,
      vipClients,
      conversionRate: totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0
    },
    distributions: {
      status: statusDistribution.map(item => ({
        status: item.status,
        count: item._count._all
      })),
      stage: stageDistribution.map(item => ({
        stage: item.stage,
        count: item._count._all
      })),
      leadSource: leadSourceDistribution.map(item => ({
        source: item.leadSource,
        count: item._count._all
      }))
    },
    monthlyGrowth
  }
}

// Update client lead score
export async function updateClientLeadScore(id: string): Promise<number> {
  const client = await prisma.client.findUnique({ where: { id } })
  if (!client) {
    throw new NotFoundError('Client', id)
  }

  const newScore = calculateLeadScore(client)
  
  await prisma.client.update({
    where: { id },
    data: { leadScore: newScore }
  })

  return newScore
}