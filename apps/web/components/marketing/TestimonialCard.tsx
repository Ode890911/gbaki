'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Quote, ExternalLink } from 'lucide-react'
import { StarRating } from './StarRating'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  country: string
  countryFlag: string
  rating: number
  quote: string
  image: string
  businessType: string
  gradient: string
  delay?: number
}

export function TestimonialCard({
  name,
  role,
  company,
  country,
  countryFlag,
  rating,
  quote,
  image,
  businessType,
  gradient,
  delay = 0,
}: TestimonialCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative h-full group"
    >
      {/* Glow effect */}
      <motion.div
        className={cn(
          'absolute -inset-1 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500',
          gradient
        )}
        animate={{
          opacity: isHovered ? 0.4 : 0,
        }}
      />

      {/* Card */}
      <div className="relative h-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 lg:p-10 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-2xl flex flex-col">

        {/* Quote Icon */}
        <div className={cn(
          'absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center opacity-10 dark:opacity-5',
          gradient
        )}>
          <Quote className="w-10 h-10 text-white" />
        </div>

        {/* Rating */}
        <div className="mb-6">
          <StarRating rating={rating} size="md" delay={delay} />
        </div>

        {/* Quote Text */}
        <blockquote className="flex-1 mb-8">
          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            &quot;{quote}&quot;
          </p>
        </blockquote>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent mb-6" />

        {/* Author Info */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <motion.div
              className={cn(
                'absolute inset-0 rounded-2xl opacity-0 blur-lg transition-opacity duration-300',
                gradient
              )}
              animate={{
                opacity: isHovered ? 0.6 : 0,
              }}
            />
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800 group-hover:ring-4 transition-all bg-gray-100 dark:bg-gray-800">
              <Image
                src={imageError ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}` : image}
                alt={name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                loading="lazy"
                width={64}
                height={64}
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg truncate">
                {name}
              </h4>
              {/* Country Flag */}
              <span className="text-3xl flex-shrink-0" title={country}>
                {countryFlag}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {role}
            </p>

            <div className="flex items-center gap-2 text-sm">
              <span className={cn(
                'px-2 py-1 rounded-lg font-medium',
                gradient,
                'text-white text-xs'
              )}>
                {businessType}
              </span>

              <span className="text-gray-500 dark:text-gray-500">•</span>

              <span className="text-gray-700 dark:text-gray-300 font-medium truncate">
                {company}
              </span>
            </div>
          </div>
        </div>

        {/* Hover: View Business Link */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:gap-3 transition-all"
          >
            <span>View Success Story</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

