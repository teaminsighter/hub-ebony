import { z } from 'zod'
import type { 
  PropertyType, 
  PropertyStatus, 
  FurnishingType,
  ClientStatus,
  ClientStage,
  InvestmentBudget,
  RiskTolerance,
  InvestmentGoal,
  LeadSource,
  ClientPriority,
  InvestmentType,
  InvestmentStatusEnum,
  InvestmentStage,
  TransactionType,
  TransactionStatus,
  PaymentMethod,
  TourStatus,
  TourType,
  InteractionType,
  CommunicationChannel,
  DocumentType
} from '@/generated/prisma'

// Base validation schemas
export const IdSchema = z.string().cuid()
export const EmailSchema = z.string().email()
export const PhoneSchema = z.string().min(7).max(20)
export const CurrencySchema = z.enum(['AED', 'USD', 'EUR', 'GBP'])

// Property Area Schemas
export const PropertyAreaCreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  avgPrice: z.number().positive().optional(),
  avgPricePerSqft: z.number().positive().optional(),
  priceGrowth: z.number().optional(),
  rentalYield: z.number().min(0).max(100).optional(),
  popularity: z.number().int().min(0).max(100).optional(),
  coordinates: z.string().optional(), // JSON string
  amenities: z.array(z.string()).optional(),
  transport: z.array(z.string()).optional(),
})

export const PropertyAreaUpdateSchema = PropertyAreaCreateSchema.partial()

// Developer Schemas
export const DeveloperCreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  phone: PhoneSchema.optional(),
  email: EmailSchema.optional(),
  rating: z.number().min(0).max(5).optional(),
  totalProjects: z.number().int().min(0).optional(),
  established: z.string().datetime().optional(),
  headquarters: z.string().optional(),
  specialties: z.array(z.string()).optional(),
})

export const DeveloperUpdateSchema = DeveloperCreateSchema.partial()

// Property Schemas
export const PropertyCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  areaId: IdSchema.optional(),
  developerId: IdSchema.optional(),
  propertyType: z.nativeEnum(PropertyType),
  subType: z.string().optional(),
  bedrooms: z.number().int().min(0).max(20).optional(),
  bathrooms: z.number().min(0).max(20).optional(),
  sqft: z.number().positive().optional(),
  sqftBalcony: z.number().positive().optional(),
  price: z.number().positive(),
  pricePerSqft: z.number().positive().optional(),
  currency: CurrencySchema,
  roi: z.number().min(0).max(100).optional(),
  rentalYield: z.number().min(0).max(100).optional(),
  serviceCharge: z.number().min(0).optional(),
  paymentPlan: z.object({
    bookingFee: z.number().optional(),
    downPayment: z.number().optional(),
    installments: z.array(z.object({
      amount: z.number(),
      dueDate: z.string().datetime(),
      description: z.string().optional()
    })).optional()
  }).optional(),
  completionDate: z.string().datetime().optional(),
  handoverDate: z.string().datetime().optional(),
  floor: z.number().int().min(0).max(200).optional(),
  parking: z.number().int().min(0).max(10).optional(),
  view: z.string().optional(),
  furnishing: z.nativeEnum(FurnishingType),
  images: z.array(z.string().url()).optional(),
  floorPlan: z.string().url().optional(),
  features: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  address: z.string().optional(),
  status: z.nativeEnum(PropertyStatus),
  isFeatured: z.boolean().optional(),
  priority: z.number().int().min(0).max(100).optional(),
})

export const PropertyUpdateSchema = PropertyCreateSchema.partial()

export const PropertyQuerySchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(20),
  search: z.string().optional(),
  areaId: IdSchema.optional(),
  developerId: IdSchema.optional(),
  propertyType: z.nativeEnum(PropertyType).optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  minBedrooms: z.number().int().min(0).optional(),
  maxBedrooms: z.number().int().max(20).optional(),
  minSqft: z.number().positive().optional(),
  maxSqft: z.number().positive().optional(),
  furnishing: z.nativeEnum(FurnishingType).optional(),
  status: z.nativeEnum(PropertyStatus).optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z.enum(['price', 'pricePerSqft', 'sqft', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
})

