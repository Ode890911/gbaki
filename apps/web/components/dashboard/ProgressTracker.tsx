'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, Loader2, Upload } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/lib/dashboard/types'

interface Step {
  id: OrderStatus | 'documents_submitted' | 'documents_approved'
  name: string
  description: string
  action?: React.ReactNode
}

interface ProgressTrackerProps {
  currentStatus: OrderStatus
  progress: number
  documentsSubmitted?: boolean
  documentsApproved?: boolean
  orderId?: string
}

export function ProgressTracker({ 
  currentStatus, 
  progress, 
  documentsSubmitted = false,
  documentsApproved = false,
  orderId 
}: ProgressTrackerProps) {
  // Build dynamic steps based on document status
  const steps: Step[] = [
    {
      id: 'pending',
      name: 'Order Placed',
      description: 'Payment confirmed, preparing your package',
    },
    {
      id: 'documents_submitted',
      name: 'Documents Submitted',
      description: documentsSubmitted 
        ? 'All required documents uploaded' 
        : 'Waiting for required documents',
      action: !documentsSubmitted && orderId && (
        <Button
          asChild
          size="sm"
          variant="outline"
          className="rounded-xl border-2 mt-2"
        >
          <Link href={`/dashboard/documents?order_id=${orderId}`}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Now
          </Link>
        </Button>
      ),
    },
    {
      id: 'documents_approved',
      name: 'Documents Verified',
      description: documentsApproved
        ? 'Documents reviewed and approved'
        : documentsSubmitted
          ? 'Documents under review'
          : 'Waiting for document submission',
    },
    {
      id: 'processing',
      name: 'Processing',
      description: 'Your business services are being set up',
    },
    {
      id: 'llc_filed',
      name: 'LLC Filing',
      description: 'Submitting formation documents to state',
    },
    {
      id: 'ein_approved',
      name: 'EIN Approved',
      description: 'Tax ID number obtained from IRS',
    },
    {
      id: 'website_building',
      name: 'Website Development',
      description: 'Designing and building your site',
    },
    {
      id: 'website_review',
      name: 'Final Review',
      description: 'Your approval needed before launch',
    },
    {
      id: 'completed',
      name: 'Launched! 🎉',
      description: 'Your business is live and ready',
    },
  ]

  // Determine current step index
  let currentStepIndex = 0
  if (currentStatus === 'completed') {
    currentStepIndex = steps.length - 1
  } else if (currentStatus === 'website_review') {
    currentStepIndex = steps.findIndex(s => s.id === 'website_review')
  } else if (currentStatus === 'website_building') {
    currentStepIndex = steps.findIndex(s => s.id === 'website_building')
  } else if (currentStatus === 'ein_approved') {
    currentStepIndex = steps.findIndex(s => s.id === 'ein_approved')
  } else if (currentStatus === 'llc_filed') {
    currentStepIndex = steps.findIndex(s => s.id === 'llc_filed')
  } else if (currentStatus === 'processing') {
    // If processing, check document status
    if (documentsApproved) {
      currentStepIndex = steps.findIndex(s => s.id === 'processing')
    } else if (documentsSubmitted) {
      currentStepIndex = steps.findIndex(s => s.id === 'documents_approved')
    } else {
      currentStepIndex = steps.findIndex(s => s.id === 'documents_submitted')
    }
  } else {
    // pending status
    currentStepIndex = steps.findIndex(s => s.id === 'documents_submitted')
  }

  const getStepStatus = (index: number, step: Step) => {
    // Handle document steps specially
    if (step.id === 'documents_submitted') {
      if (documentsSubmitted) return 'completed'
      if (index === currentStepIndex) return 'current'
      return 'upcoming'
    }
    if (step.id === 'documents_approved') {
      if (documentsApproved) return 'completed'
      if (documentsSubmitted && index === currentStepIndex) return 'current'
      if (!documentsSubmitted) return 'upcoming'
      return 'current'
    }
    
    // Regular status steps
    if (index < currentStepIndex) return 'completed'
    if (index === currentStepIndex) return 'current'
    return 'upcoming'
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Overall Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {steps[currentStepIndex].name}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {progress}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete
            </p>
          </div>
        </div>

        {/* Bar */}
        <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
          />
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index, step)
          const isCompleted = status === 'completed'
          const isCurrent = status === 'current'
          const isUpcoming = status === 'upcoming'

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                    isCompleted &&
                      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                    isCurrent &&
                      'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/30',
                    isUpcoming &&
                      'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                  )}
                >
                  {isCompleted && <Check className="w-6 h-6" strokeWidth={3} />}
                  {isCurrent && <Loader2 className="w-6 h-6 animate-spin" />}
                  {isUpcoming && <Clock className="w-6 h-6" />}

                  {/* Pulse effect for current step */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-xl bg-green-600 animate-ping opacity-20" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4
                      className={cn(
                        'font-bold text-lg',
                        (isCompleted || isCurrent) &&
                          'text-gray-900 dark:text-white',
                        isUpcoming && 'text-gray-500 dark:text-gray-600'
                      )}
                    >
                      {step.name}
                    </h4>
                    {isCompleted && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                        Done
                      </span>
                    )}
                    {isCurrent && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      'text-sm',
                      (isCompleted || isCurrent) &&
                        'text-gray-600 dark:text-gray-400',
                      isUpcoming && 'text-gray-500 dark:text-gray-600'
                    )}
                  >
                    {step.description}
                  </p>

                  {/* Action button (e.g., Upload Documents) */}
                  {step.action && (
                    <div className="mt-3">
                      {step.action}
                    </div>
                  )}

                  {/* Estimated time for current step */}
                  {isCurrent && !step.action && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Estimated: 2-3 business days</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 -translate-x-1/2">
                  <div
                    className={cn(
                      'h-full',
                      isCompleted
                        ? 'bg-green-300 dark:bg-green-800'
                        : 'bg-gray-200 dark:bg-gray-800'
                    )}
                  />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

