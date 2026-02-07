'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Mail,
  Lock,
  Phone,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react'

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [acceptedTerms, setAcceptedTerms] = React.useState(false)
  const [formData, setFormData] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [submitting, setSubmitting] = React.useState(false)

  const validatePassword = (password: string): string[] => {
    const issues: string[] = []
    if (password.length < 8) issues.push('At least 8 characters')
    if (!/[A-Z]/.test(password)) issues.push('One uppercase letter')
    if (!/[a-z]/.test(password)) issues.push('One lowercase letter')
    if (!/[0-9]/.test(password)) issues.push('One number')
    return issues
  }

  const passwordIssues = validatePassword(formData.password)
  const passwordStrength = formData.password ?
    100 - (passwordIssues.length * 25) : 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required'
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (passwordIssues.length > 0) {
      newErrors.password = 'Password does not meet requirements'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setSubmitting(true)

    try {
      await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
      })

      toast.success('Account created! Welcome to Gbaki Digital!')

      // Redirect to onboarding for first-time users
      setTimeout(() => {
        router.push('/onboarding')
      }, 1000)
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed. Please try again.'
      toast.error(errorMessage)

      // Handle specific errors
      if (errorMessage.includes('email')) {
        setErrors({ email: 'This email is already registered' })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Start your journey to US business ownership
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.first_name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-800 focus:border-green-500'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                  placeholder="Adeyemi"
                />
                {errors.first_name && (
                  <p className="text-xs text-red-600 mt-1">{errors.first_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.last_name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-800 focus:border-green-500'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                  placeholder="Johnson"
                />
                {errors.last_name && (
                  <p className="text-xs text-red-600 mt-1">{errors.last_name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-800 focus:border-green-500'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                  placeholder="adeyemi@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 ${errors.password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-800 focus:border-green-500'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-2">
                    {[25, 50, 75, 100].map((threshold) => (
                      <div
                        key={threshold}
                        className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= threshold
                            ? passwordStrength === 100
                              ? 'bg-green-600'
                              : passwordStrength >= 75
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                            : 'bg-gray-200 dark:bg-gray-800'
                          }`}
                      />
                    ))}
                  </div>
                  {passwordIssues.length > 0 && (
                    <div className="space-y-1">
                      {passwordIssues.map((issue) => (
                        <p key={issue} className="text-xs text-gray-600 dark:text-gray-400">
                          • {issue}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 ${errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-800 focus:border-green-500'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Acceptance */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-700 text-green-600 focus:ring-2 focus:ring-green-500/20 mt-0.5"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 dark:text-green-400 hover:underline font-semibold">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-600 mt-1">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl py-6 font-semibold shadow-lg shadow-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                'Creating Account...'
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 dark:text-green-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Benefits (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-br from-green-600 to-emerald-600 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join 1,500+ African Entrepreneurs
          </h2>
          <p className="text-green-100 text-lg mb-10">
            We&apos;ve helped thousands of immigrants launch successful US businesses. You&apos;re next!
          </p>

          <div className="space-y-6">
            {[
              {
                icon: CheckCircle,
                title: 'LLC Formed in 7 Days',
                description: 'Fast, reliable business registration',
              },
              {
                icon: CheckCircle,
                title: 'Full Support Included',
                description: 'Dedicated manager guides you every step',
              },
              {
                icon: CheckCircle,
                title: 'Professional Website',
                description: 'Stunning site built for your business',
              },
              {
                icon: CheckCircle,
                title: '14-Day Money-Back',
                description: 'Risk-free guarantee on all packages',
              },
            ].map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-green-100">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
