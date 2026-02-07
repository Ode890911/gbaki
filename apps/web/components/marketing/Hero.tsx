'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Globe, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedGradient } from './AnimatedGradient'
import { StatsBar } from './StatsBar'
import { CountryFlags } from '@/components/icons/CountryFlags'
import { DashboardPreview } from './DashboardPreview'
import { RotatingTypingText } from './RotatingTypingText'

export function Hero() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white dark:from-gray-950 dark:via-green-950/10 dark:to-gray-950 pt-20">
      {/* Animated Background */}
      <AnimatedGradient />

      <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
          >
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              127+ African businesses launched in 2024
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            From Immigration to{' '}
            <RotatingTypingText 
              words={['Innovation', 'Prosperity', 'Success', 'Growth', 'Excellence']}
              speed={150}
              delay={800}
              pauseBetweenWords={2000}
              className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent"
            />
            <br />
            in 30 Days
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            We help African immigrants launch US businesses.{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              LLC formation, website, banking, and AI tools
            </span>{' '}
            — all in one platform.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 text-sm sm:text-base"
          >
            {mounted ? (
              [
                { icon: CheckCircle2, text: 'We handle all legal paperwork' },
                { icon: TrendingUp, text: 'From $997' },
                { icon: Globe, text: 'All 50 states' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))
            ) : (
              <div className="h-6" /> // Placeholder to avoid shift
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300 group"
            >
              <Link href="/register">
                Start Your Business
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-6 text-lg rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
            >
              <Link href="#pricing" className="text-gray-900 dark:text-white">View Packages</Link>
            </Button>
          </motion.div>

          {/* Country Flags - Trust Signal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Trusted by entrepreneurs from
            </p>
            <CountryFlags />
          </motion.div>

          {/* Dashboard Preview - CSS Constructed */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-16 mx-auto w-full max-w-6xl px-4"
          >
            <DashboardPreview />
          </motion.div>
        </div>

        {/* Stats Bar */}
        <StatsBar />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
    </section>
  )
}
