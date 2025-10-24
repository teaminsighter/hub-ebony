'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Shield, 
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Globe,
  Activity,
  Download,
  Refresh,
  Settings,
  Ban,
  Zap,
  FileText,
  Bell,
  X,
  Save,
  Upload,
  Calendar,
  Database,
  Server,
  Monitor,
  Smartphone,
  Mail,
  MessageSquare,
  Trash2,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Copy,
  RotateCcw
} from 'lucide-react'

interface SecurityEvent {
  id: string
  type: 'login_success' | 'login_failed' | 'password_change' | 'permission_change' | 'suspicious_activity'
  user: string
  description: string
  timestamp: string
  ipAddress: string
  location: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

interface SecurityPolicy {
  id: string
  name: string
  description: string
  enabled: boolean
  category: 'authentication' | 'access' | 'data' | 'monitoring'
  settings: Record<string, any>
}

interface SecurityData {
  events: SecurityEvent[]
  policies: SecurityPolicy[]
  securityScore: number
  activeThreats: number
  blockedIPs: string[]
  activeSessions: number
  failedLogins: number
  lastSecurityScan: string
}

export default function SecurityPage() {
  const [security, setSecurity] = useState<SecurityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'events' | 'policies' | 'sessions'>('overview')

  // Modal state management
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [accessModalOpen, setAccessModalOpen] = useState(false)
  const [auditModalOpen, setAuditModalOpen] = useState(false)
  const [backupModalOpen, setBackupModalOpen] = useState(false)
  const [alertsModalOpen, setAlertsModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [scanModalOpen, setScanModalOpen] = useState(false)
  const [policyModalOpen, setPolicyModalOpen] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<SecurityPolicy | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStatus, setScanStatus] = useState<'idle' | 'running' | 'completed'>('idle')

  useEffect(() => {
    fetchSecurity()
  }, [])

  const fetchSecurity = async () => {
    setLoading(true)
    try {
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const demoData: SecurityData = {
        events: [
          {
            id: 'evt_001',
            type: 'login_success',
            user: 'admin@hubebony.com',
            description: 'Successful admin login from Dubai office',
            timestamp: '2024-01-23T14:30:00Z',
            ipAddress: '185.33.21.45',
            location: 'Dubai, UAE',
            riskLevel: 'low'
          },
          {
            id: 'evt_002',
            type: 'login_failed',
            user: 'unknown@external.com',
            description: 'Failed login attempt with invalid credentials',
            timestamp: '2024-01-23T13:45:00Z',
            ipAddress: '45.142.212.67',
            location: 'Unknown Location',
            riskLevel: 'medium'
          },
          {
            id: 'evt_003',
            type: 'suspicious_activity',
            user: 'sales@hubebony.com',
            description: 'Multiple rapid API requests detected',
            timestamp: '2024-01-23T12:20:00Z',
            ipAddress: '192.168.1.45',
            location: 'Dubai, UAE',
            riskLevel: 'high'
          },
          {
            id: 'evt_004',
            type: 'password_change',
            user: 'content@hubebony.com',
            description: 'Password changed successfully',
            timestamp: '2024-01-23T11:15:00Z',
            ipAddress: '185.33.21.47',
            location: 'Dubai, UAE',
            riskLevel: 'low'
          },
          {
            id: 'evt_005',
            type: 'permission_change',
            user: 'admin@hubebony.com',
            description: 'User permissions updated for analytics@hubebony.com',
            timestamp: '2024-01-23T10:30:00Z',
            ipAddress: '185.33.21.45',
            location: 'Dubai, UAE',
            riskLevel: 'medium'
          }
        ],
        policies: [
          {
            id: 'pol_001',
            name: 'Two-Factor Authentication',
            description: 'Require 2FA for all admin accounts',
            enabled: true,
            category: 'authentication',
            settings: {
              mandatory: true,
              methods: ['app', 'sms'],
              backupCodes: 8
            }
          },
          {
            id: 'pol_002',
            name: 'Password Complexity',
            description: 'Enforce strong password requirements',
            enabled: true,
            category: 'authentication',
            settings: {
              minLength: 12,
              requireSymbols: true,
              requireNumbers: true,
              expiration: 90
            }
          },
          {
            id: 'pol_003',
            name: 'Session Timeout',
            description: 'Automatically logout inactive users',
            enabled: true,
            category: 'access',
            settings: {
              timeoutMinutes: 30,
              warningMinutes: 5
            }
          },
          {
            id: 'pol_004',
            name: 'IP Restriction',
            description: 'Limit access to specific IP ranges',
            enabled: false,
            category: 'access',
            settings: {
              allowedIPs: ['185.33.21.0/24', '192.168.1.0/24'],
              blockUnknown: false
            }
          },
          {
            id: 'pol_005',
            name: 'Data Encryption',
            description: 'Encrypt sensitive data at rest and in transit',
            enabled: true,
            category: 'data',
            settings: {
              algorithm: 'AES-256',
              keyRotation: 'monthly'
            }
          },
          {
            id: 'pol_006',
            name: 'Activity Monitoring',
            description: 'Monitor and log all admin activities',
            enabled: true,
            category: 'monitoring',
            settings: {
              logLevel: 'detailed',
              retention: 365,
              alertThreshold: 'medium'
            }
          }
        ],
        securityScore: 87,
        activeThreats: 2,
        blockedIPs: ['45.142.212.67', '192.168.100.1', '10.0.0.99'],
        activeSessions: 4,
        failedLogins: 12,
        lastSecurityScan: '2024-01-23T08:00:00Z'
      }
      
      setSecurity(demoData)
    } catch (error) {
      console.error('Error fetching security:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRunSecurityScan = () => {
    setScanModalOpen(true)
  }

  const handleExportLogs = () => {
    setExportModalOpen(true)
  }

  const handleConfigureAlerts = () => {
    setAlertsModalOpen(true)
  }

  const handleBlockIP = (ip: string) => {
    if (!security) return
    setSecurity({
      ...security,
      blockedIPs: [...security.blockedIPs, ip]
    })
  }

  const handleUnblockIP = (ip: string) => {
    if (!security) return
    setSecurity({
      ...security,
      blockedIPs: security.blockedIPs.filter(blockedIP => blockedIP !== ip)
    })
  }

  const handleTogglePolicy = (policy: SecurityPolicy) => {
    if (!security) return
    setSecurity({
      ...security,
      policies: security.policies.map(p => 
        p.id === policy.id ? { ...p, enabled: !p.enabled } : p
      )
    })
  }

  const handleConfigurePolicy = (policy: SecurityPolicy) => {
    setSelectedPolicy(policy)
    setPolicyModalOpen(true)
  }

  const runSecurityScan = async () => {
    setScanStatus('running')
    setScanProgress(0)
    
    // Simulate scan progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setScanProgress(i)
    }
    
    setScanStatus('completed')
    // Update security score
    if (security) {
      setSecurity({ ...security, securityScore: 92, lastSecurityScan: new Date().toISOString() })
    }
  }

  const exportSecurityLogs = async (format: 'csv' | 'pdf' | 'json', dateRange: string) => {
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const filename = `security-logs-${dateRange}.${format}`
    // In real implementation, this would generate and download the file
    console.log(`Exporting ${filename}`)
  }

  const saveAlertConfiguration = async (config: any) => {
    // Simulate saving alert configuration
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Alert configuration saved:', config)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login_success': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'login_failed': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'password_change': return <Key className="h-4 w-4 text-blue-600" />
      case 'permission_change': return <Users className="h-4 w-4 text-purple-600" />
      case 'suspicious_activity': return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return Key
      case 'access': return Lock
      case 'data': return Shield
      case 'monitoring': return Eye
      default: return Settings
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Security</h1>
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

  if (!security) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Security</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Security data unavailable</h3>
            <p className="text-gray-500 text-center">
              Unable to load security information at this time.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Security</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleConfigureAlerts}>
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button onClick={handleRunSecurityScan}>
            <Shield className="h-4 w-4 mr-2" />
            Security Scan
          </Button>
        </div>
      </div>

      {/* Security Score & Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{security.securityScore}/100</div>
            <p className="text-xs text-muted-foreground">
              Excellent security posture
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{security.activeThreats}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked IPs</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{security.blockedIPs.length}</div>
            <p className="text-xs text-muted-foreground">
              Security blocks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{security.activeSessions}</div>
            <p className="text-xs text-muted-foreground">
              Current users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{security.failedLogins}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('events')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'events'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Security Events
          </button>
          <button
            onClick={() => setSelectedTab('policies')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'policies'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Security Policies
          </button>
          <button
            onClick={() => setSelectedTab('sessions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'sessions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sessions & IPs
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
                <CardDescription>Latest security activities and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {security.events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      {getEventIcon(event.type)}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.description}</p>
                        <p className="text-xs text-gray-500">
                          {event.user} • {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Badge className={getRiskColor(event.riskLevel)}>
                        {event.riskLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>Current security configuration status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Two-Factor Authentication</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Password Complexity</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enforced
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Session Timeout</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      30 minutes
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Encryption</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      AES-256
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Activity Monitoring</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">IP Restrictions</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Disabled
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setAuthModalOpen(true)}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Key className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Authentication</h3>
                    <p className="text-xs text-gray-500">Configure 2FA & passwords</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setAccessModalOpen(true)}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Lock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Access Control</h3>
                    <p className="text-xs text-gray-500">Manage permissions & IPs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setAuditModalOpen(true)}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Security Audit</h3>
                    <p className="text-xs text-gray-500">Monitoring & compliance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setBackupModalOpen(true)}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Database className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Backup & Recovery</h3>
                    <p className="text-xs text-gray-500">Data protection & restore</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Security Events Tab */}
      {selectedTab === 'events' && (
        <Card>
          <CardHeader>
            <CardTitle>Security Events</CardTitle>
            <CardDescription>Detailed security event log and activity monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {security.events.map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{event.description}</h4>
                      <Badge className={getRiskColor(event.riskLevel)}>
                        {event.riskLevel}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">User:</span> {event.user}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {event.ipAddress}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {event.location}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Policies Tab */}
      {selectedTab === 'policies' && (
        <div className="space-y-4">
          {security.policies.map((policy) => {
            const Icon = getCategoryIcon(policy.category)
            return (
              <Card key={policy.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Icon className="h-6 w-6 text-gray-600" />
                      <div>
                        <h3 className="font-semibold">{policy.name}</h3>
                        <p className="text-sm text-gray-500">{policy.description}</p>
                        <Badge className="mt-1 capitalize">
                          {policy.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={policy.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {policy.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfigurePolicy(policy)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePolicy(policy)}
                      >
                        {policy.enabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Policy Settings */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Current Settings:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      {Object.entries(policy.settings).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-medium">
                            {typeof value === 'boolean' 
                              ? value ? 'Yes' : 'No'
                              : Array.isArray(value)
                                ? `${value.length} items`
                                : String(value)
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Sessions & IPs Tab */}
      {selectedTab === 'sessions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Blocked IP Addresses</CardTitle>
              <CardDescription>IP addresses blocked for security reasons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {security.blockedIPs.map((ip) => (
                  <div key={ip} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{ip}</p>
                      <p className="text-sm text-gray-500">Blocked for suspicious activity</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnblockIP(ip)}
                    >
                      <Unlock className="h-4 w-4 mr-1" />
                      Unblock
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Currently logged in users and sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">admin@hubebony.com</p>
                    <p className="text-sm text-gray-500">185.33.21.45 • Dubai, UAE</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">Active</Badge>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">sales@hubebony.com</p>
                    <p className="text-sm text-gray-500">192.168.1.45 • Dubai, UAE</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">Active</Badge>
                    <p className="text-xs text-gray-500">30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">content@hubebony.com</p>
                    <p className="text-sm text-gray-500">185.33.21.47 • Dubai, UAE</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-yellow-100 text-yellow-800 mb-1">Idle</Badge>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Scan Modal */}
      {scanModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Security Scan</h2>
              <button
                onClick={() => setScanModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Comprehensive Security Audit</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This scan will check for vulnerabilities, misconfigurations, and compliance issues across your system.
                  </p>
                </div>

                {scanStatus === 'running' && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Scanning...</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {scanStatus === 'completed' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">Scan completed successfully</span>
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                      Security score updated. No critical vulnerabilities found.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Scan Type:</strong> Full System Audit
                  </div>
                  <div>
                    <strong>Duration:</strong> ~2-3 minutes
                  </div>
                  <div>
                    <strong>Coverage:</strong> Authentication, Access Control, Data Protection
                  </div>
                  <div>
                    <strong>Compliance:</strong> SOC 2, ISO 27001
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setScanModalOpen(false)}
                  disabled={scanStatus === 'running'}
                >
                  {scanStatus === 'completed' ? 'Close' : 'Cancel'}
                </Button>
                {scanStatus === 'idle' && (
                  <Button onClick={runSecurityScan}>
                    <Shield className="h-4 w-4 mr-2" />
                    Start Scan
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Logs Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Export Security Logs</h2>
              <button
                onClick={() => setExportModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                  <select className="w-full border border-gray-300 rounded-md p-2 text-sm" defaultValue="csv">
                    <option value="csv">CSV</option>
                    <option value="pdf">PDF Report</option>
                    <option value="json">JSON</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select className="w-full border border-gray-300 rounded-md p-2 text-sm" defaultValue="7days">
                    <option value="today">Today</option>
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="90days">Last 90 days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="eventTypes" className="block text-sm font-medium text-gray-700 mb-1">Event Types</label>
                  <div className="space-y-2 mt-2">
                    {['Login Events', 'Permission Changes', 'Security Alerts', 'System Access'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setExportModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  exportSecurityLogs('csv', '7days')
                  setExportModalOpen(false)
                }}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configure Alerts Modal */}
      {alertsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Security Alert Configuration</h2>
              <button
                onClick={() => setAlertsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Email Notifications</span>
                        <p className="text-sm text-gray-500">Receive security alerts via email</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">SMS Notifications</span>
                        <p className="text-sm text-gray-500">Critical alerts via SMS</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">In-App Notifications</span>
                        <p className="text-sm text-gray-500">Show alerts in dashboard</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200 my-6" />

                <div>
                  <h3 className="font-medium mb-3">Alert Thresholds</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Failed Login Attempts</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 text-sm" defaultValue="5">
                        <option value="3">3 attempts</option>
                        <option value="5">5 attempts</option>
                        <option value="10">10 attempts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Suspicious Activity Detection</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 text-sm" defaultValue="medium">
                        <option value="low">Low Sensitivity</option>
                        <option value="medium">Medium Sensitivity</option>
                        <option value="high">High Sensitivity</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200 my-6" />

                <div>
                  <h3 className="font-medium mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="alertEmail" className="block text-sm font-medium text-gray-700 mb-1">Alert Email</label>
                      <Input 
                        id="alertEmail" 
                        type="email" 
                        defaultValue="security@hubebony.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="alertPhone" className="block text-sm font-medium text-gray-700 mb-1">Alert Phone</label>
                      <Input 
                        id="alertPhone" 
                        type="tel" 
                        defaultValue="+971-XX-XXX-XXXX"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setAlertsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  saveAlertConfiguration({})
                  setAlertsModalOpen(false)
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Configuration Modal */}
      {policyModalOpen && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Configure {selectedPolicy.name}</h2>
              <button
                onClick={() => setPolicyModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600">{selectedPolicy.description}</p>
                  <Badge className="mt-2 capitalize">{selectedPolicy.category}</Badge>
                </div>

                <hr className="border-gray-200 my-6" />

                <div>
                  <h3 className="font-medium mb-3">Policy Settings</h3>
                  <div className="space-y-4">
                    {Object.entries(selectedPolicy.settings).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        {typeof value === 'boolean' ? (
                          <div className="mt-1">
                            <input type="checkbox" defaultChecked={value} className="w-4 h-4 text-blue-600 rounded" />
                          </div>
                        ) : typeof value === 'number' ? (
                          <Input 
                            type="number" 
                            defaultValue={value}
                            className="mt-1"
                          />
                        ) : Array.isArray(value) ? (
                          <textarea 
                            defaultValue={value.join(', ')}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm mt-1"
                            placeholder="Comma-separated values"
                            rows={3}
                          />
                        ) : (
                          <Input 
                            defaultValue={String(value)}
                            className="mt-1"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200 my-6" />

                <div>
                  <h3 className="font-medium mb-3">Policy Status</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Enable Policy</span>
                      <p className="text-sm text-gray-500">Activate this security policy</p>
                    </div>
                    <input type="checkbox" defaultChecked={selectedPolicy.enabled} className="w-4 h-4 text-blue-600 rounded" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setPolicyModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log('Policy configuration saved')
                  setPolicyModalOpen(false)
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Policy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Settings Modal - Temporarily disabled for testing */}
      {false && authModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Authentication Settings</h2>
              <button
                onClick={() => setAuthModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Mandatory 2FA</Label>
                        <p className="text-sm text-gray-500">Require all users to enable 2FA</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label>Supported Methods</Label>
                      <div className="mt-2 space-y-2">
                        {[
                          { id: 'app', label: 'Authenticator App', icon: Smartphone },
                          { id: 'sms', label: 'SMS', icon: MessageSquare },
                          { id: 'email', label: 'Email', icon: Mail }
                        ].map(method => (
                          <div key={method.id} className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <method.icon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{method.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Password Requirements</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Minimum Length</Label>
                      <Select defaultValue="12">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">8 characters</SelectItem>
                          <SelectItem value="12">12 characters</SelectItem>
                          <SelectItem value="16">16 characters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Password Expiry</Label>
                      <Select defaultValue="90">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      'Require uppercase letters',
                      'Require lowercase letters', 
                      'Require numbers',
                      'Require special characters'
                    ].map(requirement => (
                      <div key={requirement} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Login Security</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Failed Login Limit</Label>
                      <Select defaultValue="5">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Account Lockout Duration</Label>
                      <Select defaultValue="30">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setAuthModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log('Authentication settings saved')
                  setAuthModalOpen(false)
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Access Control Modal - Temporarily disabled for testing */}
      {false && accessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Access Control Settings</h2>
              <button
                onClick={() => setAccessModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">IP Restrictions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable IP Restrictions</Label>
                        <p className="text-sm text-gray-500">Limit access to specific IP ranges</p>
                      </div>
                      <Switch />
                    </div>
                    <div>
                      <Label>Allowed IP Ranges</Label>
                      <Textarea 
                        placeholder="185.33.21.0/24&#10;192.168.1.0/24"
                        className="mt-1"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500 mt-1">One IP or CIDR range per line</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Session Management</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Session Timeout</Label>
                      <Select defaultValue="30">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="240">4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Concurrent Sessions</Label>
                      <Select defaultValue="3">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 session</SelectItem>
                          <SelectItem value="3">3 sessions</SelectItem>
                          <SelectItem value="5">5 sessions</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Role-Based Permissions</h3>
                  <div className="space-y-3">
                    {[
                      { role: 'Super Admin', permissions: ['All System Access', 'User Management', 'Security Settings'] },
                      { role: 'Admin', permissions: ['Content Management', 'Analytics', 'User Support'] },
                      { role: 'Manager', permissions: ['Analytics View', 'Content View', 'Team Management'] },
                      { role: 'User', permissions: ['Basic Access', 'Profile Management'] }
                    ].map(role => (
                      <div key={role.role} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{role.role}</h4>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map(permission => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setAccessModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log('Access control settings saved')
                  setAccessModalOpen(false)
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Audit Modal - Temporarily disabled for testing */}
      {false && auditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Security Audit & Monitoring</h2>
              <button
                onClick={() => setAuditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Audit Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Log Retention Period</Label>
                      <Select defaultValue="365">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="1095">3 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Audit Level</Label>
                      <Select defaultValue="detailed">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Monitored Activities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { activity: 'User Logins', icon: Key, enabled: true },
                      { activity: 'Permission Changes', icon: Users, enabled: true },
                      { activity: 'Data Access', icon: Database, enabled: true },
                      { activity: 'System Changes', icon: Settings, enabled: true },
                      { activity: 'API Calls', icon: Globe, enabled: false },
                      { activity: 'File Operations', icon: FileText, enabled: false }
                    ].map(item => (
                      <div key={item.activity} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{item.activity}</span>
                        </div>
                        <Switch defaultChecked={item.enabled} />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Compliance Reports</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'SOC 2 Type II', frequency: 'Quarterly', nextDue: '2024-04-15' },
                      { name: 'ISO 27001', frequency: 'Annual', nextDue: '2024-12-01' },
                      { name: 'GDPR Compliance', frequency: 'Monthly', nextDue: '2024-02-01' }
                    ].map(report => (
                      <div key={report.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{report.name}</h4>
                          <p className="text-xs text-gray-500">{report.frequency} • Next due: {report.nextDue}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Real-time Monitoring</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">System Health</span>
                        </div>
                        <div className="text-lg font-bold text-green-600 mt-1">Healthy</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2">
                          <Monitor className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Active Monitors</span>
                        </div>
                        <div className="text-lg font-bold mt-1">24</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">Alerts Today</span>
                        </div>
                        <div className="text-lg font-bold mt-1">3</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setAuditModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  console.log('Audit settings saved')
                  setAuditModalOpen(false)
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup & Recovery Modal - Temporarily disabled for testing */}
      {false && backupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Backup & Recovery</h2>
              <button
                onClick={() => setBackupModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Backup Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Retention Period</Label>
                      <Select defaultValue="30">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Backup Status</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'Database', lastBackup: '2024-01-23 02:00 AM', size: '2.4 GB', status: 'success' },
                      { type: 'User Files', lastBackup: '2024-01-23 02:15 AM', size: '854 MB', status: 'success' },
                      { type: 'Configuration', lastBackup: '2024-01-23 02:05 AM', size: '12 MB', status: 'success' },
                      { type: 'Security Logs', lastBackup: '2024-01-23 02:10 AM', size: '156 MB', status: 'success' }
                    ].map(backup => (
                      <div key={backup.type} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{backup.type}</h4>
                          <p className="text-xs text-gray-500">Last backup: {backup.lastBackup}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 mb-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Success
                          </Badge>
                          <p className="text-xs text-gray-500">{backup.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Recovery Options</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Point-in-Time Recovery</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Restore system to any point within the last 30 days
                      </p>
                      <div className="flex gap-3">
                        <Input type="datetime-local" className="flex-1" />
                        <Button variant="outline">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Full System Restore</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Restore entire system from a specific backup
                      </p>
                      <div className="flex gap-3">
                        <Select>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select backup" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="backup1">2024-01-23 Full Backup</SelectItem>
                            <SelectItem value="backup2">2024-01-22 Full Backup</SelectItem>
                            <SelectItem value="backup3">2024-01-21 Full Backup</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Disaster Recovery</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Automatic Failover</Label>
                        <p className="text-sm text-gray-500">Switch to backup systems automatically</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Geo-redundant Backups</Label>
                        <p className="text-sm text-gray-500">Store backups in multiple regions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label>Recovery Time Objective (RTO)</Label>
                      <Select defaultValue="4">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setBackupModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  console.log('Backup settings saved')
                  setBackupModalOpen(false)
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}