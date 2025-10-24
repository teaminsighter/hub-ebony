'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plug, 
  Settings,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Download,
  Upload,
  Mail,
  MessageSquare,
  Calendar,
  CreditCard,
  BarChart3,
  Phone,
  Globe,
  Database,
  Key,
  Link,
  ExternalLink,
  Edit,
  Plus,
  Copy,
  Eye,
  EyeOff,
  CheckCircle,
  Save,
  Trash2,
  ArrowRight,
  FileText,
  Zap
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  category: 'communication' | 'analytics' | 'payment' | 'marketing' | 'automation' | 'storage'
  status: 'connected' | 'disconnected' | 'error' | 'pending'
  isEnabled: boolean
  lastSync: string
  version: string
  configUrl?: string
  settings: {
    apiKey?: string
    webhookUrl?: string
    syncFrequency?: string
    [key: string]: any
  }
}

interface IntegrationsData {
  integrations: Integration[]
  totalIntegrations: number
  connectedIntegrations: number
  failedIntegrations: number
  pendingIntegrations: number
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Modal states
  const [setupModalOpen, setSetupModalOpen] = useState(false)
  const [configModalOpen, setConfigModalOpen] = useState(false)
  const [webhookModalOpen, setWebhookModalOpen] = useState(false)
  const [servicesModalOpen, setServicesModalOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    setLoading(true)
    try {
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const demoData: IntegrationsData = {
        integrations: [
          {
            id: 'mailchimp',
            name: 'Mailchimp',
            description: 'Email marketing and automation platform for newsletter campaigns and lead nurturing',
            category: 'marketing',
            status: 'connected',
            isEnabled: true,
            lastSync: '2024-01-23T14:30:00Z',
            version: '3.0.55',
            configUrl: 'https://mailchimp.com/integrations/hubebony',
            settings: {
              apiKey: 'mc_***************xyz',
              listId: 'eb12345',
              syncFrequency: 'hourly',
              segmentLeads: true
            }
          },
          {
            id: 'whatsapp',
            name: 'WhatsApp Business',
            description: 'Direct messaging for client communication and consultation booking confirmations',
            category: 'communication',
            status: 'connected',
            isEnabled: true,
            lastSync: '2024-01-23T12:15:00Z',
            version: '2.1.3',
            settings: {
              phoneNumber: '+971-***-***-1234',
              webhookUrl: 'https://hubebony.com/webhook/whatsapp',
              autoResponder: true
            }
          },
          {
            id: 'google_analytics',
            name: 'Google Analytics',
            description: 'Website traffic analysis and conversion tracking for property listings and consultations',
            category: 'analytics',
            status: 'connected',
            isEnabled: true,
            lastSync: '2024-01-23T13:00:00Z',
            version: 'GA4',
            settings: {
              measurementId: 'G-XXXXXXXXXX',
              apiSecret: 'api_***************',
              enhancedEcommerce: true,
              goalTracking: true
            }
          },
          {
            id: 'stripe',
            name: 'Stripe',
            description: 'Payment processing for consultation fees and property booking deposits',
            category: 'payment',
            status: 'connected',
            isEnabled: true,
            lastSync: '2024-01-23T11:45:00Z',
            version: '2023-10-16',
            settings: {
              publishableKey: 'pk_***************',
              webhookEndpoint: 'https://hubebony.com/webhook/stripe',
              currency: 'AED',
              paymentMethods: ['card', 'bank_transfer']
            }
          },
          {
            id: 'calendly',
            name: 'Calendly',
            description: 'Automated consultation scheduling with calendar integration and reminder system',
            category: 'automation',
            status: 'error',
            isEnabled: true,
            lastSync: '2024-01-22T16:30:00Z',
            version: '1.0.58',
            settings: {
              apiToken: 'cal_***************',
              eventType: 'property-consultation',
              timezone: 'Asia/Dubai',
              bufferTime: 15
            }
          },
          {
            id: 'hubspot',
            name: 'HubSpot CRM',
            description: 'Customer relationship management for lead tracking and sales pipeline management',
            category: 'marketing',
            status: 'disconnected',
            isEnabled: false,
            lastSync: '2024-01-15T09:20:00Z',
            version: 'API v3',
            settings: {
              apiKey: '',
              portalId: '',
              syncContacts: true,
              syncDeals: true
            }
          },
          {
            id: 'twilio',
            name: 'Twilio SMS',
            description: 'SMS messaging for appointment reminders and property update notifications',
            category: 'communication',
            status: 'pending',
            isEnabled: false,
            lastSync: '2024-01-20T14:00:00Z',
            version: '2023-06-01',
            settings: {
              accountSid: 'AC***************',
              authToken: '***************',
              fromNumber: '+971-***-***-5678'
            }
          },
          {
            id: 'aws_s3',
            name: 'AWS S3',
            description: 'Cloud storage for property images, documents, and media file management',
            category: 'storage',
            status: 'connected',
            isEnabled: true,
            lastSync: '2024-01-23T15:00:00Z',
            version: '2006-03-01',
            settings: {
              bucketName: 'hubebony-media',
              region: 'me-south-1',
              accessKeyId: 'AKIA***************',
              encryption: true
            }
          }
        ],
        totalIntegrations: 8,
        connectedIntegrations: 5,
        failedIntegrations: 1,
        pendingIntegrations: 1
      }
      
      setIntegrations(demoData)
    } catch (error) {
      console.error('Error fetching integrations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration)
    setSetupModalOpen(true)
  }

  const handleDisconnect = async (integration: Integration) => {
    if (confirm(`Are you sure you want to disconnect ${integration.name}? This will stop all data synchronization.`)) {
      setIsSubmitting(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Update integration status
        setIntegrations(prev => prev ? {
          ...prev,
          integrations: prev.integrations.map(i => 
            i.id === integration.id 
              ? { ...i, status: 'disconnected' as const, isEnabled: false }
              : i
          ),
          connectedIntegrations: prev.connectedIntegrations - 1
        } : null)
      } catch (error) {
        console.error('Disconnect failed:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration)
    setConfigModalOpen(true)
  }

  const handleTest = async (integration: Integration) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(`${integration.name} connection test successful`)
    } catch (error) {
      console.error('Connection test failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSync = async (integration: Integration) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update last sync time
      setIntegrations(prev => prev ? {
        ...prev,
        integrations: prev.integrations.map(i => 
          i.id === integration.id 
            ? { ...i, lastSync: new Date().toISOString() }
            : i
        )
      } : null)
    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExportConfig = async () => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate config export
      const configData = {
        integrations: integrations?.integrations.map(i => ({
          id: i.id,
          name: i.name,
          status: i.status,
          isEnabled: i.isEnabled,
          settings: Object.fromEntries(
            Object.entries(i.settings).map(([key, value]) => [
              key,
              typeof value === 'string' && value.includes('***') ? '[REDACTED]' : value
            ])
          )
        })),
        exportDate: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `hubebony_integrations_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImportConfig = () => {
    setServicesModalOpen(true)
  }

  const handleWebhookConfig = () => {
    setWebhookModalOpen(true)
  }

  const handleConnectIntegration = async (integrationId: string, credentials: any) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update integration status to connected
      setIntegrations(prev => prev ? {
        ...prev,
        integrations: prev.integrations.map(i => 
          i.id === integrationId 
            ? { 
                ...i, 
                status: 'connected' as const, 
                isEnabled: true,
                lastSync: new Date().toISOString(),
                settings: { ...i.settings, ...credentials }
              }
            : i
        ),
        connectedIntegrations: prev.connectedIntegrations + 1
      } : null)
      
      setSetupModalOpen(false)
      setSelectedIntegration(null)
    } catch (error) {
      console.error('Connection failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'communication': return MessageSquare
      case 'analytics': return BarChart3
      case 'payment': return CreditCard
      case 'marketing': return Mail
      case 'automation': return Calendar
      case 'storage': return Database
      default: return Plug
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'communication': return 'bg-blue-100 text-blue-800'
      case 'analytics': return 'bg-purple-100 text-purple-800'
      case 'payment': return 'bg-green-100 text-green-800'
      case 'marketing': return 'bg-orange-100 text-orange-800'
      case 'automation': return 'bg-teal-100 text-teal-800'
      case 'storage': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Check className="h-4 w-4 text-green-600" />
      case 'disconnected': return <X className="h-4 w-4 text-gray-400" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default: return <X className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'disconnected': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations?.integrations || []
    : integrations?.integrations.filter(i => i.category === selectedCategory) || []

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!integrations) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Plug className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations available</h3>
            <p className="text-gray-500 text-center">
              Connect your favorite tools to enhance functionality.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleWebhookConfig}>
            <Zap className="h-4 w-4 mr-2" />
            Webhooks
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportConfig}>
            <Upload className="h-4 w-4 mr-2" />
            Import Config
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportConfig} disabled={isSubmitting}>
            {isSubmitting ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export Config
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
            <Plug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.totalIntegrations}</div>
            <p className="text-xs text-muted-foreground">
              Available services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.connectedIntegrations}</div>
            <p className="text-xs text-green-600">
              Active connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.failedIntegrations}</div>
            <p className="text-xs text-red-600">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.pendingIntegrations}</div>
            <p className="text-xs text-yellow-600">
              Setup required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="pt-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Categories</option>
            <option value="communication">Communication</option>
            <option value="analytics">Analytics</option>
            <option value="payment">Payment</option>
            <option value="marketing">Marketing</option>
            <option value="automation">Automation</option>
            <option value="storage">Storage</option>
          </select>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIntegrations.map((integration) => {
          const Icon = getCategoryIcon(integration.category)
          return (
            <Card key={integration.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-gray-600" />
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getCategoryColor(integration.category)}>
                        {integration.category}
                      </Badge>
                      <Badge className={getStatusColor(integration.status)}>
                        {getStatusIcon(integration.status)}
                        <span className="ml-1">{integration.status}</span>
                      </Badge>
                      {integration.configUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(integration.configUrl, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">v{integration.version}</p>
                  <p className="text-xs text-gray-400">
                    Last sync: {new Date(integration.lastSync).toLocaleDateString()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{integration.description}</CardDescription>
                
                {/* Configuration Details */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Configuration:</h4>
                  <div className="space-y-1 text-xs">
                    {Object.entries(integration.settings).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-mono">
                          {typeof value === 'string' && value.includes('***') 
                            ? value 
                            : typeof value === 'boolean' 
                              ? value ? 'Enabled' : 'Disabled'
                              : String(value)
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfigure(integration)}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(integration)}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sync
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTest(integration)}
                      >
                        <Link className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(integration)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleConnect(integration)}
                      >
                        Connect
                      </Button>
                      {integration.status === 'error' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTest(integration)}
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Retry
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredIntegrations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Plug className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
            <p className="text-gray-500 text-center">
              Try selecting a different category.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Integration Setup Modal */}
      {setupModalOpen && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Connect {selectedIntegration.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setSetupModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                {React.createElement(getCategoryIcon(selectedIntegration.category), { className: "h-12 w-12 text-blue-600" })}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedIntegration.name}</h3>
                  <p className="text-sm text-gray-600">{selectedIntegration.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Authentication</h3>
                
                {selectedIntegration.category === 'payment' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Publishable Key</label>
                      <input 
                        type="text" 
                        placeholder="pk_live_..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                      <div className="flex gap-2">
                        <input 
                          type={showApiKey ? "text" : "password"}
                          placeholder="sk_live_..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Endpoint</label>
                      <div className="flex gap-2">
                        <input 
                          type="url" 
                          value="https://hubebony.com/webhook/stripe"
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : selectedIntegration.category === 'marketing' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                      <div className="flex gap-2">
                        <input 
                          type={showApiKey ? "text" : "password"}
                          placeholder="Enter API key..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">List ID</label>
                      <input 
                        type="text" 
                        placeholder="Enter mailing list ID..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ) : selectedIntegration.category === 'communication' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+971-XX-XXX-XXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Access Token</label>
                      <div className="flex gap-2">
                        <input 
                          type={showApiKey ? "text" : "password"}
                          placeholder="Enter access token..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                      <div className="flex gap-2">
                        <input 
                          type={showApiKey ? "text" : "password"}
                          placeholder="Enter API key..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Integration Settings</h4>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded mr-2" />
                    <span className="text-sm">Enable automatic synchronization</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" />
                    <span className="text-sm">Send notifications on sync errors</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded mr-2" />
                    <span className="text-sm">Enable webhook notifications</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sync Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="real-time">Real-time</option>
                    <option value="hourly">Every hour</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="manual">Manual only</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setSetupModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleConnectIntegration(selectedIntegration.id, { apiKey: 'demo_key', configured: true })}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Connect Integration
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {configModalOpen && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Configure {selectedIntegration.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setConfigModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Connection Settings</h3>
                  
                  <div className="space-y-3">
                    {Object.entries(selectedIntegration.settings).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        {typeof value === 'boolean' ? (
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              defaultChecked={value}
                              className="rounded mr-2"
                            />
                            <span className="text-sm">
                              {value ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        ) : typeof value === 'string' && value.includes('***') ? (
                          <div className="flex gap-2">
                            <input 
                              type="password"
                              defaultValue={value}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <input 
                            type="text"
                            defaultValue={String(value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Advanced Options</h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Data Synchronization</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded mr-2" />
                          <span className="text-sm">Bidirectional sync</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded mr-2" />
                          <span className="text-sm">Real-time updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded mr-2" />
                          <span className="text-sm">Conflict resolution</span>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Error Handling</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded mr-2" />
                          <span className="text-sm">Retry failed requests</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded mr-2" />
                          <span className="text-sm">Email error notifications</span>
                        </label>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Max Retry Attempts</label>
                          <input 
                            type="number" 
                            defaultValue="3"
                            min="1"
                            max="10"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Rate Limiting</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Requests per minute</label>
                          <input 
                            type="number" 
                            defaultValue="60"
                            min="1"
                            max="1000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded mr-2" />
                          <span className="text-sm">Respect API rate limits</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Connection Test</h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      Test the connection to verify that all settings are correct and the integration is working properly.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleTest(selectedIntegration)} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Link className="h-4 w-4 mr-2" />
                    )}
                    Test Connection
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setConfigModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Configuration Modal */}
      {webhookModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Webhook Configuration</h2>
                <Button variant="ghost" size="sm" onClick={() => setWebhookModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Webhook Endpoints</h3>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Stripe Payments', url: 'https://hubebony.com/webhook/stripe', status: 'active' },
                      { name: 'WhatsApp Messages', url: 'https://hubebony.com/webhook/whatsapp', status: 'active' },
                      { name: 'Mailchimp Events', url: 'https://hubebony.com/webhook/mailchimp', status: 'inactive' },
                      { name: 'Calendly Bookings', url: 'https://hubebony.com/webhook/calendly', status: 'error' }
                    ].map((webhook) => (
                      <div key={webhook.name} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                          <Badge className={webhook.status === 'active' ? 'bg-green-100 text-green-800' : webhook.status === 'error' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                            {webhook.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mb-3">
                          <input 
                            type="url" 
                            value={webhook.url}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
                          />
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Link className="h-4 w-4 mr-1" />
                            Test
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Webhook Endpoint
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Webhook Events</h3>
                  
                  <div className="space-y-3">
                    {[
                      { category: 'Payment Events', events: ['payment.succeeded', 'payment.failed', 'subscription.created'] },
                      { category: 'User Events', events: ['user.created', 'user.updated', 'user.deleted'] },
                      { category: 'Consultation Events', events: ['consultation.booked', 'consultation.cancelled', 'consultation.completed'] },
                      { category: 'Property Events', events: ['property.viewed', 'property.inquired', 'property.favorited'] }
                    ].map((group) => (
                      <div key={group.category} className="p-4 border rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">{group.category}</h4>
                        <div className="space-y-2">
                          {group.events.map((event) => (
                            <label key={event} className="flex items-center">
                              <input type="checkbox" defaultChecked className="rounded mr-2" />
                              <span className="text-sm font-mono">{event}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Secret</label>
                      <div className="flex gap-2">
                        <input 
                          type="password" 
                          value="whsec_***************"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono"
                        />
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Verify webhook signatures</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Enable SSL verification</span>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Retry Attempts</label>
                      <input 
                        type="number" 
                        defaultValue="3"
                        min="1"
                        max="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Log webhook requests</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Send failure notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setWebhookModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Webhook Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Third-party Services Modal */}
      {servicesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Third-party Services & Import</h2>
                <Button variant="ghost" size="sm" onClick={() => setServicesModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Available Services</h3>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Zapier', icon: Zap, description: 'Connect to 5,000+ apps with automation workflows', category: 'automation' },
                      { name: 'Make (Integromat)', icon: Settings, description: 'Visual automation platform for complex workflows', category: 'automation' },
                      { name: 'Slack', icon: MessageSquare, description: 'Team communication and notification integration', category: 'communication' },
                      { name: 'Microsoft Teams', icon: MessageSquare, description: 'Collaborate with Microsoft Teams integration', category: 'communication' },
                      { name: 'Google Workspace', icon: Globe, description: 'Gmail, Calendar, Drive, and Docs integration', category: 'productivity' },
                      { name: 'Dropbox', icon: Database, description: 'Cloud file storage and document management', category: 'storage' }
                    ].map((service) => (
                      <div key={service.name} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <service.icon className="h-8 w-8 text-gray-600" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Import Configuration</h3>
                  
                  <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Configuration File</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Import integration settings from a backup JSON file
                    </p>
                    
                    <div className="space-y-3">
                      <input 
                        type="file" 
                        accept=".json"
                        className="hidden" 
                        id="configImport"
                      />
                      <label htmlFor="configImport">
                        <Button variant="outline" className="cursor-pointer">
                          <FileText className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                      </label>
                      
                      <div className="text-xs text-gray-500">
                        <p>Supported format: JSON</p>
                        <p>Max file size: 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Import Options</h4>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Overwrite existing configurations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Skip invalid configurations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Create backup before import</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Test connections after import</span>
                    </label>
                  </div>

                  <Button className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Import Configuration
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Custom Integration</h3>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Plus className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Need a custom integration?</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Our team can help you build custom integrations for your specific business needs.
                      </p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setServicesModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}