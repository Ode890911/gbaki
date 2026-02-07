'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Message sent! We&apos;ll respond within 4-6 hours.')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try emailing us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
              <MessageSquare className="w-4 h-4" />
              We&apos;re Here to Help
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Let&apos;s Talk About Your Business
            </h1>
            <p className="text-xl text-green-100">
              Have questions? Ready to get started? Our team is standing by to help you launch your American dream.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Adeyemi Johnson"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="adeyemi@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    What can we help with? *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    aria-label="What can we help with?"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="pricing">Pricing & Packages</option>
                    <option value="llc">LLC Formation Questions</option>
                    <option value="website">Website Development</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Opportunities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your business idea and how we can help..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl py-6 font-semibold shadow-lg shadow-green-600/30"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:hello@gbakidigital.com"
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      Email Us
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 group-hover:underline break-all">
                      hello@gbakidigital.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+15551234567"
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      Call Us
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      Our Office
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Elkridge, Maryland<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Fast Response
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                We typically respond to all inquiries within 4-6 hours during business hours.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">Average response: 3 hours</span>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                Ready to Start?
              </h3>
              <p className="text-sm text-green-100 mb-4">
                Skip the wait and begin your business launch journey right now.
              </p>
              <Button
                asChild
                className="w-full bg-white text-green-600 hover:bg-green-50 rounded-xl font-semibold"
              >
                <a href="/register">
                  Get Started Today
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

