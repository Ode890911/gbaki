'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down' | 'neutral'
  }
  icon: LucideIcon
  gradient: string
  delay?: number
  href?: string
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  gradient,
  delay = 0,
  href,
}: StatsCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "group relative rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all hover:shadow-lg",
        href 
          ? "hover:border-gray-300 dark:hover:border-gray-700 hover:translate-y-[-2px] cursor-pointer" 
          : "hover:border-gray-300 dark:hover:border-gray-700"
      )}
    >
      {/* Background gradient on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity',
          gradient
        )}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              gradient,
              'text-white'
            )}
          >
            <Icon className="w-6 h-6" />
          </div>

          {change && (
            <div
              className={cn(
                'px-2 py-1 rounded-lg text-xs font-bold',
                change.trend === 'up' &&
                  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
                change.trend === 'down' &&
                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
                change.trend === 'neutral' &&
                  'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
              )}
            >
              {change.trend === 'up' && '↑'}
              {change.trend === 'down' && '↓'}
              {Math.abs(change.value)}%
            </div>
          )}
        </div>

        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}

