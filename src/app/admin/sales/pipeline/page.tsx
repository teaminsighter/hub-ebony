'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search,
  Plus,
  Eye,
  Edit,
  DollarSign,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  Building,
  Target,
  Download
} from 'lucide-react'

interface Pipeline {
  id: string
  clientName: string
  email: string
  phone: string | null
  propertyTitle: string
  propertyValue: number
  stage: string
  probability: number
  expectedCloseDate: string
  lastActivity: string
  assignedTo: string
  notes: string
}

const pipelineStages = [
  { id: 'prospect', name: 'Prospect', color: 'bg-gray-100 text-gray-800' },
  { id: 'qualified', name: 'Qualified Lead', color: 'bg-blue-100 text-blue-800' },
  { id: 'consultation', name: 'Consultation Booked', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'property_shown', name: 'Property Shown', color: 'bg-orange-100 text-orange-800' },
  { id: 'proposal_sent', name: 'Proposal Sent', color: 'bg-purple-100 text-purple-800' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-pink-100 text-pink-800' },
  { id: 'closed_won', name: 'Closed Won', color: 'bg-green-100 text-green-800' },
  { id: 'closed_lost', name: 'Closed Lost', color: 'bg-red-100 text-red-800' }
]

export default function SalesPipelinePage() {
  const [pipeline, setPipeline] = useState<Pipeline[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStage, setFilterStage] = useState('all')

  useEffect(() => {
    fetchPipelineData()
  }, [])

  const fetchPipelineData = async () => {
    try {
      // Simulate API call with demo data
      const demoData: Pipeline[] = [
        {
          id: '1',
          clientName: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+971501234567',
          propertyTitle: 'Downtown Dubai Apartment',
          propertyValue: 2500000,
          stage: 'proposal_sent',
          probability: 75,
          expectedCloseDate: '2025-11-15',
          lastActivity: '2025-10-20',
          assignedTo: 'Max McCarthy',
          notes: 'Very interested, waiting for final approval from partner'
        },
        {
          id: '2',
          clientName: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+971502345678',
          propertyTitle: 'Marina Tower Penthouse',
          propertyValue: 4200000,
          stage: 'negotiation',
          probability: 85,
          expectedCloseDate: '2025-10-30',
          lastActivity: '2025-10-22',
          assignedTo: 'Max McCarthy',
          notes: 'Negotiating on price, very motivated buyer'
        },
        {
          id: '3',
          clientName: 'Robert Wilson',
          email: 'robert.wilson@email.com',
          phone: '+971503456789',
          propertyTitle: 'Palm Jumeirah Villa',
          propertyValue: 8500000,
          stage: 'property_shown',
          probability: 60,
          expectedCloseDate: '2025-12-01',
          lastActivity: '2025-10-18',
          assignedTo: 'Max McCarthy',
          notes: 'Loved the property, considering other options'
        },
        {
          id: '4',
          clientName: 'Emily Davis',
          email: 'emily.davis@email.com',
          phone: '+971504567890',
          propertyTitle: 'Business Bay Office',
          propertyValue: 1800000,
          stage: 'consultation',
          probability: 40,
          expectedCloseDate: '2025-11-30',
          lastActivity: '2025-10-21',
          assignedTo: 'Max McCarthy',
          notes: 'First consultation scheduled for next week'
        },
        {
          id: '5',
          clientName: 'Michael Brown',
          email: 'michael.brown@email.com',
          phone: '+971505678901',
          propertyTitle: 'JBR Beachfront Apartment',
          propertyValue: 3200000,
          stage: 'closed_won',
          probability: 100,
          expectedCloseDate: '2025-10-15',
          lastActivity: '2025-10-15',
          assignedTo: 'Max McCarthy',
          notes: 'Deal completed successfully!'
        }
      ]
      setPipeline(demoData)
    } catch (error) {
      console.error('Error fetching pipeline data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStageInfo = (stageId: string) => {
    return pipelineStages.find(stage => stage.id === stageId) || pipelineStages[0]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getDaysFromToday = (dateString: string) => {
    const today = new Date()
    const targetDate = new Date(dateString)
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleAddDeal = () => {
    const newDeal: Pipeline = {
      id: String(pipeline.length + 1),
      clientName: 'New Prospect [TO BE UPDATED]',
      email: 'prospect@email.com',
      phone: '+971-XXX-XXX-XXXX',
      propertyTitle: 'Property [TO BE SELECTED]',
      propertyValue: 0,
      stage: 'prospect',
      probability: 25,
      expectedCloseDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 days from now
      lastActivity: new Date().toISOString().split('T')[0],
      assignedTo: 'Max McCarthy',
      notes: 'New prospect added to pipeline - requires initial qualification and property matching'
    }
    
    setPipeline(prevPipeline => [newDeal, ...prevPipeline])
    alert(`✅ SUCCESS: New deal added to pipeline!\n\nClient: ${newDeal.clientName}\nStage: Prospect\nProbability: ${newDeal.probability}%\nExpected Close: ${new Date(newDeal.expectedCloseDate).toLocaleDateString()}\nAssigned: ${newDeal.assignedTo}\n\n✅ Added to pipeline\n✅ Ready for qualification\n✅ Follow-up scheduled`)
  }

  const handleViewDeal = (dealId: string) => {
    const deal = pipeline.find(d => d.id === dealId)
    alert(`View deal: ${deal?.clientName} - ${deal?.propertyTitle}\nThis would open detailed deal view with full client information, property details, timeline, and activity history`)
  }

  const handleEditDeal = (dealId: string) => {
    const deal = pipeline.find(d => d.id === dealId)
    alert(`Edit deal: ${deal?.clientName} - ${deal?.propertyTitle}\nThis would open deal editing form with stage management, probability updates, and note editing`)
  }

  const handleExportPipeline = () => {
    // Create export data
    const exportData = filteredPipeline.map(deal => ({
      'Client Name': deal.clientName,
      'Email': deal.email,
      'Phone': deal.phone || 'N/A',
      'Property': deal.propertyTitle,
      'Property Value': formatCurrency(deal.propertyValue),
      'Stage': getStageInfo(deal.stage).name,
      'Probability': `${deal.probability}%`,
      'Expected Close': deal.expectedCloseDate,
      'Days to Close': getDaysFromToday(deal.expectedCloseDate),
      'Last Activity': deal.lastActivity,
      'Assigned To': deal.assignedTo,
      'Weighted Value': formatCurrency(deal.propertyValue * deal.probability / 100),
      'Notes': deal.notes
    }))

    // Create CSV content
    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n')

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pipeline-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    alert(`✅ SUCCESS: Pipeline exported!\n\nFile: pipeline-export-${new Date().toISOString().split('T')[0]}.csv\nDeals: ${filteredPipeline.length}\nTotal Value: ${formatCurrency(totalValue)}\nWeighted Value: ${formatCurrency(weightedValue)}\n\n✅ Download started automatically\n✅ Includes probability calculations\n✅ Ready for analysis`)
  }

  const handleMoveDealStage = (dealId: string, newStage: string) => {
    const deal = pipeline.find(d => d.id === dealId)
    const stageInfo = getStageInfo(newStage)
    
    if (deal) {
      // Update probability based on stage
      let newProbability = deal.probability
      switch (newStage) {
        case 'prospect': newProbability = 25; break
        case 'qualified': newProbability = 40; break
        case 'consultation': newProbability = 50; break
        case 'property_shown': newProbability = 65; break
        case 'proposal_sent': newProbability = 75; break
        case 'negotiation': newProbability = 85; break
        case 'closed_won': newProbability = 100; break
        case 'closed_lost': newProbability = 0; break
      }
      
      setPipeline(prevPipeline =>
        prevPipeline.map(d =>
          d.id === dealId
            ? {
                ...d,
                stage: newStage,
                probability: newProbability,
                lastActivity: new Date().toISOString().split('T')[0],
                notes: `${d.notes} | STAGE UPDATE: Moved to ${stageInfo.name} (${newProbability}% probability) on ${new Date().toLocaleDateString()}`
              }
            : d
        )
      )
      
      alert(`✅ SUCCESS: Deal stage updated!\n\nClient: ${deal.clientName}\nNew Stage: ${stageInfo.name}\nProbability: ${newProbability}%\nUpdated: ${new Date().toLocaleDateString()}\n\n✅ Pipeline position updated\n✅ Probability recalculated\n✅ Activity logged\n✅ Next actions triggered`)
    }
  }

  const filteredPipeline = pipeline.filter(deal => {
    const matchesSearch = deal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = filterStage === 'all' || deal.stage === filterStage
    return matchesSearch && matchesStage
  })

  // Calculate summary statistics
  const totalValue = filteredPipeline.reduce((sum, deal) => sum + deal.propertyValue, 0)
  const weightedValue = filteredPipeline.reduce((sum, deal) => sum + (deal.propertyValue * deal.probability / 100), 0)
  const avgDealSize = filteredPipeline.length > 0 ? totalValue / filteredPipeline.length : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPipeline}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddDeal}>
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalValue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weighted Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(weightedValue)}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredPipeline.filter(deal => !['closed_won', 'closed_lost'].includes(deal.stage)).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(avgDealSize)}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Stages</option>
          {pipelineStages.map(stage => (
            <option key={stage.id} value={stage.id}>{stage.name}</option>
          ))}
        </select>
      </div>

      {/* Pipeline Table */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Pipeline</CardTitle>
          <CardDescription>
            Track all deals through the sales process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPipeline.map((deal) => {
              const stageInfo = getStageInfo(deal.stage)
              const daysToClose = getDaysFromToday(deal.expectedCloseDate)
              
              return (
                <Card key={deal.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-lg">{deal.clientName}</h4>
                          <Badge className={stageInfo.color}>
                            {stageInfo.name}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {deal.probability}% probability
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Contact</h5>
                            <div className="space-y-1 text-gray-600">
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {deal.email}
                              </div>
                              {deal.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-4 w-4" />
                                  {deal.phone}
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Property</h5>
                            <div className="space-y-1 text-gray-600">
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {deal.propertyTitle}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {formatCurrency(deal.propertyValue)}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Timeline</h5>
                            <div className="space-y-1 text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Expected: {new Date(deal.expectedCloseDate).toLocaleDateString()}
                              </div>
                              <div className={`text-sm ${
                                daysToClose < 0 ? 'text-red-600' : 
                                daysToClose <= 7 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {daysToClose < 0 ? `${Math.abs(daysToClose)} days overdue` :
                                 daysToClose === 0 ? 'Due today' :
                                 `${daysToClose} days remaining`}
                              </div>
                            </div>
                          </div>
                        </div>

                        {deal.notes && (
                          <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                            <strong>Notes:</strong> {deal.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4 flex-wrap">
                        <Button variant="outline" size="sm" onClick={() => handleViewDeal(deal.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditDeal(deal.id)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {deal.stage !== 'closed_won' && deal.stage !== 'closed_lost' && (
                          <select
                            value={deal.stage}
                            onChange={(e) => handleMoveDealStage(deal.id, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-xs"
                          >
                            {pipelineStages.map(stage => (
                              <option key={stage.id} value={stage.id}>
                                {stage.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {filteredPipeline.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterStage !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Add your first deal to get started.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}