'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { authApi } from '@/lib/api/auth'
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight,
  Mail,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'

type VerificationState = 'verifying' | 'success' | 'error' | 'already_verified'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser } = useAuth()
  
  const [state, setState] = useState<VerificationState>('verifying')
  const [countdown, setCountdown] = useState(5)
  const [error, setError] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')

      if (!token) {
        setState('error')
        setError('No verification token provided')
        return
      }

      try {
        // Call backend to verify email
        const response = await authApi.verifyEmail(token)

        if (response.already_verified) {
          setState('already_verified')
          toast.info('Your email was already verified')
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login')
          }, 3000)
          return
        }

        // Auto-login after successful verification
        if (response.access_token && response.user) {
          // Store token
          if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', response.access_token)
            if (response.refresh_token) {
              localStorage.setItem('refresh_token', response.refresh_token)
            }
          }
          
          // Update auth context - map response user to User type
          if (setUser) {
            const userData = {
              id: response.user.id,
              email: response.user.email,
              first_name: response.user.first_name,
              last_name: response.user.last_name,
              email_verified: response.user.is_verified,
              is_active: true,
              created_at: new Date().toISOString(),
              marketing_consent: false,
              onboarding_completed: response.user.onboarding_completed || false,
            }
            setUser(userData)
          }
          
          setState('success')
          toast.success('Email verified successfully!')
          
          // Redirect to onboarding if not completed
          if (!response.user.onboarding_completed) {
            setTimeout(() => {
              router.push('/onboarding')
            }, 2000)
          } else {
            // Redirect to dashboard if onboarding already done
            setTimeout(() => {
              router.push('/dashboard')
            }, 2000)
          }
          return
        }
        
        // If no access token or user, show error
        setState('error')
        setError('Verification succeeded but failed to log in. Please try logging in manually.')

      } catch (err: any) {
        console.error('Verification error:', err)
        setState('error')
        setError(err.response?.data?.detail || err.message || 'Failed to verify email. The link may be expired.')
        toast.error('Verification failed')
      }
    }

    verifyEmail()
  }, [searchParams, router, setUser])

  // Countdown effect for success state
  useEffect(() => {
    if (state === 'success' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
    return
  }, [state, countdown])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Verifying State */}
        {state === 'verifying' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-8 shadow-xl text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verifying Your Email
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we verify your email address...
            </p>
          </div>
        )}

        {/* Success State */}
        {state === 'success' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-green-200 dark:border-green-800 p-8 shadow-xl text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your account is now active. Redirecting you to complete your profile...
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
                Redirecting in {countdown} seconds...
              </p>
            </div>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl py-6"
            >
              <Link href="/onboarding">
                Continue to Onboarding
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        {/* Already Verified State */}
        {state === 'already_verified' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-blue-200 dark:border-blue-800 p-8 shadow-xl text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Email Already Verified
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your email address has already been verified. You can log in to access your account.
            </p>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl py-6"
            >
              <Link href="/login">
                Go to Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        {/* Error State */}
        {state === 'error' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-red-200 dark:border-red-800 p-8 shadow-xl text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verification Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error}
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
              <p className="text-sm text-red-700 dark:text-red-400">
                The verification link may have expired or is invalid. Please request a new verification email.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl py-6"
              >
                <Link href="/login">
                  <Mail className="w-5 h-5 mr-2" />
                  Request New Verification Email
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-2 py-6"
              >
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
