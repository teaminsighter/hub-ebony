import { NextRequest, NextResponse } from 'next/server'
import { getDropOffAnalysis } from '@/lib/api/analytics'
import { withErrorHandling, createSuccessResponse } from '@/lib/api/utils'

// GET /api/analytics/dropoff - Get drop-off analysis
export const GET = withErrorHandling(async (request: NextRequest) => {
  const dropOffAnalysis = await getDropOffAnalysis()
  
  return NextResponse.json(
    createSuccessResponse(dropOffAnalysis),
    { status: 200 }
  )
})