import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Building2,
  Globe,
  Phone,
  CreditCard,
  Mail,
  MessageSquare,
  Check,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Users,
  Zap,
  Briefcase,
  BadgeCheck,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Services - Complete Business Launch Solutions',
  description: 'LLC formation, website development, business phone, email setup, and ongoing support for African immigrant entrepreneurs.',
}

export default function ServicesPage() {
  const services = [
    {
      id: 'llc-formation',
      slug: '/services/llc-formation',
      icon: Building2,
      title: 'LLC Formation',
      tagline: 'Your business, officially recognized',
      description: 'Complete LLC formation in your choice of state. We handle all paperwork, filing, and state requirements.',
      features: [
        'State selection consultation',
        'Articles of Organization filing',
        'Registered agent service (1 year)',
        'Operating Agreement template',
        'EIN (Tax ID) application',
        'Business name availability check',
        'Certificate of Formation delivery',
        'Compliance checklist',
      ],
      timeline: '7-14 business days',
      color: 'blue',
    },
    {
      id: 'website-development',
      slug: '/services/website-development',
      icon: Globe,
      title: 'Professional Website',
      tagline: 'Your online storefront, ready to convert',
      description: 'Custom-designed, mobile-responsive website that represents your brand and converts visitors into customers.',
      features: [
        '5-page professional website',
        'Mobile-responsive design',
        'SEO optimization',
        'Contact form integration',
        'Google Analytics setup',
        'SSL certificate (secure)',
        'Social media integration',
        'Fast hosting included (1 year)',
      ],
      timeline: '10-14 business days',
      color: 'purple',
    },
    {
      id: 'business-phone',
      slug: '/services/business-phone',
      icon: Phone,
      title: 'Business Phone System',
      tagline: 'Professional communication from day one',
      description: 'US business phone number with voicemail, call forwarding, and professional greeting.',
      features: [
        'US local or toll-free number',
        'Professional voicemail setup',
        'Call forwarding to your phone',
        'SMS/text messaging enabled',
        'Voicemail to email',
        'Custom greeting recording',
        'Multi-user support',
        'Mobile app access',
      ],
      timeline: '2-3 business days',
      color: 'green',
    },
    {
      id: 'business-email',
      slug: '/services/business-email',
      icon: Mail,
      title: 'Professional Email',
      tagline: 'Build trust with every message',
      description: 'Custom email addresses with your domain name (e.g., hello@yourbusiness.com).',
      features: [
        'Up to 5 email addresses',
        'Custom domain email',
        '30GB storage per mailbox',
        'Spam and virus protection',
        'Mobile device sync',
        'Calendar and contacts',
        'Professional signature setup',
        '24/7 email support',
      ],
      timeline: '1-2 business days',
      color: 'orange',
    },
    {
      id: 'merchant-services',
      slug: '/services/payment-processing',
      icon: CreditCard,
      title: 'Payment Processing',
      tagline: 'Start accepting payments immediately',
      description: 'Complete payment gateway setup to accept credit cards, debit cards, and digital payments.',
      features: [
        'Stripe account setup',
        'PayPal integration',
        'Credit card processing',
        'ACH bank transfers',
        'Mobile payments support',
        'Recurring billing setup',
        'Payment links creation',
        'Transaction reporting',
      ],
      timeline: '3-5 business days',
      color: 'pink',
    },
    {
      id: 'ongoing-support',
      slug: '/services/ongoing-support',
      icon: MessageSquare,
      title: 'Dedicated Support',
      tagline: 'Your success partner, always available',
      description: 'Personal account manager and ongoing support to help you navigate every challenge.',
      features: [
        'Dedicated account manager',
        'Priority email support',
        'Phone consultation access',
        'Business compliance reminders',
        'Annual report filing assistance',
        'Tax deadline notifications',
        'Growth strategy consultations',
        'Community access',
      ],
      timeline: 'Ongoing',
      color: 'teal',
    },
  ]

  const addons = [
    {
      icon: Briefcase,
      title: 'Business Bank Account Setup',
      description: 'Assistance opening a US business bank account',
      price: '$297',
    },
    {
      icon: BadgeCheck,
      title: 'Trademark Registration',
      description: 'Federal trademark search and registration',
      price: '$797',
    },
    {
      icon: Shield,
      title: 'Business License Assistance',
      description: 'Help obtaining required local licenses',
      price: '$397',
    },
    {
      icon: Users,
      title: 'Virtual Assistant (10 hours)',
      description: 'Professional VA support for admin tasks',
      price: '$497/mo',
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        hover: 'hover:border-blue-500 dark:hover:border-blue-500',
        gradient: 'from-blue-600 to-cyan-600',
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        hover: 'hover:border-purple-500 dark:hover:border-purple-500',
        gradient: 'from-purple-600 to-pink-600',
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        hover: 'hover:border-green-500 dark:hover:border-green-500',
        gradient: 'from-green-600 to-emerald-600',
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        hover: 'hover:border-orange-500 dark:hover:border-orange-500',
        gradient: 'from-orange-600 to-amber-600',
      },
      pink: {
        bg: 'bg-pink-100 dark:bg-pink-900/30',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-200 dark:border-pink-800',
        hover: 'hover:border-pink-500 dark:hover:border-pink-500',
        gradient: 'from-pink-600 to-rose-600',
      },
      teal: {
        bg: 'bg-teal-100 dark:bg-teal-900/30',
        text: 'text-teal-600 dark:text-teal-400',
        border: 'border-teal-200 dark:border-teal-800',
        hover: 'hover:border-teal-500 dark:hover:border-teal-500',
        gradient: 'from-teal-600 to-cyan-600',
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Complete Business Solutions
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Everything You Need to Launch & Grow
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              From LLC formation to your first customer, we handle the complexity so you can focus on what matters – building your business.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-green-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
            >
              <Link href="/register">
                View Packages & Pricing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Clock, value: '21 Days', label: 'Average Launch Time' },
              { icon: Shield, value: '100%', label: 'Money-Back Guarantee' },
              { icon: Users, value: '1,500+', label: 'Businesses Launched' },
              { icon: TrendingUp, value: '98%', label: 'Success Rate' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center">
                  <Icon className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Each service is designed to remove barriers and accelerate your business launch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              const colors = getColorClasses(service.color)

              return (
                <div
                  key={service.id}
                  className={`group bg-white dark:bg-gray-900 rounded-2xl border-2 ${colors.border} ${colors.hover} p-8 transition-all`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {service.title}
                      </h3>
                      <p className={`text-sm font-semibold ${colors.text}`}>
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Timeline */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} ${colors.text} text-sm font-semibold mb-6`}>
                    <Clock className="w-4 h-4" />
                    {service.timeline}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Button
                      asChild
                      className={`flex-1 rounded-xl bg-gradient-to-r ${colors.gradient} text-white hover:opacity-90 shadow-lg`}
                    >
                      <Link href={service.slug}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className={`rounded-xl border-2 ${colors.border} ${colors.text} hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent`}
                    >
                      <Link href="/#pricing">
                        Pricing
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Additional Services
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Enhance Your Package
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Optional add-ons to take your business even further.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {addons.map((addon, i) => {
              const Icon = addon.icon
              return (
                <div
                  key={i}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 p-8 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {addon.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {addon.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {addon.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Simple, Transparent Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              From consultation to launch in just 4 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Package',
                description: 'Select the package that fits your business needs and budget.',
              },
              {
                step: '02',
                title: 'Complete Your Order',
                description: 'Fill out a simple form with your business information.',
              },
              {
                step: '03',
                title: 'We Handle Everything',
                description: 'Sit back while we file your LLC, build your website, and set up your services.',
              },
              {
                step: '04',
                title: 'Launch & Grow',
                description: 'Get your documents, website, and tools. Start serving customers!',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-green-100 dark:text-green-900/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-green-200 dark:bg-green-900/30">
                    <ArrowRight className="absolute -top-2.5 -right-2 w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Launch Your Business?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join 1,500+ entrepreneurs who trusted us with their American dream.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-green-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
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
              <Link href="/contact" className="text-white">
                Talk to an Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
