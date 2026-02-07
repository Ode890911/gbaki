import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Voicemail,
  PhoneForwarded,
  PhoneCall,
  Mail,
  Users,
  Clock,
  Smartphone,
  Laptop,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Business Phone System - Professional US Phone Number',
  description: 'Get a US business phone number with voicemail, call forwarding, and SMS. Look professional from day one.',
  keywords: 'business phone, virtual phone, US phone number, business phone system',
}

export default function BusinessPhonePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
                <Phone className="w-4 h-4" />
                Business Phone System
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Sound Professional From Day One
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Get a US business phone number with professional voicemail, call forwarding, and SMS messaging. Your customers will never know you&apos;re just starting out.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Phone, text: 'US local or toll-free' },
                  { icon: PhoneForwarded, text: 'Forward to any phone' },
                  { icon: Voicemail, text: 'Professional voicemail' },
                  { icon: MessageSquare, text: 'SMS enabled' },
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
                  className="bg-white text-green-600 hover:bg-green-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
                >
                  <Link href="/register">
                    Get Your Number
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
              <div className="aspect-square rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
                    <Phone className="w-16 h-16" />
                  </div>
                  <div className="text-6xl font-bold mb-4">
                    +1 (555) 123-4567
                  </div>
                  <p className="text-xl text-green-100">
                    Your Professional Business Number
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A complete business phone system without the complexity or high costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: 'US Local or Toll-Free Number',
                description: 'Choose a local number in your area code or a 1-800 toll-free number for nationwide reach.',
              },
              {
                icon: PhoneForwarded,
                title: 'Call Forwarding',
                description: 'Forward calls to your mobile, home phone, or any number worldwide. Change anytime.',
              },
              {
                icon: Voicemail,
                title: 'Professional Voicemail',
                description: 'Custom greeting with voicemail-to-email so you never miss a message.',
              },
              {
                icon: MessageSquare,
                title: 'SMS/Text Messaging',
                description: 'Send and receive text messages from your business number.',
              },
              {
                icon: Mail,
                title: 'Voicemail to Email',
                description: 'Get voicemails delivered to your email inbox as audio files.',
              },
              {
                icon: Users,
                title: 'Multiple Users',
                description: 'Add team members and route calls to the right person.',
              },
              {
                icon: Smartphone,
                title: 'Mobile App Access',
                description: 'Make and receive calls through the mobile app from anywhere.',
              },
              {
                icon: Laptop,
                title: 'Desktop App',
                description: 'Use your business phone on your computer with softphone.',
              },
              {
                icon: Clock,
                title: 'Business Hours Setup',
                description: 'Set custom hours and route calls differently after hours.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 p-8 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-green-600 dark:text-green-400" />
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

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Setup in Minutes, Not Days
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Number',
                description: 'Pick a local area code or toll-free 1-800 number.',
                icon: Phone,
              },
              {
                step: '02',
                title: 'Record Your Greeting',
                description: 'We help you record a professional voicemail greeting.',
                icon: Voicemail,
              },
              {
                step: '03',
                title: 'Set Call Forwarding',
                description: 'Tell us which phone to forward calls to.',
                icon: PhoneForwarded,
              },
              {
                step: '04',
                title: 'Start Taking Calls',
                description: 'Your business phone is live in 2-3 business days!',
                icon: PhoneCall,
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="relative">
                  <div className="text-6xl font-bold text-green-100 dark:text-green-900/30 mb-4">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center text-white mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-green-200 dark:bg-green-900/30">
                      <ArrowRight className="absolute -top-2.5 -right-2 w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Perfect For Every Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Solo Entrepreneurs',
                description: 'Keep your personal number private. Look professional even as a one-person business.',
                benefits: ['Work-life separation', 'Professional image', 'Never miss a call'],
              },
              {
                title: 'Remote Businesses',
                description: 'Serve US customers from anywhere in the world with a local US presence.',
                benefits: ['Local credibility', 'International reach', 'No expensive hardware'],
              },
              {
                title: 'Growing Teams',
                description: 'Add team members and create a phone tree as you scale.',
                benefits: ['Team collaboration', 'Call routing', 'Shared voicemail'],
              },
            ].map((useCase, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {useCase.description}
                </p>
                <ul className="space-y-3">
                  {useCase.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Can I port my existing number?',
                answer: 'Yes! If you already have a business number, we can port it over. The process takes 7-10 business days.',
              },
              {
                question: 'Are there usage limits or per-minute charges?',
                answer: 'Our plans include unlimited minutes within the US and Canada. International calls are charged separately at competitive rates.',
              },
              {
                question: 'Can I receive texts (SMS) on my business number?',
                answer: 'Absolutely! All numbers include SMS capability so customers can text you.',
              },
              {
                question: 'What if I want to change my forwarding number?',
                answer: 'You can change where calls forward to anytime through our web portal or mobile app.',
              },
              {
                question: 'Can I record calls?',
                answer: 'Yes, call recording is available. We automatically inform callers that calls may be recorded for quality purposes.',
              },
              {
                question: 'What happens if I cancel?',
                answer: 'You can cancel anytime. We offer number portability so you can take your number to another provider if needed.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-green-500 dark:hover:border-green-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
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
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get Your Business Number Today
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of entrepreneurs who trust us with their business communications.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-green-600 hover:bg-green-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
          >
            <Link href="/register">
              Start Taking Professional Calls
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
