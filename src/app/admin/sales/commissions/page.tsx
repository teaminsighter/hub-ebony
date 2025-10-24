'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  DollarSign,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  TrendingUp,
  Calendar,
  Users,
  Building,
  CheckCircle,
  Clock,
  XCircle,
  Calculator,
  FileText,
  CreditCard,
  X,
  AlertTriangle
} from 'lucide-react'

interface Commission {
  id: string
  dealNumber: string
  clientName: string
  propertyTitle: string
  dealValue: number
  commissionRate: number
  commissionAmount: number
  status: string
  dealClosedDate: string
  paymentDueDate: string
  paidDate: string | null
  paidAmount: number
  outstandingAmount: number
  agentName: string
  notes: string
}

const commissionStatuses = [
  { id: 'pending', name: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { id: 'approved', name: 'Approved', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  { id: 'paid', name: 'Paid', color: 'bg-green-100 text-green-800', icon: CreditCard },
  { id: 'disputed', name: 'Disputed', color: 'bg-red-100 text-red-800', icon: XCircle }
]

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('current_month')
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null)
  const [editForm, setEditForm] = useState<Partial<Commission>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchCommissions()
  }, [])

  const fetchCommissions = async () => {
    try {
      // Demo data
      const demoCommissions: Commission[] = [
        {
          id: '1',
          dealNumber: 'DEAL-2025-001',
          clientName: 'Ahmed Al Mansouri',
          propertyTitle: 'Downtown Dubai Luxury Apartment',
          dealValue: 2400000,
          commissionRate: 3.0,
          commissionAmount: 72000,
          status: 'approved',
          dealClosedDate: '2025-10-20',
          paymentDueDate: '2025-11-05',
          paidDate: null,
          paidAmount: 0,
          outstandingAmount: 72000,
          agentName: 'Max McCarthy',
          notes: 'Payment approved, processing this week'
        },
        {
          id: '2',
          dealNumber: 'DEAL-2025-002',
          clientName: 'Sarah Johnson',
          propertyTitle: 'Marina Tower Penthouse',
          dealValue: 4100000,
          commissionRate: 3.0,
          commissionAmount: 123000,
          status: 'pending',
          dealClosedDate: '2025-10-22',
          paymentDueDate: '2025-11-07',
          paidDate: null,
          paidAmount: 0,
          outstandingAmount: 123000,
          agentName: 'Max McCarthy',
          notes: 'Awaiting final documentation'
        },
        {
          id: '3',
          dealNumber: 'DEAL-2025-003',
          clientName: 'Robert Wilson',
          propertyTitle: 'Palm Jumeirah Villa',
          dealValue: 8500000,
          commissionRate: 3.0,
          commissionAmount: 255000,
          status: 'paid',
          dealClosedDate: '2025-09-15',
          paymentDueDate: '2025-10-01',
          paidDate: '2025-09-30',
          paidAmount: 255000,
          outstandingAmount: 0,
          agentName: 'Max McCarthy',
          notes: 'Paid in full on time'
        },
        {
          id: '4',
          dealNumber: 'DEAL-2025-004',
          clientName: 'Michael Brown',
          propertyTitle: 'JBR Beachfront Apartment',
          dealValue: 3200000,
          commissionRate: 2.5,
          commissionAmount: 80000,
          status: 'paid',
          dealClosedDate: '2025-09-10',
          paymentDueDate: '2025-09-25',
          paidDate: '2025-09-24',
          paidAmount: 80000,
          outstandingAmount: 0,
          agentName: 'Max McCarthy',
          notes: 'Early payment received'
        },
        {
          id: '5',
          dealNumber: 'DEAL-2025-005',
          clientName: 'Lisa Anderson',
          propertyTitle: 'Business Bay Office Tower',
          dealValue: 1500000,
          commissionRate: 2.0,
          commissionAmount: 30000,
          status: 'disputed',
          dealClosedDate: '2025-08-30',
          paymentDueDate: '2025-09-15',
          paidDate: null,
          paidAmount: 0,
          outstandingAmount: 30000,
          agentName: 'Max McCarthy',
          notes: 'Commission rate dispute with developer'
        }
      ]
      setCommissions(demoCommissions)
    } catch (error) {
      console.error('Error fetching commissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (statusId: string) => {
    return commissionStatuses.find(status => status.id === statusId) || commissionStatuses[0]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getDaysOverdue = (dueDateString: string) => {
    const today = new Date()
    const dueDate = new Date(dueDateString)
    const diffTime = today.getTime() - dueDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const handleViewCommission = (commissionId: string) => {
    const commission = commissions.find(c => c.id === commissionId)
    if (commission) {
      setSelectedCommission(commission)
      setViewModalOpen(true)
    }
  }

  const handleEditCommission = (commissionId: string) => {
    const commission = commissions.find(c => c.id === commissionId)
    if (commission) {
      setSelectedCommission(commission)
      setEditForm(commission)
      setEditModalOpen(true)
    }
  }

  const handleMarkPaid = (commissionId: string) => {
    const commission = commissions.find(c => c.id === commissionId)
    if (commission && commission.status !== 'paid') {
      // Actually update the commission in state
      setCommissions(prevCommissions =>
        prevCommissions.map(c =>
          c.id === commissionId
            ? {
                ...c,
                status: 'paid',
                paidDate: new Date().toISOString().split('T')[0],
                paidAmount: c.outstandingAmount,
                outstandingAmount: 0,
                notes: `${c.notes} | PAID: ${formatCurrency(c.outstandingAmount)} on ${new Date().toLocaleDateString()}`
              }
            : c
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
            <p class="font-semibold">Commission Paid</p>
            <p class="text-sm">${commission.dealNumber} - ${formatCurrency(commission.outstandingAmount)}</p>
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
            <p class="text-sm">Commission already paid or invalid status</p>
          </div>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 4000)
    }
  }

  const handleGenerateReport = () => {
    setReportModalOpen(true)
  }

  const handleExportData = () => {
    // Create export data
    const exportData = filteredCommissions.map(commission => ({
      'Deal Number': commission.dealNumber,
      'Client Name': commission.clientName,
      'Property': commission.propertyTitle,
      'Deal Value': formatCurrency(commission.dealValue),
      'Commission Rate': `${commission.commissionRate}%`,
      'Commission Amount': formatCurrency(commission.commissionAmount),
      'Status': commission.status.toUpperCase(),
      'Deal Closed': commission.dealClosedDate,
      'Payment Due': commission.paymentDueDate,
      'Paid Date': commission.paidDate || 'Not Paid',
      'Paid Amount': formatCurrency(commission.paidAmount),
      'Outstanding': formatCurrency(commission.outstandingAmount),
      'Agent': commission.agentName,
      'Notes': commission.notes
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
    a.download = `commissions-export-${new Date().toISOString().split('T')[0]}.csv`
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
          <p class="font-semibold">Commissions Exported</p>
          <p class="text-sm">${filteredCommissions.length} records exported to CSV</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 4000)
  }

  const handleAddCommission = () => {
    setEditForm({
      dealNumber: `DEAL-2025-${String(commissions.length + 1).padStart(3, '0')}`,
      clientName: '',
      propertyTitle: '',
      dealValue: 0,
      commissionRate: 3.0,
      commissionAmount: 0,
      status: 'pending',
      agentName: 'Max McCarthy',
      notes: 'New commission - awaiting approval'
    })
    setAddModalOpen(true)
  }

  const handleApproveCommission = (commissionId: string) => {
    const commission = commissions.find(c => c.id === commissionId)
    if (commission && commission.status === 'pending') {
      // Calculate new due date (7 days from now)
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + 7)
      
      setCommissions(prevCommissions =>
        prevCommissions.map(c =>
          c.id === commissionId
            ? {
                ...c,
                status: 'approved',
                paymentDueDate: dueDate.toISOString().split('T')[0],
                notes: `${c.notes} | APPROVED: Commission approved on ${new Date().toLocaleDateString()}`
              }
            : c
        )
      )
      // Show professional success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Commission Approved</p>
            <p class="text-sm">${commission.dealNumber} - ${formatCurrency(commission.commissionAmount)}</p>
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
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Cannot Approve</p>
            <p class="text-sm">Only pending commissions can be approved</p>
          </div>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 4000)
    }
  }

  const handleDisputeCommission = (commissionId: string) => {
    const commission = commissions.find(c => c.id === commissionId)
    if (commission && commission.status !== 'disputed' && commission.status !== 'paid') {
      setCommissions(prevCommissions =>
        prevCommissions.map(c =>
          c.id === commissionId
            ? {
                ...c,
                status: 'disputed',
                notes: `${c.notes} | DISPUTED: Commission dispute raised on ${new Date().toLocaleDateString()}`
              }
            : c
        )
      )
      // Show professional warning notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Commission Disputed</p>
            <p class="text-sm">${commission.dealNumber} - Under review</p>
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
            <p class="font-semibold">Cannot Dispute</p>
            <p class="text-sm">Commission already paid or disputed</p>
          </div>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 4000)
    }
  }

  const filteredCommissions = commissions.filter(commission => {
    const matchesSearch = commission.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.dealNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || commission.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Calculate summary statistics
  const totalCommissions = filteredCommissions.reduce((sum, comm) => sum + comm.commissionAmount, 0)
  const paidCommissions = filteredCommissions.reduce((sum, comm) => sum + comm.paidAmount, 0)
  const outstandingCommissions = filteredCommissions.reduce((sum, comm) => sum + comm.outstandingAmount, 0)
  const avgCommissionRate = filteredCommissions.length > 0 
    ? filteredCommissions.reduce((sum, comm) => sum + comm.commissionRate, 0) / filteredCommissions.length 
    : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Commissions</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Commission Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Report
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddCommission}>
            <Plus className="h-4 w-4 mr-2" />
            Add Commission
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Commissions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalCommissions)}
                </p>
              </div>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(paidCommissions)}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(outstandingCommissions)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {avgCommissionRate.toFixed(1)}%
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
            placeholder="Search commissions..."
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
          {commissionStatuses.map(status => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>

        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="current_month">Current Month</option>
          <option value="last_month">Last Month</option>
          <option value="current_quarter">Current Quarter</option>
          <option value="ytd">Year to Date</option>
        </select>
      </div>

      {/* Commissions List */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Tracking</CardTitle>
          <CardDescription>
            Monitor all commission payments and outstanding amounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCommissions.map((commission) => {
              const statusInfo = getStatusInfo(commission.status)
              const StatusIcon = statusInfo.icon
              const daysOverdue = getDaysOverdue(commission.paymentDueDate)
              
              return (
                <Card key={commission.id} className={`border-l-4 ${
                  commission.status === 'paid' ? 'border-l-green-500' :
                  commission.status === 'disputed' ? 'border-l-red-500' :
                  daysOverdue > 0 ? 'border-l-orange-500' : 'border-l-blue-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <StatusIcon className="h-5 w-5 text-gray-600" />
                          <h4 className="font-medium text-lg">{commission.dealNumber}</h4>
                          <Badge className={statusInfo.color}>
                            {statusInfo.name}
                          </Badge>
                          {daysOverdue > 0 && commission.status !== 'paid' && (
                            <Badge className="bg-orange-100 text-orange-800">
                              {daysOverdue} days overdue
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Deal Info</h5>
                            <div className="space-y-1 text-gray-600">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {commission.clientName}
                              </div>
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {commission.propertyTitle}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                Deal: {formatCurrency(commission.dealValue)}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Commission</h5>
                            <div className="space-y-1 text-gray-600">
                              <div>Rate: {commission.commissionRate}%</div>
                              <div className="font-medium text-lg text-green-600">
                                {formatCurrency(commission.commissionAmount)}
                              </div>
                              <div>Agent: {commission.agentName}</div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Payment Status</h5>
                            <div className="space-y-1 text-gray-600">
                              <div>Paid: {formatCurrency(commission.paidAmount)}</div>
                              <div>Outstanding: {formatCurrency(commission.outstandingAmount)}</div>
                              {commission.paidDate ? (
                                <div>Paid: {new Date(commission.paidDate).toLocaleDateString()}</div>
                              ) : (
                                <div>Due: {new Date(commission.paymentDueDate).toLocaleDateString()}</div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Timeline</h5>
                            <div className="space-y-1 text-gray-600">
                              <div>Closed: {new Date(commission.dealClosedDate).toLocaleDateString()}</div>
                              <div className="text-xs mt-2">
                                <strong>Notes:</strong> {commission.notes}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4 flex-wrap">
                        {commission.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApproveCommission(commission.id)}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        )}
                        {commission.status !== 'paid' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMarkPaid(commission.id)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <CreditCard className="h-4 w-4 mr-1" />
                            Mark Paid
                          </Button>
                        )}
                        {commission.status !== 'disputed' && commission.status !== 'paid' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDisputeCommission(commission.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Dispute
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewCommission(commission.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditCommission(commission.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {filteredCommissions.length === 0 && (
              <div className="text-center py-12">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No commissions found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Commission data will appear here once deals are closed.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional View Modal */}
      {viewModalOpen && selectedCommission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Commission Details - {selectedCommission.dealNumber}</h2>
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
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Deal Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Deal Number:</span> {selectedCommission.dealNumber}</p>
                      <p><span className="font-medium">Client:</span> {selectedCommission.clientName}</p>
                      <p><span className="font-medium">Property:</span> {selectedCommission.propertyTitle}</p>
                      <p><span className="font-medium">Deal Value:</span> {formatCurrency(selectedCommission.dealValue)}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Commission Breakdown</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Rate:</span> {selectedCommission.commissionRate}%</p>
                      <p><span className="font-medium">Total Amount:</span> {formatCurrency(selectedCommission.commissionAmount)}</p>
                      <p><span className="font-medium">Paid:</span> {formatCurrency(selectedCommission.paidAmount)}</p>
                      <p><span className="font-medium">Outstanding:</span> {formatCurrency(selectedCommission.outstandingAmount)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Status</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Status:</span> 
                        <Badge className={getStatusInfo(selectedCommission.status).color + " ml-2"}>
                          {getStatusInfo(selectedCommission.status).name}
                        </Badge>
                      </p>
                      <p><span className="font-medium">Agent:</span> {selectedCommission.agentName}</p>
                      <p><span className="font-medium">Deal Closed:</span> {new Date(selectedCommission.dealClosedDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Payment Due:</span> {new Date(selectedCommission.paymentDueDate).toLocaleDateString()}</p>
                      {selectedCommission.paidDate && (
                        <p><span className="font-medium">Paid Date:</span> {new Date(selectedCommission.paidDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedCommission.notes}</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
              <Button onClick={() => {
                setViewModalOpen(false)
                handleEditCommission(selectedCommission.id)
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Commission
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Edit Modal */}
      {editModalOpen && selectedCommission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Edit Commission - {selectedCommission.dealNumber}</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                    <Input
                      value={editForm.propertyTitle || ''}
                      onChange={(e) => setEditForm({...editForm, propertyTitle: e.target.value})}
                      placeholder="Enter property title"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={editForm.commissionRate || 0}
                      onChange={(e) => setEditForm({...editForm, commissionRate: parseFloat(e.target.value)})}
                      placeholder="Enter commission rate"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission Amount (AED)</label>
                    <Input
                      type="number"
                      value={editForm.commissionAmount || 0}
                      onChange={(e) => setEditForm({...editForm, commissionAmount: parseInt(e.target.value)})}
                      placeholder="Enter commission amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editForm.status || 'pending'}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {commissionStatuses.map(status => (
                        <option key={status.id} value={status.id}>{status.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name</label>
                    <Input
                      value={editForm.agentName || ''}
                      onChange={(e) => setEditForm({...editForm, agentName: e.target.value})}
                      placeholder="Enter agent name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Due Date</label>
                    <Input
                      type="date"
                      value={editForm.paymentDueDate || ''}
                      onChange={(e) => setEditForm({...editForm, paymentDueDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={editForm.notes || ''}
                  onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                  placeholder="Enter commission notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  setIsSubmitting(true)
                  setTimeout(() => {
                    setCommissions(prevCommissions =>
                      prevCommissions.map(c =>
                        c.id === selectedCommission.id ? { ...c, ...editForm } : c
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
                          <p class="font-semibold">Commission Updated</p>
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

      {/* Professional Add Commission Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Create New Commission</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                    <Input
                      value={editForm.propertyTitle || ''}
                      onChange={(e) => setEditForm({...editForm, propertyTitle: e.target.value})}
                      placeholder="Enter property title"
                      required
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
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={editForm.commissionRate || 3.0}
                      onChange={(e) => setEditForm({...editForm, commissionRate: parseFloat(e.target.value)})}
                      placeholder="Enter commission rate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission Amount (AED)</label>
                    <Input
                      type="number"
                      value={editForm.commissionAmount || 0}
                      onChange={(e) => setEditForm({...editForm, commissionAmount: parseInt(e.target.value)})}
                      placeholder="Enter commission amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent</label>
                    <Input
                      value={editForm.agentName || ''}
                      onChange={(e) => setEditForm({...editForm, agentName: e.target.value})}
                      placeholder="Enter agent name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Due Date</label>
                    <Input
                      type="date"
                      value={editForm.paymentDueDate || ''}
                      onChange={(e) => setEditForm({...editForm, paymentDueDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Notes</label>
                <textarea
                  value={editForm.notes || ''}
                  onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                  placeholder="Enter initial notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  if (!editForm.clientName || !editForm.propertyTitle) {
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
                    const newCommission: Commission = {
                      id: String(commissions.length + 1),
                      dealNumber: editForm.dealNumber || '',
                      clientName: editForm.clientName || '',
                      propertyTitle: editForm.propertyTitle || '',
                      dealValue: editForm.dealValue || 0,
                      commissionRate: editForm.commissionRate || 3.0,
                      commissionAmount: editForm.commissionAmount || 0,
                      status: 'pending',
                      dealClosedDate: new Date().toISOString().split('T')[0],
                      paymentDueDate: editForm.paymentDueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                      paidDate: null,
                      paidAmount: 0,
                      outstandingAmount: editForm.commissionAmount || 0,
                      agentName: editForm.agentName || 'Max McCarthy',
                      notes: editForm.notes || 'New commission - awaiting approval'
                    }
                    setCommissions(prevCommissions => [newCommission, ...prevCommissions])
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
                          <p class="font-semibold">New Commission Created</p>
                          <p class="text-sm">${newCommission.dealNumber} added to system</p>
                        </div>
                      </div>
                    `
                    document.body.appendChild(notification)
                    setTimeout(() => document.body.removeChild(notification), 4000)
                  }, 1000)
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Commission'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Generate Commission Report</h2>
              <button 
                onClick={() => setReportModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Report Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Commission Summary</option>
                        <option>Agent Performance</option>
                        <option>Payment Status Report</option>
                        <option>Monthly Analysis</option>
                        <option>Outstanding Commissions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Current Month</option>
                        <option>Last Month</option>
                        <option>Current Quarter</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>PDF Report</option>
                        <option>Excel Spreadsheet</option>
                        <option>CSV Data</option>
                        <option>PowerPoint Presentation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>All Commissions</option>
                        <option>Paid Only</option>
                        <option>Outstanding Only</option>
                        <option>Disputed Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Report Preview</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{filteredCommissions.length}</p>
                        <p className="text-sm text-gray-600">Total Records</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(totalCommissions)}</p>
                        <p className="text-sm text-gray-600">Total Value</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-600">{formatCurrency(outstandingCommissions)}</p>
                        <p className="text-sm text-gray-600">Outstanding</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{avgCommissionRate.toFixed(1)}%</p>
                        <p className="text-sm text-gray-600">Avg Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setReportModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setReportModalOpen(false)
                
                // Show professional success notification
                const notification = document.createElement('div')
                notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md'
                notification.innerHTML = `
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path>
                    </svg>
                    <div>
                      <p class="font-semibold">Report Generated</p>
                      <p class="text-sm">Commission report generation started</p>
                    </div>
                  </div>
                `
                document.body.appendChild(notification)
                setTimeout(() => document.body.removeChild(notification), 4000)
              }}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}