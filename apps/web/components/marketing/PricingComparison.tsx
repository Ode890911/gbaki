'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const comparisonFeatures = [
  {
    category: 'Business Formation',
    features: [
      { name: 'LLC/Corporation Formation', starter: true, growth: true, premium: true },
      { name: 'EIN Registration', starter: true, growth: true, premium: true },
      { name: 'Registered Agent (1 year)', starter: false, growth: true, premium: true },
      { name: 'Operating Agreement', starter: false, growth: true, premium: true },
      { name: 'Annual State Filings', starter: false, growth: false, premium: true },
    ],
  },
  {
    category: 'Online Presence',
    features: [
      { name: 'Professional Website', starter: '5 pages', growth: '10 pages', premium: 'Unlimited' },
      { name: 'Custom Domain & Hosting', starter: true, growth: true, premium: true },
      { name: 'E-commerce Integration', starter: false, growth: '50 products', premium: 'Unlimited' },
      { name: 'Blog & CMS', starter: false, growth: true, premium: true },
      { name: 'SEO Optimization', starter: 'Basic', growth: 'Advanced', premium: 'Premium' },
    ],
  },
  {
    category: 'AI & Automation',
    features: [
      { name: 'AI Chatbot', starter: false, growth: true, premium: true },
      { name: 'Content Generation', starter: false, growth: '10/month', premium: 'Unlimited' },
      { name: 'Email Automation', starter: false, growth: true, premium: true },
      { name: 'Voice Assistant', starter: false, growth: false, premium: true },
    ],
  },
  {
    category: 'Communication',
    features: [
      { name: 'US Virtual Phone Number', starter: true, growth: true, premium: true },
      { name: 'Call Forwarding & Voicemail', starter: true, growth: true, premium: true },
      { name: 'IVR System', starter: false, growth: true, premium: true },
      { name: 'WhatsApp Business Integration', starter: false, growth: false, premium: true },
    ],
  },
  {
    category: 'Support & Services',
    features: [
      { name: 'Launch Support', starter: '1 month', growth: '3 months', premium: '6 months' },
      { name: 'Business Coaching', starter: false, growth: '1 session', premium: 'Monthly' },
      { name: 'Priority Support', starter: false, growth: false, premium: true },
      { name: 'Dedicated Account Manager', starter: false, growth: false, premium: true },
    ],
  },
]

export function PricingComparison() {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" strokeWidth={3} />
      ) : (
        <X className="w-5 h-5 text-gray-300 dark:text-gray-700 mx-auto" strokeWidth={2} />
      )
    }
    return <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
  }

  return (
    <div className="mt-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Compare All Features
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          See exactly what&apos;s included in each package
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-left">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Features
                  </span>
                </th>
                <th className="px-6 py-4 text-center bg-gray-50/50 dark:bg-gray-800/50">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Starter</span>
                </th>
                <th className="px-6 py-4 text-center bg-green-50/50 dark:bg-green-950/20">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Growth</span>
                </th>
                <th className="px-6 py-4 text-center bg-gray-50/50 dark:bg-gray-800/50">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Premium</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td colSpan={4} className="px-6 py-3">
                      <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        {category.category}
                      </span>
                    </td>
                  </tr>
                  {category.features.map((feature, featureIndex) => (
                    <motion.tr
                      key={featureIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + featureIndex * 0.05 }}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center bg-gray-50/30 dark:bg-gray-800/30">
                        {renderCell(feature.starter)}
                      </td>
                      <td className="px-6 py-4 text-center bg-green-50/30 dark:bg-green-950/10">
                        {renderCell(feature.growth)}
                      </td>
                      <td className="px-6 py-4 text-center bg-gray-50/30 dark:bg-gray-800/30">
                        {renderCell(feature.premium)}
                      </td>
                    </motion.tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

