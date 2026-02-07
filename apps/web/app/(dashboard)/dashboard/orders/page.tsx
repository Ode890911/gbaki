'use client'

import * as React from 'react'
import {
  Package,
  Calendar,
  Download,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  Plus,
} from 'lucide-react'
import { OrderStatusBadge } from '@/components/dashboard/OrderStatusBadge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useOrders } from '@/lib/hooks/useOrders'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import type { Order } from '@/lib/api/orders'

// Separate component for order card to use hooks
function OrderCard({ order }: { order: Order }) {
  const [daysRemaining, setDaysRemaining] = React.useState<number | null>(null)
  
  React.useEffect(() => {
    if (order.estimated_completion) {
      const days = Math.ceil((new Date(order.estimated_completion).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      setDaysRemaining(days)
    }
  }, [order.estimated_completion])
  
  const packageName = order.package_type
    ? order.package_type.charAt(0).toUpperCase() + order.package_type.slice(1)
    : 'Unknown'
  const createdAt = order.created_at
    ? format(new Date(order.created_at), 'MMM dd, yyyy')
    : 'N/A'
  const estimatedCompletion = order.estimated_completion
    ? format(new Date(order.estimated_completion), 'MMM dd, yyyy')
    : null
  const services = order.services || []

  return (
    <div className="rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-xl group">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {packageName} Package
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Order #{order.order_number || order.id}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <OrderStatusBadge status={order.status} size="lg" />
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-green-600/30"
            >
              <Link href={`/dashboard/orders/${order.id}`}>
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Order Date */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Order Date
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {createdAt}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Amount Paid
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                ${order.amount?.toLocaleString() || '0'}
              </p>
            </div>
          </div>

          {/* Estimated Completion */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Est. Completion
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {daysRemaining !== null
                  ? `${daysRemaining} days remaining`
                  : estimatedCompletion || 'TBD'}
              </p>
            </div>
          </div>
        </div>

        {/* Services Included */}
        {services.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Services Included
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((service: { service_name?: string; name?: string } | string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {typeof service === 'string' ? service : service.service_name || service.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-2"
          >
            <Link href={`/dashboard/orders/${order.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Progress
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-2"
          >
            <Link href="/dashboard/documents">
              <Download className="w-4 h-4 mr-2" />
              Download Documents
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-2"
          >
            <Link href="/dashboard/support">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const { orders, isLoading, isError } = useOrders()

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-3xl" />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Failed to load orders. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            You don&apos;t have any orders yet. Get started by choosing a package!
          </p>
          <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600">
            <Link href="/pricing">View Packages</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your business launch progress and access services
          </p>
        </div>

        {/* Create New Order Button */}
        <Button
          asChild
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-6 shadow-lg"
        >
          <Link href="/#pricing">
            <Plus className="w-5 h-5 mr-2" />
            New Order
          </Link>
        </Button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* Empty State (if no orders) */}
      {orders.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-16 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No orders yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start your business journey by choosing a package
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold"
          >
            <Link href="/pricing">View Packages</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

