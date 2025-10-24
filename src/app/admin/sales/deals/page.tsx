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
  FileText,
  Download,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  X,
  Upload
} from 'lucide-react'

interface Deal {
  id: string
  dealNumber: string
  clientName: string
  email: string
  phone: string | null
  propertyTitle: string
  propertyValue: number
  dealValue: number
  commission: number
  status: string
  createdDate: string
  closedDate: string | null
  assignedTo: string
  documents: string[]
  nextAction: string
  priority: string
}

const dealStatuses = [
  { id: 'active', name: 'Active', color: 'bg-blue-100 text-blue-800', icon: Clock },
  { id: 'pending_docs', name: 'Pending Documents', color: 'bg-yellow-100 text-yellow-800', icon: FileText },
  { id: 'closed_won', name: 'Closed Won', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { id: 'closed_lost', name: 'Closed Lost', color: 'bg-red-100 text-red-800', icon: XCircle }
]

const priorities = [
  { id: 'high', name: 'High', color: 'text-red-600' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-600' },
  { id: 'low', name: 'Low', color: 'text-green-600' }
]

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [docsModalOpen, setDocsModalOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [editForm, setEditForm] = useState<Partial<Deal>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      // Demo data
      const demoDeals: Deal[] = [
        {
          id: '1',
          dealNumber: 'DEAL-2025-001',
          clientName: 'Ahmed Al Mansouri',
          email: 'ahmed.almansouri@email.com',
          phone: '+971501234567',
          propertyTitle: 'Downtown Dubai Luxury Apartment',
          propertyValue: 2500000,
          dealValue: 2400000,
          commission: 72000,
          status: 'active',
          createdDate: '2025-10-01',
          closedDate: null,
          assignedTo: 'Max McCarthy',
          documents: ['Purchase Agreement', 'NOC', 'Emirates ID'],
          nextAction: 'Obtain final NOC from developer',
          priority: 'high'
        },
        {
          id: '2',
          dealNumber: 'DEAL-2025-002',
          clientName: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+971502345678',
          propertyTitle: 'Marina Tower Penthouse',
          propertyValue: 4200000,
          dealValue: 4100000,
          commission: 123000,
          status: 'pending_docs',
          createdDate: '2025-09-28',
          closedDate: null,
          assignedTo: 'Max McCarthy',
          documents: ['MOA Signed', 'Passport Copy'],
          nextAction: 'Collect remaining documents',
          priority: 'medium'
        },
        {
          id: '3',
          dealNumber: 'DEAL-2025-003',
          clientName: 'Robert Wilson',
          email: 'robert.wilson@email.com',
          phone: '+971503456789',
          propertyTitle: 'Palm Jumeirah Villa',
          propertyValue: 8500000,
          dealValue: 8500000,
          commission: 255000,
          status: 'closed_won',
          createdDate: '2025-09-15',
          closedDate: '2025-10-20',
          assignedTo: 'Max McCarthy',
          documents: ['All Complete'],
          nextAction: 'Commission payment processed',
          priority: 'high'
        },
        {
          id: '4',
          dealNumber: 'DEAL-2025-004',
          clientName: 'Emily Davis',
          email: 'emily.davis@email.com',
          phone: '+971504567890',
          propertyTitle: 'Business Bay Office Space',
          propertyValue: 1800000,
          dealValue: 0,
          commission: 0,
          status: 'closed_lost',
          createdDate: '2025-09-10',
          closedDate: '2025-10-15',
          assignedTo: 'Max McCarthy',
          documents: ['Initial MOA'],
          nextAction: 'Deal cancelled by client',
          priority: 'low'
        }
      ]
      setDeals(demoDeals)
    } catch (error) {
      console.error('Error fetching deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (statusId: string) => {
    return dealStatuses.find(status => status.id === statusId) || dealStatuses[0]
  }

  const getPriorityInfo = (priorityId: string) => {
    return priorities.find(priority => priority.id === priorityId) || priorities[2]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleViewDeal = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId)
    if (deal) {
      setSelectedDeal(deal)
      setViewModalOpen(true)
    }
  }

  const handleEditDeal = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId)
    if (deal) {
      setSelectedDeal(deal)
      setEditForm(deal)
      setEditModalOpen(true)
    }
  }

  const handleDownloadDocs = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId)
    if (deal) {
      setSelectedDeal(deal)
      setDocsModalOpen(true)
    }
  }

  const handleAddDeal = () => {
    setEditForm({
      dealNumber: `DEAL-2025-${String(deals.length + 1).padStart(3, '0')}`,
      clientName: '',
      email: '',
      phone: '',
      propertyTitle: '',
      propertyValue: 0,
      dealValue: 0,
      commission: 0,
      status: 'active',
      priority: 'high',
      assignedTo: 'Max McCarthy',
      nextAction: 'New deal - requires client information and property selection'
    })
    setAddModalOpen(true)
  }

  const handleExportDeals = () => {
    // Simulate export generation
    const exportData = filteredDeals.map(deal => ({
      'Deal Number': deal.dealNumber,
      'Client Name': deal.clientName,
      'Email': deal.email,
      'Phone': deal.phone || 'N/A',
      'Property': deal.propertyTitle,
      'Property Value': formatCurrency(deal.propertyValue),
      'Deal Value': formatCurrency(deal.dealValue),
      'Commission': formatCurrency(deal.commission),
      'Status': deal.status,
      'Priority': deal.priority,
      'Created Date': deal.createdDate,
      'Closed Date': deal.closedDate || 'N/A',
      'Assigned To': deal.assignedTo,
      'Next Action': deal.nextAction
    }))

    // Create CSV content
    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n')

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deals-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    // Show professional success notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-semibold">Deals Exported</p>
          <p class="text-sm">${filteredDeals.length} deals exported to CSV</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  const handleMarkPaid = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId)
    if (deal && deal.status === 'closed_won') {
      // Actually update the deal in state
      setDeals(prevDeals => 
        prevDeals.map(d => 
          d.id === dealId 
            ? { ...d, status: 'closed_won', commission: d.commission, nextAction: `PAID: Commission of ${formatCurrency(d.commission)} marked as paid on ${new Date().toLocaleDateString()}` }
            : d
        )
      )
      // Show professional success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Commission Payment Marked</p>
            <p class="text-sm">Deal ${deal.dealNumber} - ${formatCurrency(deal.commission)}</p>
          </div>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 4000)
    } else {
      // Show professional error notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Cannot Mark as Paid</p>
            <p class="text-sm">Deal must be in 'Closed Won' status first</p>
          </div>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 4000)
    }
  }

  const handleCloneDeal = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId)
    if (deal) {
      const newDealNumber = `DEAL-2025-${String(deals.length + 1).padStart(3, '0')}`
      const newDeal: Deal = {
        ...deal,
        id: String(deals.length + 1),
        dealNumber: newDealNumber,
        clientName: `${deal.clientName} (Clone)`,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
        closedDate: null,
        dealValue: 0,
        commission: 0,
        nextAction: 'New cloned deal - requires client confirmation and property selection',
        priority: 'medium'
      }
      
      setDeals(prevDeals => [...prevDeals, newDeal])
      
      // Show professional success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Deal Cloned Successfully</p>
            <p class="text-sm">${newDealNumber} created from ${deal.dealNumber}</p>
          </div>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 4000)
    }
  }


  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.dealNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || deal.status === filterStatus
    const matchesPriority = filterPriority === 'all' || deal.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  // Calculate summary statistics
  const totalDeals = filteredDeals.length
  const activeDeals = filteredDeals.filter(deal => ['active', 'pending_docs'].includes(deal.status)).length
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.dealValue, 0)
  const totalCommission = filteredDeals.reduce((sum, deal) => sum + deal.commission, 0)

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Deals Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportDeals}>
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
                <p className="text-sm font-medium text-gray-600">Total Deals</p>
                <p className="text-2xl font-bold text-gray-900">{totalDeals}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold text-orange-600">{activeDeals}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalValue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commission</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(totalCommission)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap">
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
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Statuses</option>
          {dealStatuses.map(status => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Priorities</option>
          {priorities.map(priority => (
            <option key={priority.id} value={priority.id}>{priority.name}</option>
          ))}
        </select>
      </div>

      {/* Deals List */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Management</CardTitle>
          <CardDescription>
            Track and manage all property deals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDeals.map((deal) => {
              const statusInfo = getStatusInfo(deal.status)
              const priorityInfo = getPriorityInfo(deal.priority)
              const StatusIcon = statusInfo.icon
              
              return (
                <Card key={deal.id} className={`border-l-4 ${
                  deal.priority === 'high' ? 'border-l-red-500' :
                  deal.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <StatusIcon className="h-5 w-5 text-gray-600" />
                          <h4 className="font-medium text-lg">{deal.dealNumber}</h4>
                          <Badge className={statusInfo.color}>
                            {statusInfo.name}
                          </Badge>
                          <span className={`text-sm font-medium ${priorityInfo.color}`}>
                            {priorityInfo.name} Priority
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Client</h5>
                            <div className="space-y-1 text-gray-600">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {deal.clientName}
                              </div>
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
                                Property: {formatCurrency(deal.propertyValue)}
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                Deal: {formatCurrency(deal.dealValue)}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Financial</h5>
                            <div className="space-y-1 text-gray-600">
                              <div>Commission: {formatCurrency(deal.commission)}</div>
                              <div>Created: {new Date(deal.createdDate).toLocaleDateString()}</div>
                              {deal.closedDate && (
                                <div>Closed: {new Date(deal.closedDate).toLocaleDateString()}</div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Status</h5>
                            <div className="space-y-1 text-gray-600">
                              <div>Assigned: {deal.assignedTo}</div>
                              <div>Documents: {deal.documents.length}</div>
                              <div className="text-xs">Next: {deal.nextAction}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4 flex-wrap">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadDocs(deal.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Docs
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDeal(deal.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditDeal(deal.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {deal.status === 'closed_won' && deal.commission > 0 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMarkPaid(deal.id)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <CreditCard className="h-4 w-4 mr-1" />
                            Mark Paid
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCloneDeal(deal.id)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Clone
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {filteredDeals.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Add your first deal to get started.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional View Modal */}
      {viewModalOpen && selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Deal Details - {selectedDeal.dealNumber}</h2>
              <button 
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Client Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedDeal.clientName}</p>
                      <p><span className="font-medium">Email:</span> {selectedDeal.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedDeal.phone || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Property Details</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Property:</span> {selectedDeal.propertyTitle}</p>
                      <p><span className="font-medium">Property Value:</span> {formatCurrency(selectedDeal.propertyValue)}</p>
                      <p><span className="font-medium">Deal Value:</span> {formatCurrency(selectedDeal.dealValue)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Deal Status</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Status:</span> 
                        <Badge className={getStatusInfo(selectedDeal.status).color + " ml-2"}>
                          {getStatusInfo(selectedDeal.status).name}
                        </Badge>
                      </p>
                      <p><span className="font-medium">Priority:</span> 
                        <span className={`ml-2 font-medium ${getPriorityInfo(selectedDeal.priority).color}`}>
                          {getPriorityInfo(selectedDeal.priority).name}
                        </span>
                      </p>
                      <p><span className="font-medium">Commission:</span> {formatCurrency(selectedDeal.commission)}</p>
                      <p><span className="font-medium">Assigned To:</span> {selectedDeal.assignedTo}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Timeline</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Created:</span> {new Date(selectedDeal.createdDate).toLocaleDateString()}</p>
                      {selectedDeal.closedDate && (
                        <p><span className="font-medium">Closed:</span> {new Date(selectedDeal.closedDate).toLocaleDateString()}</p>
                      )}
                      <p><span className="font-medium">Documents:</span> {selectedDeal.documents.length} files</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Next Action</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDeal.nextAction}</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
              <Button onClick={() => {
                setViewModalOpen(false)
                handleEditDeal(selectedDeal.id)
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Deal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Edit Modal */}
      {editModalOpen && selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Edit Deal - {selectedDeal.dealNumber}</h2>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <Input
                      value={editForm.clientName || ''}
                      onChange={(e) => setEditForm({...editForm, clientName: e.target.value})}
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                    <Input
                      value={editForm.propertyTitle || ''}
                      onChange={(e) => setEditForm({...editForm, propertyTitle: e.target.value})}
                      placeholder="Enter property title"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Value (AED)</label>
                    <Input
                      type="number"
                      value={editForm.propertyValue || 0}
                      onChange={(e) => setEditForm({...editForm, propertyValue: parseInt(e.target.value)})}
                      placeholder="Enter property value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deal Value (AED)</label>
                    <Input
                      type="number"
                      value={editForm.dealValue || 0}
                      onChange={(e) => setEditForm({...editForm, dealValue: parseInt(e.target.value)})}
                      placeholder="Enter deal value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission (AED)</label>
                    <Input
                      type="number"
                      value={editForm.commission || 0}
                      onChange={(e) => setEditForm({...editForm, commission: parseInt(e.target.value)})}
                      placeholder="Enter commission amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editForm.status || 'active'}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {dealStatuses.map(status => (
                        <option key={status.id} value={status.id}>{status.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={editForm.priority || 'medium'}
                      onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {priorities.map(priority => (
                        <option key={priority.id} value={priority.id}>{priority.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Next Action</label>
                <textarea
                  value={editForm.nextAction || ''}
                  onChange={(e) => setEditForm({...editForm, nextAction: e.target.value})}
                  placeholder="Enter next action required..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  setIsSubmitting(true)
                  // Simulate API call
                  setTimeout(() => {
                    setDeals(prevDeals =>
                      prevDeals.map(d =>
                        d.id === selectedDeal.id ? { ...d, ...editForm } : d
                      )
                    )
                    setIsSubmitting(false)
                    setEditModalOpen(false)
                    
                    // Show professional success notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">Deal Updated</p>
                          <p class="text-sm">Changes saved successfully</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Add Deal Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Create New Deal</h2>
              <button 
                onClick={() => setAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deal Number</label>
                    <Input
                      value={editForm.dealNumber || ''}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                    <Input
                      value={editForm.clientName || ''}
                      onChange={(e) => setEditForm({...editForm, clientName: e.target.value})}
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="+971-XXX-XXX-XXXX"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                    <Input
                      value={editForm.propertyTitle || ''}
                      onChange={(e) => setEditForm({...editForm, propertyTitle: e.target.value})}
                      placeholder="Enter property title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Value (AED)</label>
                    <Input
                      type="number"
                      value={editForm.propertyValue || 0}
                      onChange={(e) => setEditForm({...editForm, propertyValue: parseInt(e.target.value)})}
                      placeholder="Enter property value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Deal Value (AED)</label>
                    <Input
                      type="number"
                      value={editForm.dealValue || 0}
                      onChange={(e) => setEditForm({...editForm, dealValue: parseInt(e.target.value)})}
                      placeholder="Enter expected deal value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={editForm.priority || 'high'}
                      onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {priorities.map(priority => (
                        <option key={priority.id} value={priority.id}>{priority.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Notes</label>
                <textarea
                  value={editForm.nextAction || ''}
                  onChange={(e) => setEditForm({...editForm, nextAction: e.target.value})}
                  placeholder="Enter initial notes and next actions..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  if (!editForm.clientName || !editForm.email || !editForm.propertyTitle) {
                    // Show professional error notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">Required Fields Missing</p>
                          <p class="text-sm">Please fill in all required fields</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                    return
                  }
                  setIsSubmitting(true)
                  setTimeout(() => {
                    const newDeal: Deal = {
                      id: String(deals.length + 1),
                      dealNumber: editForm.dealNumber || '',
                      clientName: editForm.clientName || '',
                      email: editForm.email || '',
                      phone: editForm.phone || '',
                      propertyTitle: editForm.propertyTitle || '',
                      propertyValue: editForm.propertyValue || 0,
                      dealValue: editForm.dealValue || 0,
                      commission: Math.round((editForm.dealValue || 0) * 0.03), // 3% commission
                      status: 'active',
                      createdDate: new Date().toISOString().split('T')[0],
                      closedDate: null,
                      assignedTo: 'Max McCarthy',
                      documents: ['Initial Contact'],
                      nextAction: editForm.nextAction || 'New deal - requires follow-up',
                      priority: editForm.priority || 'high'
                    }
                    setDeals(prevDeals => [newDeal, ...prevDeals])
                    setIsSubmitting(false)
                    setAddModalOpen(false)
                    
                    // Show professional success notification
                    const notification = document.createElement('div')
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                    notification.innerHTML = `
                      <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                          <p class="font-semibold">New Deal Created</p>
                          <p class="text-sm">${newDeal.dealNumber} added to pipeline</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Deal'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Documents Modal */}
      {docsModalOpen && selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Documents - {selectedDeal.dealNumber}</h2>
              <button 
                onClick={() => setDocsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
              <div className="space-y-3">
                {selectedDeal.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{doc}</p>
                        <p className="text-sm text-gray-500">Uploaded on {new Date(selectedDeal.createdDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setDocsModalOpen(false)}>Close</Button>
              <Button onClick={() => {
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Documents Download</p>
                      <p class="text-sm">ZIP file generation started</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}