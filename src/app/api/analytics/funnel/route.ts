import { NextRequest, NextResponse } from 'next/server'
import { getLeadFunnelAnalysis } from '@/lib/api/analytics'
import { withErrorHandling, createSuccessResponse } from '@/lib/api/utils'

// GET /api/analytics/funnel - Get lead funnel analysis
export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  
  const filters = {
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined
  }
  
  const funnelAnalysis = await getLeadFunnelAnalysis(filters)
  
  return NextResponse.json(
    createSuccessResponse(funnelAnalysis),
    { status: 200 }
  )
})