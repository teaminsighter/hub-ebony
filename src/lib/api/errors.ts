import { ZodError } from 'zod'
import { Prisma } from '@/generated/prisma'

export class APIError extends Error {
  public statusCode: number
  public code: string

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.name = 'APIError'
  }
}

export class ValidationError extends APIError {
  public errors: Record<string, string[]>

  constructor(errors: Record<string, string[]>) {
    super('Validation failed', 400, 'VALIDATION_ERROR')
    this.errors = errors
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`
    super(message, 404, 'NOT_FOUND')
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

export class ForbiddenError extends APIError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN')
  }
}

export class ConflictError extends APIError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT')
  }
}

export class TooManyRequestsError extends APIError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'TOO_MANY_REQUESTS')
  }
}

export function handlePrismaError(error: unknown): APIError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ConflictError(`A record with this ${error.meta?.target} already exists`)
      case 'P2025':
        return new NotFoundError('Record')
      case 'P2003':
        return new APIError('Foreign key constraint violation', 400, 'FOREIGN_KEY_ERROR')
      case 'P2014':
        return new APIError('Invalid ID provided', 400, 'INVALID_ID')
      default:
        return new APIError('Database operation failed', 500, 'DATABASE_ERROR')
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ValidationError({ database: ['Invalid data provided to database'] })
  }

  if (error instanceof ZodError) {
    const errors: Record<string, string[]> = {}
    error.errors.forEach((err) => {
      const path = err.path.join('.')
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(err.message)
    })
    return new ValidationError(errors)
  }

  if (error instanceof APIError) {
    return error
  }

  return new APIError('Internal server error', 500, 'INTERNAL_ERROR')
}

export function formatErrorResponse(error: APIError) {
  const response = {
    success: false,
    error: error.message,
    code: error.code,
    timestamp: new Date().toISOString(),
    ...(error instanceof ValidationError && { errors: error.errors })
  }

  return {
    response,
    status: error.statusCode
  }
}

// Error logging utility
export function logError(error: unknown, context?: Record<string, any>) {
  const errorData = {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString(),
  }

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', errorData)
  }

  // In production, you would send this to your logging service
  // Example: sendToLoggingService(errorData)
}

// Helper to create standardized error responses
export function createErrorResponse(error: unknown, context?: Record<string, any>) {
  logError(error, context)
  const apiError = handlePrismaError(error)
  return formatErrorResponse(apiError)
}