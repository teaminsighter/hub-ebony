'use client'

import { useCallback, useEffect } from 'react'

declare global {
  interface Window {
    hubEbonyAnalytics: {
      trackEvent: (event: any) => void
      trackLead: (data: any) => void
      trackCustomEvent: (eventName: string, data?: any) => void
      setUserId: (userId: string) => void
      getSessionInfo: () => any
    }
  }
}

export function useAnalytics() {
  const trackEvent = useCallback((eventData: {
    event: string
    eventCategory?: string
    eventAction?: string
    eventLabel?: string
    eventValue?: number
    customData?: Record<string, any>
  }) => {
    if (typeof window !== 'undefined' && window.hubEbonyAnalytics) {
      window.hubEbonyAnalytics.trackEvent(eventData)
    }
  }, [])

  const trackLead = useCallback((formData: {
    formType: string
    formData: Record<string, any>
  }) => {
    if (typeof window !== 'undefined' && window.hubEbonyAnalytics) {
      window.hubEbonyAnalytics.trackLead(formData)
    }
  }, [])

  const trackCustomEvent = useCallback((eventName: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.hubEbonyAnalytics) {
      window.hubEbonyAnalytics.trackCustomEvent(eventName, data)
    }
  }, [])

  const trackPageView = useCallback((page?: string) => {
    if (typeof window !== 'undefined' && window.hubEbonyAnalytics) {
      // Page views are automatically tracked, but we can manually trigger them
      trackCustomEvent('manual_page_view', { page })
    }
  }, [trackCustomEvent])

  const trackButtonClick = useCallback((buttonText: string, location?: string) => {
    trackEvent({
      event: 'button_click',
      eventCategory: 'ENGAGEMENT',
      eventAction: 'click',
      eventLabel: buttonText,
      customData: { location }
    })
  }, [trackEvent])

  const trackFormStart = useCallback((formType: string) => {
    trackEvent({
      event: 'form_start',
      eventCategory: 'FORM_INTERACTION',
      eventAction: 'start',
      eventLabel: formType
    })
  }, [trackEvent])

  const trackFormSubmit = useCallback((formType: string, formData: Record<string, any>) => {
    trackLead({ formType, formData })
  }, [trackLead])

  const setUserId = useCallback((userId: string) => {
    if (typeof window !== 'undefined' && window.hubEbonyAnalytics) {
      window.hubEbonyAnalytics.setUserId(userId)
    }
  }, [])

  const getSessionInfo = useCallback(() => {
    if (typeof window !== 'undefined' && window.hubEbonyAnalytics) {
      return window.hubEbonyAnalytics.getSessionInfo()
    }
    return null
  }, [])

  return {
    trackEvent,
    trackLead,
    trackCustomEvent,
    trackPageView,
    trackButtonClick,
    trackFormStart,
    trackFormSubmit,
    setUserId,
    getSessionInfo
  }
}