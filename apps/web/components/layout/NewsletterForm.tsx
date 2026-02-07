'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NewsletterForm() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setMessage('Welcome aboard! Check your inbox for a welcome email.')
      setEmail('')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600">
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading' || status === 'success'}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold py-6 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all disabled:opacity-50 group"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : status === 'success' ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Subscribed!
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-3 text-sm ${
              status === 'error'
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
            }`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Weekly tips, success stories, and exclusive resources. Unsubscribe anytime.
      </p>
    </div>
  )
}

