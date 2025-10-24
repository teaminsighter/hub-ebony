import { NextRequest, NextResponse } from 'next/server'
import { trackPageView } from '@/lib/api/analytics'
import { withErrorHandling, createSuccessResponse } from '@/lib/api/utils'

// POST /api/analytics/page-exit - Track page exit (for sendBeacon)
export const POST = withErrorHandling(async (request: NextRequest) => {
  const body = await request.text()
  
  try {
    const data = JSON.parse(body)
    
    // Update the last page view with exit data
    await trackPageView({
      sessionId: data.sessionId,
      page: data.page,
      timeOnPage: data.timeOnPage,
      scrollDepth: data.scrollDepth,
      exitPage: true
    })
    
    return NextResponse.json(
      createSuccessResponse({ message: 'Page exit tracked' }),
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      createSuccessResponse({ message: 'Page exit received' }),
      { status: 200 }
    )
  }
})