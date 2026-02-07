import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Bell,
  FileText,
  TrendingUp,
  Users,
  Clock,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Dedicated Support - Your Success Partner, Always Available',
  description: 'Personal account manager and ongoing support to help you navigate every challenge. Priority support, compliance reminders, and growth consultations.',
  keywords: 'business support, account manager, customer support, business consulting, compliance support',
}

export default function OngoingSupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
                <MessageSquare className="w-4 h-4" />
                Ongoing Support Service
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Success Partner, Always Available
              </h1>
              <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                Personal account manager and ongoing support to help you navigate every challenge. From compliance reminders to growth strategy, we&apos;re here for you.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Users, text: 'Dedicated account manager' },
                  { icon: Phone, text: 'Priority phone support' },
                  { icon: Bell, text: 'Compliance reminders' },
                  { icon: TrendingUp, text: 'Growth consultations' },
                ].map((benefit, i) => {
                  const Icon = benefit.icon
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold">{benefit.text}</span>
                    </div>
                  )
                })}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
                >
                  <Link href="/register">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-semibold bg-transparent"
                >
                  <Link href="/#pricing" className="text-white">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-8 lg:p-12">
                <div className="h-full flex flex-col justify-center space-y-6">
                  {[
                    { label: 'Response Time', value: '< 4 hours', status: 'complete' },
                    { label: 'Account Manager', value: 'Dedicated support', status: 'complete' },
                    { label: 'Availability', value: '24/7 access', status: 'complete' },
                    { label: 'Satisfaction', value: '99% happy clients', status: 'complete' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform transition-all hover:scale-105"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-teal-100">
                          {item.label}
                        </span>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-lg font-bold">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Complete Support Package
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need to succeed, from day one to year ten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Dedicated Account Manager',
                description: 'Your personal point of contact who knows your business inside and out. Available via email, phone, and scheduled calls.',
              },
              {
                icon: Mail,
                title: 'Priority Email Support',
                description: 'Fast response times (typically under 4 hours) for all your questions and concerns. Priority queue for urgent issues.',
              },
              {
                icon: Phone,
                title: 'Phone Consultation Access',
                description: 'Schedule phone calls with your account manager for complex questions, strategy discussions, or troubleshooting.',
              },
              {
                icon: Bell,
                title: 'Compliance Reminders',
                description: 'Never miss a deadline. We send reminders for annual reports, tax deadlines, license renewals, and more.',
              },
              {
                icon: FileText,
                title: 'Annual Report Filing',
                description: 'We help you file annual reports and maintain good standing with your state. Avoid penalties and maintain compliance.',
              },
              {
                icon: Calendar,
                title: 'Tax Deadline Notifications',
                description: 'Get timely reminders for federal and state tax deadlines. We help you stay organized and avoid late fees.',
              },
              {
                icon: TrendingUp,
                title: 'Growth Strategy Consultations',
                description: 'Regular check-ins to discuss your business growth, expansion opportunities, and strategic planning.',
              },
              {
                icon: Users,
                title: 'Community Access',
                description: 'Join our community of entrepreneurs. Network, share experiences, and learn from others on the same journey.',
              },
              {
                icon: Clock,
                title: 'Ongoing Support',
                description: 'Support doesn&apos;t end after launch. We&apos;re here for the long haul, helping you navigate every stage of growth.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 p-8 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Support Levels by Package
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Different packages include different levels of support. Choose what fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                features: [
                  'Email support (24-48 hour response)',
                  'Basic compliance reminders',
                  'Community access',
                  'Knowledge base access',
                ],
              },
              {
                name: 'Growth',
                features: [
                  'Everything in Starter',
                  'Priority email (4-6 hour response)',
                  'Phone consultation (monthly)',
                  'Advanced compliance reminders',
                  'Growth strategy sessions',
                ],
              },
              {
                name: 'Premium',
                features: [
                  'Everything in Growth',
                  'Dedicated account manager',
                  'Priority phone support',
                  'Weekly check-ins',
                  'Custom compliance tracking',
                  'Unlimited consultations',
                ],
              },
            ].map((tier, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-teal-500 dark:hover:border-teal-500 transition-all"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <ul className="space-y-3 mt-6">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How quickly will I get a response?',
                answer: 'Response times vary by package. Starter: 24-48 hours, Growth: 4-6 hours, Premium: Under 4 hours with dedicated account manager.',
              },
              {
                question: 'What can I ask my account manager?',
                answer: 'Anything related to your business! Compliance questions, growth strategy, technical issues, tax questions, expansion planning, and more.',
              },
              {
                question: 'Do I get support after my business launches?',
                answer: 'Absolutely! Support is ongoing. We&apos;re here to help you navigate challenges at every stage of your business journey.',
              },
              {
                question: 'Can I upgrade my support level?',
                answer: 'Yes, you can upgrade to a higher package at any time to get more support features and faster response times.',
              },
              {
                question: 'What time zones do you support?',
                answer: 'We have a global team covering multiple time zones. Support is available via email 24/7, and phone consultations can be scheduled at times convenient for you.',
              },
              {
                question: 'What if I need help with something not in my package?',
                answer: 'We can help with most business-related questions. For services outside your package, we can provide guidance or refer you to trusted partners.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready for Ongoing Support?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join 1,500+ entrepreneurs with dedicated support from Gbaki.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-teal-600 hover:bg-teal-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
          >
            <Link href="/register">
              Get Support Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

