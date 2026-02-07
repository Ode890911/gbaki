import { Metadata } from 'next'
import Link from 'next/link'
import { Scale, FileText, Users, Shield, AlertCircle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Gbaki Digital Solutions services.',
}

export default function TermsOfServicePage() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        {
          subtitle: 'Agreement to Terms',
          text: 'By creating an account or using Gbaki Digital Solutions, you agree to these Terms of Service. If you don\'t agree, please don\'t use our services.',
        },
        {
          subtitle: 'Who Can Use Our Services',
          text: 'You must be at least 18 years old and capable of forming a binding contract. Our services are designed for entrepreneurs launching US businesses.',
        },
      ],
    },
    {
      id: 'services',
      title: 'Our Services',
      icon: FileText,
      content: [
        {
          subtitle: 'What We Provide',
          text: 'Gbaki Digital Solutions helps African immigrants launch US businesses by providing LLC formation, EIN registration, website development, business phone systems, and ongoing support.',
        },
        {
          subtitle: 'Service Packages',
          text: 'We offer three packages: Starter ($997), Growth ($2,497), and Premium ($4,997). Each package includes specific services as detailed on our pricing page.',
        },
        {
          subtitle: 'Timeline',
          text: 'Most services are completed within 21 days of order placement, though actual timelines may vary based on government processing times and your responsiveness.',
        },
      ],
    },
    {
      id: 'your-responsibilities',
      title: 'Your Responsibilities',
      icon: Users,
      content: [
        {
          subtitle: 'Accurate Information',
          text: 'You must provide accurate, complete, and current information. Providing false information may result in delays or service termination.',
        },
        {
          subtitle: 'Timely Response',
          text: 'You agree to respond promptly to our requests for information or documents. Delays in responding may extend your project timeline.',
        },
        {
          subtitle: 'Account Security',
          text: 'You\'re responsible for maintaining the security of your account credentials. Notify us immediately if you suspect unauthorized access.',
        },
        {
          subtitle: 'Compliance with Laws',
          text: 'You agree to use our services in compliance with all applicable laws and regulations, including US business and immigration laws.',
        },
      ],
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: Scale,
      content: [
        {
          subtitle: 'Pricing',
          text: 'All prices are listed in US dollars and are subject to change. You\'ll be charged the price displayed at the time of purchase.',
        },
        {
          subtitle: 'Payment Processing',
          text: 'We use Stripe for secure payment processing. By providing payment information, you authorize us to charge your payment method.',
        },
        {
          subtitle: 'Refund Policy',
          text: 'We offer a 14-day money-back guarantee if we haven\'t started processing your LLC formation. After work begins, refunds are prorated based on completed services.',
        },
        {
          subtitle: 'Additional Fees',
          text: 'Government filing fees and state-specific costs are included in our pricing. Any additional services you request may incur extra charges.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: Shield,
      content: [
        {
          subtitle: 'Our Content',
          text: 'All content on our platform (text, graphics, logos, software) is owned by Gbaki Digital Solutions and protected by copyright laws.',
        },
        {
          subtitle: 'Your Content',
          text: 'You retain ownership of any content you upload (documents, images, business information). You grant us a license to use this content to provide our services.',
        },
        {
          subtitle: 'Deliverables',
          text: 'Once your project is complete and paid in full, you own all deliverables (website, logos, documents) we create for you.',
        },
      ],
    },
    {
      id: 'prohibited-uses',
      title: 'Prohibited Uses',
      icon: AlertCircle,
      content: [
        {
          subtitle: 'You May Not',
          text: 'Use our services for illegal activities, provide false information, attempt to access other users\' accounts, interfere with platform security, or resell our services without authorization.',
        },
        {
          subtitle: 'Consequences',
          text: 'Violation of these terms may result in immediate account termination without refund and potential legal action.',
        },
      ],
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers & Limitations',
      icon: AlertCircle,
      content: [
        {
          subtitle: 'Not Legal or Financial Advice',
          text: 'We provide business formation services but not legal or financial advice. Consult with licensed professionals for legal or financial matters.',
        },
        {
          subtitle: 'Service Availability',
          text: 'We strive for 99.9% uptime but cannot guarantee uninterrupted access. We\'re not liable for service interruptions or technical issues.',
        },
        {
          subtitle: 'Government Processing',
          text: 'We cannot control government processing times or guarantee approval. We\'ll do our best to ensure proper filing, but approval is ultimately up to government agencies.',
        },
        {
          subtitle: 'Limitation of Liability',
          text: 'Our liability is limited to the amount you paid for our services. We\'re not liable for indirect, incidental, or consequential damages.',
        },
      ],
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: AlertCircle,
      content: [
        {
          subtitle: 'Your Right to Cancel',
          text: 'You may cancel your account at any time. If you cancel after work has begun, you\'ll be charged for completed work.',
        },
        {
          subtitle: 'Our Right to Terminate',
          text: 'We may terminate your account if you violate these terms, provide false information, or engage in prohibited activities.',
        },
        {
          subtitle: 'Effect of Termination',
          text: 'Upon termination, your access to the platform ends. You\'ll still receive any deliverables for services paid in full.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: FileText,
      content: [
        {
          subtitle: 'Updates',
          text: 'We may update these terms from time to time. We\'ll notify you of significant changes via email or platform notice.',
        },
        {
          subtitle: 'Continued Use',
          text: 'Continuing to use our services after changes take effect means you accept the updated terms.',
        },
      ],
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      icon: Scale,
      content: [
        {
          subtitle: 'Governing Law',
          text: 'These terms are governed by the laws of Maryland, USA, without regard to conflict of law principles.',
        },
        {
          subtitle: 'Informal Resolution',
          text: 'Before filing a claim, please contact us at legal@gbakidigital.com to try to resolve the issue informally.',
        },
        {
          subtitle: 'Arbitration',
          text: 'If informal resolution fails, disputes will be resolved through binding arbitration rather than court, except for small claims court matters.',
        },
      ],
    },
    {
      id: 'general',
      title: 'General Provisions',
      icon: FileText,
      content: [
        {
          subtitle: 'Entire Agreement',
          text: 'These terms, along with our Privacy Policy, constitute the entire agreement between you and Gbaki Digital Solutions.',
        },
        {
          subtitle: 'Severability',
          text: 'If any provision is found unenforceable, the remaining provisions continue in full effect.',
        },
        {
          subtitle: 'No Waiver',
          text: 'Our failure to enforce any right or provision doesn\'t constitute a waiver of that right or provision.',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-100">
              Legal Agreement
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Clear, fair terms that protect both you and us as we work together to launch your business.
          </p>
          <p className="text-sm text-blue-200 mt-6">
            Last updated: December 29, 2024
          </p>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            TL;DR — The Quick Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">We Help You Launch</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  We&apos;ll form your LLC, get your EIN, build your website, and provide ongoing support.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">You Provide Accurate Info</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Give us correct information and respond promptly to keep your project on track.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Fair Refund Policy</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  14-day money-back guarantee before we start filing your LLC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Intro */}
        <div className="max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Welcome! These Terms of Service (&quot;Terms&quot;) govern your use of Gbaki Digital Solutions. We&apos;ve tried to make them clear and fair for everyone.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            By using our platform, you agree to these terms. If something&apos;s unclear, reach out at{' '}
            <a href="mailto:legal@gbakidigital.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              legal@gbakidigital.com
            </a>
            .
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                {section.content.map((item, index) => (
                  <div key={index} className="pl-16">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We want you to feel confident and informed. If anything in these terms is unclear, please contact our legal team.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

