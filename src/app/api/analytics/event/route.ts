import { NextRequest, NextResponse } from 'next/server'
import { trackEvent } from '@/lib/api/analytics'
import { withErrorHandling, parseBody, createSuccessResponse } from '@/lib/api/utils'
import { z } from 'zod'

const EventSchema = z.object({
  sessionId: z.string(),
  userId: z.string().optional(),
  event: z.string(),
  eventCategory: z.enum(['ENGAGEMENT', 'CONVERSION', 'NAVIGATION', 'FORM_INTERACTION', 'MEDIA_INTERACTION', 'DOWNLOAD', 'SOCIAL', 'ERROR', 'CUSTOM']).optional(),
  eventAction: z.string().optional(),
  eventLabel: z.string().optional(),
  eventValue: z.number().optional(),
  page: z.string(),
  element: z.string().optional(),
  elementText: z.string().optional(),
  elementId: z.string().optional(),
  elementClass: z.string().optional(),
  coordinates: z.string().optional(),
  customData: z.record(z.any()).optional()
})

// POST /api/analytics/event - Track event
export const POST = withErrorHandling(async (request: NextRequest) => {
  const data = await parseBody(request, EventSchema)
  const event = await trackEvent({
    ...data,
    eventName: data.event
  })
  
  return NextResponse.json(
    createSuccessResponse(event),
    { status: 201 }
  )
})