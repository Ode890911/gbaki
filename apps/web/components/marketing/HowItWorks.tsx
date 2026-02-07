'use client'

import { motion } from 'framer-motion'
import { Package, Wrench, Rocket, ArrowRight, Sparkles, Clock, Shield } from 'lucide-react'
import { StepCard } from './StepCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const steps = [
  {
    step: 1,
    icon: Package,
    title: 'Choose Your Package',
    description: 'Select the perfect package for your business needs. From basic LLC formation to full-service premium plans with AI and marketing.',
    details: [
      'Browse 3 transparent pricing tiers',
      'Free 15-minute consultation call',
      'Flexible payment plans available',
      'No hidden fees, ever',
    ],
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
    hoverBorder: 'hover:border-green-400 dark:hover:border-green-500',
    hoverBg: 'hover:bg-green-50/50 dark:hover:bg-green-950/20',
  },
  {
    step: 2,
    icon: Wrench,
    title: 'We Build Everything',
    description: 'Sit back and relax. Our team handles all the heavy lifting—from LLC paperwork to website design, banking setup, and AI integration.',
    details: [
      'LLC formation in 5-7 business days',
      'Custom website designed and launched',
      'Business bank account assistance',
      'AI chatbot trained for your industry',
      'US phone number with professional setup',
    ],
    gradient: 'bg-gradient-to-br from-blue-600 to-cyan-600',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
    hoverBg: 'hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
  },
  {
    step: 3,
    icon: Rocket,
    title: 'Launch Your Business',
    description: 'Go live with confidence! Your business is officially registered, online presence is ready, and customers can reach you 24/7.',
    details: [
      'Receive all legal documents and credentials',
      'Website goes live with your domain',
      'Marketing tools activated and ready',
      'Ongoing support for 6 months',
      'Join our entrepreneur community',
    ],
    gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
    hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500',
    hoverBg: 'hover:bg-orange-50/50 dark:hover:bg-orange-950/20',
  },
]

const stats = [
  { icon: Clock, value: '21 Days', label: 'Average Launch Time' },
  { icon: Shield, value: '100%', label: 'Success Rate' },
  { icon: Sparkles, value: '127+', label: 'Businesses Launched' },
]

export function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-green-50/30 to-white dark:from-gray-950 dark:via-green-950/10 dark:to-gray-950 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
          >
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            From Dream to Reality{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              in 3 Steps
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            We&apos;ve streamlined the entire business launch process so you can focus on
            what matters most—building your dream.
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto space-y-20 lg:space-y-32">
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              {...step}
              delay={0.2 * index}
              isLast={index === steps.length - 1}
              hoverBorder={step.hoverBorder}
              hoverBg={step.hoverBg}
            />
          ))}
        </div>

        {/* Bottom CTA with Arrow Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          {/* Decorative Arrow Path */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <svg
              className="w-full h-24 text-gray-300 dark:text-gray-700"
              viewBox="0 0 800 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 50 50 Q 200 10, 400 50 T 750 50"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 8"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.circle
                cx="750"
                cy="50"
                r="4"
                fill="currentColor"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 2 }}
              />
            </svg>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join 127+ African entrepreneurs who&apos;ve launched their US businesses with us.
            Your success story starts today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300 group"
            >
              <Link href="/register">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 dark:border-gray-700 px-8 py-6 text-lg rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
            >
              <Link href="#pricing">
                View Pricing
              </Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-sm text-gray-500 dark:text-gray-400"
          >
            💚 Money-back guarantee • ⚡ 21-day average launch • 🛡️ 100% success rate
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
