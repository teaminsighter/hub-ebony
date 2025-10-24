import { NextRequest, NextResponse } from 'next/server'
import { getLeadAnalytics } from '@/lib/api/analytics'
import { withErrorHandling, createSuccessResponse } from '@/lib/api/utils'

// GET /api/analytics/leads - Get lead analytics with filters
export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  
  const filters = {
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
    utmSource: searchParams.get('utmSource') || undefined,
    utmMedium: searchParams.get('utmMedium') || undefined,
    utmCampaign: searchParams.get('utmCampaign') || undefined,
    leadStatus: searchParams.get('leadStatus') || undefined,
    isRepeatLead: searchParams.get('isRepeatLead') === 'true' ? true : 
                  searchParams.get('isRepeatLead') === 'false' ? false : undefined,
    device: searchParams.get('device') || undefined,
    country: searchParams.get('country') || undefined
  }
  
  const analytics = await getLeadAnalytics(filters)
  
  return NextResponse.json(
    createSuccessResponse(analytics),
    { status: 200 }
  )
})