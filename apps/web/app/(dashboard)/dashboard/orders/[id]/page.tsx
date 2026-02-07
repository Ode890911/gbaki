'use client'

import { 
  ArrowLeft,
  MessageSquare,
  Calendar,
  DollarSign,
  Upload,
  CheckCircle,
  FileText,
  Building2,
  Globe,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { OrderStatusBadge } from '@/components/dashboard/OrderStatusBadge'
import { useOrder } from '@/lib/hooks/useOrders'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { order, isLoading, isError } = useOrder(params.id)

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-96 rounded-3xl" />
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="space-y-8">
        <Link href="/dashboard/orders">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Failed to load order details. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  const packageName = order.package_name || (order.package_type 
    ? order.package_type.charAt(0).toUpperCase() + order.package_type.slice(1) + ' Package'
    : 'Unknown Package')
  const createdAt = order.created_at 
    ? format(new Date(order.created_at), 'MMM dd, yyyy')
    : 'N/A'
  const estimatedCompletion = order.estimated_completion
    ? format(new Date(order.estimated_completion), 'MMM dd, yyyy')
    : null
  
  // ✅ Calculate real progress percentage
  const progressPercentage = order.progress_percentage ?? order.progress ?? 0
  
  // ✅ Define progress steps with real milestone data
  const progressSteps = [
    {
      step: 1,
      title: 'Order Placed',
      description: 'Your order has been received and confirmed',
      completed: order.milestone_order_placed ?? true,  // Default to true (always completed on creation)
      icon: CheckCircle,
      color: 'green',
    },
    {
      step: 2,
      title: 'Documents Submitted',
      description: order.milestone_documents_submitted ?? order.documents_submitted
        ? 'All required documents have been uploaded' 
        : 'Waiting for required documents',
      completed: order.milestone_documents_submitted ?? order.documents_submitted ?? false,
      icon: FileText,
      color: 'blue',
      action: !(order.milestone_documents_submitted ?? order.documents_submitted) && (
        <Button
          asChild
          size="sm"
          variant="outline"
          className="rounded-xl border-2 mt-2"
        >
          <Link href={`/dashboard/documents?order_id=${order.id}`}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Now
          </Link>
        </Button>
      ),
    },
    {
      step: 3,
      title: 'Documents Verified',
      description: order.milestone_documents_approved ?? order.documents_approved
        ? 'All documents have been reviewed and approved'
        : (order.milestone_documents_submitted ?? order.documents_submitted)
          ? 'Documents are under review by our team'
          : 'Pending document submission',
      completed: order.milestone_documents_approved ?? order.documents_approved ?? false,
      icon: CheckCircle,
      color: 'purple',
    },
    {
      step: 4,
      title: 'LLC Formation',
      description: order.milestone_llc_filed
        ? 'LLC has been filed with the state'
        : 'Preparing and filing LLC documents',
      completed: order.milestone_llc_filed ?? false,
      icon: Building2,
      color: 'indigo',
    },
    {
      step: 5,
      title: 'Website Development',
      description: order.milestone_website_ready
        ? 'Your professional website is ready'
        : 'Building your custom website',
      completed: order.milestone_website_ready ?? false,
      icon: Globe,
      color: 'pink',
    },
    {
      step: 6,
      title: 'Services Setup',
      description: order.milestone_services_setup
        ? 'Business phone, email, and payment processing configured'
        : 'Setting up business phone, email, and payment processing',
      completed: order.milestone_services_setup ?? false,
      icon: Zap,
      color: 'orange',
    },
    {
      step: 7,
      title: 'Order Completed',
      description: order.milestone_completed
        ? 'All services delivered - your business is ready!'
        : 'Final review and delivery',
      completed: order.milestone_completed ?? false,
      icon: CheckCircle,
      color: 'green',
    },
  ]

  // ✅ Calculate current step (first incomplete step)
  const currentStepIndex = progressSteps.findIndex(step => !step.completed)
  const activeStep = currentStepIndex === -1 ? progressSteps.length : currentStepIndex + 1

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="rounded-xl">
        <Link href="/dashboard/orders">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Link>
      </Button>

      {/* Header */}
      <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {packageName} Package
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Order #{order.order_number || order.id}
            </p>
          </div>
          <OrderStatusBadge status={order.status} size="lg" />
        </div>

        {/* Order Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Order Date
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {createdAt}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Amount Paid
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${(order.total_amount ?? order.amount)?.toLocaleString() || '0'}
            </p>
          </div>

          {estimatedCompletion && (
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Est. Completion
                </h3>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {estimatedCompletion}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Progress Overview Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Overall Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {activeStep} of {progressSteps.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              {progressPercentage}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Complete</p>
          </div>
        </div>

        {/* ✅ Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-600 to-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* ✅ Detailed Progress Tracker */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Detailed Progress
        </h2>

        <div className="space-y-6">
          {progressSteps.map((item, index) => {
            const Icon = item.icon
            const isActive = index === currentStepIndex
            const isPast = item.completed

            // ✅ Color mapping for Tailwind classes
            const getColorClasses = (color: string, isActive: boolean) => {
              const colorMap: Record<string, string> = {
                green: isActive ? 'bg-green-600 ring-green-600/30' : 'bg-green-600',
                blue: isActive ? 'bg-blue-600 ring-blue-600/30' : 'bg-blue-600',
                purple: isActive ? 'bg-purple-600 ring-purple-600/30' : 'bg-purple-600',
                indigo: isActive ? 'bg-indigo-600 ring-indigo-600/30' : 'bg-indigo-600',
                pink: isActive ? 'bg-pink-600 ring-pink-600/30' : 'bg-pink-600',
                orange: isActive ? 'bg-orange-600 ring-orange-600/30' : 'bg-orange-600',
              }
              return colorMap[color] || 'bg-gray-600'
            }

            return (
              <div key={item.step} className="flex items-start gap-4">
                {/* ✅ Step Indicator with Line */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isPast
                      ? 'bg-green-600 text-white'
                      : isActive
                      ? `${getColorClasses(item.color, true)} text-white ring-4`
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}>
                    {isPast ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  
                  {/* Connecting Line */}
                  {index < progressSteps.length - 1 && (
                    <div className={`w-0.5 h-12 mt-2 transition-colors ${
                      isPast ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-800'
                    }`} />
                  )}
                </div>

                {/* ✅ Step Content */}
                <div className="flex-1 pb-8">
                  <h3 className={`text-lg font-bold mb-1 ${
                    isPast || isActive
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {item.description}
                  </p>
                  
                  {/* Action Button */}
                  {item.action && (
                    <div className="mt-3">
                      {item.action}
                    </div>
                  )}

                  {/* Completion Badge */}
                  {isPast && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mt-2">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button
          asChild
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6"
        >
          <Link href={`/dashboard/documents?order_id=${order.id}`}>
            <Upload className="w-5 h-5 mr-2" />
            Upload Documents
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-xl border-2"
        >
          <Link href={`/dashboard/support?order_id=${order.id}`}>
            <MessageSquare className="w-5 h-5 mr-2" />
            Get Help with This Order
          </Link>
        </Button>
      </div>
    </div>
  )
}

