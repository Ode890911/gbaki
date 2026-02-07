'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Shield, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ConsentType = 'necessary' | 'analytics' | 'marketing'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [showDetails, setShowDetails] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [preferences, setPreferences] = React.useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  })

  // Only run on client side to avoid hydration issues
  React.useEffect(() => {
    setMounted(true)
    
    // Check if user has already made a choice
    if (typeof window === 'undefined') return
    
    const consent = localStorage.getItem('cookie-consent')
    if (consent) return

    // Show banner after 1 second
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])
  
  // Don't render until mounted (client-side only)
  if (!mounted) return null

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    savePreferences(allAccepted)
  }

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  }

  const saveCustomPreferences = () => {
    savePreferences(preferences)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())

    // Initialize analytics if accepted
    if (prefs.analytics) {
      initializeAnalytics()
    }

    // Initialize marketing if accepted
    if (prefs.marketing) {
      initializeMarketing()
    }

    setIsVisible(false)
  }

  const initializeAnalytics = () => {
    // TODO: Initialize Google Analytics, Mixpanel, etc.
    // Analytics initialization will be implemented here
  }

  const initializeMarketing = () => {
    // TODO: Initialize marketing pixels (Facebook, Google Ads, etc.)
    // Marketing pixels initialization will be implemented here
  }

  const togglePreference = (type: ConsentType) => {
    if (type === 'necessary') return // Can't disable necessary cookies
    setPreferences(prev => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowDetails(false)}
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          >
            <div className="container mx-auto max-w-6xl">
              <div className="relative rounded-3xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">

                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700" />

                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Main View */}
                      {!showDetails ? (
                        <>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            We Value Your Privacy
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            We use cookies to enhance your browsing experience, serve personalized
                            content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent
                            to our use of cookies. Read our{' '}
                            <Link
                              href="/privacy"
                              className="text-green-600 dark:text-green-400 hover:underline font-medium"
                            >
                              Privacy Policy
                            </Link>
                            {' '}and{' '}
                            <Link
                              href="/cookie-policy"
                              className="text-green-600 dark:text-green-400 hover:underline font-medium"
                            >
                              Cookie Policy
                            </Link>
                            .
                          </p>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              onClick={acceptAll}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-green-600/30"
                            >
                              Accept All
                            </Button>
                            <Button
                              onClick={acceptNecessary}
                              variant="outline"
                              className="border-2 border-gray-300 dark:border-gray-700 rounded-xl font-semibold"
                            >
                              Necessary Only
                            </Button>
                            <Button
                              onClick={() => setShowDetails(true)}
                              variant="ghost"
                              className="rounded-xl font-semibold"
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              Customize
                            </Button>
                          </div>
                        </>
                      ) : (
                        /* Detailed Settings */
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Cookie Preferences
                            </h3>
                            <button
                              onClick={() => setShowDetails(false)}
                              title="Close"
                              aria-label="Close settings"
                              className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                            >
                              <X className="w-5 h-5 text-gray-500" />
                            </button>
                          </div>

                          <div className="space-y-4 mb-6">
                            {/* Necessary Cookies */}
                            <div className="flex items-start justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                              <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  <h4 className="font-semibold text-gray-900 dark:text-white">
                                    Necessary Cookies
                                  </h4>
                                  <span className="px-2 py-0.5 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                                    Always Active
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Required for the website to function. Cannot be disabled.
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="w-12 h-6 rounded-full bg-green-600 relative cursor-not-allowed opacity-50">
                                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                                </div>
                              </div>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="flex items-start justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                              <div className="flex-1 pr-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  Analytics Cookies
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Help us understand how visitors interact with our website.
                                </p>
                              </div>
                              <button
                                onClick={() => togglePreference('analytics')}
                                title="Toggle analytics cookies"
                                aria-label="Toggle analytics cookies"
                                className={cn(
                                  'flex-shrink-0 w-12 h-6 rounded-full relative transition-colors',
                                  preferences.analytics
                                    ? 'bg-green-600'
                                    : 'bg-gray-300 dark:bg-gray-700'
                                )}
                              >
                                <div
                                  className={cn(
                                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                                    preferences.analytics ? 'right-1' : 'left-1'
                                  )}
                                />
                              </button>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="flex items-start justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                              <div className="flex-1 pr-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  Marketing Cookies
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Used to deliver personalized advertisements relevant to you.
                                </p>
                              </div>
                              <button
                                onClick={() => togglePreference('marketing')}
                                title="Toggle marketing cookies"
                                aria-label="Toggle marketing cookies"
                                className={cn(
                                  'flex-shrink-0 w-12 h-6 rounded-full relative transition-colors',
                                  preferences.marketing
                                    ? 'bg-green-600'
                                    : 'bg-gray-300 dark:bg-gray-700'
                                )}
                              >
                                <div
                                  className={cn(
                                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                                    preferences.marketing ? 'right-1' : 'left-1'
                                  )}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              onClick={saveCustomPreferences}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold"
                            >
                              Save Preferences
                            </Button>
                            <Button
                              onClick={acceptAll}
                              variant="outline"
                              className="border-2 border-gray-300 dark:border-gray-700 rounded-xl font-semibold"
                            >
                              Accept All
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

