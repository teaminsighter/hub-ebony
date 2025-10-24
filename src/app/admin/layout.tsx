'use client'

import { SessionProvider } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings,
  DollarSign,
  Target
} from 'lucide-react'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: LayoutDashboard,
    subTabs: []
  },
  { 
    name: 'Sales', 
    href: '/admin/sales', 
    icon: DollarSign,
    subTabs: [
      { name: 'Pipeline', href: '/admin/sales/pipeline' },
      { name: 'Deals', href: '/admin/sales/deals' },
      { name: 'Commissions', href: '/admin/sales/commissions' },
      { name: 'Forecasting', href: '/admin/sales/forecasting' }
    ]
  },
  { 
    name: 'Clients', 
    href: '/admin/clients', 
    icon: Users,
    subTabs: [
      { name: 'All Clients', href: '/admin/clients' },
      { name: 'Prospects', href: '/admin/clients/prospects' },
      { name: 'Active Investors', href: '/admin/clients/active' },
      { name: 'Lead Scoring', href: '/admin/clients/scoring' }
    ]
  },
  { 
    name: 'Properties', 
    href: '/admin/properties', 
    icon: Building,
    subTabs: [
      { name: 'All Properties', href: '/admin/properties' },
      { name: 'Featured', href: '/admin/properties/featured' },
      { name: 'Areas', href: '/admin/properties/areas' },
      { name: 'Developers', href: '/admin/properties/developers' }
    ]
  },
  { 
    name: 'Consultations', 
    href: '/admin/consultations', 
    icon: Calendar,
    subTabs: [
      { name: 'Schedule', href: '/admin/consultations' },
      { name: 'Calendar View', href: '/admin/consultations/calendar' },
      { name: 'Follow-ups', href: '/admin/consultations/followups' },
      { name: 'Availability', href: '/admin/consultations/availability' }
    ]
  },
  { 
    name: 'Marketing', 
    href: '/admin/marketing', 
    icon: Target,
    subTabs: [
      { name: 'Campaigns', href: '/admin/marketing/campaigns' },
      { name: 'Email Marketing', href: '/admin/marketing/email' },
      { name: 'Social Media', href: '/admin/marketing/social' },
      { name: 'A/B Testing', href: '/admin/marketing/testing' }
    ]
  },
  { 
    name: 'Content', 
    href: '/admin/content', 
    icon: FileText,
    subTabs: [
      { name: 'Pages', href: '/admin/content' },
      { name: 'Media Library', href: '/admin/content/media' },
      { name: 'Templates', href: '/admin/content/templates' },
      { name: 'SEO', href: '/admin/content/seo' }
    ]
  },
  { 
    name: 'Analytics', 
    href: '/admin/analytics', 
    icon: BarChart3,
    subTabs: [
      { name: 'Overview', href: '/admin/analytics' },
      { name: 'Traffic', href: '/admin/analytics/traffic' },
      { name: 'Conversions', href: '/admin/analytics/conversions' },
      { name: 'Reports', href: '/admin/analytics/reports' }
    ]
  },
  { 
    name: 'Settings', 
    href: '/admin/settings', 
    icon: Settings,
    subTabs: [
      { name: 'General', href: '/admin/settings' },
      { name: 'Users', href: '/admin/settings/users' },
      { name: 'Integrations', href: '/admin/settings/integrations' },
      { name: 'Security', href: '/admin/settings/security' }
    ]
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader navItems={navigation} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}