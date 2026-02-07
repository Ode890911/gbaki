'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PricingCardProps {
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  billingPeriod: 'monthly' | 'annual'
  features: {
    name: string
    included: boolean
    highlight?: boolean
  }[]
  popular?: boolean
  cta: string
  href: string
  gradient: string
  delay?: number
}

export function PricingCard({
  name,
  description,
  monthlyPrice,
  annualPrice,
  billingPeriod,
  features,
  popular = false,
  cta,
  href,
  gradient,
  delay = 0,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const displayPrice = billingPeriod === 'monthly' ? monthlyPrice : annualPrice
  const monthlyTotal = monthlyPrice * 12
  const savings = billingPeriod === 'annual' ? monthlyTotal - annualPrice : 0
  const savingsPercent = billingPeriod === 'annual' && monthlyTotal > 0
    ? Math.round((savings / monthlyTotal) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative group',
        popular && 'lg:-mt-6'
      )}
    >
      {/* Popular Badge */}
      {popular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-5 left-0 right-0 flex justify-center z-10"
        >
          <div className={cn(
            "px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg flex items-center gap-1.5",
            gradient
          )}>
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Glow Effect */}
      <motion.div
        className={cn(
          'absolute -inset-0.5 rounded-3xl opacity-0 blur-xl transition-opacity duration-500',
          gradient,
          popular && 'opacity-30'
        )}
        animate={{
          opacity: isHovered ? (popular ? 0.5 : 0.3) : (popular ? 0.3 : 0),
        }}
      />

      {/* Card */}
      <div
        className={cn(
          'relative h-full bg-white dark:bg-gray-900 rounded-3xl border-2 transition-all duration-300 overflow-hidden',
          popular
            ? 'border-green-500 dark:border-green-500 shadow-xl shadow-green-500/20'
            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700',
          isHovered && 'shadow-2xl'
        )}
      >
        <div className="p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900 dark:text-white">
                ${displayPrice.toLocaleString()}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {billingPeriod === 'monthly' ? '/mo' : '/year'}
              </span>
            </div>

            {billingPeriod === 'annual' && savings > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-1"
              >
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Save ${savings.toLocaleString()} ({savingsPercent}% off)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                  ${monthlyTotal.toLocaleString()}/year
                </p>
              </motion.div>
            )}

            {billingPeriod === 'monthly' && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                One-time setup fee
              </p>
            )}

            {billingPeriod === 'annual' && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                One-time setup fee • Billed annually
              </p>
            )}
          </div>

          {/* CTA Button */}
          <Button
            asChild
            className={cn(
              'w-full mb-8 h-12 text-base font-semibold rounded-xl transition-all duration-300',
              popular
                ? `${gradient} text-white shadow-lg hover:shadow-xl hover:scale-105`
                : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
            )}
          >
            <Link href={href} className="group/button">
              {cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
            </Link>
          </Button>

          {/* Features List */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              What&apos;s Included
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="list-none">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: delay + 0.05 * index }}
                    className="flex items-start gap-3"
                  >
                    {feature.included ? (
                      <div className={cn(
                        'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                        feature.highlight
                          ? gradient
                          : 'bg-green-100 dark:bg-green-900/30'
                      )}>
                        <Check
                          className={cn(
                            'w-3 h-3',
                            feature.highlight
                              ? 'text-white'
                              : 'text-green-600 dark:text-green-400'
                          )}
                          strokeWidth={3}
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-gray-400">−</span>
                      </div>
                    )}
                    <span
                      className={cn(
                        'text-sm leading-relaxed',
                        feature.included
                          ? feature.highlight
                            ? 'text-gray-900 dark:text-white font-semibold'
                            : 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-400 dark:text-gray-600 line-through'
                      )}
                    >
                      {feature.name}
                    </span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        {popular && (
          <div className={cn('h-1.5 w-full', gradient)} />
        )}
      </div>
    </motion.div>
  )
}

