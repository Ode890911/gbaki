'use client'

import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/lib/dashboard/types'

interface OrderStatusBadgeProps {
  status: OrderStatus
  size?: 'sm' | 'md' | 'lg'
}

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: {
    label: 'Pending',
    color: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
  },
  processing: {
    label: 'Processing',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  llc_filed: {
    label: 'LLC Filed',
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  ein_approved: {
    label: 'EIN Approved',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  website_building: {
    label: 'Website Building',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  website_review: {
    label: 'Review Needed',
    color: 'text-yellow-700 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
  completed: {
    label: 'Completed',
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

export function OrderStatusBadge({ status, size = 'md' }: OrderStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-full',
        config.color,
        config.bgColor,
        sizeClasses[size]
      )}
    >
      <span className="relative flex h-2 w-2 mr-2">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            config.bgColor
          )}
        />
        <span
          className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            status === 'completed' ? 'bg-green-600' : 'bg-current'
          )}
        />
      </span>
      {config.label}
    </span>
  )
}

