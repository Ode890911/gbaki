'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  delay?: number
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = false,
  delay = 0 
}: StarRatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < rating

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: delay + index * 0.05,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <Star
                className={`${sizes[size]} ${
                  isFilled
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                }`}
              />
            </motion.div>
          )
        })}
      </div>
      
      {showNumber && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className="text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          {rating.toFixed(1)}
        </motion.span>
      )}
    </div>
  )
}

