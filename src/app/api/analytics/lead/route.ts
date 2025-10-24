import { NextRequest, NextResponse } from 'next/server'
import { createLead } from '@/lib/api/analytics'
import { withErrorHandling, parseBody, createSuccessResponse } from '@/lib/api/utils'
import { z } from 'zod'

const LeadSchema = z.object({
  sessionId: z.string().optional(),
  formType: z.string(),
  formData: z.record(z.any()),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
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

// POST /api/analytics/lead - Create lead with attribution
export const POST = withErrorHandling(async (request: NextRequest) => {
  const data = await parseBody(request, LeadSchema)
  const lead = await createLead(data)
  
  return NextResponse.json(
    createSuccessResponse(lead),
    { status: 201 }
  )
})