import { NextRequest, NextResponse } from 'next/server'
import { trackPageView } from '@/lib/api/analytics'
import { withErrorHandling, parseBody, createSuccessResponse } from '@/lib/api/utils'
import { z } from 'zod'

const PageViewSchema = z.object({
  sessionId: z.string(),
  userId: z.string().optional(),
  page: z.string(),
  pageTitle: z.string().optional(),
  referrer: z.string().optional(),
  timeOnPage: z.number().optional(),
  scrollDepth: z.number().optional(),
  exitPage: z.boolean().optional(),
  loadTime: z.number().optional(),
  domContentLoaded: z.number().optional(),
  firstPaint: z.number().optional()
})

// POST /api/analytics/pageview - Track page view
export const POST = withErrorHandling(async (request: NextRequest) => {
  const data = await parseBody(request, PageViewSchema)
  const pageView = await trackPageView(data)
  
  return NextResponse.json(
    createSuccessResponse(pageView),
    { status: 201 }
  )
})