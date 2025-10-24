'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SubTab {
  name: string
  href: string
}

interface NavItem {
  name: string
  href: string
  subTabs: SubTab[]
}

interface AdminTopTabsProps {
  navItems: NavItem[]
}

export function AdminTopTabs({ navItems }: AdminTopTabsProps) {
  const pathname = usePathname()
  const router = useRouter()

  const getCurrentNavItem = () => {
    if (!navItems || !Array.isArray(navItems)) return null
    return navItems.find(item => 
      pathname === item.href || 
      pathname.startsWith(item.href + '/') ||
      item.subTabs?.some(subTab => pathname === subTab.href)
    )
  }

  const currentNavItem = getCurrentNavItem()

  if (!currentNavItem || !currentNavItem.subTabs || currentNavItem.subTabs.length === 0) {
    return null
  }

  const handleTabClick = (href: string) => {
    router.push(href)
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8">
          {currentNavItem.subTabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.href)}
                className={cn(
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}