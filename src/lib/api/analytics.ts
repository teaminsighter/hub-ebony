import { prisma } from '@/lib/prisma'
import { parseJSONField } from './utils'

// Lead Session Management
export async function createOrUpdateSession(data: {
  sessionId: string
  userId?: string
  ipAddress?: string
  userAgent?: string
  country?: string
  city?: string
  region?: string
  timezone?: string
  device?: 'DESKTOP' | 'MOBILE' | 'TABLET' | 'OTHER'
  browser?: string
  os?: string
  screenResolution?: string
  language?: string
  referrer?: string
  landingPage?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  ttclid?: string
  twclid?: string
  liclid?: string
  snapclid?: string
  pinclid?: string
  yclid?: string
  customClickId?: string
}) {
  const existingSession = await prisma.leadSession.findUnique({
    where: { sessionId: data.sessionId }
  })

  if (existingSession) {
    return await prisma.leadSession.update({
      where: { sessionId: data.sessionId },
      data: {
        ...data,
        pageViews: { increment: 1 },
        updatedAt: new Date()
      }
    })
  }

  return await prisma.leadSession.create({
    data: {
      ...data,
      isNewSession: true,
      pageViews: 1
    }
  })
}

// Page View Tracking
export async function trackPageView(data: {
  sessionId: string
  userId?: string
  page: string
  pageTitle?: string
  referrer?: string
  timeOnPage?: number
  scrollDepth?: number
  exitPage?: boolean
  loadTime?: number
  domContentLoaded?: number
  firstPaint?: number
}) {
  const pageView = await prisma.pageView.create({
    data
  })

  // Update session page view count
  await prisma.leadSession.update({
    where: { sessionId: data.sessionId },
    data: { pageViews: { increment: 1 } }
  })

  return pageView
}

// Event Tracking
export async function trackEvent(data: {
  sessionId: string
  userId?: string
  eventName: string
  eventCategory: 'ENGAGEMENT' | 'CONVERSION' | 'NAVIGATION' | 'FORM_INTERACTION' | 'MEDIA_INTERACTION' | 'DOWNLOAD' | 'SOCIAL' | 'ERROR' | 'CUSTOM'
  eventAction?: string
  eventLabel?: string
  eventValue?: number
  page: string
  element?: string
  elementText?: string
  elementId?: string
  elementClass?: string
  coordinates?: string
  customData?: any
}) {
  const event = await prisma.userEvent.create({
    data: {
      ...data,
      customData: data.customData ? JSON.stringify(data.customData) : null
    }
  })

  // Update session events count
  await prisma.leadSession.update({
    where: { sessionId: data.sessionId },
    data: { events: { increment: 1 } }
  })

  return event
}

// Lead Creation with Attribution
export async function createLead(data: {
  sessionId?: string
  formType: string
  formData: any
  name?: string
  email?: string
  phone?: string
  company?: string
  message?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  ttclid?: string
  twclid?: string
  liclid?: string
  snapclid?: string
  pinclid?: string
  yclid?: string
  customClickId?: string
}) {
  let session = null
  let behavioralData = {
    pagesVisited: 0,
    timeOnSite: 0,
    eventsTriggered: 0,
    visitsBeforeConversion: 1
  }

  if (data.sessionId) {
    session = await prisma.leadSession.findUnique({
      where: { sessionId: data.sessionId },
      include: {
        sessionPageViews: true,
        sessionEvents: true
      }
    })

    if (session) {
      behavioralData = {
        pagesVisited: session.sessionPageViews.length,
        timeOnSite: session.totalDuration || 0,
        eventsTriggered: session.sessionEvents.length,
        visitsBeforeConversion: 1 // Will be updated if repeat lead
      }
    }
  }

  // Check for repeat leads
  let isRepeatLead = false
  let originalLeadId = null
  let previousLeadCount = 0

  if (data.email) {
    const existingLeads = await prisma.lead.findMany({
      where: { email: data.email },
      orderBy: { createdAt: 'asc' }
    })

    if (existingLeads.length > 0) {
      isRepeatLead = true
      originalLeadId = existingLeads[0].id
      previousLeadCount = existingLeads.length
    }
  }

  // Create attribution data
  const attribution = await createLeadAttribution(data, session)

  const lead = await prisma.lead.create({
    data: {
      sessionId: data.sessionId,
      formType: data.formType,
      formData: JSON.stringify(data.formData),
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      utmSource: data.utmSource || session?.utmSource,
      utmMedium: data.utmMedium || session?.utmMedium,
      utmCampaign: data.utmCampaign || session?.utmCampaign,
      utmTerm: data.utmTerm || session?.utmTerm,
      utmContent: data.utmContent || session?.utmContent,
      gclid: data.gclid || session?.gclid,
      fbclid: data.fbclid || session?.fbclid,
      msclkid: data.msclkid || session?.msclkid,
      ttclid: data.ttclid || session?.ttclid,
      twclid: data.twclid || session?.twclid,
      liclid: data.liclid || session?.liclid,
      snapclid: data.snapclid || session?.snapclid,
      pinclid: data.pinclid || session?.pinclid,
      yclid: data.yclid || session?.yclid,
      customClickId: data.customClickId || session?.customClickId,
      originalSource: attribution.originalSource,
      lastSource: attribution.lastSource,
      allSources: JSON.stringify(attribution.allSources),
      leadScore: calculateLeadScore(data, behavioralData),
      isRepeatLead,
      originalLeadId,
      previousLeadCount,
      ...behavioralData,
      firstVisit: session?.sessionStart,
      lastVisit: session?.sessionStart,
    }
  })

  // Mark session as converted
  if (data.sessionId) {
    await prisma.leadSession.update({
      where: { sessionId: data.sessionId },
      data: { 
        isConverted: true,
        conversionValue: 1 // Base conversion value
      }
    })
  }

  // Create touchpoints
  await createLeadTouchpoints(lead.id, session, attribution)

  return lead
}

