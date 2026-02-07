'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Sparkles, Users } from 'lucide-react'
import { TestimonialCard } from './TestimonialCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const testimonials = [
  {
    name: 'Adeyemi Johnson',
    role: 'Founder & CEO',
    company: 'Lagos Kitchen',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    rating: 5,
    quote: "Gbaki Digital made my dream a reality. In just 18 days, I went from paperwork confusion to running a fully operational Nigerian restaurant in Houston. The AI chatbot handles reservations while I focus on cooking!",
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adeyemi-Johnson&backgroundColor=22c55e',
    businessType: 'Restaurant',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    name: 'Amara Okafor',
    role: 'Owner',
    company: 'Radiant Beauty Lounge',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    rating: 5,
    quote: "As a single mother, I needed support every step of the way. The team didn't just build my website—they believed in my vision. My salon is now fully booked, and I'm hiring my second stylist!",
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Amara-Okafor&backgroundColor=9333ea',
    businessType: 'Beauty & Wellness',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    name: 'Yohannes Tadesse',
    role: 'Managing Director',
    company: 'EthioCoffee Imports',
    country: 'Ethiopia',
    countryFlag: '🇪🇹',
    rating: 5,
    quote: "I wanted to bring authentic Ethiopian coffee to America. Gbaki handled everything—LLC, import licenses, e-commerce site. Now I'm shipping to 15 states! The ROI paid for itself in 2 months.",
    image: 'https://api.dicebear.com/7.x/micah/svg?seed=Yohannes-Tadesse&backgroundColor=ea580c',
    businessType: 'E-commerce',
    gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
  },
  {
    name: 'Nia Mensah',
    role: 'Principal Consultant',
    company: 'Mensah Financial Advisory',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    rating: 5,
    quote: "The AI tools are game-changing. My chatbot qualifies leads, books consultations, and answers FAQs 24/7. I've tripled my client base while working fewer hours. This is the future of immigrant entrepreneurship.",
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Nia-Mensah&backgroundColor=0ea5e9',
    businessType: 'Consulting',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    name: 'Kwame Asante',
    role: 'CEO',
    company: 'Asante Construction LLC',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    rating: 5,
    quote: "From carpenter to CEO in 30 days! The website showcases my portfolio beautifully, and the phone system makes me look like a Fortune 500 company. Contractors take me seriously now.",
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame-Asante&backgroundColor=facc15',
    businessType: 'Construction',
    gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
  },
  {
    name: 'Fatima Hassan',
    role: 'Founder',
    company: 'Nairobi Threads',
    country: 'Kenya',
    countryFlag: '🇰🇪',
    rating: 5,
    quote: "I sell African fashion online and needed a professional platform. The e-commerce integration is flawless—inventory, payments, shipping, all automated. I went from selling to friends to shipping nationwide!",
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Fatima-Hassan&backgroundColor=ec4899',
    businessType: 'Fashion & Retail',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
]

const stats = [
  { value: '4.9/5', label: 'Average Rating' },
  { value: '98%', label: 'Would Recommend' },
  { value: '127+', label: 'Success Stories' },
]

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = React.useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-green-50/30 to-white dark:from-gray-950 dark:via-green-950/10 dark:to-gray-950 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
          >
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              Success Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Real Stories,{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              Real Results
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            Join 127+ African entrepreneurs who&apos;ve transformed their dreams into
            thriving American businesses with Gbaki Digital Solutions.
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  <TestimonialCard {...testimonial} delay={0.1 * index} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-xl hover:scale-110 transition-transform z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-xl hover:scale-110 transition-transform z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === selectedIndex
                    ? 'w-8 bg-gradient-to-r from-green-600 to-emerald-600'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg mb-8">
            <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Join our community of successful entrepreneurs
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Start your journey today and become our next featured success story.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300 hover:scale-105"
            >
              Get Started Now
            </Link>
            <Link
              href="/success-stories"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300"
            >
              View All Stories
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
