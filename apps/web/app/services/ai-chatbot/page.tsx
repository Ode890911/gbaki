import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Bot,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Globe,
  Clock,
  Brain,
  Zap,
  Shield,
  Languages,
  BarChart,
  Smartphone,
  HelpCircle,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'AI Chatbot - 24/7 Customer Support Assistant',
  description: 'AI-powered chatbot trained for your industry. Handles customer questions 24/7, books appointments, and escalates complex issues. Multilingual support.',
  keywords: 'AI chatbot, customer support, virtual assistant, automated support, chatbot service',
}

export default function AIChatbotPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
                <Bot className="w-4 h-4" />
                AI Chatbot Service
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your 24/7 Customer Support Assistant
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                AI-powered chatbot trained for your industry. Handles customer questions 24/7, books appointments, and escalates complex issues. Multilingual support included.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Clock, text: '24/7 availability' },
                  { icon: Brain, text: 'AI-powered responses' },
                  { icon: Languages, text: 'Multilingual support' },
                  { icon: Zap, text: 'Instant responses' },
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
                  className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
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
                    { label: 'Response Time', value: '< 1 second', status: 'complete' },
                    { label: 'Languages', value: '10+ languages', status: 'complete' },
                    { label: 'Uptime', value: '99.9% available', status: 'complete' },
                    { label: 'Training', value: 'Industry-specific', status: 'complete' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform transition-all hover:scale-105"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-indigo-100">
                          {item.label}
                        </span>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-lg font-bold">{item.value}</p>
                    </div>
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
              Complete AI Chatbot Solution
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need for intelligent, automated customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Responses',
                description: 'Powered by GPT-4, our chatbot understands context, provides accurate answers, and learns from every conversation.',
              },
              {
                icon: MessageSquare,
                title: 'Industry Training',
                description: 'We train your chatbot on your specific business, products, services, and industry knowledge. It knows your business inside out.',
              },
              {
                icon: Languages,
                title: 'Multilingual Support',
                description: 'Speaks 10+ languages including English, French, Spanish, Swahili, and more. Perfect for serving diverse customer bases.',
              },
              {
                icon: Clock,
                title: '24/7 Availability',
                description: 'Never miss a customer inquiry. Your chatbot is available 24/7, answering questions even when you\'re sleeping.',
              },
              {
                icon: Zap,
                title: 'Instant Responses',
                description: 'Responds to customer questions in under 1 second. No waiting, no delays, just instant helpful answers.',
              },
              {
                icon: Calendar,
                title: 'Appointment Booking',
                description: 'Customers can book appointments directly through the chatbot. Integrates with your calendar system.',
              },
              {
                icon: MessageSquare,
                title: 'FAQ Handling',
                description: 'Automatically answers common questions about your business, products, services, pricing, and policies.',
              },
              {
                icon: BarChart,
                title: 'Analytics & Insights',
                description: 'Track conversations, popular questions, customer satisfaction, and identify areas for improvement.',
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'All conversations are encrypted and secure. Customer data is protected with bank-level security.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 p-8 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
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
              Simple 4-Step Setup
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get your AI chatbot live in just 3-5 business days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Business Training',
                description: 'We gather information about your business, products, services, and FAQs to train the chatbot.',
                icon: Brain,
              },
              {
                step: '02',
                title: 'Customization',
                description: 'We customize the chatbot\'s personality, tone, and responses to match your brand voice.',
                icon: Bot,
              },
              {
                step: '03',
                title: 'Integration',
                description: 'We integrate the chatbot into your website, Facebook Messenger, and WhatsApp Business.',
                icon: Globe,
              },
              {
                step: '04',
                title: 'Go Live',
                description: 'Your chatbot is live! It starts answering customer questions immediately and learns from every conversation.',
                icon: CheckCircle,
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="relative">
                  <div className="text-7xl font-bold text-indigo-100 dark:text-indigo-900/30 mb-4">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center text-white mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-indigo-200 dark:bg-indigo-900/30">
                      <ArrowRight className="absolute -top-2.5 -right-2 w-5 h-5 text-indigo-600 dark:text-indigo-400" />
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
            <p className="text-lg text-gray-600 dark:text-gray-400">
              From e-commerce to services, our AI chatbot handles customer inquiries across all industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-commerce Stores',
                description: 'Answer product questions, shipping inquiries, return policies, and order status updates.',
              },
              {
                title: 'Restaurants',
                description: 'Take reservations, answer menu questions, provide hours and location, and handle takeout orders.',
              },
              {
                title: 'Service Businesses',
                description: 'Book appointments, answer service questions, provide pricing, and handle customer support.',
              },
              {
                title: 'Consultants',
                description: 'Schedule consultations, answer FAQs, provide information about services, and qualify leads.',
              },
              {
                title: 'Real Estate',
                description: 'Answer property questions, schedule viewings, provide neighborhood information, and handle inquiries.',
              },
              {
                title: 'Healthcare',
                description: 'Schedule appointments, answer common health questions, provide clinic information, and handle inquiries.',
              },
            ].map((useCase, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {useCase.description}
                </p>
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
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Will the chatbot understand my African customers?',
                answer: 'Yes! We train the chatbot to understand cultural nuances and can customize it for specific African markets, languages, and business contexts.',
              },
              {
                question: 'Can I customize the chatbot\'s responses?',
                answer: 'Absolutely! We work with you to customize the chatbot\'s personality, tone, and responses to match your brand and business style.',
              },
              {
                question: 'What if the chatbot can\'t answer a question?',
                answer: 'The chatbot will automatically escalate complex questions to you via email or SMS. You can review and respond, and the chatbot learns from your answers.',
              },
              {
                question: 'Can the chatbot handle multiple languages?',
                answer: 'Yes! The chatbot supports 10+ languages including English, French, Spanish, Swahili, and more. It can detect the customer\'s language and respond accordingly.',
              },
              {
                question: 'Do I need technical knowledge to use it?',
                answer: 'Not at all! We handle all the technical setup. You just review and approve responses, and the chatbot handles everything else automatically.',
              },
              {
                question: 'Can I see what customers are asking?',
                answer: 'Yes! You get a dashboard showing all conversations, popular questions, customer satisfaction ratings, and insights to improve your business.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
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
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready for AI-Powered Support?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join 1,500+ entrepreneurs with 24/7 AI chatbot support from Gbaki.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
          >
            <Link href="/register">
              Get Your AI Chatbot Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

