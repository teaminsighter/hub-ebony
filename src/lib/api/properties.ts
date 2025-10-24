import { prisma } from '@/lib/prisma'
import type { 
  PropertyCreate, 
  PropertyUpdate, 
  PropertyQuery,
  APIResponse,
  Pagination 
} from './types'
import { 
  calculatePagination, 
  getPaginationParams,
  generateSearchConditions,
  generateSortConditions,
  formatRecord,
  parseJSONField
} from './utils'
import { NotFoundError } from './errors'

// Get properties with advanced filtering and pagination
export async function getProperties(query: PropertyQuery): Promise<{
  properties: any[]
  pagination: Pagination
}> {
  const {
    page = 1,
    limit = 20,
    search,
    areaId,
    developerId,
    propertyType,
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    minSqft,
    maxSqft,
    furnishing,
    status,
    isFeatured,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = query

  // Build where conditions
  const where: any = {
    isActive: true,
    ...(areaId && { areaId }),
    ...(developerId && { developerId }),
    ...(propertyType && { propertyType }),
    ...(furnishing && { furnishing }),
    ...(status && { status }),
    ...(isFeatured !== undefined && { isFeatured }),
  }

  // Price range filter
  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = minPrice
    if (maxPrice) where.price.lte = maxPrice
  }

  // Bedroom range filter
  if (minBedrooms || maxBedrooms) {
    where.bedrooms = {}
    if (minBedrooms) where.bedrooms.gte = minBedrooms
    if (maxBedrooms) where.bedrooms.lte = maxBedrooms
  }

  // Square footage range filter
  if (minSqft || maxSqft) {
    where.sqft = {}
    if (minSqft) where.sqft.gte = minSqft
    if (maxSqft) where.sqft.lte = maxSqft
  }

  // Search conditions
  if (search) {
    const searchConditions = generateSearchConditions(search, [
      'title',
      'description',
      'address',
      'subType',
      'view'
    ])
    Object.assign(where, searchConditions)
  }

  // Pagination
  const { skip, take } = getPaginationParams(page, limit)

  // Sort conditions
  const orderBy = generateSortConditions(sortBy, sortOrder)

  // Execute queries
  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        area: true,
        developer: true,
        _count: {
          select: {
            clientProperties: true,
            investments: true,
            tours: true
          }
        }
      }
    }),
    prisma.property.count({ where })
  ])

  // Format properties
  const formattedProperties = properties.map(property => ({
    ...formatRecord(property),
    images: parseJSONField(property.images, []),
    features: parseJSONField(property.features, []),
    amenities: parseJSONField(property.amenities, []),
    coordinates: parseJSONField(property.coordinates, null),
    paymentPlan: parseJSONField(property.paymentPlan, null),
    interestCount: property._count.clientProperties,
    investmentCount: property._count.investments,
    tourCount: property._count.tours
  }))

  const pagination = calculatePagination(page, limit, total)

  return {
    properties: formattedProperties,
    pagination
  }
}

// Get single property by ID
export async function getPropertyById(id: string): Promise<any> {
  const property = await prisma.property.findUnique({
    where: { id, isActive: true },
    include: {
      area: true,
      developer: true,
      documents: {
        where: { isPublic: true }
      },
      clientProperties: {
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
              status: true
            }
          }
        }
      },
      investments: {
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      },
      tours: {
        where: {
          status: { in: ['SCHEDULED', 'CONFIRMED'] }
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      },
      _count: {
        select: {
          clientProperties: true,
          investments: true,
          tours: true
        }
      }
    }
  })

  if (!property) {
    throw new NotFoundError('Property', id)
  }

  return {
    ...formatRecord(property),
    images: parseJSONField(property.images, []),
    features: parseJSONField(property.features, []),
    amenities: parseJSONField(property.amenities, []),
    coordinates: parseJSONField(property.coordinates, null),
    paymentPlan: parseJSONField(property.paymentPlan, null),
    interestCount: property._count.clientProperties,
    investmentCount: property._count.investments,
    tourCount: property._count.tours
  }
}

// Create new property
export async function createProperty(data: PropertyCreate): Promise<any> {
  // Calculate price per sqft if not provided
  let pricePerSqft = data.pricePerSqft
  if (!pricePerSqft && data.sqft) {
    pricePerSqft = data.price / data.sqft
  }

  const property = await prisma.property.create({
    data: {
      ...data,
      pricePerSqft,
      images: data.images ? JSON.stringify(data.images) : null,
      features: data.features ? JSON.stringify(data.features) : null,
      amenities: data.amenities ? JSON.stringify(data.amenities) : null,
      coordinates: data.coordinates ? JSON.stringify(data.coordinates) : null,
      paymentPlan: data.paymentPlan ? JSON.stringify(data.paymentPlan) : null,
    },
    include: {
      area: true,
      developer: true
    }
  })

  return {
    ...formatRecord(property),
    images: parseJSONField(property.images, []),
    features: parseJSONField(property.features, []),
    amenities: parseJSONField(property.amenities, []),
    coordinates: parseJSONField(property.coordinates, null),
    paymentPlan: parseJSONField(property.paymentPlan, null),
  }
}