// Lead Attribution Logic
async function createLeadAttribution(data: any, session: any) {
  const sources = []
  
  // Current session attribution
  if (session?.utmSource || data.utmSource) {
    sources.push({
      source: data.utmSource || session.utmSource,
      medium: data.utmMedium || session.utmMedium,
      campaign: data.utmCampaign || session.utmCampaign,
      timestamp: new Date()
    })
  }

  // Determine original and last source
  const originalSource = sources.length > 0 ? sources[0].source : 'direct'
  const lastSource = sources.length > 0 ? sources[sources.length - 1].source : 'direct'

  return {
    originalSource,
    lastSource,
    allSources: sources
  }
}

// Create Lead Touchpoints
async function createLeadTouchpoints(leadId: string, session: any, attribution: any) {
  if (!session || attribution.allSources.length === 0) return

  const touchpoints = attribution.allSources.map((source: any, index: number) => ({
    leadId,
    sessionId: session.sessionId,
    touchpointType: index === 0 ? 'FIRST_TOUCH' : 
                   index === attribution.allSources.length - 1 ? 'CONVERSION_TOUCH' : 'MIDDLE_TOUCH',
    channel: determineChannel(source.medium),
    source: source.source,
    medium: source.medium,
    campaign: source.campaign,
    timestamp: source.timestamp,
    attribution: 'FIRST_TOUCH', // Default attribution model
    weight: index === 0 ? 1.0 : 0.5 // First touch gets full weight
  }))

  await prisma.leadTouchpoint.createMany({
    data: touchpoints
  })
}

// Determine channel from medium
function determineChannel(medium?: string): string {
  if (!medium) return 'direct'
  
  const channelMap: Record<string, string> = {
    'cpc': 'paid',
    'ppc': 'paid',
    'display': 'paid',
    'social': 'social',
    'email': 'email',
    'organic': 'organic',
    'referral': 'referral'
  }

  return channelMap[medium.toLowerCase()] || 'other'
}

// Lead Scoring Algorithm
function calculateLeadScore(data: any, behavioral: any): number {
  let score = 0

  // Contact information completeness
  if (data.name) score += 10
  if (data.email) score += 20
  if (data.phone) score += 15
  if (data.company) score += 10

  // Behavioral signals
  score += Math.min(behavioral.pagesVisited * 3, 30) // Max 30 points
  score += Math.min(behavioral.timeOnSite / 60 * 2, 20) // Max 20 points (time in minutes)
  score += Math.min(behavioral.eventsTriggered * 2, 20) // Max 20 points

  // UTM/Source quality
  if (data.utmSource === 'google') score += 10
  if (data.utmMedium === 'cpc') score += 5
  if (data.gclid) score += 5

  // Form type value
  const formScores: Record<string, number> = {
    'consultation': 25,
    'property_interest': 20,
    'contact': 15,
    'newsletter': 5
  }
  score += formScores[data.formType] || 10

  return Math.min(score, 100) // Cap at 100
}

