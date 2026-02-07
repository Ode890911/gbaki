'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  delay?: number
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient,
  delay = 0 
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <motion.div
        className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-0 blur-xl transition-opacity duration-500",
          gradient
        )}
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
      />

      {/* Card */}
      <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50">
        
        {/* Icon Container */}
        <motion.div
          className={cn(
            "inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 relative overflow-hidden",
            gradient
          )}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-white dark:bg-gray-900"
            animate={{
              opacity: isHovered ? 0.9 : 1,
            }}
          />
          
          <Icon 
            className="w-7 h-7 text-white relative z-10" 
            strokeWidth={2}
          />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* Hover arrow indicator */}
        <motion.div
          className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
          animate={{
            x: isHovered ? 5 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <span>Learn more</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </motion.div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-5 dark:opacity-10 pointer-events-none">
          <Icon className="w-full h-full text-gray-900 dark:text-white" />
        </div>
      </div>
    </motion.div>
  )
}

