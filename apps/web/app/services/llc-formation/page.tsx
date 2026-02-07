import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Building2,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  FileText,
  Award,
  Users,
  TrendingUp,
  Phone,
  MapPin,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'LLC Formation Services - Form Your Business in 7 Days',
  description: 'Professional LLC formation service for African immigrant entrepreneurs. We handle all paperwork, filing, and compliance. Get your business registered fast.',
  keywords: 'LLC formation, business registration, start LLC, register business, business formation service',
}

export default function LLCFormationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
                <Building2 className="w-4 h-4" />
                LLC Formation Service
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Form Your LLC in 7 Days
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Professional business formation service designed for African immigrant entrepreneurs. We handle all the paperwork, filing, and compliance so you can focus on building your business.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Clock, text: '7-14 day turnaround' },
                  { icon: Shield, text: 'Registered agent included' },
                  { icon: FileText, text: 'All documents provided' },
                  { icon: Award, text: '100% satisfaction guarantee' },
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
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
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
                    { label: 'Business Name', value: 'Your Business LLC', status: 'complete' },
                    { label: 'State Filing', value: 'Delaware', status: 'complete' },
                    { label: 'EIN Number', value: 'XX-XXXXXXX', status: 'complete' },
                    { label: 'Documents', value: '5 files ready', status: 'complete' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform transition-all hover:scale-105"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-blue-100">
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
              Everything You Need to Launch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Complete LLC formation package with no hidden fees or surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'Articles of Organization',
                description: 'We prepare and file your Articles of Organization with your chosen state.',
              },
              {
                icon: Shield,
                title: 'Registered Agent Service',
                description: 'Free registered agent service for the first year (valued at $125).',
              },
              {
                icon: Award,
                title: 'EIN Application',
                description: 'We obtain your federal Employer Identification Number (Tax ID).',
              },
              {
                icon: FileText,
                title: 'Operating Agreement',
                description: 'Customized operating agreement template for your LLC.',
              },
              {
                icon: CheckCircle,
                title: 'Certificate of Formation',
                description: 'Official certificate from the state proving your LLC exists.',
              },
              {
                icon: Building2,
                title: 'Business Name Check',
                description: 'We verify your business name is available in your chosen state.',
              },
              {
                icon: Users,
                title: 'Member Information',
                description: 'Proper documentation of all LLC members and ownership percentages.',
              },
              {
                icon: TrendingUp,
                title: 'Compliance Checklist',
                description: 'Complete checklist of ongoing requirements to stay compliant.',
              },
              {
                icon: Phone,
                title: 'Ongoing Support',
                description: 'Dedicated support team available via email, phone, and chat.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 p-8 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
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
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              From order to official LLC in just 7-14 business days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Package',
                description: 'Select your package and provide your business information through our simple form.',
                icon: Building2,
              },
              {
                step: '02',
                title: 'We File Your LLC',
                description: 'Our team prepares and files all required documents with your chosen state.',
                icon: FileText,
              },
              {
                step: '03',
                title: 'Get Your EIN',
                description: 'We apply for and obtain your federal Tax ID number from the IRS.',
                icon: Award,
              },
              {
                step: '04',
                title: 'Receive Documents',
                description: 'Get your Certificate of Formation, EIN, and all other documents digitally.',
                icon: CheckCircle,
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="relative">
                  <div className="text-7xl font-bold text-blue-100 dark:text-blue-900/30 mb-4">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-blue-200 dark:bg-blue-900/30">
                      <ArrowRight className="absolute -top-2.5 -right-2 w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* State Selection */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Choose the Best State for Your Business
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Not sure which state to form your LLC in? We help you choose based on your business needs, location, and goals.
              </p>

              <div className="space-y-6">
                {[
                  {
                    state: 'Delaware',
                    pros: 'Business-friendly laws, privacy protection, no sales tax',
                    popular: 'Most popular for scalable businesses',
                  },
                  {
                    state: 'Wyoming',
                    pros: 'Low fees, strong privacy, no state income tax',
                    popular: 'Great for asset protection',
                  },
                  {
                    state: 'Your Home State',
                    pros: 'Simplest option, local presence, easier compliance',
                    popular: 'Best for location-based businesses',
                  },
                ].map((option, i) => (
                  <div
                    key={i}
                    className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {option.state}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                        {option.popular}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {option.pros}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-gray-200 dark:border-gray-800 p-12 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-32 h-32 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    We File in All 50 States
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose any state – we handle the filing process wherever you want to register.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              LLC Formation Included in All Packages
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our Starter package starts at just $997 and includes complete LLC formation plus website, business phone, and more.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
              >
                <Link href="/#pricing">
                  View All Packages
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
                question: 'How long does LLC formation take?',
                answer: 'Most states process LLC formations within 7-14 business days. Some states offer expedited processing (2-3 days) for an additional fee.',
              },
              {
                question: 'Do I need to be a US citizen to form an LLC?',
                answer: 'No! You do not need to be a US citizen or permanent resident to form an LLC. We specifically help African immigrants start their US businesses.',
              },
              {
                question: 'What is a Registered Agent and why do I need one?',
                answer: 'A Registered Agent is a person or company that receives legal documents on behalf of your LLC. Every state requires one, and we provide this service free for your first year.',
              },
              {
                question: 'Can I change my business name later?',
                answer: 'Yes, but it requires filing an amendment with the state and updating your EIN. We recommend choosing carefully upfront to avoid the hassle and fees.',
              },
              {
                question: 'What\'s the difference between an LLC and a Corporation?',
                answer: 'An LLC offers liability protection with simpler management and tax treatment. Corporations are better for raising venture capital but have more complex requirements.',
              },
              {
                question: 'Do I need an attorney to form an LLC?',
                answer: 'No, you don\'t need an attorney. Our service handles all the legal paperwork and filing requirements for you.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
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
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Make It Official?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 1,500+ entrepreneurs who started their US business with Gbaki.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
          >
            <Link href="/register">
              Form Your LLC Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

