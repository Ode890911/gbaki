'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
  highlights?: string[]
}

interface FAQAccordionProps {
  items: FAQItem[]
  delay?: number
}

export function FAQAccordion({ items, delay = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + index * 0.05 }}
            className="group"
          >
            <button
              onClick={() => toggleItem(index)}
              className={cn(
                'w-full text-left rounded-2xl border-2 transition-all duration-300',
                isOpen
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 shadow-lg shadow-green-100 dark:shadow-green-900/20'
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md'
              )}
            >
              <div className="flex items-start gap-4 p-6 lg:p-8">
                {/* Question Number Badge */}
                <div
                  className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300',
                    isOpen
                      ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white scale-110'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Question */}
                <div className="flex-1">
                  <h3
                    className={cn(
                      'text-lg lg:text-xl font-bold transition-colors duration-300',
                      isOpen
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'
                    )}
                  >
                    {item.question}
                  </h3>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={cn(
                    'flex-shrink-0 transition-colors duration-300',
                    isOpen
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 dark:text-gray-600'
                  )}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </div>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-2">
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-green-200 dark:via-green-800 to-transparent mb-6" />

                      {/* Answer Text */}
                      <div className="space-y-4">
                        <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>

                        {/* Highlights/Key Points */}
                        {item.highlights && item.highlights.length > 0 && (
                          <ul className="space-y-2 mt-4">
                            {item.highlights.map((highlight, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx, duration: 0.3 }}
                                className="flex items-start gap-3"
                              >
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                                  <Check className="w-3 h-3 text-green-600 dark:text-green-400" strokeWidth={3} />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {highlight}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}

