import { NextRequest, NextResponse } from 'next/server'
import { getRealtimeAnalytics } from '@/lib/api/analytics'
import { withErrorHandling, createSuccessResponse } from '@/lib/api/utils'

// GET /api/analytics/realtime - Get real-time analytics
export const GET = withErrorHandling(async (request: NextRequest) => {
  const realtimeData = await getRealtimeAnalytics()
  
  return NextResponse.json(
    createSuccessResponse(realtimeData),
    { status: 200 }
  )
})