'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  label: string
  icon: LucideIcon
}

interface FAQCategoryProps {
  categories: Category[]
  activeCategory: string
  onChange: (categoryId: string) => void
}

export function FAQCategory({ categories, activeCategory, onChange }: FAQCategoryProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category, index) => {
        const isActive = activeCategory === category.id
        const Icon = category.icon

        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onChange(category.id)}
            className={cn(
              'relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2',
              isActive
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/30 scale-105'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{category.label}</span>
            
            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