// Analytics Queries
export async function getLeadAnalytics(filters: {
  startDate?: Date
  endDate?: Date
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  leadStatus?: string
  isRepeatLead?: boolean
  device?: string
  country?: string
}) {
  const where: any = {}
  
  if (filters.startDate || filters.endDate) {
    where.createdAt = {}
    if (filters.startDate) where.createdAt.gte = filters.startDate
    if (filters.endDate) where.createdAt.lte = filters.endDate
  }

  if (filters.utmSource) where.utmSource = filters.utmSource
  if (filters.utmMedium) where.utmMedium = filters.utmMedium
  if (filters.utmCampaign) where.utmCampaign = filters.utmCampaign
  if (filters.leadStatus) where.leadStatus = filters.leadStatus
  if (filters.isRepeatLead !== undefined) where.isRepeatLead = filters.isRepeatLead

  const [leads, totalLeads, conversionRate, avgLeadScore] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        session: {
          select: {
            device: true,
            country: true,
            browser: true,
            sessionStart: true,
            totalDuration: true
          }
        },
        touchpoints: true,
        activities: true
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.lead.count({ where }),
    prisma.leadSession.aggregate({
      where: {
        leads: { some: where }
      },
      _avg: { isConverted: true }
    }),
    prisma.lead.aggregate({
      where,
      _avg: { leadScore: true }
    })
  ])

  // Group by sources
  const sourceAnalysis = await prisma.lead.groupBy({
    by: ['utmSource'],
    where,
    _count: { _all: true },
    _avg: { leadScore: true }
  })

  // Group by campaigns
  const campaignAnalysis = await prisma.lead.groupBy({
    by: ['utmCampaign'],
    where,
    _count: { _all: true },
    _avg: { leadScore: true }
  })

  return {
    leads,
    totalLeads,
    conversionRate: conversionRate._avg.isConverted || 0,
    avgLeadScore: avgLeadScore._avg.leadScore || 0,
    sourceAnalysis,
    campaignAnalysis
  }
}

// Get Lead Funnel Analysis
export async function getLeadFunnelAnalysis(filters: any) {
  const [
    totalSessions,
    convertedSessions,
    repeatLeads,
    qualifiedLeads,
    closedLeads
  ] = await Promise.all([
    prisma.leadSession.count(),
    prisma.leadSession.count({ where: { isConverted: true } }),
    prisma.lead.count({ where: { isRepeatLead: true } }),
    prisma.lead.count({ where: { isQualified: true } }),
    prisma.lead.count({ where: { leadStatus: 'CONVERTED' } })
  ])

  return {
    totalSessions,
    convertedSessions,
    conversionRate: totalSessions > 0 ? (convertedSessions / totalSessions) * 100 : 0,
    repeatLeadRate: convertedSessions > 0 ? (repeatLeads / convertedSessions) * 100 : 0,
    qualificationRate: convertedSessions > 0 ? (qualifiedLeads / convertedSessions) * 100 : 0,
    closingRate: qualifiedLeads > 0 ? (closedLeads / qualifiedLeads) * 100 : 0
  }
}

// Drop-off Analysis
export async function getDropOffAnalysis() {
  // Analyze where users drop off in the funnel
  const pageExits = await prisma.pageView.groupBy({
    by: ['page'],
    where: { exitPage: true },
    _count: { _all: true }
  })

  // Bounce rate by page
  const bounceAnalysis = await prisma.pageView.groupBy({
    by: ['page'],
    where: { bounced: true },
    _count: { _all: true }
  })

  // Form abandonment
  const formAbandonment = await prisma.userEvent.groupBy({
    by: ['page'],
    where: {
      eventCategory: 'FORM_INTERACTION',
      eventAction: 'form_start'
    },
    _count: { _all: true }
  })

  return {
    pageExits,
    bounceAnalysis,
    formAbandonment
  }
}

// Real-time Lead Tracking
export async function getRealtimeAnalytics() {
  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

  const [activeSessions, recentLeads, recentEvents] = await Promise.all([
    prisma.leadSession.count({
      where: {
        sessionStart: { gte: oneHourAgo },
        sessionEnd: null
      }
    }),
    prisma.lead.count({
      where: { createdAt: { gte: oneHourAgo } }
    }),
    prisma.userEvent.count({
      where: { timestamp: { gte: oneHourAgo } }
    })
  ])

  return {
    activeSessions,
    recentLeads,
    recentEvents,
    timestamp: now
  }
}