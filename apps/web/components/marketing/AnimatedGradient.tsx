'use client'

import { motion } from 'framer-motion'

export function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated blobs */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-96 h-96 bg-gradient-to-r from-green-400/30 to-emerald-400/30 dark:from-green-600/20 dark:to-emerald-600/20 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-96 h-96 bg-gradient-to-r from-green-400/20 to-emerald-400/20 dark:from-green-600/10 dark:to-emerald-600/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-full h-full"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-72 h-72 bg-gradient-to-r from-green-400/20 to-emerald-400/20 dark:from-green-600/10 dark:to-emerald-600/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
    </div>
  )
}

