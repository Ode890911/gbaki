'use client'

import { motion } from 'framer-motion'
import { Building2, Globe, Users, Zap } from 'lucide-react'

const stats = [
  { icon: Building2, label: 'Businesses Launched', value: '127+' },
  { icon: Users, label: 'Happy Clients', value: '450+' },
  { icon: Globe, label: 'Countries', value: '23' },
  { icon: Zap, label: 'Avg. Launch Time', value: '21 days' },
]

export function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
          className="text-center group"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
            <stat.icon className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

