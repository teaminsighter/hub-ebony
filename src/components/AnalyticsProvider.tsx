'use client'

import { useEffect } from 'react'
import { initializeAnalytics } from '@/lib/analytics/dataLayer'

export default function AnalyticsProvider({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize analytics on client side
    initializeAnalytics()
  }, [])

  return <>{children}</>
}