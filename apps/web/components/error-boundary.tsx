'use client'

import * as React from 'react'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service (Sentry, etc.)
    console.error('Error Boundary caught:', error, errorInfo)

    // Call optional error handler
    this.props.onError?.(error, errorInfo)

    // TODO: Send to Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: errorInfo })
    // }
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} reset={this.reset} />
      }

      // Default fallback UI
      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />
    }

    return this.props.children
  }
}

// Default Error Fallback Component
function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-red-200 dark:border-red-800 p-8 shadow-xl text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something Went Wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We encountered an unexpected error. Dont worry, our team has been notified.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl text-left">
              <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">
                Error Details (Dev Only):
              </p>
              <p className="text-xs text-red-700 dark:text-red-300 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={reset}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl py-6"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>

            <div className="grid grid-cols-2 gap-3">
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

              <Button
                asChild
                variant="outline"
                className="rounded-xl border-2 py-6"
              >
                <Link href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrapper hook for functional components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return setError
}

