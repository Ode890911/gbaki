'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { 
  ShoppingCart,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Shield,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'

const PACKAGES = {
  starter: {
    name: 'Starter Package',
    price: 997,
    description: 'Perfect for solo entrepreneurs just starting out',
    features: [
      'Complete LLC Formation',
      '5-Page Professional Website',
      'Business Phone Number',
      'Professional Email (5 addresses)',
      'Registered Agent (1 year)',
      'EIN Application',
    ],
  },
  growth: {
    name: 'Growth Package',
    price: 2497,
    description: 'Best for growing businesses ready to scale',
    features: [
      'Everything in Starter',
      'Payment Processing Setup',
      'E-commerce Integration',
      'Premium Website Design',
      'SEO Optimization',
      'Priority Support',
    ],
  },
  premium: {
    name: 'Premium Package',
    price: 4997,
    description: 'For established businesses that need everything',
    features: [
      'Everything in Growth',
      'AI Chatbot Integration',
      'Advanced Analytics',
      'Custom Web Development',
      'Dedicated Account Manager',
      '24/7 Premium Support',
    ],
  },
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const [packageType, setPackageType] = useState<'starter' | 'growth' | 'premium'>('starter')
  const [isLoading, setIsLoading] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    
    // Business Info
    businessName: '',
    businessType: 'LLC',
    industry: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Preferences
    preferredState: 'DE',
    websiteNotes: '',
  })

  // Get package from URL
  useEffect(() => {
    const pkg = searchParams.get('package')
    if (pkg && (pkg === 'starter' || pkg === 'growth' || pkg === 'premium')) {
      setPackageType(pkg)
    }
  }, [searchParams])

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error('Please log in to continue')
      const currentUrl = `/checkout?package=${packageType}`
      router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`)
    }
  }, [user, router, packageType])

  const selectedPackage = PACKAGES[packageType]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error('Please fill in all required personal information')
      return
    }

    if (!formData.businessName || !formData.industry) {
      toast.error('Please fill in all required business information')
      return
    }

    if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast.error('Please fill in all required address information')
      return
    }

    setIsLoading(true)

    try {
      // TODO: In next step, we'll integrate Stripe here
      // For now, just show loading and redirect
      toast.success('Proceeding to payment...')
      
      // Store checkout data in sessionStorage for after payment
      sessionStorage.setItem('checkoutData', JSON.stringify({
        ...formData,
        packageType,
        packageName: selectedPackage.name,
        price: selectedPackage.price,
      }))

      // TODO: Redirect to Stripe checkout
      // For now, redirect to a placeholder
      setTimeout(() => {
        toast.info('Stripe integration coming next!')
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/#pricing"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pricing</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Just a few more details and you&apos;ll be ready to launch your business!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Business Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Business Name *
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="Your Business LLC"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Don&apos;t worry, you can change this later
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="businessType" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Business Type *
                      </label>
                      <select
                        id="businessType"
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                        required
                      >
                        <option value="LLC">LLC</option>
                        <option value="Corporation">Corporation</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Industry *
                      </label>
                      <select
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                        required
                      >
                        <option value="">Select industry</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="food">Food & Beverage</option>
                        <option value="beauty">Beauty & Personal Care</option>
                        <option value="fashion">Fashion & Apparel</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredState" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Preferred State for LLC Formation *
                    </label>
                    <select
                      id="preferredState"
                      value={formData.preferredState}
                      onChange={(e) => handleInputChange('preferredState', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                      required
                    >
                      <option value="DE">Delaware</option>
                      <option value="WY">Wyoming</option>
                      <option value="NV">Nevada</option>
                      <option value="FL">Florida</option>
                      <option value="TX">Texas</option>
                    </select>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      We&apos;ll help you confirm the best state during onboarding
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Mailing Address
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Street Address *
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main St"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        State *
                      </label>
                      <input
                        id="state"
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="MD"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        ZIP Code *
                      </label>
                      <input
                        id="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="21075"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Additional Information
                  </h2>
                </div>

                <div>
                  <label htmlFor="websiteNotes" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Website Preferences (Optional)
                  </label>
                  <textarea
                    id="websiteNotes"
                    value={formData.websiteNotes}
                    onChange={(e) => handleInputChange('websiteNotes', e.target.value)}
                    placeholder="Tell us about your website preferences, color schemes, or any specific features you'd like..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-green-600/30"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6 mr-2" />
                    Proceed to Payment
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </>
                )}
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
                
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Order Summary
                  </h2>
                </div>

                {/* Package Name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedPackage.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {selectedPackage.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6 space-y-2">
                  {selectedPackage.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t-2 border-gray-200 dark:border-gray-800 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${selectedPackage.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span>$0</span>
                  </div>
                  <div className="border-t-2 border-gray-200 dark:border-gray-800 pt-3 flex justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${selectedPackage.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Money Back Guarantee */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">
                        100% Money-Back Guarantee
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        If you&apos;re not satisfied within 30 days, we&apos;ll refund you completely.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Change Package */}
                <div className="mt-6">
                  <Link
                    href="/#pricing"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Change package
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

