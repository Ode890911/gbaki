import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Award,
  Quote,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AvatarImage } from '@/components/marketing/AvatarImage'

export const metadata: Metadata = {
  title: 'Success Stories - Real Entrepreneurs, Real Results',
  description: 'Discover how African immigrant entrepreneurs are building thriving US businesses with Gbaki Digital Solutions.',
}

export default function SuccessStoriesPage() {
  const stories = [
    {
      name: 'Chinedu Okafor',
      business: 'ChefChi Catering Services',
      origin: 'Lagos, Nigeria',
      industry: 'Food & Catering',
      package: 'Growth Package',
      launchDate: 'March 2024',
      revenue: '$45K in 6 months',
      employees: 3,
      image: 'CO',
      quote: "Gbaki made everything so easy. I went from idea to serving my first customer in just 3 weeks. The website they built gets me new clients every week.",
      story: "After years as a private chef, Chinedu wanted to start his own catering company but was overwhelmed by the process. With Gbaki's help, he launched ChefChi Catering, now serving corporate events and weddings across Maryland.",
      achievements: [
        'Launched in 21 days',
        'Served 50+ events in first 6 months',
        'Featured in local food magazine',
        'Hired 3 employees',
      ],
      color: 'orange',
    },
    {
      name: 'Amara Nwosu',
      business: 'AfroGlow Beauty',
      origin: 'Accra, Ghana',
      industry: 'Beauty & Cosmetics',
      package: 'Premium Package',
      launchDate: 'January 2024',
      revenue: '$120K in 8 months',
      employees: 7,
      image: 'AN',
      quote: "I couldn't believe how professional everything looked. The e-commerce site, the branding, the payment system – it all just worked perfectly from day one.",
      story: "Amara had a passion for creating natural hair and skincare products for African women but no tech experience. Gbaki built her entire online store, and she now ships products nationwide.",
      achievements: [
        '5,000+ products sold online',
        'Featured on beauty blogs',
        'Expanded to 3 states',
        'Built loyal customer base',
      ],
      color: 'pink',
    },
    {
      name: 'Kwame Mensah',
      business: 'AfriTech Solutions',
      origin: 'Nairobi, Kenya',
      industry: 'IT Consulting',
      package: 'Growth Package',
      launchDate: 'November 2023',
      revenue: '$200K in 10 months',
      employees: 5,
      image: 'KM',
      quote: "The registered agent service and ongoing support have been invaluable. I focus on serving clients while Gbaki handles all the administrative complexity.",
      story: "Kwame wanted to help small businesses with their IT needs but struggled with business formation. Now his consulting firm serves 30+ clients and is growing rapidly.",
      achievements: [
        '30+ corporate clients',
        'Recurring revenue model',
        'Team of 5 consultants',
        'Expanded to 2 cities',
      ],
      color: 'blue',
    },
    {
      name: 'Fatima Ibrahim',
      business: 'FashionForward Boutique',
      origin: 'Kano, Nigeria',
      industry: 'Fashion Retail',
      package: 'Premium Package',
      launchDate: 'February 2024',
      revenue: '$85K in 7 months',
      employees: 4,
      image: 'FI',
      quote: "From Lagos to Maryland, my dream became reality. The AI chatbot on my website answers customer questions 24/7 – it's like having an extra employee!",
      story: "Fatima combined traditional African fashion with modern American style. Her online boutique now serves customers across the East Coast.",
      achievements: [
        '2,000+ items sold',
        'Pop-up shop opened',
        'Featured in fashion week',
        'Growing Instagram following',
      ],
      color: 'purple',
    },
    {
      name: 'Emmanuel Adeyemi',
      business: 'HomeFix Handyman Services',
      origin: 'Cape Town, South Africa',
      industry: 'Home Services',
      package: 'Starter Package',
      launchDate: 'April 2024',
      revenue: '$35K in 5 months',
      employees: 2,
      image: 'EA',
      quote: "I started with the Starter Package and it was perfect for my budget. The business phone system makes me look professional when customers call.",
      story: "Emmanuel brought his handyman skills to the US market. His simple website and professional setup helped him build a solid client base quickly.",
      achievements: [
        '100+ jobs completed',
        '50+ 5-star reviews',
        'Repeat customer rate: 70%',
        'Partnership with realtors',
      ],
      color: 'green',
    },
    {
      name: 'Grace Mensah',
      business: 'Wellness By Grace',
      origin: 'Kumasi, Ghana',
      industry: 'Health & Wellness',
      package: 'Growth Package',
      launchDate: 'December 2023',
      revenue: '$95K in 9 months',
      employees: 3,
      image: 'GM',
      quote: "The website booking system changed everything for my business. Clients can schedule appointments online, and I get automated reminders. It's been a game-changer.",
      story: "Grace turned her wellness coaching certification into a thriving business. Her online presence attracts clients from across the DC metro area.",
      achievements: [
        '200+ clients served',
        'Corporate wellness contracts',
        'Expanded service offerings',
        'Media appearances',
      ],
      color: 'teal',
    },
  ]

  const stats = [
    { icon: Users, value: '1,500+', label: 'Businesses Launched' },
    { icon: DollarSign, value: '$12M+', label: 'Revenue Generated' },
    { icon: Globe, value: '30+', label: 'Countries Represented' },
    { icon: Award, value: '98%', label: 'Success Rate' },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      orange: 'from-orange-600 to-rose-600',
      pink: 'from-pink-600 to-rose-600',
      blue: 'from-blue-600 to-cyan-600',
      purple: 'from-purple-600 to-pink-600',
      green: 'from-green-600 to-emerald-600',
      teal: 'from-teal-600 to-cyan-600',
    }
    return colors[color as keyof typeof colors] || colors.green
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Real Stories, Real Success
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Dreams Turned Into Thriving Businesses
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Meet the entrepreneurs who took the leap and built successful US businesses with Gbaki Digital Solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center">
                  <Icon className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              From different countries, different industries – one common thread: determination and the right support.
            </p>
          </div>

          <div className="space-y-12">
            {stories.map((story, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-green-500 dark:hover:border-green-500 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Left: Image & Quick Facts */}
                  <div className={`bg-gradient-to-br ${getColorClasses(story.color)} p-8 lg:p-12 text-white`}>
                    {/* Avatar */}
                    <div className="mb-6">
                      <AvatarImage name={story.name} initials={story.image} size={96} />
                    </div>

                    {/* Name & Business */}
                    <h3 className="text-3xl font-bold mb-2">{story.name}</h3>
                    <p className="text-xl font-semibold mb-6 opacity-90">{story.business}</p>

                    {/* Quick Facts */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 opacity-80" />
                        <span className="text-sm">{story.origin}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 opacity-80" />
                        <span className="text-sm">{story.industry}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 opacity-80" />
                        <span className="text-sm">Launched {story.launchDate}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 opacity-80" />
                        <span className="text-sm font-bold">{story.revenue}</span>
                      </div>
                    </div>

                    {/* Package Badge */}
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
                      <Award className="w-4 h-4" />
                      {story.package}
                    </div>
                  </div>

                  {/* Right: Story Content */}
                  <div className="lg:col-span-2 p-8 lg:p-12">
                    {/* Quote */}
                    <div className="mb-8">
                      <Quote className="w-10 h-10 text-green-600 dark:text-green-400 mb-4" />
                      <p className="text-xl text-gray-900 dark:text-white font-medium leading-relaxed italic">
                        &quot;{story.quote}&quot;
                      </p>
                    </div>

                    {/* Story */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        The Journey
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {story.story}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {story.achievements.map((achievement, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <Star className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team Size */}
                    {story.employees > 0 && (
                      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold">
                        <Users className="w-4 h-4" />
                        Team of {story.employees}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Entrepreneurs Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Best investment I made for my business. Everything was handled professionally.",
                name: "Oluwaseun Adebayo",
                business: "TechStart Consulting",
              },
              {
                quote: "I went from confused to confident in just 3 weeks. Highly recommend!",
                name: "Zainab Hassan",
                business: "ZeeStyles Fashion",
              },
              {
                quote: "The support team answered every question patiently. They truly care about your success.",
                name: "Kofi Mensah",
                business: "AfroBeats Events",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.business}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join these successful entrepreneurs and turn your business dream into reality.
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
                Talk to Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

