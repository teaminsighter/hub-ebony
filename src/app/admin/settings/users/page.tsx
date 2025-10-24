'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Plus,
  Edit,
  Trash2,
  Shield,
  Mail,
  Key,
  Search,
  Filter,
  Download,
  RefreshCw,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  X,
  Eye,
  EyeOff,
  Settings,
  CheckCircle,
  AlertTriangle,
  Copy,
  Upload,
  FileText,
  Calendar,
  Globe,
  Building,
  Send
} from 'lucide-react'

interface AdminUser {
  id: string
  name: string
  email: string
  role: 'SUPER_ADMIN' | 'SALES_MANAGER' | 'CONTENT_MANAGER' | 'ANALYST'
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  createdAt: string
  permissions: string[]
  twoFactorEnabled: boolean
}

interface UsersData {
  users: AdminUser[]
  totalUsers: number
  activeUsers: number
  pendingInvites: number
  roles: { name: string; count: number }[]
}

export default function UsersPage() {
  const [users, setUsers] = useState<UsersData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Modal states
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [editUserModalOpen, setEditUserModalOpen] = useState(false)
  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [bulkActionModalOpen, setBulkActionModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const demoData: UsersData = {
        users: [
          {
            id: 'user_001',
            name: 'Ahmed Al-Rashid',
            email: 'admin@hubebony.com',
            role: 'SUPER_ADMIN',
            status: 'active',
            lastLogin: '2024-01-23T14:30:00Z',
            createdAt: '2023-01-15T09:00:00Z',
            permissions: ['all'],
            twoFactorEnabled: true
          },
          {
            id: 'user_002',
            name: 'Sarah Johnson',
            email: 'sales@hubebony.com',
            role: 'SALES_MANAGER',
            status: 'active',
            lastLogin: '2024-01-23T11:15:00Z',
            createdAt: '2023-03-10T10:30:00Z',
            permissions: ['sales', 'clients', 'consultations'],
            twoFactorEnabled: true
          },
          {
            id: 'user_003',
            name: 'Omar Hassan',
            email: 'content@hubebony.com',
            role: 'CONTENT_MANAGER',
            status: 'active',
            lastLogin: '2024-01-22T16:45:00Z',
            createdAt: '2023-06-20T14:20:00Z',
            permissions: ['content', 'marketing', 'media'],
            twoFactorEnabled: false
          },
          {
            id: 'user_004',
            name: 'Lisa Chen',
            email: 'analytics@hubebony.com',
            role: 'ANALYST',
            status: 'active',
            lastLogin: '2024-01-23T09:20:00Z',
            createdAt: '2023-09-05T11:00:00Z',
            permissions: ['analytics', 'reports'],
            twoFactorEnabled: true
          },
          {
            id: 'user_005',
            name: 'Mohammed Ali',
            email: 'support@hubebony.com',
            role: 'SALES_MANAGER',
            status: 'inactive',
            lastLogin: '2024-01-10T08:30:00Z',
            createdAt: '2023-11-12T13:45:00Z',
            permissions: ['sales', 'clients'],
            twoFactorEnabled: false
          }
        ],
        totalUsers: 5,
        activeUsers: 4,
        pendingInvites: 2,
        roles: [
          { name: 'SUPER_ADMIN', count: 1 },
          { name: 'SALES_MANAGER', count: 2 },
          { name: 'CONTENT_MANAGER', count: 1 },
          { name: 'ANALYST', count: 1 }
        ]
      }
      
      setUsers(demoData)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = () => {
    setAddUserModalOpen(true)
  }

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user)
    setEditUserModalOpen(true)
  }

  const handleDeleteUser = async (user: AdminUser) => {
    if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      setIsSubmitting(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Update users list by removing the deleted user
        setUsers(prev => prev ? {
          ...prev,
          users: prev.users.filter(u => u.id !== user.id),
          totalUsers: prev.totalUsers - 1,
          activeUsers: user.status === 'active' ? prev.activeUsers - 1 : prev.activeUsers
        } : null)
      } catch (error) {
        console.error('Delete failed:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleSuspendUser = async (user: AdminUser) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user status
      setUsers(prev => prev ? {
        ...prev,
        users: prev.users.map(u => 
          u.id === user.id ? { ...u, status: 'suspended' as const } : u
        ),
        activeUsers: user.status === 'active' ? prev.activeUsers - 1 : prev.activeUsers
      } : null)
    } catch (error) {
      console.error('Suspend failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleActivateUser = async (user: AdminUser) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user status
      setUsers(prev => prev ? {
        ...prev,
        users: prev.users.map(u => 
          u.id === user.id ? { ...u, status: 'active' as const } : u
        ),
        activeUsers: user.status !== 'active' ? prev.activeUsers + 1 : prev.activeUsers
      } : null)
    } catch (error) {
      console.error('Activate failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (user: AdminUser) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Password reset email sent to ${user.email}`)
    } catch (error) {
      console.error('Password reset failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggle2FA = async (user: AdminUser) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user 2FA status
      setUsers(prev => prev ? {
        ...prev,
        users: prev.users.map(u => 
          u.id === user.id ? { ...u, twoFactorEnabled: !u.twoFactorEnabled } : u
        )
      } : null)
    } catch (error) {
      console.error('2FA toggle failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExportUsers = () => {
    setExportModalOpen(true)
  }

  const handleBulkInvite = () => {
    setBulkActionModalOpen(true)
  }

  const handleRoleManagement = () => {
    setRoleModalOpen(true)
  }

  const handleCreateUser = async (userData: any) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newUser: AdminUser = {
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: 'active',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        permissions: userData.permissions || [],
        twoFactorEnabled: false
      }
      
      // Add new user to the list
      setUsers(prev => prev ? {
        ...prev,
        users: [newUser, ...prev.users],
        totalUsers: prev.totalUsers + 1,
        activeUsers: prev.activeUsers + 1
      } : null)
      
      setAddUserModalOpen(false)
    } catch (error) {
      console.error('User creation failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExportData = async (format: 'csv' | 'excel' | 'pdf') => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, this would trigger the actual export
      const link = document.createElement('a')
      link.href = '#'
      link.download = `users_export_${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setExportModalOpen(false)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-red-100 text-red-800'
      case 'SALES_MANAGER': return 'bg-blue-100 text-blue-800'
      case 'CONTENT_MANAGER': return 'bg-green-100 text-green-800'
      case 'ANALYST': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUsers = users?.users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  }) || []

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
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

  if (!users) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500 text-center">
              Start by adding your first admin user.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleRoleManagement}>
            <Settings className="h-4 w-4 mr-2" />
            Roles
          </Button>
          <Button variant="outline" size="sm" onClick={handleBulkInvite}>
            <Mail className="h-4 w-4 mr-2" />
            Bulk Invite
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportUsers}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddUser}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Admin accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.activeUsers}</div>
            <p className="text-xs text-green-600">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.pendingInvites}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting acceptance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2FA Enabled</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.users.filter(u => u.twoFactorEnabled).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Secure accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Roles</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="SALES_MANAGER">Sales Manager</option>
              <option value="CONTENT_MANAGER">Content Manager</option>
              <option value="ANALYST">Analyst</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role.replace('_', ' ')}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      {user.twoFactorEnabled && (
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          2FA
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right text-sm text-gray-500 mr-4">
                    <p>Last login:</p>
                    <p>{new Date(user.lastLogin).toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResetPassword(user)}
                  >
                    <Key className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggle2FA(user)}
                  >
                    {user.twoFactorEnabled ? (
                      <Unlock className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </Button>
                  {user.status === 'active' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuspendUser(user)}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleActivateUser(user)}
                    >
                      <UserCheck className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Permissions */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions:</h4>
                <div className="flex flex-wrap gap-1">
                  {user.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500 text-center">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add User Modal */}
      {addUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
                <Button variant="ghost" size="sm" onClick={() => setAddUserModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="SALES_MANAGER">Sales Manager</option>
                    <option value="CONTENT_MANAGER">Content Manager</option>
                    <option value="ANALYST">Analyst</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="content">Content</option>
                    <option value="analytics">Analytics</option>
                    <option value="admin">Administration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Password</label>
                <div className="flex gap-2">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter temporary password"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <Button variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Permissions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Sales Management',
                    'Client Access',
                    'Content Management',
                    'Marketing Tools',
                    'Analytics Access',
                    'Report Generation',
                    'User Management',
                    'System Settings'
                  ].map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Account Options</h4>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded mr-2" />
                  <span className="text-sm">Send invitation email</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-2" />
                  <span className="text-sm">Require password change on first login</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-2" />
                  <span className="text-sm">Enable two-factor authentication</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setAddUserModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleCreateUser({ name: 'New User', email: 'new@hubebony.com', role: 'SALES_MANAGER' })}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Create User
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUserModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit User: {selectedUser.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditUserModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={selectedUser.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={selectedUser.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select 
                        defaultValue={selectedUser.role}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="SALES_MANAGER">Sales Manager</option>
                        <option value="CONTENT_MANAGER">Content Manager</option>
                        <option value="ANALYST">Analyst</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select 
                        defaultValue={selectedUser.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">
                            {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          {selectedUser.twoFactorEnabled ? 'Disable' : 'Enable'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Password Reset</h4>
                          <p className="text-sm text-gray-600">Send reset email</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Key className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Session Management</h4>
                          <p className="text-sm text-gray-600">Force logout all devices</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Lock className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Permissions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedUser.permissions.map((permission) => (
                    <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">{permission}</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Activity Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Last Login</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedUser.lastLogin).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Account Created</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setEditUserModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Role Management Modal */}
      {roleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Role & Permissions Management</h2>
                <Button variant="ghost" size="sm" onClick={() => setRoleModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Available Roles</h3>
                  
                  {[
                    { name: 'SUPER_ADMIN', count: 1, color: 'bg-red-100 text-red-800', description: 'Full system access with all permissions' },
                    { name: 'SALES_MANAGER', count: 2, color: 'bg-blue-100 text-blue-800', description: 'Manage sales operations and client relationships' },
                    { name: 'CONTENT_MANAGER', count: 1, color: 'bg-green-100 text-green-800', description: 'Create and manage content, marketing materials' },
                    { name: 'ANALYST', count: 1, color: 'bg-purple-100 text-purple-800', description: 'Access analytics, generate reports and insights' }
                  ].map((role) => (
                    <Card key={role.name}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={role.color}>
                                {role.name.replace('_', ' ')}
                              </Badge>
                              <span className="text-sm text-gray-500">{role.count} users</span>
                            </div>
                            <p className="text-sm text-gray-600">{role.description}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Role
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Permission Categories</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        category: 'Sales & Clients',
                        permissions: ['View clients', 'Add clients', 'Edit clients', 'Delete clients', 'Manage consultations', 'Access sales reports']
                      },
                      {
                        category: 'Content & Marketing',
                        permissions: ['Create content', 'Edit content', 'Publish content', 'Manage media', 'Marketing campaigns', 'SEO management']
                      },
                      {
                        category: 'Analytics & Reports',
                        permissions: ['View analytics', 'Generate reports', 'Export data', 'Traffic analysis', 'Conversion tracking', 'Performance metrics']
                      },
                      {
                        category: 'System Administration',
                        permissions: ['User management', 'System settings', 'Security settings', 'Backup & restore', 'API management', 'Integration settings']
                      }
                    ].map((group) => (
                      <Card key={group.category}>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-gray-900 mb-3">{group.category}</h4>
                          <div className="space-y-2">
                            {group.permissions.map((permission) => (
                              <div key={permission} className="flex items-center justify-between text-sm">
                                <span>{permission}</span>
                                <div className="flex gap-1">
                                  <input type="checkbox" className="rounded text-red-600" title="Super Admin" />
                                  <input type="checkbox" className="rounded text-blue-600" title="Sales Manager" />
                                  <input type="checkbox" className="rounded text-green-600" title="Content Manager" />
                                  <input type="checkbox" className="rounded text-purple-600" title="Analyst" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={() => setRoleModalOpen(false)}>
                Close
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Role Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Modal */}
      {bulkActionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Bulk User Management</h2>
                <Button variant="ghost" size="sm" onClick={() => setBulkActionModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bulk Invite Users</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Upload a CSV file with user information to invite multiple users at once
                      </p>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
                        <input type="file" accept=".csv" className="hidden" id="csvUpload" />
                        <label htmlFor="csvUpload" className="cursor-pointer">
                          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Click to upload CSV file</p>
                        </label>
                      </div>
                      
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download CSV Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bulk Email Users</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Send emails to multiple users simultaneously
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Select Recipients</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="all">All Users</option>
                            <option value="active">Active Users Only</option>
                            <option value="role_sales">Sales Managers</option>
                            <option value="role_content">Content Managers</option>
                            <option value="role_analyst">Analysts</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Type</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="announcement">System Announcement</option>
                            <option value="password_reset">Password Reset</option>
                            <option value="account_update">Account Update</option>
                            <option value="security_alert">Security Alert</option>
                          </select>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4">
                        <Send className="h-4 w-4 mr-2" />
                        Send Bulk Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Bulk Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Activate Selected Users
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <UserX className="h-4 w-4 mr-2" />
                    Suspend Selected Users
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Lock className="h-4 w-4 mr-2" />
                    Enable 2FA for Selected
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    Force Password Reset
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">CSV Import Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Send welcome emails</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Require password change on first login</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Enable 2FA by default</span>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Role</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="SALES_MANAGER">Sales Manager</option>
                        <option value="CONTENT_MANAGER">Content Manager</option>
                        <option value="ANALYST">Analyst</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Department</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="content">Content</option>
                        <option value="analytics">Analytics</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setBulkActionModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Export User Data</h2>
                <Button variant="ghost" size="sm" onClick={() => setExportModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleExportData('csv')}>
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">CSV Export</h3>
                    <p className="text-sm text-gray-600">Spreadsheet format</p>
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

                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleExportData('excel')}>
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">Excel Export</h3>
                    <p className="text-sm text-gray-600">Advanced formatting</p>
                    <Button className="w-full mt-3" variant="outline" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Export Excel
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleExportData('pdf')}>
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">PDF Report</h3>
                    <p className="text-sm text-gray-600">Professional report</p>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Include Fields</h4>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Basic information</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Role & permissions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Activity logs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Security settings</span>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Filter Users</h4>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded mr-2" />
                      <span className="text-sm">Active users only</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Include suspended users</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">2FA enabled users only</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">Recently created users</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setExportModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}