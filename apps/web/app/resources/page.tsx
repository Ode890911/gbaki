import { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  FileText,
  Video,
  Download,
  ExternalLink,
  Sparkles,
  Calculator,
  MessageSquare,
  Users,
  Globe,
  Shield,
  Clock,
  DollarSign,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Resources - Business Guides, Templates & Tools',
  description: 'Free business resources, guides, templates, and tools to help you launch and grow your US business.',
  keywords: 'business resources, business guides, business templates, entrepreneur tools',
}

export default function ResourcesPage() {
  const resourceCategories = [
    {
      id: 'guides',
      icon: BookOpen,
      title: 'Business Guides',
      description: 'Step-by-step guides to help you navigate business formation and growth',
      color: 'blue',
      resources: [
        {
          title: 'Complete Guide to LLC Formation',
          description: 'Everything you need to know about forming an LLC in the United States',
          type: 'PDF Guide',
          duration: '15 min read',
        },
        {
          title: 'Choosing the Right State for Your LLC',
          description: 'Compare Delaware, Wyoming, and your home state for business formation',
          type: 'Guide',
          duration: '10 min read',
        },
        {
          title: 'Business Banking for Immigrants',
          description: 'How to open a US business bank account as an immigrant entrepreneur',
          type: 'Guide',
          duration: '8 min read',
        },
        {
          title: 'Understanding EIN and Tax Requirements',
          description: 'Navigate US tax requirements and get your Employer Identification Number',
          type: 'Guide',
          duration: '12 min read',
        },
      ],
    },
    {
      id: 'templates',
      icon: FileText,
      title: 'Business Templates',
      description: 'Professional templates to save you time and money',
      color: 'purple',
      resources: [
        {
          title: 'Business Plan Template',
          description: 'Comprehensive business plan template with financial projections',
          type: 'Word Document',
          duration: 'Instant download',
        },
        {
          title: 'Invoice Template',
          description: 'Professional invoice template for your business',
          type: 'Excel/PDF',
          duration: 'Instant download',
        },
        {
          title: 'Contract Templates Pack',
          description: 'Service agreements, NDAs, and client contracts',
          type: '5 Templates',
          duration: 'Instant download',
        },
        {
          title: 'Marketing Plan Template',
          description: 'Plan your marketing strategy and track results',
          type: 'Excel/Sheets',
          duration: 'Instant download',
        },
      ],
    },
    {
      id: 'tools',
      icon: Calculator,
      title: 'Business Tools',
      description: 'Interactive tools and calculators to help you plan',
      color: 'green',
      resources: [
        {
          title: 'Startup Cost Calculator',
          description: 'Calculate how much money you need to start your business',
          type: 'Interactive Tool',
          duration: '5 min',
        },
        {
          title: 'Pricing Calculator',
          description: 'Determine the right pricing for your products or services',
          type: 'Calculator',
          duration: '5 min',
        },
        {
          title: 'Break-Even Analysis Tool',
          description: 'Find out when your business will become profitable',
          type: 'Calculator',
          duration: '5 min',
        },
        {
          title: 'Business Name Generator',
          description: 'Get creative business name ideas and check domain availability',
          type: 'Tool',
          duration: '3 min',
        },
      ],
    },
    {
      id: 'videos',
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch and learn from our video series',
      color: 'red',
      resources: [
        {
          title: 'LLC Formation 101',
          description: 'Complete walkthrough of the LLC formation process',
          type: 'Video',
          duration: '18 min',
        },
        {
          title: 'Setting Up Your Website',
          description: 'How to update and manage your business website',
          type: 'Video Series',
          duration: '45 min',
        },
        {
          title: 'Understanding US Business Taxes',
          description: 'Tax basics every immigrant entrepreneur should know',
          type: 'Video',
          duration: '25 min',
        },
        {
          title: 'Marketing Your New Business',
          description: 'Digital marketing strategies that actually work',
          type: 'Video',
          duration: '32 min',
        },
      ],
    },
  ]

  const featuredResources = [
    {
      icon: Target,
      title: 'Business Launch Checklist',
      description: 'Complete 50-point checklist to launch your business the right way',
      color: 'blue',
      cta: 'Download Free',
    },
    {
      icon: DollarSign,
      title: 'First-Year Budget Template',
      description: 'Plan your expenses and revenue for your first year in business',
      color: 'green',
      cta: 'Get Template',
    },
    {
      icon: Users,
      title: 'Immigrant Entrepreneur Community',
      description: 'Join our private community of 1,500+ African immigrant entrepreneurs',
      color: 'purple',
      cta: 'Join Community',
    },
  ]

  const externalResources = [
    {
      title: 'US Small Business Administration',
      description: 'Official government resources for small businesses',
      url: 'https://www.sba.gov',
      icon: Shield,
    },
    {
      title: 'IRS Business Tax Information',
      description: 'Tax requirements and filing information',
      url: 'https://www.irs.gov/businesses',
      icon: FileText,
    },
    {
      title: 'SCORE Business Mentoring',
      description: 'Free business mentoring from experienced entrepreneurs',
      url: 'https://www.score.org',
      icon: Users,
    },
    {
      title: 'USA.gov Business Resources',
      description: 'Government services and information for businesses',
      url: 'https://www.usa.gov/business',
      icon: Globe,
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        gradient: 'from-blue-600 to-cyan-600',
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        gradient: 'from-purple-600 to-pink-600',
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        gradient: 'from-green-600 to-emerald-600',
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        gradient: 'from-red-600 to-rose-600',
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Free Resources
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Tools to Help You Succeed
            </h1>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Free guides, templates, calculators, and resources to help you launch and grow your US business with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Most Popular Resources
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start with these essential tools every entrepreneur needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResources.map((resource, i) => {
              const Icon = resource.icon
              const colors = getColorClasses(resource.color)

              return (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${colors.gradient} rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-105 transition-transform`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {resource.title}
                    </h3>
                    <p className="text-white/90 mb-6">
                      {resource.description}
                    </p>
                    <Button
                      asChild
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl"
                    >
                      <Link href="/contact">
                        {resource.cta}
                        <Download className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {resourceCategories.map((category) => {
              const Icon = category.icon
              const colors = getColorClasses(category.color)

              return (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Resources Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.resources.map((resource, i) => (
                      <div
                        key={i}
                        className={`group bg-white dark:bg-gray-900 rounded-2xl border-2 ${colors.border} hover:border-opacity-100 p-6 transition-all`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {resource.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                              {resource.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} font-semibold`}>
                                {resource.type}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {resource.duration}
                              </span>
                            </div>
                          </div>
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className={`${colors.text} hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl`}
                          >
                            <Link href="/contact">
                              <Download className="w-5 h-5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Helpful External Resources
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Trusted government and nonprofit resources to support your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalResources.map((resource, i) => {
              const Icon = resource.icon
              return (
                <Link
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 p-6 transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      {resource.title}
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {resource.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Need More Help?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Our team is here to answer your questions and guide you through every step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
            >
              <Link href="/contact">
                Contact Our Team
                <MessageSquare className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-semibold bg-transparent"
            >
              <Link href="/register" className="text-white">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

