'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, Building, TrendingUp, Eye, MousePointer } from 'lucide-react'

interface DashboardStats {
  totalClients: number
  totalConsultations: number
  totalProperties: number
  monthlyConversions: number
  pageViews: number
  conversionRate: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalConsultations: 0,
    totalProperties: 0,
    monthlyConversions: 0,
    pageViews: 0,
    conversionRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Clients',
      value: stats.totalClients,
      description: 'Registered clients',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Consultations',
      value: stats.totalConsultations,
      description: 'This month',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Properties',
      value: stats.totalProperties,
      description: 'Listed properties',
      icon: Building,
      color: 'text-purple-600'
    },
    {
      title: 'Conversions',
      value: stats.monthlyConversions,
      description: 'This month',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Page Views',
      value: stats.pageViews,
      description: 'This month',
      icon: Eye,
      color: 'text-pink-600'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate.toFixed(1)}%`,
      description: 'This month',
      icon: MousePointer,
      color: 'text-red-600'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest consultations and client interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div className="text-sm">
                  <p className="font-medium">New consultation booked</p>
                  <p className="text-gray-500">John Doe - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div className="text-sm">
                  <p className="font-medium">Client converted to investor</p>
                  <p className="text-gray-500">Sarah Smith - 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <div className="text-sm">
                  <p className="font-medium">New property inquiry</p>
                  <p className="text-gray-500">Downtown Dubai Villa - 6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <Calendar className="h-6 w-6 mb-2 text-blue-600" />
                <p className="font-medium">Schedule Consultation</p>
                <p className="text-sm text-gray-500">Book new meeting</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <Building className="h-6 w-6 mb-2 text-purple-600" />
                <p className="font-medium">Add Property</p>
                <p className="text-sm text-gray-500">List new property</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <Users className="h-6 w-6 mb-2 text-green-600" />
                <p className="font-medium">View Clients</p>
                <p className="text-sm text-gray-500">Manage client list</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <TrendingUp className="h-6 w-6 mb-2 text-orange-600" />
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-gray-500">View reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}