'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Shield, Zap, HeartHandshake } from 'lucide-react'
import { PricingCard } from './PricingCard'
import { PricingToggle } from './PricingToggle'
import { PricingComparison } from './PricingComparison'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for getting your business legally established',
    monthlyPrice: 997,
    annualPrice: 9571, // 20% discount (997 * 12 * 0.8 = 9,571.2)
    features: [
      { name: 'LLC or Corporation Formation', included: true },
      { name: 'EIN Registration', included: true },
      { name: 'Basic 5-page Website', included: true },
      { name: 'US Virtual Phone Number', included: true },
      { name: 'Business Email Setup', included: true },
      { name: 'Domain Registration', included: true },
      { name: '1 Month Launch Support', included: true },
      { name: 'Registered Agent Service', included: false },
      { name: 'AI Chatbot', included: false },
      { name: 'E-commerce Integration', included: false },
    ],
    cta: 'Get Started',
    href: '/register?plan=starter',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    name: 'Growth',
    description: 'Everything to launch and grow your business',
    monthlyPrice: 2497,
    annualPrice: 23971, // 20% discount (2497 * 12 * 0.8 = 23,971.2)
    popular: true,
    features: [
      { name: 'Everything in Starter', included: true, highlight: true },
      { name: 'Registered Agent (1 year)', included: true },
      { name: 'Professional 10-page Website', included: true },
      { name: 'E-commerce (50 products)', included: true },
      { name: 'AI Chatbot (24/7)', included: true, highlight: true },
      { name: 'SEO Optimization', included: true },
      { name: 'Brand Identity Package', included: true },
      { name: 'IVR Phone System', included: true },
      { name: 'Email Marketing Setup', included: true },
      { name: '3 Months Premium Support', included: true },
      { name: 'Business Coaching Session', included: true },
    ],
    cta: 'Start Growing',
    href: '/register?plan=growth',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    name: 'Premium',
    description: 'Complete business incubation with ongoing support',
    monthlyPrice: 4997,
    annualPrice: 47971, // 20% discount (4997 * 12 * 0.8 = 47,971.2)
    features: [
      { name: 'Everything in Growth', included: true, highlight: true },
      { name: 'Unlimited Website Pages', included: true },
      { name: 'Unlimited E-commerce Products', included: true },
      { name: 'AI Voice Assistant', included: true, highlight: true },
      { name: 'Advanced Marketing Automation', included: true },
      { name: 'WhatsApp Business Integration', included: true },
      { name: 'Annual State Compliance', included: true },
      { name: 'Monthly Business Coaching', included: true },
      { name: 'Dedicated Account Manager', included: true, highlight: true },
      { name: '6 Months Premium Support', included: true },
      { name: 'Priority Development Queue', included: true },
    ],
    cta: 'Go Premium',
    href: '/register?plan=premium',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
]

const guarantees = [
  {
    icon: Shield,
    title: 'Money-Back Guarantee',
    description: 'Not satisfied? Full refund within 30 days',
  },
  {
    icon: Zap,
    title: '21-Day Launch',
    description: 'Average time to fully operational business',
  },
  {
    icon: HeartHandshake,
    title: 'Ongoing Support',
    description: "We&apos;re with you every step of the way",
  },
]

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'annual'>('monthly')

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
          >
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              Simple, Transparent Pricing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Choose Your{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              Success Path
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            One-time setup fee. No subscriptions, no hidden costs.
            Just straightforward pricing to launch your American dream.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PricingToggle value={billingPeriod} onChange={setBillingPeriod} />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              {...plan}
              billingPeriod={billingPeriod}
              delay={0.1 * index}
            />
          ))}
        </div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
        >
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                <guarantee.icon className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {guarantee.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison Table */}
        <PricingComparison />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Schedule a free consultation to discuss your business needs
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:scale-105"
          >
            Schedule Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
