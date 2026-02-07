'use client'

import { 
  Building2, 
  Globe, 
  Bot, 
  Phone, 
  CreditCard, 
  TrendingUp,
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import { FeatureCard } from './FeatureCard'
import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    icon: Building2,
    title: 'LLC Formation',
    description: 'Complete business registration in any US state. We handle articles of organization, EIN registration, and operating agreements. Get your LLC approved in 5-7 business days.',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    icon: Globe,
    title: 'Professional Website',
    description: 'Custom-designed website with mobile optimization, SEO setup, and content management. Choose from industry-specific templates or get a fully custom design.',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    icon: Bot,
    title: 'AI Chatbot',
    description: '24/7 customer service powered by GPT-4. Multi-language support, instant responses, and seamless integration with your website and WhatsApp Business.',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    icon: Phone,
    title: 'US Phone System',
    description: 'Virtual phone number with call forwarding, voicemail, SMS capabilities, and IVR setup. Professional greetings in multiple languages included.',
    gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
  },
  {
    icon: CreditCard,
    title: 'Banking & Payments',
    description: 'Business bank account setup assistance, payment processing integration (Stripe, Square), and accounting software configuration with QuickBooks.',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    icon: TrendingUp,
    title: 'Marketing Tools',
    description: 'SEO optimization, Google Business Profile, social media setup, and email marketing automation. Get found by customers from day one.',
    gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
  },
]

const benefits = [
  'No hidden fees',
  'Money-back guarantee',
  'Ongoing support',
  '21-day avg launch time',
]

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />

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
              Everything You Need
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Launch Your Business{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              The Smart Way
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            From legal formation to AI-powered customer service, we provide all the tools 
            African immigrant entrepreneurs need to succeed in the US market.
          </motion.p>

          {/* Quick benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={0.1 * index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to start your entrepreneurial journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300 hover:scale-105"
            >
              View Packages
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
