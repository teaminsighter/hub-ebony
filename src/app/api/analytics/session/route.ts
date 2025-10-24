import { NextRequest, NextResponse } from 'next/server'
import { createOrUpdateSession } from '@/lib/api/analytics'
import { withErrorHandling, parseBody, createSuccessResponse } from '@/lib/api/utils'
import { z } from 'zod'

const SessionSchema = z.object({
  sessionId: z.string(),
  userId: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  timezone: z.string().optional(),
  device: z.enum(['DESKTOP', 'MOBILE', 'TABLET', 'OTHER']).optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  screenResolution: z.string().optional(),
  language: z.string().optional(),
  referrer: z.string().optional(),
  landingPage: z.string().optional(),
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
  utmTerm: z.string().nullable().optional(),
  utmContent: z.string().nullable().optional(),
  gclid: z.string().nullable().optional(),
  fbclid: z.string().nullable().optional(),
  msclkid: z.string().nullable().optional(),
  ttclid: z.string().nullable().optional(),
  twclid: z.string().nullable().optional(),
  liclid: z.string().nullable().optional(),
  snapclid: z.string().nullable().optional(),
  pinclid: z.string().nullable().optional(),
  yclid: z.string().nullable().optional(),
  customClickId: z.string().nullable().optional()
})

const SessionUpdateSchema = z.object({
  sessionId: z.string(),
  userId: z.string()
})

// POST /api/analytics/session - Create or update session
export const POST = withErrorHandling(async (request: NextRequest) => {
  const data = await parseBody(request, SessionSchema)
  const session = await createOrUpdateSession(data)
  
  return NextResponse.json(
    createSuccessResponse(session),
    { status: 200 }
  )
})

// PATCH /api/analytics/session - Update session with user ID
export const PATCH = withErrorHandling(async (request: NextRequest) => {
  const data = await parseBody(request, SessionUpdateSchema)
  const session = await createOrUpdateSession(data)
  
  return NextResponse.json(
    createSuccessResponse(session),
    { status: 200 }
  )
})