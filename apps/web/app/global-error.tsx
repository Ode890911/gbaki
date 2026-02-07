'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global error:', error)
    
    // TODO: Send to Sentry with high priority
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     tags: { errorBoundary: 'global' },
    //     level: 'fatal',
    //   })
    // }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl border-2 border-red-200 dark:border-red-800 p-8 shadow-xl text-center">
            
            {/* Error Icon */}
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Critical Error
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We encountered a critical error. Our team has been automatically notified and is working on a fix.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl text-left">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">
                  🔧 Global Error (Development Mode)
                </p>
                <p className="text-xs text-red-700 dark:text-red-300 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-mono mt-2">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Reload Application
              </button>

              <a
                href="/"
                className="block w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-all text-center"
              >
                Return to Homepage
              </a>
            </div>

            {/* Contact Support */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                If this error persists, please contact:
              </p>
              <a
                href="mailto:hello@gbakidigital.com"
                className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline"
              >
                hello@gbakidigital.com
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

