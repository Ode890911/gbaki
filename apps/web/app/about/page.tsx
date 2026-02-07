import { Metadata } from 'next'
import Link from 'next/link'
import {
  Target,
  Heart,
  Users,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us - Empowering African Immigrant Entrepreneurs',
  description: 'Learn about Gbaki Digital Solutions mission to help African immigrants launch successful US businesses.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Empowering Dreams,
              <br />
              Building Businesses
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              We&apos;re on a mission to help 10,000 African immigrants launch successful US businesses by 2030. Every entrepreneur deserves a clear path to the American dream.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
              >
                <Link href="/register">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/20 rounded-xl px-8 py-6 text-lg font-semibold"
              >
                <Link href="/contact" className="text-white">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Making Business Formation Simple & Accessible
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                We understand the unique challenges African immigrants face when starting a business in the United States. Language barriers, complex regulations, and unfamiliar systems can feel overwhelming.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                That&apos;s why we created Gbaki Digital Solutions – to be your trusted partner in navigating the business formation process, from LLC registration to website launch and beyond.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '1,500+', label: 'Businesses Launched' },
                  { value: '98%', label: 'Success Rate' },
                  { value: '21 Days', label: 'Avg. Launch Time' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-gray-200 dark:border-gray-800 p-12 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-32 h-32 text-green-600 dark:text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Serving 30+ African Countries
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    From Nigeria to South Africa, from Kenya to Ghana – we&apos;re here for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              Our Values
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Drives Us Every Day
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              These principles guide everything we do – from how we design our services to how we support each entrepreneur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                color: 'blue',
                title: 'Community First',
                description: 'We believe in the power of community. Every success story inspires the next entrepreneur to take the leap.',
              },
              {
                icon: Zap,
                color: 'purple',
                title: 'Speed & Simplicity',
                description: 'Business formation should be fast and straightforward. We remove complexity so you can focus on building.',
              },
              {
                icon: Shield,
                color: 'green',
                title: 'Trust & Transparency',
                description: "No hidden fees, no surprises. We&apos;re upfront about our process, pricing, and timelines.",
              },
              {
                icon: TrendingUp,
                color: 'orange',
                title: 'Long-term Success',
                description: "We&apos;re not just here for launch day. We&apos;re your partner for the entire journey ahead.",
              },
              {
                icon: Heart,
                color: 'red',
                title: 'Cultural Understanding',
                description: "We understand the immigrant experience because we&apos;ve lived it. Your culture is our strength.",
              },
              {
                icon: Sparkles,
                color: 'yellow',
                title: 'Excellence Always',
                description: 'We hold ourselves to the highest standards. Your business deserves nothing less than exceptional.',
              },
            ].map((value, i) => {
              const Icon = value.icon
              const colorClasses = {
                blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
                red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
                yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
              }[value.color]

              return (
                <div
                  key={i}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 p-8 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl ${colorClasses} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How It All Started
            </h2>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
            <p className="text-lg leading-relaxed">
              Gbaki Digital Solutions was born from a simple observation: thousands of talented African immigrants arrive in the United States with incredible business ideas, but face massive barriers to making them a reality.
            </p>
            <p className="text-lg leading-relaxed">
              Our founder, an immigrant entrepreneur himself, experienced firsthand the frustration of navigating complex business registration processes, understanding tax requirements, and building an online presence – all while adapting to a new country.
            </p>
            <p className="text-lg leading-relaxed">
              After successfully launching his own business, he realized: <strong className="text-gray-900 dark:text-white">&quot;This shouldn&apos;t be this hard.&quot;</strong>
            </p>
            <p className="text-lg leading-relaxed">
              So in 2023, we set out to create the service we wish had existed – a complete, all-in-one platform that handles everything from LLC formation to website development, with support specifically designed for the African immigrant community.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we&apos;re proud to have helped over 1,500 entrepreneurs turn their dreams into thriving businesses. And we&apos;re just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Our Team
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet the People Behind Gbaki
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A diverse team united by one mission: your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Ode Marie Louise Kouamé',
                role: 'Founder & CEO',
                origin: 'Abidjan, Côte d\'Ivoire',
                description: 'Visionary leader dedicated to empowering African entrepreneurs through innovative digital solutions and comprehensive business support.',
              },
              {
                name: 'Moustapha Adebigni',
                role: 'CTO',
                origin: 'Abidjan, Côte d\'Ivoire',
                description: 'Tech innovator and full-stack architect building scalable platforms that transform complex business processes into seamless digital experiences. Passionate about leveraging cutting-edge technology to solve real-world challenges for African entrepreneurs.',
              },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-green-500 dark:hover:border-green-500 transition-all group"
              >
                <div className="aspect-square bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white text-6xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    📍 {member.origin}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Join 1,500+ Entrepreneurs
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              You don&apos;t have to figure it out alone. Let us handle the complexity while you focus on building your dream business.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl"
              >
                <Link href="/register">
                  Start Your Business Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/20 rounded-xl px-8 py-6 text-lg font-semibold"
              >
                <Link href="/contact" className="text-white">
                  Schedule a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

