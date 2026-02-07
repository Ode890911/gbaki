'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-95"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Ready to Start Your Business?
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join hundreds of African entrepreneurs who launched their US business
            with Gbaki Digital Solutions
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-white text-primary-600 hover:bg-gray-100 font-semibold"
            >
              <Link href="/register">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-transparent border-2 border-white text-white hover:bg-white/20"
            >
              <Link href="#pricing" className="text-white">View Packages</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>No credit card required to start</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Expert support included</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
