import { Metadata } from 'next'
import Link from 'next/link'
import { 
  CreditCard,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Shield,
  Zap,
  Globe,
  Smartphone,
  TrendingUp,
  Users,
  Lock,
  BarChart,
  RefreshCw,
  Wallet,
  Sparkles,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Payment Processing - Accept Credit Cards & Online Payments',
  description: 'Start accepting credit cards, debit cards, and digital payments with our secure payment processing setup.',
  keywords: 'payment processing, accept credit cards, online payments, stripe, paypal',
}

export default function PaymentProcessingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
                <CreditCard className="w-4 h-4" />
                Payment Processing Service
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Start Accepting Payments Today
              </h1>
              <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
                Complete payment gateway setup with Stripe and PayPal. Accept credit cards, debit cards, digital wallets, and bank transfers from customers worldwide.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: CreditCard, text: 'All major cards accepted' },
                  { icon: Shield, text: 'PCI compliant & secure' },
                  { icon: Zap, text: 'Instant setup' },
                  { icon: Globe, text: 'Accept global payments' },
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
                  className="bg-white text-cyan-600 hover:bg-cyan-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
                >
                  <Link href="/register">
                    Start Accepting Payments
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
              <div className="aspect-square rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-12">
                <div className="h-full flex flex-col justify-center space-y-6">
                  {/* Payment Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {['Visa', 'Mastercard', 'Amex', 'Discover'].map((card, i) => (
                      <div
                        key={i}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center font-bold text-sm"
                      >
                        {card}
                      </div>
                    ))}
                  </div>

                  {/* Digital Wallets */}
                  <div className="space-y-3">
                    {['Apple Pay', 'Google Pay', 'PayPal'].map((wallet, i) => (
                      <div
                        key={i}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3"
                      >
                        <Wallet className="w-6 h-6" />
                        <span className="font-semibold">{wallet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Accept Every Payment Method
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Give your customers the flexibility to pay however they prefer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CreditCard,
                title: 'Credit & Debit Cards',
                description: 'Accept Visa, Mastercard, American Express, Discover, and all major cards.',
                methods: ['Visa', 'Mastercard', 'Amex', 'Discover'],
              },
              {
                icon: Wallet,
                title: 'Digital Wallets',
                description: 'Enable one-tap checkout with popular digital wallets.',
                methods: ['Apple Pay', 'Google Pay', 'PayPal'],
              },
              {
                icon: DollarSign,
                title: 'ACH Bank Transfers',
                description: 'Lower fees with direct bank account payments.',
                methods: ['Direct debit', 'Bank transfer', 'eCheck'],
              },
              {
                icon: RefreshCw,
                title: 'Recurring Billing',
                description: 'Set up subscriptions and automatic payments.',
                methods: ['Monthly', 'Annual', 'Custom intervals'],
              },
              {
                icon: Globe,
                title: 'International Payments',
                description: 'Accept payments in 135+ currencies worldwide.',
                methods: ['Multi-currency', 'Auto conversion', 'Local methods'],
              },
              {
                icon: Smartphone,
                title: 'Mobile Payments',
                description: 'Accept payments on the go with mobile card readers.',
                methods: ['Tap to pay', 'QR codes', 'Mobile checkout'],
              },
            ].map((method, i) => {
              const Icon = method.icon
              return (
                <div
                  key={i}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-cyan-500 p-8 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {method.description}
                  </p>
                  <div className="space-y-2">
                    {method.methods.map((m, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to Get Paid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Bank-Level Security',
                description: 'PCI DSS compliant with end-to-end encryption. Your customers\' data is always protected.',
              },
              {
                icon: Zap,
                title: 'Instant Payouts',
                description: 'Get paid as fast as next business day. No more waiting weeks for your money.',
              },
              {
                icon: BarChart,
                title: 'Real-Time Reporting',
                description: 'Track sales, refunds, and revenue with detailed analytics dashboard.',
              },
              {
                icon: Lock,
                title: 'Fraud Prevention',
                description: 'Advanced fraud detection and prevention tools protect your business.',
              },
              {
                icon: Users,
                title: 'Customer Portal',
                description: 'Customers can manage subscriptions, update cards, and view invoices.',
              },
              {
                icon: TrendingUp,
                title: 'No Setup Fees',
                description: 'Zero upfront costs. Only pay when you make a sale - simple and fair.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-8"
                >
                  <div className="w-14 h-14 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
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

      {/* Pricing */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No hidden fees. No monthly minimums. Pay only when you get paid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Credit & Debit Cards',
                rate: '2.9% + 30¢',
                description: 'Per successful transaction',
                features: ['Visa, Mastercard, Amex', 'No setup fees', 'No monthly fees', 'Instant activation'],
              },
              {
                title: 'ACH Bank Transfers',
                rate: '0.8%',
                description: 'Capped at $5 per transaction',
                features: ['Lower processing fees', 'Direct bank payments', 'No chargebacks', '1-2 day settlement'],
                popular: true,
              },
              {
                title: 'International Cards',
                rate: '3.9% + 30¢',
                description: 'Plus currency conversion',
                features: ['135+ currencies', 'Auto conversion', 'Global reach', 'Local payment methods'],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 ${
                  plan.popular
                    ? 'border-cyan-500 dark:border-cyan-500 ring-4 ring-cyan-500/20'
                    : 'border-gray-200 dark:border-gray-800'
                } p-8 relative`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-600 text-white text-sm font-semibold">
                    Lowest Fees
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.title}
                </h3>
                <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                  {plan.rate}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Included in Growth & Premium Packages
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Payment processing setup is included in our Growth and Premium packages. We handle Stripe and PayPal account creation, integration with your website, and testing - everything you need to start accepting payments immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Setup in 3-5 Business Days
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Create Accounts',
                description: 'We set up your Stripe and PayPal merchant accounts.',
                icon: Users,
              },
              {
                step: '02',
                title: 'Integrate & Test',
                description: 'Connect payment processing to your website and test thoroughly.',
                icon: Zap,
              },
              {
                step: '03',
                title: 'Configure Options',
                description: 'Set up payment methods, currencies, and receipt templates.',
                icon: CreditCard,
              },
              {
                step: '04',
                title: 'Go Live',
                description: 'Your payment system is ready to accept real transactions!',
                icon: CheckCircle,
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="relative">
                  <div className="text-6xl font-bold text-cyan-100 dark:text-cyan-900/30 mb-4">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-cyan-600 flex items-center justify-center text-white mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-cyan-200 dark:bg-cyan-900/30">
                      <ArrowRight className="absolute -top-2.5 -right-2 w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                  )}
                </div>
              )
            })}
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
                question: 'Do I need a business bank account first?',
                answer: 'Yes, you\'ll need a US business bank account to receive payments. We can help you with the bank account setup process.',
              },
              {
                question: 'How long does it take to receive payments?',
                answer: 'Stripe pays out to your bank account within 2 business days. PayPal typically takes 1-2 business days.',
              },
              {
                question: 'Are there any monthly fees?',
                answer: 'No monthly fees with our standard setup. You only pay the processing fee (2.9% + 30¢) when you make a sale.',
              },
              {
                question: 'What happens if there\'s a chargeback?',
                answer: 'We help you dispute chargebacks. Stripe charges a $15 fee for chargebacks, but we provide guidance to minimize disputes.',
              },
              {
                question: 'Can I accept payments on my mobile phone?',
                answer: 'Yes! Both Stripe and PayPal offer mobile apps and card readers for in-person payments.',
              },
              {
                question: 'Do you handle refunds?',
                answer: 'Yes, you can process refunds directly through your Stripe or PayPal dashboard. We provide training on how to do this.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
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
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Start Accepting Payments This Week
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Complete payment processing setup included in Growth & Premium packages.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-cyan-600 hover:bg-cyan-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
          >
            <Link href="/register">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
