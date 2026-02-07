'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Plus,
  ShoppingCart,
} from 'lucide-react'
import { ProgressTracker } from '@/components/dashboard/ProgressTracker'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useOrders } from '@/lib/hooks/useOrders'
import { useDocuments } from '@/lib/hooks/useDocuments'
import { useSupportTickets } from '@/lib/hooks/useSupport'
import { useAuth } from '@/providers/auth-provider'
import { onboardingApi } from '@/lib/api/onboarding'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow } from 'date-fns'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { orders, isLoading: ordersLoading } = useOrders()
  const { documents, isLoading: documentsLoading } = useDocuments()
  const { tickets, isLoading: ticketsLoading } = useSupportTickets()
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true)
  const [onboardingCompleted, setOnboardingCompleted] = useState(true)
  const [showOnboardingBanner, setShowOnboardingBanner] = useState(true)
  const [daysRemaining, setDaysRemaining] = useState(0)

  // Get the most recent order
  const latestOrder = orders && orders.length > 0 ? orders[0] : null

  // Check onboarding status on mount
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const status = await onboardingApi.getStatus()

        // If onboarding not completed, show banner but don't block
        if (!status.completed) {
          setOnboardingCompleted(false)
          setShowOnboardingBanner(true)
        } else {
          setOnboardingCompleted(true)
          setShowOnboardingBanner(false)
        }
        setIsCheckingOnboarding(false)
      } catch (error) {
        console.error('Error checking onboarding:', error)
        // If error, assume onboarding is completed to avoid blocking
        setOnboardingCompleted(true)
        setShowOnboardingBanner(false)
        setIsCheckingOnboarding(false)
      }
    }

    // Only check if user is loaded
    if (user) {
      checkOnboarding()
    } else {
      // If no user, don't block - let auth provider handle it
      setIsCheckingOnboarding(false)
    }
  }, [router, user])

  // Calculate days remaining
  useEffect(() => {
    if (latestOrder?.estimated_completion) {
      const days = Math.ceil((new Date(latestOrder.estimated_completion).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      setDaysRemaining(days)
    }
  }, [latestOrder?.estimated_completion])

  // Show loading while checking onboarding
  if (isCheckingOnboarding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }
  
  const stats = {
    daysRemaining,
    progress: latestOrder?.progress || 0,
    documentsReady: documents?.filter(d => d.is_verified).length || 0,
    totalDocuments: documents?.length || 0,
  }

  // Get current package and determine upgrade options
  const currentPackage = latestOrder?.package_type
    ? latestOrder.package_type.charAt(0).toUpperCase() + latestOrder.package_type.slice(1)
    : 'Starter'
  const upgradeOptions = {
    Starter: {
      nextPackage: 'Growth',
      title: 'Upgrade to Growth',
      description: 'Get AI chatbot, e-commerce, and 3 months of premium support',
      href: '/pricing?plan=growth',
      features: ['AI Chatbot (24/7)', 'E-commerce (50 products)', '3 Months Premium Support'],
    },
    Growth: {
      nextPackage: 'Premium',
      title: 'Upgrade to Premium',
      description: 'Get AI voice assistant, unlimited e-commerce, and priority support',
      href: '/pricing?plan=premium',
      features: ['AI Voice Assistant', 'Unlimited E-commerce', 'Dedicated Account Manager'],
    },
    Premium: null, // No upgrade available
  }

  const upgrade = upgradeOptions[currentPackage as keyof typeof upgradeOptions]

  // Show loading state
  if (ordersLoading || documentsLoading || ticketsLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-96 rounded-3xl" />
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </div>
    )
  }

  // Show error or empty state
  if (!latestOrder) {
    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back{user?.first_name ? `, ${user.first_name}` : ''}! 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>

          {/* Start New Order Button */}
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-8 py-6 shadow-lg shadow-green-600/30 flex-shrink-0"
          >
            <Link href="/#pricing">
              <Plus className="w-5 h-5 mr-2" />
              Start New Order
            </Link>
          </Button>
        </div>

        {/* Empty State Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Launch Your Business?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Let&apos;s get started! Choose a package that fits your needs and we&apos;ll handle everything from LLC formation to your website launch.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-8 shadow-lg"
            >
              <Link href="/#pricing">
                <ShoppingCart className="w-5 h-5 mr-2" />
                View Packages
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-2"
            >
              <Link href="/contact">
                <MessageSquare className="w-5 h-5 mr-2" />
                Talk to an Expert
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Onboarding Banner (if skipped) */}
      {!onboardingCompleted && showOnboardingBanner && (
        <div className="mb-8 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Complete Your Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Help us personalize your experience by completing your business profile. It only takes 2 minutes!
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl"
              >
                <Link href="/onboarding">
                  Complete Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <button
              onClick={() => setShowOnboardingBanner(false)}
              title="Dismiss"
              aria-label="Dismiss banner"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back{user?.first_name ? `, ${user.first_name}` : ''}! 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your business is <span className="font-semibold text-green-600 dark:text-green-400">
            {latestOrder ? (latestOrder.progress_percentage ?? latestOrder.progress ?? stats.progress) : stats.progress}% complete
          </span>.
          {stats.daysRemaining > 0 ? ` ${stats.daysRemaining} days until launch!` : " We&apos;re on track for launch!"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Days to Launch"
          value={stats.daysRemaining}
          icon={Calendar}
          gradient="bg-gradient-to-br from-green-600 to-emerald-600"
          delay={0}
          href="/dashboard/orders"
        />
        <StatsCard
          title="Completion"
          value={`${stats.progress}%`}
          change={{ value: 15, trend: 'up' }}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-green-600 to-emerald-600"
          delay={0.1}
          href="/dashboard/orders"
        />
        <StatsCard
          title="Documents Ready"
          value={`${stats.documentsReady}/${stats.totalDocuments}`}
          icon={FileText}
          gradient="bg-gradient-to-br from-green-600 to-emerald-600"
          delay={0.2}
          href="/dashboard/documents"
        />
        <StatsCard
          title="Support Tickets"
          value={tickets?.length || 0}
          icon={MessageSquare}
          gradient="bg-gradient-to-br from-orange-500 to-orange-600"
          delay={0.3}
          href="/dashboard/support"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column - Progress Tracker */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card */}
          <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
            <ProgressTracker
              currentStatus={latestOrder.status}
              progress={latestOrder.progress_percentage ?? latestOrder.progress ?? stats.progress}
              documentsSubmitted={latestOrder.documents_submitted}
              documentsApproved={latestOrder.documents_approved}
              orderId={latestOrder.id}
            />
          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {documents && documents.length > 0 ? (
                documents.slice(0, 3).map((doc) => {
                  const timeAgo = formatDistanceToNow(new Date(doc.uploaded_at), { addSuffix: true })
                  return (
                    <div
                      key={doc.id}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {doc.is_verified ? 'Document Verified' : 'Document Uploaded'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {timeAgo}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Info */}
        <div className="space-y-6">

          {/* Quick Actions */}
          <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-green-600/30 justify-between hover:translate-x-1 transition-all"
              >
                <Link href="/dashboard/orders">
                  View Order Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-gray-200 dark:border-gray-800 rounded-xl font-semibold justify-between hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1 transition-all"
              >
                <Link href="/dashboard/documents">
                  Download Documents
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-gray-200 dark:border-gray-800 rounded-xl font-semibold justify-between hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1 transition-all"
              >
                <Link href="/dashboard/support">
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 border-green-200 dark:border-green-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              What&apos;s Next?
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Review your website design draft (Ready tomorrow)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Provide business bank preferences
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Final approval & launch
                </p>
              </div>
            </div>
          </div>

          {/* Upgrade Prompt - Only show if not on Premium */}
          {upgrade && (
            <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-600 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
              <div className="relative z-10">
                <Sparkles className="w-8 h-8 mb-3" />
                <h3 className="font-bold text-lg mb-2">{upgrade.title}</h3>
                <p className="text-sm text-green-50 mb-3">
                  {upgrade.description}
                </p>
                <ul className="text-xs text-green-100 mb-4 space-y-1">
                  {upgrade.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full bg-white text-green-600 hover:bg-green-50 rounded-xl font-semibold"
                >
                  <Link href={upgrade.href}>
                    Upgrade to {upgrade.nextPackage}
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Account Manager */}
          <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Your Account Manager
            </h2>
            <div className="flex items-center gap-4">
              {/* Avatar - Show image if available, otherwise show initials */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white text-xl font-bold overflow-hidden flex-shrink-0">
                {/* TODO: Replace with actual manager avatar URL from API */}
                {/* {managerAvatar ? (
                  <img 
                    src={managerAvatar} 
                    alt="Manager avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>SM</span>
                )} */}
                <span>SM</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Sarah Martinez
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Senior Launch Specialist
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg text-xs"
                >
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
