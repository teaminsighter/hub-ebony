import { NextRequest, NextResponse } from 'next/server'
import { PropertyQuerySchema, PropertyCreateSchema, createSuccessResponse } from '@/lib/api/types'
import { getProperties, createProperty } from '@/lib/api/properties'
import { withErrorHandling, parseQuery, parseBody } from '@/lib/api/utils'

// GET /api/properties - Get properties with filtering and pagination
export const GET = withErrorHandling(async (request: NextRequest) => {
  // Parse and validate query parameters
  const query = parseQuery(request, PropertyQuerySchema)
  
  // Get properties using the service layer
  const result = await getProperties(query)
  
  // Return paginated response
  return NextResponse.json(
    createSuccessResponse(result.properties, result.pagination),
    { status: 200 }
  )
})

// POST /api/properties - Create new property
export const POST = withErrorHandling(async (request: NextRequest) => {
  // Parse and validate request body
  const data = await parseBody(request, PropertyCreateSchema)
  
  // Create property using the service layer
  const property = await createProperty(data)
  
  // Return success response
  return NextResponse.json(
    createSuccessResponse(property),
    { status: 201 }
  )
})