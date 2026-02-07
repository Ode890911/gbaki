'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Scale, DollarSign, Headphones, Globe, Zap, MessageCircle, Search } from 'lucide-react'
import { FAQAccordion } from './FAQAccordion'
import { FAQSearch } from './FAQSearch'
import { FAQCategory } from './FAQCategory'
import Link from 'next/link'

const categories = [
  { id: 'all', label: 'All Questions', icon: Globe },
  { id: 'legal', label: 'Legal & Visa', icon: Scale },
  { id: 'pricing', label: 'Pricing & Payments', icon: DollarSign },
  { id: 'technical', label: 'Technical & Setup', icon: Zap },
  { id: 'support', label: 'Support & Timeline', icon: Headphones },
]

const faqs = [
  // LEGAL & VISA
  {
    category: 'legal',
    question: 'Do I need a green card or US citizenship to start an LLC?',
    answer: "Absolutely not! This is one of the biggest myths. Anyone from anywhere in the world can own a US LLC, regardless of visa status. You don't need a green card, work visa, or even to be physically in the United States. We've helped entrepreneurs from Nigeria, Ethiopia, Ghana, Kenya, and 20+ other countries launch LLCs—many before they ever set foot in America.",
    highlights: [
      'No citizenship or residency required',
      'Can be done from your home country',
      'Tourist visa holders can own LLCs',
      'We handle everything remotely',
    ],
  },
  {
    category: 'legal',
    question: 'Which state should I form my LLC in? Does it matter where I live?',
    answer: "Great question! You can form your LLC in any US state, regardless of where you live. Delaware and Wyoming are popular for their business-friendly laws and privacy protections. However, if you plan to operate physically in a specific state (like opening a restaurant in Texas), we typically recommend forming there to avoid foreign qualification fees. We'll guide you to the best state for YOUR specific business model.",
    highlights: [
      'Delaware: Privacy + investor-friendly',
      'Wyoming: Low fees + strong asset protection',
      'Your operating state: If you have physical presence',
      'We provide personalized state recommendations',
    ],
  },
  {
    category: 'legal',
    question: 'Will having a US business affect my immigration status or visa application?',
    answer: "Owning a US LLC as a passive investment won't negatively impact your visa status. However, actively working in or managing the business could affect certain visa types. This is why we recommend consulting with an immigration attorney (we can refer you to trusted partners). The good news: for most African immigrants, having a legitimate US business actually strengthens visa applications by showing economic ties and entrepreneurial success.",
    highlights: [
      'Passive ownership is generally safe',
      'Active management may require work authorization',
      'Can strengthen visa applications',
      'We partner with immigration lawyers for guidance',
    ],
  },
  {
    category: 'legal',
    question: "What's an EIN and why do I need it?",
    answer: "An EIN (Employer Identification Number) is like a social security number for your business. It's issued by the IRS and you'll need it to open bank accounts, hire employees, file taxes, and establish business credit. Think of it as your business's official ID in America. We handle the entire EIN application for you—usually approved within 1-2 business days.",
    highlights: [
      'Free from the IRS (we handle application)',
      'Required for bank accounts and contracts',
      'Protects your personal SSN/ITIN',
      'Takes 1-2 business days to receive',
    ],
  },

  // PRICING & PAYMENTS
  {
    category: 'pricing',
    question: 'What exactly is included in the $997 Starter package?',
    answer: "The Starter package covers all the essentials to get your business legally registered and online. You get: complete LLC formation in your chosen state, EIN registration with the IRS, a professional 5-page website with your domain, a US virtual phone number with voicemail, business email setup, and 1 month of launch support. Everything you need to start operating legally and professionally—no hidden fees, no surprises.",
    highlights: [
      'LLC formation + state filing fees',
      'EIN from IRS (tax ID number)',
      '5-page professional website + hosting',
      'US phone number with forwarding',
      'Business email (you@yourbusiness.com)',
      '30 days of dedicated support',
    ],
  },
  {
    category: 'pricing',
    question: 'Are there any hidden fees or ongoing costs I should know about?',
    answer: "We believe in radical transparency. Our packages are one-time setup fees with everything included. The only ongoing costs are: annual state renewal fees ($50-300/year depending on state), domain renewal (~$15/year), and hosting (~$10-30/month if you want to continue with our recommended providers). We'll give you a complete breakdown before you commit, and you can always move to your own hosting later.",
    highlights: [
      'No hidden setup fees—price you see is what you pay',
      'State annual fees disclosed upfront',
      'Optional: hosting, phone, and premium services',
      'No long-term contracts or commitments',
    ],
  },
  {
    category: 'pricing',
    question: "Can I pay in installments? I'm still building capital.",
    answer: "Yes! We understand the financial challenges of starting a business, especially as an immigrant. We offer 3-month payment plans with just a 5% processing fee. For example, the $997 Starter package becomes 3 payments of $349. We also accept international payment methods including wire transfers, Wise, and PayPal to make it easier for you wherever you are.",
    highlights: [
      '3-month payment plans available',
      'Small 5% processing fee ($50 on $997 package)',
      'Accept international payments (Wise, PayPal, wire)',
      'No credit check required',
    ],
  },
  {
    category: 'pricing',
    question: "What if I'm not satisfied? Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service quality (not the business results—we can't control your market), we'll refund your fee minus any third-party costs already incurred (state filing fees, domain registration). In 3 years and 127 businesses launched, we've had only 2 refund requests. Our success rate speaks for itself.",
    highlights: [
      '30-day satisfaction guarantee',
      'Full refund minus third-party costs',
      '98% client satisfaction rate',
      'We stand behind our work',
    ],
  },

  // TECHNICAL & SETUP
  {
    category: 'technical',
    question: "I'm not tech-savvy. Can I really manage a website and AI chatbot?",
    answer: "Absolutely! Our systems are built for entrepreneurs, not engineers. Your website comes with a simple drag-and-drop editor (think Canva but for websites). The AI chatbot is pre-trained for your industry—you just review and approve responses. We provide video tutorials, written guides, and unlimited support. If you can use WhatsApp, you can manage your business tools. Plus, we offer optional management services if you want us to handle updates.",
    highlights: [
      'User-friendly, no-code website editor',
      'Pre-configured AI chatbot (we train it)',
      'Video tutorials in English + French + Amharic',
      'Optional: we can manage for you ($97/month)',
    ],
  },
  {
    category: 'technical',
    question: 'How does the AI chatbot work? Will it understand my African customers?',
    answer: "Our AI chatbot is powered by GPT-4 and trained on your specific business, industry, and customer base. We customize it to understand cultural nuances—whether you&apos;re serving Nigerian jollof rice or Ethiopian coffee, it gets it. It can handle multiple languages, answer FAQs, book appointments, and escalate complex questions to you. It learns from every conversation and gets smarter over time. Think of it as your 24/7 multilingual assistant.",
    highlights: [
      'GPT-4 powered, trained on YOUR business',
      'Multi-language support (English, French, more)',
      'Handles bookings, FAQs, lead collection',
      'Human handoff for complex questions',
    ],
  },
  {
    category: 'technical',
    question: 'Can I integrate with my existing tools (Instagram, WhatsApp Business, etc.)?',
    answer: "Yes! We build for integration, not isolation. Your website connects to Instagram, Facebook, WhatsApp Business, Google My Business, and major payment processors. The AI chatbot works across your website, Facebook Messenger, and WhatsApp. Email marketing syncs with your customer list. Everything works together seamlessly so you're not juggling 10 different platforms.",
    highlights: [
      'Social media integration (IG, FB, WhatsApp)',
      'Payment processors (Stripe, Square, PayPal)',
      'Google Business Profile sync',
      'Unified customer data across platforms',
    ],
  },
  {
    category: 'technical',
    question: 'What if I want to sell products online? Does the website handle e-commerce?',
    answer: "The Growth and Premium packages include full e-commerce capabilities. You can sell physical products (shipped), digital downloads, or services/bookings. We integrate with Stripe for payments, handle inventory tracking, automated order emails, and even calculate shipping costs. Whether you're selling African fashion, beauty products, or consulting services—we've got you covered. Start with 50 products on Growth, unlimited on Premium.",
    highlights: [
      'Stripe payment processing (2.9% + 30¢)',
      'Inventory management + low stock alerts',
      'Automatic order confirmations',
      'Shipping calculator for physical products',
    ],
  },

  // SUPPORT & TIMELINE
  {
    category: 'support',
    question: 'How long does it really take to launch? You say 21 days—is that realistic?',
    answer: "21 days is our average, and yes, it's realistic! Here's the breakdown: LLC approval takes 5-7 business days (depends on the state), EIN comes within 1-2 days, website design takes 7-10 days, and phone/banking setup is 2-3 days. These happen in parallel, not sequentially. Our fastest launch was 12 days (California LLC), and our longest was 35 days (client requested extensive custom features). You'll have a clear timeline from day one.",
    highlights: [
      'Average: 21 days from payment to launch',
      'Fastest: 12 days (standard package)',
      'State processing time is the main variable',
      'Real-time progress tracking in your dashboard',
    ],
  },
  {
    category: 'support',
    question: 'What happens after my business is launched? Do you just disappear?',
    answer: "Never! We're not a 'set it and forget it' service. Every package includes ongoing support: Starter gets 1 month, Growth gets 3 months, Premium gets 6 months of dedicated support. After that, you can continue on a month-to-month basis or go independent—your choice. We also have a private community of 100+ African immigrant entrepreneurs where you can network, ask questions, and share wins. You're joining a family, not just buying a service.",
    highlights: [
      '1-6 months included support (depending on package)',
      'Private entrepreneur community access',
      'Monthly office hours + Q&A sessions',
      'Optional ongoing support ($97-297/month)',
    ],
  },
  {
    category: 'support',
    question: "I'm in Nigeria/Ethiopia/Ghana. Will time zones be a problem for support?",
    answer: "Not at all! We have a global team covering multiple time zones. Support is available via email, WhatsApp, and scheduled calls. We typically respond within 4-6 hours during business days (often faster). For Premium clients, we schedule regular check-ins at times convenient for you—whether that's 8am Lagos time or 2pm Addis Ababa time. Your dashboard is 24/7 accessible, and the AI chatbot can answer common questions anytime.",
    highlights: [
      'Support via email, WhatsApp, scheduled calls',
      '4-6 hour response time (business days)',
      'Flexible scheduling across time zones',
      '24/7 self-service dashboard access',
    ],
  },
  {
    category: 'support',
    question: "What if I need help with things you don't offer (like accounting or legal advice)?",
    answer: "We've built a trusted network of partners specifically experienced with immigrant entrepreneurs. We can refer you to: immigration attorneys, tax accountants familiar with international business, business insurance brokers, and even microfinance lenders. These aren't random referrals—we've personally vetted them and negotiated discounts for our clients. Think of us as your business concierge for everything you need.",
    highlights: [
      'Immigration attorney referrals',
      'Tax accountants (international experience)',
      'Business insurance partners',
      'Exclusive discounts negotiated for our clients',
    ],
  },
]

export function FAQ() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeCategory, setActiveCategory] = React.useState('all')

  // Filter FAQs
  const filteredFAQs = React.useMemo(() => {
    let filtered = faqs

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter((faq) => faq.category === activeCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.highlights?.some((h) => h.toLowerCase().includes(query))
      )
    }

    // Map to FAQItem format (remove category field)
    return filtered.map(({ ...faq }) => faq)
  }, [searchQuery, activeCategory])

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />

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
              We&apos;ve Got Answers
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Questions?{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              We Have Answers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            Real questions from African immigrants like you. Clear, honest answers
            with no jargon or hidden catches.
          </motion.p>
        </div>

        {/* Search Bar */}
        <FAQSearch
          value={searchQuery}
          onChange={setSearchQuery}
          resultsCount={filteredFAQs.length}
        />

        {/* Category Tabs */}
        <FAQCategory
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <FAQAccordion items={filteredFAQs} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try different keywords or browse all categories
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-green-600 to-emerald-600 p-12 text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="relative z-10">
              <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                Schedule a free 15-minute consultation. We&apos;ll answer your questions,
                understand your goals, and recommend the best path forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Schedule Free Call
                </Link>
                <Link
                  href="https://wa.me/1234567890"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  WhatsApp Us
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
