import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Cookie,
  Shield,
  Settings,
  Info,
  Eye,
  BarChart,
  Target,
  CheckCircle,
  XCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy - How We Use Cookies',
  description: 'Learn about how Gbaki Digital Solutions uses cookies to improve your experience and protect your privacy.',
}

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Strictly Necessary Cookies',
      color: 'red',
      required: true,
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, authentication, and accessibility.',
      examples: [
        'Authentication tokens',
        'Security tokens',
        'Session management',
        'Load balancing',
      ],
      duration: 'Session or up to 1 year',
      canDisable: false,
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      color: 'blue',
      required: false,
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
      examples: [
        'Language preferences',
        'Theme preferences (dark/light mode)',
        'Font size preferences',
        'Cookie consent preferences',
      ],
      duration: 'Up to 1 year',
      canDisable: true,
    },
    {
      icon: BarChart,
      title: 'Analytics Cookies',
      color: 'purple',
      required: false,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: [
        'Google Analytics',
        'Page views and traffic',
        'User behavior patterns',
        'Performance metrics',
      ],
      duration: 'Up to 2 years',
      canDisable: true,
    },
    {
      icon: Target,
      title: 'Marketing Cookies',
      color: 'orange',
      required: false,
      description: 'These cookies track your browsing activity to help us display relevant advertisements and measure the effectiveness of our campaigns.',
      examples: [
        'Facebook Pixel',
        'Google Ads',
        'LinkedIn Insight Tag',
        'Retargeting pixels',
      ],
      duration: 'Up to 2 years',
      canDisable: true,
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      red: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
      },
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Cookie className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-100">
              Privacy & Transparency
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl">
            Understanding how we use cookies to improve your experience and respect your privacy.
          </p>
          <p className="text-sm text-orange-200 mt-6">
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
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Essential Cookies Only by Default</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  We only use cookies necessary for the site to function unless you consent to more.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">You&apos;re in Control</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Change your cookie preferences anytime through our cookie banner.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">GDPR Compliant</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  We respect your privacy rights under GDPR and other regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* What Are Cookies */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                What Are Cookies?
              </h2>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They help the website remember information about your visit, making it easier to use and more personalized for you.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Think of cookies like a name tag at a conference – they help the website recognize you when you return, remember your preferences, and provide a better experience.
            </p>
          </div>
        </section>

        {/* Types of Cookies We Use */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Types of Cookies We Use
          </h2>

          <div className="space-y-6">
            {cookieTypes.map((type, i) => {
              const Icon = type.icon
              const colors = getColorClasses(type.color)

              return (
                <div
                  key={i}
                  className={`border-2 ${colors.border} rounded-2xl p-6`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {type.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {type.required ? (
                        <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Required
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 text-xs font-semibold">
                          Optional
                        </span>
                      )}
                      {type.canDisable ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Can Disable
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 text-xs font-semibold flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Cannot Disable
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Examples:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {type.examples.map((example, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">Duration:</strong> {type.duration}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* How We Use Cookies */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white flex-shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                How We Use Cookies
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                To Keep You Logged In
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                When you log into your dashboard, we use cookies to remember your authentication state. This means you don&apos;t have to log in every time you visit a new page.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                To Remember Your Preferences
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We use cookies to remember your choices, like your preferred language, theme (dark or light mode), and other settings that make your experience more personalized.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                To Understand How You Use Our Site
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                With your consent, we use analytics cookies to understand which pages are most popular, how long people spend on our site, and what features are used most. This helps us improve the website for everyone.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                To Show Relevant Ads
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                With your consent, we use marketing cookies to show you relevant advertisements on other websites. We also use these to measure the effectiveness of our advertising campaigns.
              </p>
            </div>
          </div>
        </section>

        {/* Third-Party Cookies */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white flex-shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Third-Party Cookies
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Some cookies are set by third-party services that appear on our pages. We don&apos;t control these cookies, but we&apos;ve listed the main ones below:
            </p>

            <div className="space-y-3">
              {[
                {
                  name: 'Google Analytics',
                  purpose: 'Website analytics and performance tracking',
                  link: 'https://policies.google.com/privacy',
                },
                {
                  name: 'Stripe',
                  purpose: 'Payment processing and fraud prevention',
                  link: 'https://stripe.com/privacy',
                },
                {
                  name: 'Vercel',
                  purpose: 'Website hosting and performance optimization',
                  link: 'https://vercel.com/legal/privacy-policy',
                },
                {
                  name: 'Google Fonts',
                  purpose: 'Font delivery and optimization',
                  link: 'https://policies.google.com/privacy',
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-800"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                      {service.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.purpose}
                    </p>
                  </div>
                  <Link
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold ml-4"
                  >
                    Privacy Policy →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Managing Cookies */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white flex-shrink-0">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Managing Your Cookie Preferences
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                On Our Website
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You can change your cookie preferences at any time by clicking the &quot;Cookie Settings&quot; button in the bottom right corner of any page. This will reopen the cookie consent banner where you can enable or disable different types of cookies.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and the services we can provide to you.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                In Your Browser
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You can also control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span>See what cookies are stored and delete them individually</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span>Block third-party cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span>Block cookies from specific sites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span>Block all cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span>Delete all cookies when you close your browser</span>
                </li>
              </ul>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Browser-specific guides:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { name: 'Chrome', link: 'https://support.google.com/chrome/answer/95647' },
                    { name: 'Firefox', link: 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer' },
                    { name: 'Safari', link: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
                    { name: 'Edge', link: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
                  ].map((browser, i) => (
                    <Link
                      key={i}
                      href={browser.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {browser.name} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Updates to This Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We&apos;ll notify you of significant changes by posting a notice on our website or sending you an email.
          </p>
        </section>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-2xl border-2 border-orange-200 dark:border-orange-800 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Cookies?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have any questions about our use of cookies or this policy, please don&apos;t hesitate to contact us.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-orange-600/30"
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

