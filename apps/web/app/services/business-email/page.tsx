import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Mail,
  CheckCircle,
  ArrowRight,
  Shield,
  Cloud,
  Smartphone,
  Calendar,
  Users,
  Lock,
  Zap,
  Globe,
  HardDrive,
  FileText,
  Clock,
  Star,
  TrendingUp,
  Sparkles,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Professional Business Email - Custom Domain Email',
  description: 'Get professional email addresses with your domain name. Build credibility with custom email like hello@yourbusiness.com',
  keywords: 'business email, professional email, custom domain email, business email hosting',
}

export default function BusinessEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
                <Mail className="w-4 h-4" />
                Professional Business Email
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Build Trust With Every Email
              </h1>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                Professional email addresses using your business domain. Say goodbye to gmail.com and hello to hello@yourbusiness.com.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Mail, text: 'Custom domain email' },
                  { icon: Shield, text: 'Spam & virus protection' },
                  { icon: Cloud, text: '30GB storage per mailbox' },
                  { icon: Smartphone, text: 'Mobile & desktop sync' },
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
                  className="bg-white text-orange-600 hover:bg-orange-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
                >
                  <Link href="/register">
                    Get Professional Email
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
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-white/20 p-8 overflow-hidden">
                {/* Email Preview */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white font-bold">
                        AB
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Adeyemi Business</div>
                        <div className="text-sm text-orange-600">hello@yourbusiness.com</div>
                      </div>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  
                  {/* Email List */}
                  <div className="space-y-3">
                    {[
                      { from: 'info@yourbusiness.com', subject: 'New Customer Inquiry' },
                      { from: 'sales@yourbusiness.com', subject: 'Order Confirmation' },
                      { from: 'support@yourbusiness.com', subject: 'Ticket Update' },
                    ].map((email, i) => (
                      <div key={i} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="font-semibold text-gray-900 text-sm mb-1">{email.from}</div>
                        <div className="text-xs text-gray-600">{email.subject}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Professional Email Matters */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Professional Email Matters
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your email address is often the first impression customers have of your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              {[
                {
                  icon: TrendingUp,
                  title: '67% More Credibility',
                  description: 'Customers are 67% more likely to trust a business with a professional email address.',
                },
                {
                  icon: Star,
                  title: 'Brand Recognition',
                  description: 'Every email you send reinforces your brand with your custom domain.',
                },
                {
                  icon: Shield,
                  title: 'Enhanced Security',
                  description: 'Enterprise-grade security protects your business communications.',
                },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-3xl border-2 border-orange-200 dark:border-orange-800 p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-600 mb-2 line-through opacity-50">
                    john.doe123@gmail.com
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    ❌ Unprofessional, forgettable, loses credibility
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    hello@yourbusiness.com
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ✅ Professional, memorable, builds trust
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to Communicate Professionally
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: 'Up to 5 Email Addresses',
                description: 'Create email addresses for different departments: info@, sales@, support@, hello@, etc.',
              },
              {
                icon: HardDrive,
                title: '30GB Storage Per Mailbox',
                description: 'Plenty of space for emails, attachments, and files. Never worry about running out.',
              },
              {
                icon: Shield,
                title: 'Advanced Spam Protection',
                description: '99.9% spam detection rate keeps your inbox clean and secure.',
              },
              {
                icon: Lock,
                title: 'Virus & Malware Scanning',
                description: 'Every attachment is scanned automatically before it reaches your inbox.',
              },
              {
                icon: Smartphone,
                title: 'Mobile & Desktop Sync',
                description: 'Access email on iPhone, Android, Mac, PC - everything stays in sync.',
              },
              {
                icon: Calendar,
                title: 'Calendar & Contacts',
                description: 'Integrated calendar and contacts sync across all your devices.',
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Share calendars, contacts, and collaborate with your team.',
              },
              {
                icon: Cloud,
                title: 'Cloud-Based Access',
                description: 'Access your email from anywhere with webmail or apps.',
              },
              {
                icon: FileText,
                title: 'Professional Signature',
                description: 'Create beautiful email signatures with your logo and social links.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 p-8 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
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

      {/* Email Setup Process */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Setup Takes Just 24 Hours
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Email Addresses',
                description: 'Decide which email addresses you need (up to 5 included).',
                icon: Mail,
              },
              {
                step: '02',
                title: 'We Configure Everything',
                description: 'Our team sets up your email server, DNS, and security.',
                icon: Zap,
              },
              {
                step: '03',
                title: 'Connect Your Devices',
                description: 'We provide simple instructions to add email to your devices.',
                icon: Smartphone,
              },
              {
                step: '04',
                title: 'Start Sending',
                description: 'Your professional email is ready to use in 1-2 days!',
                icon: CheckCircle,
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="relative">
                  <div className="text-6xl font-bold text-orange-100 dark:text-orange-900/30 mb-4">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center text-white mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-orange-200 dark:bg-orange-900/30">
                      <ArrowRight className="absolute -top-2.5 -right-2 w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How We Compare
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-800">
                    <th className="text-left p-6 text-gray-900 dark:text-white font-bold">Feature</th>
                    <th className="text-center p-6">
                      <div className="text-orange-600 dark:text-orange-400 font-bold">Gbaki Email</div>
                    </th>
                    <th className="text-center p-6 text-gray-600 dark:text-gray-400">Google Workspace</th>
                    <th className="text-center p-6 text-gray-600 dark:text-gray-400">Microsoft 365</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Monthly Cost (5 users)', gbaki: 'Included', google: '$30/mo', microsoft: '$60/mo' },
                    { feature: 'Setup & Configuration', gbaki: 'Included', google: 'DIY', microsoft: 'DIY' },
                    { feature: 'Storage per User', gbaki: '30GB', google: '30GB', microsoft: '50GB' },
                    { feature: 'Spam Protection', gbaki: true, google: true, microsoft: true },
                    { feature: 'Mobile Apps', gbaki: true, google: true, microsoft: true },
                    { feature: 'Technical Support', gbaki: 'Included', google: 'Extra cost', microsoft: 'Extra cost' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-6 text-gray-900 dark:text-white font-semibold">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.gbaki === 'boolean' ? (
                          <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto" />
                        ) : (
                          <span className="font-bold text-orange-600 dark:text-orange-400">{row.gbaki}</span>
                        )}
                      </td>
                      <td className="p-6 text-center text-gray-600 dark:text-gray-400">
                        {typeof row.google === 'boolean' ? (
                          <CheckCircle className="w-6 h-6 text-gray-400 mx-auto" />
                        ) : (
                          row.google
                        )}
                      </td>
                      <td className="p-6 text-center text-gray-600 dark:text-gray-400">
                        {typeof row.microsoft === 'boolean' ? (
                          <CheckCircle className="w-6 h-6 text-gray-400 mx-auto" />
                        ) : (
                          row.microsoft
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Can I use my existing email client like Outlook or Apple Mail?',
                answer: 'Yes! Our email works with any email client. We provide setup instructions for Outlook, Apple Mail, Thunderbird, and mobile devices.',
              },
              {
                question: 'Can I migrate my existing emails?',
                answer: 'Absolutely. We can help you migrate emails from Gmail, Yahoo, or another provider to your new professional email.',
              },
              {
                question: 'What if I need more than 5 email addresses?',
                answer: 'Additional email addresses are just $5/month each. You can add as many as you need.',
              },
              {
                question: 'Is there a storage upgrade option?',
                answer: 'Yes, you can upgrade to 100GB for $10/month or unlimited storage for $20/month per mailbox.',
              },
              {
                question: 'What happens if I exceed my storage limit?',
                answer: 'We\'ll notify you before you reach the limit. You can either delete old emails or upgrade your storage plan.',
              },
              {
                question: 'Can I access email from my phone?',
                answer: 'Yes! Works perfectly on iPhone, Android, and tablets. We provide step-by-step setup instructions.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-orange-500 dark:hover:border-orange-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
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
      <section className="py-20 bg-gradient-to-br from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Look Professional?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get your custom business email setup in just 24 hours.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
          >
            <Link href="/register">
              Get Professional Email Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
