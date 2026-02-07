'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Page error:', error)
    
    // TODO: Send to Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     tags: { errorBoundary: 'page' },
    //   })
    // }
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden shadow-xl">
          
          {/* Header */}
          <div className="bg-gradient-to-br from-red-600 to-rose-600 text-white p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Something Went Wrong
            </h1>
            <p className="text-red-100">
              We encountered an unexpected error while loading this page
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            
            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
                <h3 className="text-sm font-bold text-red-900 dark:text-red-100 mb-2">
                  🔧 Error Details (Development Mode)
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">
                      Message:
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400 font-mono bg-white dark:bg-gray-900 p-3 rounded-lg break-all">
                      {error.message}
                    </p>
                  </div>
                  {error.digest && (
                    <div>
                      <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">
                        Digest:
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400 font-mono bg-white dark:bg-gray-900 p-3 rounded-lg break-all">
                        {error.digest}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* User-Friendly Message */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-3">
                What can you do?
              </h3>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <span>Try refreshing the page using the button below</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <span>Go back to the previous page and try again</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <span>If the problem persists, contact our support team</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={reset}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl py-6 font-semibold shadow-lg shadow-red-600/30"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="rounded-xl border-2 py-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-2 py-6"
                >
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </div>

            {/* Support Link */}
            <div className="text-center pt-4 border-t-2 border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Need help? Our support team is here for you.
              </p>
              <Button
                asChild
                variant="ghost"
                className="rounded-xl"
              >
                <Link href="/contact">
                  Contact Support →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