// Client Schemas
export const ClientCreateSchema = z.object({
  name: z.string().min(1).max(100),
  email: EmailSchema,
  phone: PhoneSchema.optional(),
  whatsapp: PhoneSchema.optional(),
  company: z.string().optional(),
  nationality: z.string().optional(),
  residenceCountry: z.string().optional(),
  profession: z.string().optional(),
  investmentBudget: z.nativeEnum(InvestmentBudget).optional(),
  minBudget: z.number().positive().optional(),
  maxBudget: z.number().positive().optional(),
  preferredAreas: z.array(IdSchema).optional(),
  riskTolerance: z.nativeEnum(RiskTolerance).optional(),
  investmentGoal: z.nativeEnum(InvestmentGoal).optional(),
  timeframe: z.string().optional(),
  leadSource: z.nativeEnum(LeadSource).optional(),
  priority: z.nativeEnum(ClientPriority).optional(),
  status: z.nativeEnum(ClientStatus).optional(),
  stage: z.nativeEnum(ClientStage).optional(),
  assignedTo: IdSchema.optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  nextFollowUp: z.string().datetime().optional(),
  communicationPreference: z.enum(['EMAIL', 'PHONE', 'WHATSAPP']).optional(),
  timezone: z.string().optional(),
})

export const ClientUpdateSchema = ClientCreateSchema.partial()

export const ClientQuerySchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(20),
  search: z.string().optional(),
  status: z.nativeEnum(ClientStatus).optional(),
  stage: z.nativeEnum(ClientStage).optional(),
  priority: z.nativeEnum(ClientPriority).optional(),
  leadSource: z.nativeEnum(LeadSource).optional(),
  assignedTo: IdSchema.optional(),
  investmentBudget: z.nativeEnum(InvestmentBudget).optional(),
  riskTolerance: z.nativeEnum(RiskTolerance).optional(),
  investmentGoal: z.nativeEnum(InvestmentGoal).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
  sortBy: z.enum(['name', 'email', 'leadScore', 'createdAt', 'updatedAt', 'lastContact']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
})

// Investment Schemas
export const InvestmentCreateSchema = z.object({
  clientId: IdSchema,
  propertyId: IdSchema,
  amount: z.number().positive(),
  currency: CurrencySchema,
  investmentType: z.nativeEnum(InvestmentType),
  investmentDate: z.string().datetime(),
  expectedROI: z.number().min(0).max(100).optional(),
  paymentSchedule: z.array(z.object({
    type: z.nativeEnum(TransactionType),
    amount: z.number().positive(),
    dueDate: z.string().datetime(),
    description: z.string().optional()
  })).optional(),
  notes: z.string().optional(),
})

export const InvestmentUpdateSchema = z.object({
  amount: z.number().positive().optional(),
  status: z.nativeEnum(InvestmentStatusEnum).optional(),
  stage: z.nativeEnum(InvestmentStage).optional(),
  actualROI: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
})

// Transaction Schemas
export const TransactionCreateSchema = z.object({
  investmentId: IdSchema,
  type: z.nativeEnum(TransactionType),
  amount: z.number().positive(),
  currency: CurrencySchema,
  description: z.string().optional(),
  reference: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  method: z.nativeEnum(PaymentMethod).optional(),
})

export const TransactionUpdateSchema = z.object({
  status: z.nativeEnum(TransactionStatus).optional(),
  paidDate: z.string().datetime().optional(),
  method: z.nativeEnum(PaymentMethod).optional(),
  receipt: z.string().url().optional(),
})

// Property Tour Schemas
export const PropertyTourCreateSchema = z.object({
  clientId: IdSchema,
  propertyId: IdSchema,
  scheduledAt: z.string().datetime(),
  duration: z.number().int().min(15).max(240).optional(),
  type: z.nativeEnum(TourType),
  attendees: z.number().int().min(1).max(10).optional(),
})

