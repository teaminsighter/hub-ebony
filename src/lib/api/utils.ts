import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { APIResponse, Pagination } from './types'
import { handlePrismaError, logError } from './errors'

// Create standardized success response
export function createSuccessResponse<T>(
  data: T,
  pagination?: Pagination
): APIResponse<T> {
  return {
    success: true,
    data,
    pagination,
    timestamp: new Date().toISOString(),
  }
}

// Create standardized error response
export function createErrorResponse(message: string, code?: string): APIResponse<never> {
  return {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  }
}

// Parse and validate query parameters
export function parseQuery<T extends z.ZodTypeAny>(
  request: NextRequest,
  schema: T
): z.infer<T> {
  const url = new URL(request.url)
  const params: Record<string, any> = {}

  // Convert URLSearchParams to object
  for (const [key, value] of url.searchParams.entries()) {
    // Handle numeric values
    if (!isNaN(Number(value)) && value !== '') {
      params[key] = Number(value)
    }
    // Handle boolean values
    else if (value === 'true' || value === 'false') {
      params[key] = value === 'true'
    }
    // Handle array values (comma-separated)
    else if (value.includes(',')) {
      params[key] = value.split(',').map(v => v.trim())
    }
    // Handle regular string values
    else {
      params[key] = value
    }
  }

  return schema.parse(params)
}

// Parse and validate request body
export async function parseBody<T extends z.ZodTypeAny>(
  request: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  try {
    const body = await request.json()
    return schema.parse(body)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON in request body')
    }
    throw error
  }
}

// Calculate pagination metadata
export function calculatePagination(
  page: number,
  limit: number,
  total: number
): Pagination {
  const totalPages = Math.ceil(total / limit)
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

// Generate Prisma skip/take for pagination
export function getPaginationParams(page: number, limit: number) {
  return {
    skip: (page - 1) * limit,
    take: limit,
  }
}

// Standardized API route handler wrapper
export function withErrorHandling<T = any>(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse<APIResponse<T>>>
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse<APIResponse<T>>> => {
    try {
      return await handler(request, context)
    } catch (error) {
      logError(error, { url: request.url, method: request.method })
      const apiError = handlePrismaError(error)
      
      return NextResponse.json(
        createErrorResponse(apiError.message, apiError.code),
        { status: apiError.statusCode }
      )
    }
  }
}

// Format money values
export function formatMoney(
  amount: number,
  currency: string = 'AED',
  locale: string = 'en-AE'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format percentage
export function formatPercentage(
  value: number,
  decimals: number = 1
): string {
  return `${value.toFixed(decimals)}%`
}

// Generate search conditions for Prisma
export function generateSearchConditions(
  search: string,
  fields: string[]
): any {
  if (!search || !search.trim()) {
    return {}
  }

  const searchTerm = search.trim()
  
  return {
    OR: fields.map(field => ({
      [field]: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }))
  }
}

// Generate sort conditions for Prisma
export function generateSortConditions(
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'desc'
): any {
  if (!sortBy) {
    return { createdAt: 'desc' }
  }

  return { [sortBy]: sortOrder }
}

// Validate file upload
export function validateFileUpload(
  file: File,
  maxSize: number = 10 * 1024 * 1024, // 10MB default
  allowedTypes: string[] = ['image/*', 'application/pdf']
): { valid: boolean; error?: string } {
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${maxSize / (1024 * 1024)}MB`
    }
  }

  const isAllowedType = allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.replace('/*', ''))
    }
    return file.type === type
  })

  if (!isAllowedType) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`
    }
  }

  return { valid: true }
}

// Generate unique filename
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2)
  const extension = originalName.split('.').pop()
  return `${timestamp}-${random}.${extension}`
}

// Convert Prisma record to API response format
export function formatRecord<T extends Record<string, any>>(
  record: T,
  excludeFields: string[] = ['password']
): Omit<T, typeof excludeFields[number]> {
  const formatted = { ...record }
  
  excludeFields.forEach(field => {
    delete formatted[field]
  })

  // Convert dates to ISO strings
  Object.keys(formatted).forEach(key => {
    if (formatted[key] instanceof Date) {
      formatted[key] = formatted[key].toISOString()
    }
  })

  return formatted
}

// Validate and parse JSON string fields
export function parseJSONField<T>(
  value: string | null | undefined,
  fallback: T
): T {
  if (!value) return fallback
  
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

// Rate limiting helper (simple in-memory implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const window = requestCounts.get(identifier)

  if (!window || now > window.resetTime) {
    // Reset or initialize window
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: now + windowMs
    }
  }

  window.count++

  if (window.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: window.resetTime
    }
  }

  return {
    allowed: true,
    remaining: limit - window.count,
    resetTime: window.resetTime
  }
}

// Cleanup expired rate limit entries
setInterval(() => {
  const now = Date.now()
  for (const [key, window] of requestCounts.entries()) {
    if (now > window.resetTime) {
      requestCounts.delete(key)
    }
  }
}, 5 * 60 * 1000) // Clean up every 5 minutes