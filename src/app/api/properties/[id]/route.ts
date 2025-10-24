import { NextRequest, NextResponse } from 'next/server'
import { PropertyUpdateSchema, createSuccessResponse } from '@/lib/api/types'
import { getPropertyById, updateProperty, deleteProperty } from '@/lib/api/properties'
import { withErrorHandling, parseBody } from '@/lib/api/utils'

// GET /api/properties/[id] - Get single property
export const GET = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const property = await getPropertyById(params.id)
  
  return NextResponse.json(
    createSuccessResponse(property),
    { status: 200 }
  )
})

// PATCH /api/properties/[id] - Update property
export const PATCH = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const data = await parseBody(request, PropertyUpdateSchema)
  const property = await updateProperty(params.id, data)
  
  return NextResponse.json(
    createSuccessResponse(property),
    { status: 200 }
  )
})

// DELETE /api/properties/[id] - Soft delete property
export const DELETE = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await deleteProperty(params.id)
  
  return NextResponse.json(
    createSuccessResponse({ message: 'Property deleted successfully' }),
    { status: 200 }
  )
})