export const PropertyTourUpdateSchema = z.object({
  scheduledAt: z.string().datetime().optional(),
  status: z.nativeEnum(TourStatus).optional(),
  feedback: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  interested: z.boolean().optional(),
  followUp: z.boolean().optional(),
  notes: z.string().optional(),
})

// Client Interaction Schemas
export const ClientInteractionCreateSchema = z.object({
  clientId: IdSchema,
  type: z.nativeEnum(InteractionType),
  channel: z.nativeEnum(CommunicationChannel),
  subject: z.string().optional(),
  content: z.string().optional(),
  direction: z.enum(['INBOUND', 'OUTBOUND']),
  scheduledAt: z.string().datetime().optional(),
  duration: z.number().int().min(0).optional(),
  outcome: z.string().optional(),
  followUp: z.boolean().optional(),
  followUpDate: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  createdBy: IdSchema.optional(),
})

// Market Data Schemas
export const MarketDataCreateSchema = z.object({
  areaId: IdSchema.optional(),
  propertyType: z.nativeEnum(PropertyType).optional(),
  period: z.string().regex(/^\d{4}-Q[1-4]$|^\d{4}-\d{2}$/), // YYYY-QX or YYYY-MM
  avgPrice: z.number().positive(),
  avgPricePerSqft: z.number().positive().optional(),
  medianPrice: z.number().positive().optional(),
  priceChange: z.number(),
  volume: z.number().int().min(0),
  rentalYield: z.number().min(0).max(100).optional(),
  roi: z.number().min(0).max(100).optional(),
  demandScore: z.number().min(0).max(100).optional(),
  supplyScore: z.number().min(0).max(100).optional(),
  dataSource: z.string().optional(),
})

// Document Schemas
export const DocumentUploadSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.nativeEnum(DocumentType),
  url: z.string().url(),
  size: z.number().int().min(0).optional(),
  mimeType: z.string().optional(),
  description: z.string().optional(),
})

// Response Types
export const PaginationSchema = z.object({
  page: z.number().int(),
  limit: z.number().int(),
  total: z.number().int(),
  totalPages: z.number().int(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
})

export const APIResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    pagination: PaginationSchema.optional(),
    timestamp: z.string().datetime(),
  })

// Export types
export type PropertyAreaCreate = z.infer<typeof PropertyAreaCreateSchema>
export type PropertyAreaUpdate = z.infer<typeof PropertyAreaUpdateSchema>
export type DeveloperCreate = z.infer<typeof DeveloperCreateSchema>
export type DeveloperUpdate = z.infer<typeof DeveloperUpdateSchema>
export type PropertyCreate = z.infer<typeof PropertyCreateSchema>
export type PropertyUpdate = z.infer<typeof PropertyUpdateSchema>
export type PropertyQuery = z.infer<typeof PropertyQuerySchema>
export type ClientCreate = z.infer<typeof ClientCreateSchema>
export type ClientUpdate = z.infer<typeof ClientUpdateSchema>
export type ClientQuery = z.infer<typeof ClientQuerySchema>
export type InvestmentCreate = z.infer<typeof InvestmentCreateSchema>
export type InvestmentUpdate = z.infer<typeof InvestmentUpdateSchema>
export type TransactionCreate = z.infer<typeof TransactionCreateSchema>
export type TransactionUpdate = z.infer<typeof TransactionUpdateSchema>
export type PropertyTourCreate = z.infer<typeof PropertyTourCreateSchema>
export type PropertyTourUpdate = z.infer<typeof PropertyTourUpdateSchema>
export type ClientInteractionCreate = z.infer<typeof ClientInteractionCreateSchema>
export type MarketDataCreate = z.infer<typeof MarketDataCreateSchema>
export type DocumentUpload = z.infer<typeof DocumentUploadSchema>
export type Pagination = z.infer<typeof PaginationSchema>
export type APIResponse<T> = {
  success: boolean
  data?: T
  error?: string
  pagination?: Pagination
  timestamp: string
}