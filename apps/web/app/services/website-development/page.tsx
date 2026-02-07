import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Globe,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Zap,
  Search,
  ShoppingCart,
  MessageSquare,
  BarChart,
  Lock,
  Palette,
  Code,
  Sparkles,
  TrendingUp,
  Users,
  Star,
  Layout,
  Image as ImageIcon,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Professional Website Development - Custom Business Websites',
  description: 'Get a stunning, mobile-responsive website that converts visitors into customers. Professional design, SEO optimization, and fast hosting included.',
  keywords: 'website development, business website, web design, professional website, custom website',
}

export default function WebsiteDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
                <Globe className="w-4 h-4" />
                Website Development Service
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Business, Beautifully Online
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Professional, mobile-responsive website designed to convert visitors into customers. Built with modern technology, optimized for search engines, and ready to grow with your business.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Smartphone, text: 'Mobile-responsive design' },
                  { icon: Search, text: 'SEO optimized' },
                  { icon: Zap, text: 'Lightning-fast loading' },
                  { icon: Lock, text: 'SSL security included' },
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
                  className="bg-white text-purple-600 hover:bg-purple-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
                >
                  <Link href="/register">
                    Get Your Website
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
              <div className="aspect-[4/3] rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-8 overflow-hidden">
                {/* Website Preview Mockup */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full">
                  {/* Browser Bar */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                      yourbusiness.com
                    </div>
                  </div>
                  {/* Content Preview */}
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg" />
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg" />
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything Your Business Needs Online
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A complete website solution designed to attract customers and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Layout,
                title: '5 Professional Pages',
                description: 'Home, About, Services, Contact, and one custom page tailored to your business.',
              },
              {
                icon: Smartphone,
                title: 'Mobile-Responsive Design',
                description: 'Looks perfect on all devices - phones, tablets, and desktops.',
              },
              {
                icon: Search,
                title: 'SEO Optimization',
                description: 'Built to rank on Google with proper meta tags, headers, and structure.',
              },
              {
                icon: Zap,
                title: 'Lightning-Fast Speed',
                description: 'Optimized performance with CDN, image compression, and modern code.',
              },
              {
                icon: Lock,
                title: 'SSL Certificate Included',
                description: 'Secure HTTPS encryption for customer trust and Google rankings.',
              },
              {
                icon: ImageIcon,
                title: 'Professional Images',
                description: 'Stock photos and graphics to make your site look polished.',
              },
              {
                icon: MessageSquare,
                title: 'Contact Form',
                description: 'Capture leads with integrated contact form that emails you directly.',
              },
              {
                icon: BarChart,
                title: 'Google Analytics',
                description: 'Track visitors, traffic sources, and popular pages.',
              },
              {
                icon: Palette,
                title: 'Custom Branding',
                description: 'Your colors, your logo, your brand personality throughout.',
              },
              {
                icon: Users,
                title: 'Social Media Links',
                description: 'Connect all your social profiles with beautiful icon links.',
              },
              {
                icon: Globe,
                title: '1 Year Hosting Included',
                description: 'Fast, reliable hosting with 99.9% uptime guarantee.',
              },
              {
                icon: Code,
                title: 'Easy Content Updates',
                description: 'We provide training on how to update text and images yourself.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 p-8 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
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

      {/* Website Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Websites Built for Your Industry
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We understand different businesses need different features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                type: 'Service Business',
                examples: 'Consulting, Catering, Handyman',
                features: ['Service showcase', 'Booking system', 'Testimonials', 'Before/after gallery'],
                color: 'blue',
              },
              {
                type: 'E-Commerce Store',
                examples: 'Fashion, Beauty, Crafts',
                features: ['Product catalog', 'Shopping cart', 'Payment integration', 'Inventory management'],
                color: 'green',
                badge: 'Growth & Premium',
              },
              {
                type: 'Professional Services',
                examples: 'Law, Accounting, Coaching',
                features: ['Credentials display', 'Case studies', 'Blog/articles', 'Client portal'],
                color: 'purple',
              },
              {
                type: 'Restaurant/Food',
                examples: 'Restaurants, Catering, Food Trucks',
                features: ['Menu display', 'Online ordering', 'Location map', 'Photo gallery'],
                color: 'orange',
                badge: 'Growth & Premium',
              },
              {
                type: 'Creative Portfolio',
                examples: 'Photography, Design, Art',
                features: ['Portfolio gallery', 'Project showcase', 'Client testimonials', 'Booking system'],
                color: 'pink',
              },
              {
                type: 'Health & Wellness',
                examples: 'Gym, Yoga, Therapy',
                features: ['Class schedule', 'Membership info', 'Appointment booking', 'Staff bios'],
                color: 'teal',
              },
            ].map((category, i) => {
              const colorClasses = {
                blue: 'from-blue-600 to-cyan-600',
                green: 'from-green-600 to-emerald-600',
                purple: 'from-purple-600 to-pink-600',
                orange: 'from-orange-600 to-rose-600',
                pink: 'from-pink-600 to-rose-600',
                teal: 'from-teal-600 to-cyan-600',
              }[category.color]

              return (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 overflow-hidden transition-all group"
                >
                  <div className={`bg-gradient-to-br ${colorClasses} p-6 text-white relative`}>
                    {category.badge && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold">
                        {category.badge}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{category.type}</h3>
                    <p className="text-sm opacity-90">{category.examples}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Includes:
                    </p>
                    <ul className="space-y-2">
                      {category.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              From Concept to Launch in 10-14 Days
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery Call',
                description: 'We learn about your business, goals, and design preferences.',
              },
              {
                step: '02',
                title: 'Design Mockup',
                description: 'Get a visual preview of your homepage design for approval.',
              },
              {
                step: '03',
                title: 'Development',
                description: 'We build your website with modern, clean code.',
              },
              {
                step: '04',
                title: 'Review & Revise',
                description: 'You review the site and request any changes needed.',
              },
              {
                step: '05',
                title: 'Launch',
                description: 'Your website goes live with hosting, SSL, and analytics.',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-purple-100 dark:text-purple-900/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-purple-200 dark:bg-purple-900/30">
                    <ArrowRight className="absolute -top-2.5 -right-2 w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Add-Ons Available
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Enhance your website with these premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: ShoppingCart,
                title: 'E-Commerce Integration',
                description: 'Full online store with product catalog, shopping cart, and secure checkout.',
                price: 'Included in Growth & Premium',
                popular: true,
              },
              {
                icon: MessageSquare,
                title: 'AI Chatbot',
                description: '24/7 automated customer support that answers common questions.',
                price: 'Included in Premium',
                popular: true,
              },
              {
                icon: BarChart,
                title: 'Advanced Analytics',
                description: 'Detailed visitor tracking, heatmaps, and conversion optimization.',
                price: '+$197/year',
              },
              {
                icon: Users,
                title: 'Membership Area',
                description: 'Password-protected content for members or clients.',
                price: '+$497 setup',
              },
            ].map((addon, i) => {
              const Icon = addon.icon
              return (
                <div
                  key={i}
                  className={`bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 ${
                    addon.popular 
                      ? 'border-purple-500 dark:border-purple-500' 
                      : 'border-gray-200 dark:border-gray-800'
                  } p-8 transition-all relative`}
                >
                  {addon.popular && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-semibold">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
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
                question: 'Can I update the website myself after launch?',
                answer: 'Yes! We provide training on how to update text, images, and basic content. For major changes, we offer affordable maintenance packages.',
              },
              {
                question: 'Do I own the website?',
                answer: 'Absolutely. Once your package is paid in full, you own 100% of the website, design, and code. We can even transfer it to your own hosting if desired.',
              },
              {
                question: 'What if I need more than 5 pages?',
                answer: 'No problem! Additional pages are $197 each. Most businesses find 5 pages sufficient to start.',
              },
              {
                question: 'Is the hosting renewal expensive?',
                answer: 'Hosting renewal is just $197/year after your first year. This includes SSL, CDN, and 99.9% uptime.',
              },
              {
                question: 'Can you help with content writing?',
                answer: 'Yes! We include basic content creation. For professional copywriting, we offer an upgrade for $497.',
              },
              {
                question: 'What happens if I need support after launch?',
                answer: 'All clients get 30 days of free support after launch. After that, we offer affordable maintenance packages starting at $97/month.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
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
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Your Online Presence Starts Here
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get a professional website that works as hard as you do.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
          >
            <Link href="/register">
              Get Your Website Built
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
