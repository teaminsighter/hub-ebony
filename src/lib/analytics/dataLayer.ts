'use client'

// Data Layer Configuration for Lead Tracking
export interface DataLayerEvent {
  event: string
  eventCategory?: string
  eventAction?: string
  eventLabel?: string
  eventValue?: number
  customData?: Record<string, any>
  userId?: string
  sessionId?: string
  timestamp?: string
}

// Global data layer
declare global {
  interface Window {
    dataLayer: any[]
    hubEbonyAnalytics: CommercialDXBAnalytics
  }
}

class CommercialDXBAnalytics {
  private sessionId: string
  private userId?: string
  private sessionStart: Date
  private pageStartTime: Date
  private isInitialized: boolean = false

  constructor() {
    this.sessionId = this.generateSessionId()
    this.sessionStart = new Date()
    this.pageStartTime = new Date()
    this.initializeDataLayer()
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  }

  private initializeDataLayer() {
    if (typeof window === 'undefined') return

    // Initialize global data layer if not exists
    window.dataLayer = window.dataLayer || []
    window.hubEbonyAnalytics = this

    // Get UTM parameters and click IDs from URL
    const urlParams = new URLSearchParams(window.location.search)
    const attribution = this.extractAttribution(urlParams)

    // Get device and browser information
    const deviceInfo = this.getDeviceInfo()

    // Get geolocation (if permission granted)
    this.getGeoLocation().then(geo => {
      this.initializeSession({
        ...attribution,
        ...deviceInfo,
        ...geo
      })
    })

    // Track initial page view
    this.trackPageView()

    // Set up event listeners
    this.setupEventListeners()

    // Set up exit tracking
    this.setupExitTracking()

    this.isInitialized = true
  }

  private extractAttribution(urlParams: URLSearchParams) {
    return {
      utmSource: urlParams.get('utm_source'),
      utmMedium: urlParams.get('utm_medium'),
      utmCampaign: urlParams.get('utm_campaign'),
      utmTerm: urlParams.get('utm_term'),
      utmContent: urlParams.get('utm_content'),
      gclid: urlParams.get('gclid'),
      fbclid: urlParams.get('fbclid'),
      msclkid: urlParams.get('msclkid'),
      ttclid: urlParams.get('ttclid'),
      twclid: urlParams.get('twclid'),
      liclid: urlParams.get('liclid'),
      snapclid: urlParams.get('snapclid'),
      pinclid: urlParams.get('pinclid'),
      yclid: urlParams.get('yclid'),
      customClickId: urlParams.get('click_id')
    }
  }

  private getDeviceInfo() {
    if (typeof window === 'undefined') return {}

    const ua = navigator.userAgent
    let device = 'DESKTOP'
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      device = /iPad/i.test(ua) ? 'TABLET' : 'MOBILE'
    }

    // Extract browser info
    let browser = 'Unknown'
    if (ua.includes('Chrome')) browser = 'Chrome'
    else if (ua.includes('Firefox')) browser = 'Firefox'
    else if (ua.includes('Safari')) browser = 'Safari'
    else if (ua.includes('Edge')) browser = 'Edge'

    // Extract OS info
    let os = 'Unknown'
    if (ua.includes('Windows')) os = 'Windows'
    else if (ua.includes('Mac')) os = 'MacOS'
    else if (ua.includes('Linux')) os = 'Linux'
    else if (ua.includes('Android')) os = 'Android'
    else if (ua.includes('iOS')) os = 'iOS'

    return {
      device,
      browser,
      os,
      userAgent: ua,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  }

  private async getGeoLocation(): Promise<any> {
    try {
      // Use IP-based geolocation service
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      return {
        country: data.country_name,
        city: data.city,
        region: data.region,
        ipAddress: data.ip
      }
    } catch (error) {
      console.warn('Could not get geolocation:', error)
      return {}
    }
  }

