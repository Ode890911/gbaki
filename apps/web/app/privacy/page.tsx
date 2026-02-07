import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Eye, Download, Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Gbaki Digital Solutions protects your privacy and handles your data with transparency and care.',
}

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'information-collection',
      title: 'What Information We Collect',
      icon: Eye,
      content: [
        {
          subtitle: 'Information You Provide',
          text: 'When you create an account or use our services, we collect information like your name, email address, phone number, business details, and payment information. We only ask for what we need to help you launch your business.',
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'We collect technical information like your IP address, browser type, device information, and how you interact with our platform. This helps us improve your experience and keep our services secure.',
        },
      ],
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: Shield,
      content: [
        {
          subtitle: 'To Deliver Our Services',
          text: 'We use your information to process your orders, file your LLC, set up your business services, communicate with you, and provide customer support. Everything we do is to help you succeed.',
        },
        {
          subtitle: 'To Improve Your Experience',
          text: 'We analyze usage patterns to make our platform better, develop new features you\'ll love, personalize your experience, and ensure everything runs smoothly.',
        },
        {
          subtitle: 'To Keep You Informed',
          text: 'With your permission, we\'ll send you important updates about your order, helpful tips for growing your business, and occasional marketing messages (you can opt out anytime).',
        },
      ],
    },
    {
      id: 'information-sharing',
      title: 'When We Share Your Information',
      icon: Lock,
      content: [
        {
          subtitle: 'Service Providers',
          text: 'We work with trusted partners who help us deliver our services—like payment processors (Stripe), email services (Resend), and hosting providers (Vercel, Railway). They\'re contractually required to protect your data.',
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information if required by law, to protect our rights, prevent fraud, or ensure safety. We\'ll notify you when legally permitted.',
        },
        {
          subtitle: 'Business Transfers',
          text: 'If Gbaki Digital Solutions is acquired or merged, your information may transfer to the new owners. We\'ll notify you and ensure your data remains protected.',
        },
        {
          subtitle: 'Never for Sale',
          text: 'We will never sell your personal information to third parties. Your trust is more valuable than any amount of money.',
        },
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: Shield,
      content: [
        {
          subtitle: 'Access Your Data',
          text: 'You can request a copy of all personal information we have about you at any time.',
        },
        {
          subtitle: 'Correct Your Data',
          text: 'If any information is incorrect, you can update it in your account settings or contact us.',
        },
        {
          subtitle: 'Delete Your Data',
          text: 'You have the right to request deletion of your personal information (subject to legal requirements).',
        },
        {
          subtitle: 'Export Your Data',
          text: 'Download all your data in a portable format whenever you want.',
        },
        {
          subtitle: 'Opt Out of Marketing',
          text: 'Unsubscribe from marketing emails anytime by clicking the unsubscribe link or updating your preferences.',
        },
      ],
    },
    {
      id: 'data-security',
      title: 'How We Protect Your Data',
      icon: Lock,
      content: [
        {
          subtitle: 'Industry-Standard Security',
          text: 'We use encryption (SSL/TLS) for data transmission, secure servers with regular backups, access controls and authentication, and regular security audits.',
        },
        {
          subtitle: 'Employee Training',
          text: 'Our team is trained on data privacy and security best practices. Only authorized personnel can access your information.',
        },
        {
          subtitle: 'Incident Response',
          text: 'In the unlikely event of a data breach, we\'ll notify you promptly and take immediate action to protect your information.',
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      icon: Eye,
      content: [
        {
          subtitle: 'Essential Cookies',
          text: 'Required for the website to function (authentication, security, preferences).',
        },
        {
          subtitle: 'Analytics Cookies',
          text: 'Help us understand how you use our platform so we can improve it (Google Analytics).',
        },
        {
          subtitle: 'Marketing Cookies',
          text: 'Used to show you relevant ads and measure campaign effectiveness (you can opt out).',
        },
        {
          subtitle: 'Your Control',
          text: 'Manage your cookie preferences through our cookie banner or browser settings.',
        },
      ],
    },
    {
      id: 'data-retention',
      title: 'How Long We Keep Your Data',
      icon: Download,
      content: [
        {
          subtitle: 'Active Accounts',
          text: 'We keep your information while your account is active and for as long as needed to provide services.',
        },
        {
          subtitle: 'After Account Deletion',
          text: 'Most data is deleted within 30 days of account deletion. Some information may be retained for legal compliance (tax records, transaction history) for up to 7 years.',
        },
      ],
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: MapPin,
      content: [
        {
          subtitle: 'Where We Operate',
          text: 'Gbaki Digital Solutions is based in Maryland, USA. Your data may be transferred to and processed in the United States.',
        },
        {
          subtitle: 'EU & International Users',
          text: 'We comply with applicable data protection laws including GDPR for EU residents. Your data is protected by appropriate safeguards.',
        },
      ],
    },
    {
      id: 'childrens-privacy',
      title: "Children's Privacy",
      icon: Shield,
      content: [
        {
          subtitle: 'Age Requirement',
          text: 'Our services are not intended for anyone under 18 years old. We do not knowingly collect information from children.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      icon: Mail,
      content: [
        {
          subtitle: 'Updates',
          text: 'We may update this Privacy Policy from time to time. We\'ll notify you of significant changes via email or a notice on our platform.',
        },
        {
          subtitle: 'Last Updated',
          text: 'This policy was last updated on December 29, 2024.',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider text-green-100">
              Your Privacy Matters
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-green-100 max-w-2xl">
            We&apos;re committed to protecting your privacy and being transparent about how we handle your data.
          </p>
          <p className="text-sm text-green-200 mt-6">
            Last updated: December 29, 2024
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Table of Contents
          </h2>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <span className="text-sm font-semibold text-gray-400 dark:text-gray-600 group-hover:text-green-600 dark:group-hover:text-green-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {section.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Intro */}
        <div className="max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            At Gbaki Digital Solutions, we believe in building trust through transparency. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our platform to launch your US business.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            We know privacy policies can be long and boring, so we&apos;ve written this in plain English. If you have questions, we&apos;re always here to help at{' '}
            <a href="mailto:hello@gbakidigital.com" className="text-green-600 dark:text-green-400 hover:underline font-semibold">
              hello@gbakidigital.com
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white flex-shrink-0">
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
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Questions About Your Privacy?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We&apos;re here to help. If you have any questions about this Privacy Policy or how we handle your data, please don&apos;t hesitate to reach out.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <a
                    href="mailto:privacy@gbakidigital.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    privacy@gbakidigital.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Gbaki Digital Solutions<br />
                    Elkridge, Maryland, USA
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30"
                >
                  Contact Us
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