// Update property
export async function updateProperty(id: string, data: PropertyUpdate): Promise<any> {
  // Calculate price per sqft if price or sqft changed
  let updateData = { ...data }
  if ((data.price || data.sqft) && !data.pricePerSqft) {
    const existing = await prisma.property.findUnique({
      where: { id },
      select: { price: true, sqft: true }
    })
    
    if (existing) {
      const newPrice = data.price ?? existing.price
      const newSqft = data.sqft ?? existing.sqft
      if (newSqft) {
        updateData.pricePerSqft = newPrice / newSqft
      }
    }
  }

  // Convert arrays to JSON strings
  if (data.images) updateData.images = JSON.stringify(data.images)
  if (data.features) updateData.features = JSON.stringify(data.features)
  if (data.amenities) updateData.amenities = JSON.stringify(data.amenities)
  if (data.coordinates) updateData.coordinates = JSON.stringify(data.coordinates)
  if (data.paymentPlan) updateData.paymentPlan = JSON.stringify(data.paymentPlan)

  const property = await prisma.property.update({
    where: { id },
    data: updateData,
    include: {
      area: true,
      developer: true
    }
  })

  return {
    ...formatRecord(property),
    images: parseJSONField(property.images, []),
    features: parseJSONField(property.features, []),
    amenities: parseJSONField(property.amenities, []),
    coordinates: parseJSONField(property.coordinates, null),
    paymentPlan: parseJSONField(property.paymentPlan, null),
  }
}

// Soft delete property
export async function deleteProperty(id: string): Promise<void> {
  await prisma.property.update({
    where: { id },
    data: { isActive: false }
  })
}

// Get property analytics
export async function getPropertyAnalytics(id: string): Promise<any> {
  const [property, clientInterest, investments, tours, marketData] = await Promise.all([
    prisma.property.findUnique({
      where: { id },
      select: { 
        id: true, 
        title: true, 
        price: true, 
        areaId: true,
        propertyType: true,
        createdAt: true 
      }
    }),
    prisma.clientProperty.count({
      where: { propertyId: id }
    }),
    prisma.investment.findMany({
      where: { propertyId: id },
      select: {
        amount: true,
        status: true,
        investmentDate: true
      }
    }),
    prisma.propertyTour.findMany({
      where: { propertyId: id },
      select: {
        status: true,
        rating: true,
        interested: true,
        scheduledAt: true
      }
    }),
    prisma.marketData.findMany({
      where: { 
        areaId: property?.areaId,
        propertyType: property?.propertyType
      },
      orderBy: { period: 'desc' },
      take: 12
    })
  ])

  if (!property) {
    throw new NotFoundError('Property', id)
  }

  // Calculate analytics
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const completedInvestments = investments.filter(inv => inv.status === 'COMPLETED').length
  const averageRating = tours.filter(t => t.rating).reduce((sum, t) => sum + (t.rating || 0), 0) / tours.filter(t => t.rating).length || 0
  const interestRate = tours.filter(t => t.interested).length / tours.length || 0

  return {
    property,
    metrics: {
      clientInterest,
      totalInvestments,
      completedInvestments,
      averageRating: Math.round(averageRating * 10) / 10,
      interestRate: Math.round(interestRate * 100),
      totalTours: tours.length,
      completedTours: tours.filter(t => t.status === 'COMPLETED').length
    },
    marketTrends: marketData.map(data => ({
      period: data.period,
      avgPrice: data.avgPrice,
      priceChange: data.priceChange,
      volume: data.volume
    }))
  }
}

// Get featured properties
export async function getFeaturedProperties(limit: number = 6): Promise<any[]> {
  const properties = await prisma.property.findMany({
    where: {
      isActive: true,
      isFeatured: true
    },
    take: limit,
    orderBy: [
      { priority: 'desc' },
      { createdAt: 'desc' }
    ],
    include: {
      area: true,
      developer: true
    }
  })

  return properties.map(property => ({
    ...formatRecord(property),
    images: parseJSONField(property.images, []),
    features: parseJSONField(property.features, []),
    amenities: parseJSONField(property.amenities, []),
    coordinates: parseJSONField(property.coordinates, null),
  }))
}

// Get similar properties
export async function getSimilarProperties(id: string, limit: number = 4): Promise<any[]> {
  const property = await prisma.property.findUnique({
    where: { id },
    select: {
      areaId: true,
      propertyType: true,
      price: true,
      bedrooms: true
    }
  })

  if (!property) {
    throw new NotFoundError('Property', id)
  }

  const priceRange = property.price * 0.3 // 30% price range
  
  const similarProperties = await prisma.property.findMany({
    where: {
      id: { not: id },
      isActive: true,
      OR: [
        { areaId: property.areaId },
        { propertyType: property.propertyType },
        { bedrooms: property.bedrooms }
      ],
      price: {
        gte: property.price - priceRange,
        lte: property.price + priceRange
      }
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      area: true,
      developer: true
    }
  })

  return similarProperties.map(prop => ({
    ...formatRecord(prop),
    images: parseJSONField(prop.images, []),
    features: parseJSONField(prop.features, []),
    amenities: parseJSONField(prop.amenities, []),
    coordinates: parseJSONField(prop.coordinates, null),
  }))
}