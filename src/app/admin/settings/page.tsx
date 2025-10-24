'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Settings, 
  Save,
  Users,
  Globe,
  Mail,
  Calendar,
  Shield,
  Database,
  X,
  RefreshCw,
  Edit,
  Plus,
  Building,
  Code,
  FileText,
  Lock,
  UserPlus,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react'

interface AdminSettings {
  siteName: string
  siteUrl: string
  contactEmail: string
  businessHours: {
    start: string
    end: string
    timezone: string
  }
  consultationDuration: number
  emailNotifications: boolean
  smsNotifications: boolean
  autoBackup: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    siteName: 'CommercialDXB',
    siteUrl: 'https://hubebony.com',
    contactEmail: 'contact@hubebony.com',
    businessHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Dubai'
    },
    consultationDuration: 30,
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Modal states
  const [companyModalOpen, setCompanyModalOpen] = useState(false)
  const [systemModalOpen, setSystemModalOpen] = useState(false)
  const [securityModalOpen, setSecurityModalOpen] = useState(false)
  const [apiModalOpen, setApiModalOpen] = useState(false)
  const [dataExportModalOpen, setDataExportModalOpen] = useState(false)
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        // Show success notification instead of alert
        console.log('Settings saved successfully!')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleExportData = () => {
    setDataExportModalOpen(true)
  }

  const handleSecurityAudit = () => {
    setSecurityModalOpen(true)
  }

  const handleEditAdmin = () => {
    setAdminModalOpen(true)
  }

  const handleAddAdmin = () => {
    setAddAdminModalOpen(true)
  }

  const handleCompanySettings = () => {
    setCompanyModalOpen(true)
  }

  const handleSystemSettings = () => {
    setSystemModalOpen(true)
  }

  const handleApiSettings = () => {
    setApiModalOpen(true)
  }

  const handleDataExport = async (format: 'json' | 'csv' | 'pdf') => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, this would trigger the actual export
      const link = document.createElement('a')
      link.href = `#`
      link.download = `hubebony_backup_${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setDataExportModalOpen(false)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateSettings = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateBusinessHours = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [key]: value
      }
    }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic site configuration and branding
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleCompanySettings}>
                <Edit className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => updateSettings('siteName', e.target.value)}
                  placeholder="CommercialDXB"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site URL
                </label>
                <Input
                  value={settings.siteUrl}
                  onChange={(e) => updateSettings('siteUrl', e.target.value)}
                  placeholder="https://hubebony.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSettings('contactEmail', e.target.value)}
                placeholder="contact@hubebony.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Business Hours
                </CardTitle>
                <CardDescription>
                  Configure consultation availability and timezone
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleSystemSettings}>
                <Settings className="h-4 w-4 mr-2" />
                System
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <Input
                  type="time"
                  value={settings.businessHours.start}
                  onChange={(e) => updateBusinessHours('start', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <Input
                  type="time"
                  value={settings.businessHours.end}
                  onChange={(e) => updateBusinessHours('end', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.businessHours.timezone}
                  onChange={(e) => updateBusinessHours('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Consultation Duration (minutes)
              </label>
              <Input
                type="number"
                value={settings.consultationDuration}
                onChange={(e) => updateSettings('consultationDuration', parseInt(e.target.value))}
                min="15"
                max="120"
                step="15"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive email alerts for new consultations and inquiries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => updateSettings('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">SMS Notifications</h4>
                <p className="text-sm text-gray-500">Receive SMS alerts for urgent matters</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => updateSettings('smsNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Security & Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Backup
            </CardTitle>
            <CardDescription>
              Data protection and backup configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Automatic Backup</h4>
                <p className="text-sm text-gray-500">Automatically backup data daily</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => updateSettings('autoBackup', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={handleExportData}>
                  <Database className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" onClick={handleSecurityAudit}>
                  <Shield className="h-4 w-4 mr-2" />
                  Security Audit
                </Button>
                <Button variant="outline" onClick={handleApiSettings}>
                  <Code className="h-4 w-4 mr-2" />
                  API Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Admin Users
            </CardTitle>
            <CardDescription>
              Manage administrator accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Super Admin</h4>
                  <p className="text-sm text-gray-500">admin@hubebony.com</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEditAdmin}>Edit</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleAddAdmin}>
                <Users className="h-4 w-4 mr-2" />
                Add Admin User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Information Modal */}
      {companyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
                <Button variant="ghost" size="sm" onClick={() => setCompanyModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Business Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input 
                        type="text" 
                        defaultValue="CommercialDXB Real Estate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Registration</label>
                      <input 
                        type="text" 
                        defaultValue="UAE-REG-123456789"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">VAT Number</label>
                      <input 
                        type="text" 
                        defaultValue="100123456789003"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">RERA License</label>
                      <input 
                        type="text" 
                        defaultValue="RERA-12345"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                      <textarea 
                        rows={3}
                        defaultValue="Business Bay, Dubai, UAE"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        defaultValue="+971 4 123 4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        defaultValue="+971 50 123 4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                      <input 
                        type="email" 
                        defaultValue="support@hubebony.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Branding & Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Upload logo (PNG, JPG, SVG)</p>
                      <Button variant="outline" size="sm" className="mt-2">Choose File</Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Colors</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <label className="text-sm">Primary:</label>
                        <input type="color" defaultValue="#1F2937" className="w-12 h-8 rounded border" />
                        <span className="text-sm text-gray-500">#1F2937</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-sm">Accent:</label>
                        <input type="color" defaultValue="#3B82F6" className="w-12 h-8 rounded border" />
                        <span className="text-sm text-gray-500">#3B82F6</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setCompanyModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Company Info
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* System Preferences Modal */}
      {systemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">System Preferences</h2>
                <Button variant="ghost" size="sm" onClick={() => setSystemModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Localization</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                        <option value="fr">French</option>
                        <option value="ru">Russian</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="AED">AED (UAE Dirham)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="GBP">GBP (British Pound)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number Format</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="1,234.56">1,234.56 (US)</option>
                        <option value="1.234,56">1.234,56 (EU)</option>
                        <option value="1 234,56">1 234,56 (FR)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Performance</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                      <input 
                        type="number" 
                        defaultValue="60"
                        min="15"
                        max="480"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Items per Page</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="10">10 items</option>
                        <option value="25">25 items</option>
                        <option value="50">50 items</option>
                        <option value="100">100 items</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Auto-save Interval (seconds)</label>
                      <input 
                        type="number" 
                        defaultValue="30"
                        min="10"
                        max="300"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">System Features</h4>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Enable dark mode</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Show tooltips</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Enable sound notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Auto-refresh dashboard</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Consultation Confirmation</h4>
                          <p className="text-sm text-gray-600">Sent when consultation is booked</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Property Inquiry Response</h4>
                          <p className="text-sm text-gray-600">Auto-response to property inquiries</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setSystemModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings Modal */}
      {securityModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Security & Audit</h2>
                <Button variant="ghost" size="sm" onClick={() => setSecurityModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Security Score</p>
                        <p className="text-2xl font-bold text-green-600">92/100</p>
                      </div>
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Last Audit</p>
                        <p className="text-2xl font-bold text-blue-600">2 days ago</p>
                      </div>
                      <Eye className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Failed Logins</p>
                        <p className="text-2xl font-bold text-red-600">3</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Authentication</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Require Two-Factor Authentication</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Force password reset every 90 days</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Lock account after 5 failed attempts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Require strong passwords</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input 
                      type="number" 
                      defaultValue="30"
                      min="5"
                      max="480"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Data Protection</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Encrypt sensitive data</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Enable audit logging</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Automatic security updates</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">GDPR compliance mode</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention (days)</label>
                    <input 
                      type="number" 
                      defaultValue="365"
                      min="30"
                      max="2555"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Security Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Shield className="h-4 w-4 mr-2" />
                    )}
                    Run Security Scan
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Audit Log
                  </Button>
                  <Button variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Reset All Sessions
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Compliance Report
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setSecurityModalOpen(false)}>
                Close
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* API Configuration Modal */}
      {apiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">API Configuration</h2>
                <Button variant="ghost" size="sm" onClick={() => setApiModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary API Key</label>
                      <div className="flex gap-2">
                        <input 
                          type="password" 
                          defaultValue="sk_live_123456789abcdef"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                        />
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Secret</label>
                      <div className="flex gap-2">
                        <input 
                          type="password" 
                          defaultValue="whsec_987654321fedcba"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                        />
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rate Limit (requests/hour)</label>
                      <input 
                        type="number" 
                        defaultValue="1000"
                        min="100"
                        max="10000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">External Services</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps API</label>
                      <input 
                        type="password" 
                        placeholder="Enter Google Maps API key"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMS Provider API</label>
                      <input 
                        type="password" 
                        placeholder="Enter SMS provider API key"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Gateway</label>
                      <input 
                        type="password" 
                        placeholder="Enter payment gateway key"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Service API</label>
                      <input 
                        type="password" 
                        placeholder="Enter email service API key"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">API Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Enable API access</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Require API key authentication</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Enable CORS</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Log API requests</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Enable webhooks</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Sandbox mode</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">API versioning</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Rate limiting</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">API Documentation</h3>
                <div className="flex gap-4">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View API Docs
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download OpenAPI Spec
                  </Button>
                  <Button variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    Test API Endpoint
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setApiModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save API Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Data Export Modal */}
      {dataExportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Export System Data</h2>
                <Button variant="ghost" size="sm" onClick={() => setDataExportModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleDataExport('json')}>
                  <CardContent className="p-4 text-center">
                    <Code className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">JSON Format</h3>
                    <p className="text-sm text-gray-600">Structured data export</p>
                    <Button className="w-full mt-3" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Export JSON
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleDataExport('csv')}>
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">CSV Format</h3>
                    <p className="text-sm text-gray-600">Spreadsheet compatible</p>
                    <Button className="w-full mt-3" variant="outline" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Export CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleDataExport('pdf')}>
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">PDF Report</h3>
                    <p className="text-sm text-gray-600">Formatted report</p>
                    <Button className="w-full mt-3" variant="outline" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Export PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Export Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded mr-2" />
                    <span className="text-sm">Include user data</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded mr-2" />
                    <span className="text-sm">Include property listings</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded mr-2" />
                    <span className="text-sm">Include consultation records</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" />
                    <span className="text-sm">Include system logs</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" />
                    <span className="text-sm">Include analytics data</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setDataExportModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}