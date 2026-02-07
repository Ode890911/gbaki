'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { adminApi } from '@/lib/api/admin'
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Package,
  Download,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function AdminAnalyticsPage() {
  const [revenueData, setRevenueData] = useState<any>(null)
  const [overview, setOverview] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [days, setDays] = useState(30)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const [revenue, overviewData] = await Promise.all([
        adminApi.getRevenueStats(days),
        adminApi.getOverview(),
      ])
      setRevenueData(revenue)
      setOverview(overviewData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }, [days])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const maxRevenue = revenueData?.daily_revenue?.length
    ? Math.max(...revenueData.daily_revenue.map((d: { revenue: number }) => d.revenue))
    : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics & Reports
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Revenue trends and business insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            title="Select time period"
            aria-label="Select time period for analytics"
            className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Revenue Trend
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Daily revenue over the last {days} days
            </p>
          </div>
          {overview && (
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${overview.overview?.total_revenue?.toLocaleString() || '0'}
              </p>
            </div>
          )}
        </div>

        {isLoading ? (
          <Skeleton className="h-64 w-full rounded-xl" />
        ) : revenueData?.daily_revenue?.length > 0 ? (
          <div className="space-y-4">
            {/* Chart Bars */}
            <div className="flex items-end justify-between gap-2 h-64">
              {revenueData.daily_revenue.map((day: any, index: number) => {
                const height = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full h-full flex items-end">
                      <motion.div
                        className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg transition-all hover:opacity-80"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        title={`$${day.revenue.toLocaleString()} - ${day.orders} orders`}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t-2 border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Daily</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${revenueData.daily_revenue.length > 0
                    ? (revenueData.daily_revenue.reduce((sum: number, d: { revenue: number }) => sum + d.revenue, 0) / revenueData.daily_revenue.length).toFixed(0)
                    : '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {revenueData.daily_revenue.reduce((sum: number, d: { orders: number }) => sum + d.orders, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Period Revenue</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${revenueData.daily_revenue.reduce((sum: number, d: { revenue: number }) => sum + d.revenue, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No revenue data available</p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Stats */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${overview.this_month?.revenue?.toLocaleString() || '0'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">New Users</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {overview.this_month?.new_users || 0}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recent Orders</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {overview.recent_activity?.orders_last_7_days || 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recent Users</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {overview.recent_activity?.users_last_7_days || 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
          </div>
        </div>
      )}
    </div>
  )
}


