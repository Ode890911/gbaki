'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { onboardingApi } from '@/lib/api/onboarding'
import {
  Building2,
  User,
  Briefcase,
  Target,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Globe,
  Phone,
  Mail,
  DollarSign,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    phone: user?.phone || '',
    country: '',

    // Step 2: Business Idea
    businessName: '',
    businessType: '',
    industry: '',
    businessStage: '',

    // Step 3: Goals
    mainGoal: '',
    timeline: '',
    budget: '',

    // Step 4: Preferences
    preferredState: '',
    needWebsite: true,
    needPhone: true,
    needEmail: true,
  })

  const totalSteps = 4

  const steps = [
    {
      number: 1,
      title: 'Personal Information',
      description: 'Tell us about yourself',
      icon: User,
    },
    {
      number: 2,
      title: 'Business Idea',
      description: 'What are you building?',
      icon: Briefcase,
    },
    {
      number: 3,
      title: 'Your Goals',
      description: 'What do you want to achieve?',
      icon: Target,
    },
    {
      number: 4,
      title: 'Service Preferences',
      description: 'What services do you need?',
      icon: Building2,
    },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.phone || !formData.country) {
        toast.error('Please fill in all required fields')
        return
      }
    } else if (currentStep === 2) {
      if (!formData.businessName || !formData.businessType || !formData.industry) {
        toast.error('Please fill in all required fields')
        return
      }
    } else if (currentStep === 3) {
      if (!formData.mainGoal || !formData.timeline) {
        toast.error('Please fill in all required fields')
        return
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true)

    try {
      // Save onboarding data to backend
      await onboardingApi.completeOnboarding(formData)

      toast.success('Welcome to Gbaki! Your profile is all set.')

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (error: any) {
      console.error('Onboarding error:', error)
      const errorMessage = error.message || 'Something went wrong. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Welcome to Gbaki Digital Solutions
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Let&apos;s Get You Started
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Just a few quick questions to personalize your experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${isCompleted
                        ? 'bg-green-600 text-white'
                        : isActive
                          ? 'bg-green-600 text-white ring-4 ring-green-600/30'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`text-xs font-semibold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        Step {step.number}
                      </div>
                      <div className={`text-xs hidden sm:block ${isActive ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 w-full mx-2 transition-all ${isCompleted ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-800'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-8 shadow-xl">

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Tell Us About Yourself
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We&apos;ll use this information to personalize your experience.
                </p>
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
                    placeholder="John"
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
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Country of Origin *
                  </label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  >
                    <option value="">Select country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Idea */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Your Business Idea
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us what you&apos;re building so we can tailor our support.
                </p>
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
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Don&apos;t worry, you can change this later
                  </p>
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  >
                    <option value="">Select type</option>
                    <option value="product">Product-based (physical goods)</option>
                    <option value="service">Service-based (consulting, agency)</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">Software/SaaS</option>
                    <option value="restaurant">Restaurant/Food</option>
                    <option value="retail">Retail Store</option>
                    <option value="other">Other</option>
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
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="food">Food & Beverage</option>
                    <option value="beauty">Beauty & Personal Care</option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="construction">Construction</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="businessStage" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Where are you in your journey?
                  </label>
                  <select
                    id="businessStage"
                    value={formData.businessStage}
                    onChange={(e) => handleInputChange('businessStage', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  >
                    <option value="">Select stage</option>
                    <option value="idea">Just an idea</option>
                    <option value="planning">Planning phase</option>
                    <option value="ready">Ready to launch</option>
                    <option value="operating">Already operating</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  What Are Your Goals?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Help us understand what success looks like for you.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    What&apos;s your main goal for this year? *
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'launch', label: 'Launch my business', icon: Sparkles },
                      { value: 'revenue', label: 'Generate first revenue', icon: DollarSign },
                      { value: 'customers', label: 'Get my first customers', icon: User },
                      { value: 'grow', label: 'Grow existing business', icon: TrendingUp },
                    ].map((goal) => {
                      const Icon = goal.icon
                      return (
                        <button
                          key={goal.value}
                          type="button"
                          onClick={() => handleInputChange('mainGoal', goal.value)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${formData.mainGoal === goal.value
                            ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                            }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.mainGoal === goal.value
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`font-semibold ${formData.mainGoal === goal.value
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-900 dark:text-white'
                            }`}>
                            {goal.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    When do you want to launch? *
                  </label>
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1month">Within 1 month</option>
                    <option value="3months">Within 3 months</option>
                    <option value="6months">Within 6 months</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    What&apos;s your budget?
                  </label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  >
                    <option value="">Select budget range</option>
                    <option value="under1k">Under $1,000</option>
                    <option value="1k-3k">$1,000 - $3,000</option>
                    <option value="3k-5k">$3,000 - $5,000</option>
                    <option value="over5k">Over $5,000</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Service Preferences
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Let us know which services you&apos;re interested in.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="preferredState" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Preferred State for LLC Formation
                  </label>
                  <select
                    id="preferredState"
                    value={formData.preferredState}
                    onChange={(e) => handleInputChange('preferredState', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  >
                    <option value="">Not sure yet</option>
                    <option value="DE">Delaware</option>
                    <option value="WY">Wyoming</option>
                    <option value="NV">Nevada</option>
                    <option value="FL">Florida</option>
                    <option value="TX">Texas</option>
                    <option value="home">My home state</option>
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    We&apos;ll help you choose the best state for your business
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Which services do you need?
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'needWebsite', label: 'Professional Website', icon: Globe },
                      { key: 'needPhone', label: 'Business Phone Number', icon: Phone },
                      { key: 'needEmail', label: 'Business Email', icon: Mail },
                    ].map((service) => {
                      const Icon = service.icon
                      return (
                        <button
                          key={service.key}
                          type="button"
                          onClick={() => handleInputChange(service.key, !formData[service.key as keyof typeof formData])}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${formData[service.key as keyof typeof formData]
                            ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                            }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData[service.key as keyof typeof formData]
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                              }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`font-semibold ${formData[service.key as keyof typeof formData]
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-900 dark:text-white'
                              }`}>
                              {service.label}
                            </span>
                          </div>
                          {formData[service.key as keyof typeof formData] && (
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="rounded-xl border-2"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleSkip}
                variant="ghost"
                className="text-gray-600 dark:text-gray-400"
              >
                Skip for now
              </Button>
            </div>

            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-8 shadow-lg shadow-green-600/30"
            >
              {currentStep === totalSteps ? (
                <>
                  {isSubmitting ? 'Completing...' : 'Complete'}
                  <CheckCircle className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

