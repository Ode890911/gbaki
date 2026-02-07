'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface FAQSearchProps {
  value: string
  onChange: (value: string) => void
  resultsCount?: number
}

export function FAQSearch({ value, onChange, resultsCount }: FAQSearchProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mb-12"
    >
      <div className="relative group">
        {/* Search Icon */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors">
          <Search className="w-5 h-5" />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search your question... (e.g., 'visa requirements', 'LLC cost')"
          className="w-full pl-14 pr-14 py-5 text-base lg:text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300 shadow-sm focus:shadow-lg"
        />

        {/* Clear Button */}
        {value && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => {
              onChange('')
              inputRef.current?.focus()
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </motion.button>
        )}
      </div>

      {/* Results Counter */}
      {value && resultsCount !== undefined && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center"
        >
          {resultsCount === 0 ? (
            <span>No questions found. Try different keywords or <a href="#contact" className="text-green-600 dark:text-green-400 hover:underline">contact us</a>.</span>
          ) : (
            <span>Found <strong className="text-gray-900 dark:text-white">{resultsCount}</strong> question{resultsCount !== 1 ? 's' : ''}</span>
          )}
        </motion.p>
      )}
    </motion.div>
  )
}

