import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Demo admin data for charts and displays
    const demoData = {
      revenueChart: [
        { month: 'Jan', revenue: 150000, target: 120000 },
        { month: 'Feb', revenue: 180000, target: 140000 },
        { month: 'Mar', revenue: 220000, target: 160000 },
        { month: 'Apr', revenue: 200000, target: 180000 },
        { month: 'May', revenue: 280000, target: 200000 },
        { month: 'Jun', revenue: 320000, target: 220000 }
      ],
      leadConversion: [
        { source: 'Website', leads: 120, conversions: 24, rate: 20 },
        { source: 'Referral', leads: 80, conversions: 32, rate: 40 },
        { source: 'Social Media', leads: 60, conversions: 12, rate: 20 },
        { source: 'Email Campaign', leads: 40, conversions: 8, rate: 20 },
        { source: 'Events', leads: 30, conversions: 9, rate: 30 }
      ],
      propertyPerformance: [
        { area: 'Downtown', properties: 45, avgROI: 8.5, totalValue: 15000000 },
        { area: 'Marina', properties: 32, avgROI: 7.2, totalValue: 12000000 },
        { area: 'Palm Jumeirah', properties: 18, avgROI: 9.1, totalValue: 25000000 },
        { area: 'JBR', properties: 28, avgROI: 6.8, totalValue: 8500000 },
        { area: 'Business Bay', properties: 22, avgROI: 7.5, totalValue: 9200000 }
      ],
      clientActivity: [
        { date: '2025-10-23', consultations: 8, newClients: 3, deals: 2 },
        { date: '2025-10-22', consultations: 12, newClients: 5, deals: 1 },
        { date: '2025-10-21', consultations: 6, newClients: 2, deals: 3 },
        { date: '2025-10-20', consultations: 10, newClients: 4, deals: 1 },
        { date: '2025-10-19', consultations: 9, newClients: 3, deals: 2 }
      ],
      marketTrends: {
        priceGrowth: 12.5,
        rentalYield: 6.8,
        demandIndex: 85,
        supplyIndex: 42,
        investorSentiment: 'Positive'
      }
    }

    return NextResponse.json(demoData)
  } catch (error) {
    console.error('Error fetching demo admin data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}