'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Building2,
  ArrowUp,
  Heart,
  Shield,
  Globe,
  Sparkles,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { NewsletterForm } from './NewsletterForm'
import { SocialLinks } from './SocialLinks'

const footerLinks = {
  services: {
    title: 'Services',
    links: [
      { label: 'LLC Formation', href: '/services/llc-formation' },
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Business Phone', href: '/services/business-phone' },
      { label: 'Business Email', href: '/services/business-email' },
      { label: 'Payment Processing', href: '/services/payment-processing' },
      { label: 'AI Chatbot', href: '/services/ai-chatbot' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Our Mission', href: '/mission' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guides & Tutorials', href: '/guides' },
      { label: 'State Comparison', href: '/resources/states' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Immigrant Guide', href: '/immigrant-guide' },
      { label: 'Community', href: '/community' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Licenses', href: '/licenses' },
    ],
  },
}

const countries = [
  { name: 'Nigeria', code: 'ng' },
  { name: 'Ethiopia', code: 'et' },
  { name: 'Ghana', code: 'gh' },
  { name: 'Kenya', code: 'ke' },
  { name: 'South Africa', code: 'za' },
  { name: 'Cameroon', code: 'cm' },
]

export function Footer() {
  const [showBackToTop, setShowBackToTop] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

          {/* Top Section - Newsletter & Logo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

            {/* Brand & Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/30 group-hover:shadow-xl group-hover:shadow-green-600/40 transition-all duration-300 group-hover:scale-105">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Gbaki Digital
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400 -mt-1">
                    Solutions
                  </span>
                </div>
              </Link>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Empowering African Immigrants to Build American Dreams
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                We&apos;re more than a service—we&apos;re your partner in navigating the American
                business landscape. From Lagos to Los Angeles, from Addis Ababa to Atlanta,
                we help you launch, grow, and succeed.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    100% Secure
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    127+ Businesses
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:pl-12"
            >
              <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-600 p-8 lg:p-10 shadow-2xl shadow-green-600/20">
                <Globe className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Join 1,500+ Entrepreneurs
                </h3>
                <p className="text-green-50 mb-6">
                  Get weekly business tips, immigrant success stories, and exclusive
                  resources delivered to your inbox.
                </p>
                <NewsletterForm />
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {Object.entries(footerLinks).map(([key, section], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12 p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800"
          >
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@gbakidigital.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm"
                  >
                    hello@gbakidigital.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Office
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Elkridge, Maryland, USA
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Countries We Serve */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 text-center">
              Proudly Serving Entrepreneurs From
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {countries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.05, type: 'spring' }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="group relative px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://flagcdn.com/w80/${country.code}.png`}
                      alt=""
                      width={28}
                      height={21}
                      className="w-7 h-[21px] rounded object-cover flex-shrink-0"
                      unoptimized
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {country.name}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium text-sm">
                + 17 More
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <span suppressHydrationWarning>© {new Date().getFullYear()} Gbaki Digital Solutions.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for African entrepreneurs
              </span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <SocialLinks />
            </motion.div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </footer>
  )
}

