'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PricingToggleProps {
  value: 'monthly' | 'annual'
  onChange: (value: 'monthly' | 'annual') => void
}

export function PricingToggle({ value, onChange }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <button
        onClick={() => onChange('monthly')}
        className={cn(
          'text-lg font-semibold transition-colors',
          value === 'monthly'
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-400'
        )}
      >
        Monthly
      </button>

      <button
        type="button"
        className="relative w-16 h-8 bg-gray-200 dark:bg-gray-800 rounded-full p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onClick={() => onChange(value === 'monthly' ? 'annual' : 'monthly')}
        aria-label="Toggle billing period"
      >
        <motion.div
          className="w-6 h-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-md pointer-events-none relative"
          animate={{
            x: value === 'monthly' ? 0 : 32,
            rotate: value === 'monthly' ? 0 : 360,
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 500, 
            damping: 30,
            rotate: { duration: 0.6, ease: 'easeInOut' }
          }}
        >
          {/* Circular glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            animate={{
              scale: value === 'monthly' ? [1, 1.3, 1] : [1, 1.3, 1],
              opacity: value === 'monthly' ? [0.5, 0, 0.5] : [0.5, 0, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange('annual')}
          className={cn(
            'text-lg font-semibold transition-colors',
            value === 'annual'
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-gray-400'
          )}
        >
          Annual
        </button>
        <span className="px-2.5 py-1 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
          Save 20%
        </span>
      </div>
    </div>
  )
}

