'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Search, HelpCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* 404 Number with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <h1 className="text-[150px] sm:text-[200px] lg:text-[250px] font-bold leading-none">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Oops! The page you&apos;re looking for seems to have wandered off.
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Don&apos;t worry, even the best entrepreneurs take wrong turns. Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all group"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-gray-300 dark:border-gray-700 px-8 py-6 text-lg rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <Link href="/contact">
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </Button>
        </motion.div>

        {/* Popular Pages */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Services', href: '/services', icon: Search },
              { label: 'Pricing', href: '/pricing', icon: HelpCircle },
              { label: 'Success Stories', href: '/success-stories', icon: Search },
              { label: 'FAQ', href: '/faq', icon: HelpCircle },
            ].map((link, index) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={link.href}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className="block p-6 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all group"
                  >
                    <Icon className="w-8 h-8 text-green-600 dark:text-green-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {link.label}
                    </p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-gray-500 dark:text-gray-400"
        >
          Error Code: 404 | Page Not Found
        </motion.div>
      </div>
    </div>
  )
}

