'use client'

import { useEffect, useState } from 'react'
import { adminApi, type AdminOverview } from '@/lib/api/admin'
import {
  Users,
  Package,
  FileText,
  MessageSquare,
  DollarSign,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminOverview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const data = await adminApi.getOverview()
        setStats(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load statistics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Statistics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || 'Unable to fetch dashboard data'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.overview.total_users,
      change: stats.this_month.new_users,
      changeLabel: 'this month',
      icon: Users,
      color: 'from-blue-600 to-cyan-600',
      href: '/admin/users',
    },
    {
      title: 'Total Orders',
      value: stats.overview.total_orders,
      change: stats.recent_activity.orders_last_7_days,
      changeLabel: 'last 7 days',
      icon: Package,
      color: 'from-purple-600 to-pink-600',
      href: '/admin/orders',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.overview.total_revenue.toLocaleString()}`,
      change: stats.this_month.revenue,
      changeLabel: 'this month',
      icon: DollarSign,
      color: 'from-green-600 to-emerald-600',
      href: '/admin/analytics',
    },
    {
      title: 'Active Orders',
      value: stats.overview.active_orders ?? 0,
      icon: Clock,
      color: 'from-orange-600 to-red-600',
      href: '/admin/orders?status=processing',
    },
    {
      title: 'Pending Documents',
      value: stats.overview.pending_documents ?? 0,
      icon: FileText,
      color: 'from-yellow-600 to-amber-600',
      href: '/admin/documents',
    },
    {
      title: 'Open Tickets',
      value: stats.overview.open_tickets ?? 0,
      icon: MessageSquare,
      color: 'from-indigo-600 to-purple-600',
      href: '/admin/support',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Overview of your platform&apos;s performance and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          const hasChange = stat.change !== undefined
          const isPositive = hasChange && stat.change > 0

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {hasChange && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                        {isPositive ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        )}
                        <span className={`text-xs font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                          {stat.change}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </p>
                    {stat.changeLabel && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.change} {stat.changeLabel}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Orders by Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Orders by Status
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.orders_by_status ?? {}).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {status.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/documents"
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Review Pending Documents
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                {stats.overview.pending_documents ?? 0} pending
              </span>
            </Link>

            <Link
              href="/admin/support"
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Respond to Tickets
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                {stats.overview.open_tickets ?? 0} open
              </span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Manage Orders
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                {stats.overview.active_orders ?? 0} active
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