  private async initializeSession(data: any) {
    try {
      await fetch('/api/analytics/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          userId: this.userId,
          referrer: document.referrer,
          landingPage: window.location.pathname,
          ...data
        })
      })
    } catch (error) {
      console.error('Failed to initialize session:', error)
    }
  }

  private setupEventListeners() {
    if (typeof window === 'undefined') return

    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (!target) return

      this.trackEvent({
        event: 'click',
        eventCategory: 'ENGAGEMENT',
        eventAction: 'click',
        eventLabel: target.tagName.toLowerCase(),
        customData: {
          elementId: target.id,
          elementClass: target.className,
          elementText: target.textContent?.slice(0, 100),
          coordinates: `${event.clientX},${event.clientY}`
        }
      })

      // Special tracking for important elements
      if (target.matches('button, .btn, [role="button"]')) {
        this.trackEvent({
          event: 'button_click',
          eventCategory: 'ENGAGEMENT',
          eventAction: 'button_click',
          eventLabel: target.textContent?.trim() || 'Button'
        })
      }

      if (target.matches('a[href]')) {
        const href = target.getAttribute('href')
        this.trackEvent({
          event: 'link_click',
          eventCategory: 'NAVIGATION',
          eventAction: 'link_click',
          eventLabel: href || 'Link'
        })
      }
    })

    // Track form interactions
    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement
      if (target.matches('input, textarea, select')) {
        this.trackEvent({
          event: 'form_field_focus',
          eventCategory: 'FORM_INTERACTION',
          eventAction: 'field_focus',
          eventLabel: target.getAttribute('name') || target.getAttribute('id') || 'field'
        })
      }
    })

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement
      if (!form) return

      const formData = new FormData(form)
      const data: Record<string, any> = {}
      formData.forEach((value, key) => {
        data[key] = value
      })

      this.trackEvent({
        event: 'form_submit',
        eventCategory: 'CONVERSION',
        eventAction: 'form_submit',
        eventLabel: form.getAttribute('name') || form.getAttribute('id') || 'form',
        customData: { formData: data }
      })

      // Send lead data
      this.trackLead({
        formType: form.getAttribute('data-form-type') || 'contact',
        formData: data
      })
    })

    // Track scroll depth
    let maxScrollDepth = 0
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPercent = Math.round((scrollTop + windowHeight) / documentHeight * 100)
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
        
        // Track milestone scroll depths
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          this.trackEvent({
            event: 'scroll_depth',
            eventCategory: 'ENGAGEMENT',
            eventAction: 'scroll',
            eventLabel: `${scrollPercent}%`,
            eventValue: scrollPercent
          })
        }
      }
    }

    window.addEventListener('scroll', trackScrollDepth, { passive: true })

    // Track video interactions
    document.addEventListener('play', (event) => {
      const video = event.target as HTMLVideoElement
      if (video.tagName === 'VIDEO') {
        this.trackEvent({
          event: 'video_play',
          eventCategory: 'MEDIA_INTERACTION',
          eventAction: 'play',
          eventLabel: video.getAttribute('data-video-title') || 'Video'
        })
      }
    }, true)

    // Track downloads
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.href) {
        const href = target.href.toLowerCase()
        if (href.includes('.pdf') || href.includes('.doc') || href.includes('.zip') || 
            href.includes('download') || target.hasAttribute('download')) {
          this.trackEvent({
            event: 'file_download',
            eventCategory: 'DOWNLOAD',
            eventAction: 'download',
            eventLabel: target.href
          })
        }
      }
    })
  }

  private setupExitTracking() {
    if (typeof window === 'undefined') return

    let isExiting = false

    const trackExit = () => {
      if (isExiting) return
      isExiting = true

      const timeOnPage = Date.now() - this.pageStartTime.getTime()
      
      // Use sendBeacon for reliable exit tracking
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/page-exit', JSON.stringify({
          sessionId: this.sessionId,
          page: window.location.pathname,
          timeOnPage: Math.round(timeOnPage / 1000),
          scrollDepth: this.getCurrentScrollDepth()
        }))
      }
    }

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        trackExit()
      }
    })

    // Track beforeunload
    window.addEventListener('beforeunload', trackExit)

    // Track pagehide (more reliable on mobile)
    window.addEventListener('pagehide', trackExit)
  }

  private getCurrentScrollDepth(): number {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    return Math.round((scrollTop + windowHeight) / documentHeight * 100)
  }

  // Public methods for custom tracking
  public trackEvent(event: DataLayerEvent) {
    if (!this.isInitialized) return

    const eventData = {
      ...event,
      sessionId: this.sessionId,
      userId: this.userId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    }

    // Add to data layer
    window.dataLayer.push(eventData)

    // Send to backend
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    }).catch(error => console.error('Failed to track event:', error))
  }

  public trackPageView(page?: string) {
    if (typeof window === 'undefined') return

    const pageData = {
      sessionId: this.sessionId,
      userId: this.userId,
      page: page || window.location.pathname,
      pageTitle: document.title,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    }

    window.dataLayer.push({
      event: 'page_view',
      ...pageData
    })

    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageData)
    }).catch(error => console.error('Failed to track page view:', error))

    this.pageStartTime = new Date()
  }

  public trackLead(data: {
    formType: string
    formData: Record<string, any>
  }) {
    const leadData = {
      sessionId: this.sessionId,
      formType: data.formType,
      formData: data.formData,
      name: data.formData.name || data.formData.fullName,
      email: data.formData.email,
      phone: data.formData.phone,
      company: data.formData.company,
      message: data.formData.message || data.formData.comments
    }

    window.dataLayer.push({
      event: 'lead_generated',
      ...leadData
    })

    fetch('/api/analytics/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    }).catch(error => console.error('Failed to track lead:', error))
  }

  public setUserId(userId: string) {
    this.userId = userId
    
    // Update session with user ID
    fetch('/api/analytics/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: this.sessionId,
        userId: userId
      })
    }).catch(error => console.error('Failed to update user ID:', error))
  }

  public trackCustomEvent(eventName: string, data?: Record<string, any>) {
    this.trackEvent({
      event: eventName,
      eventCategory: 'CUSTOM',
      customData: data
    })
  }

  // Get session information
  public getSessionInfo() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      sessionStart: this.sessionStart
    }
  }
}

// Initialize analytics when script loads
export function initializeAnalytics() {
  if (typeof window !== 'undefined' && !window.hubEbonyAnalytics) {
    new CommercialDXBAnalytics()
  }
}

// Export for manual initialization
export { CommercialDXBAnalytics }

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics)
  } else {
    initializeAnalytics()
  }
}