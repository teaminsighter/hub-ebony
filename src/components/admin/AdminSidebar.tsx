'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings,
  Home,
  DollarSign,
  MessageSquare,
  FileImage,
  Target,
  Bell,
  Briefcase
} from 'lucide-react'
import { cn } from '@/lib/utils'

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

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const handleNavigation = (href: string) => {
    router.push(href)
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const getCurrentNavItem = () => {
    return navigation.find(item => 
      pathname === item.href || 
      pathname.startsWith(item.href + '/') ||
      item.subTabs.some(subTab => pathname === subTab.href)
    )
  }

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <Link href="/" className="flex items-center space-x-2 text-white">
          <Home className="h-6 w-6" />
          <span className="text-lg font-semibold">Hub Ebony</span>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-white space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
                            pathname.startsWith(item.href + '/') ||
                            item.subTabs.some(subTab => pathname === subTab.href)
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  'flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left',
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            )
          })}
        </nav>
        
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {session?.user?.name?.charAt(0) || 'A'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {session?.user?.role?.toLowerCase().replace('_', ' ') || 'Admin'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}