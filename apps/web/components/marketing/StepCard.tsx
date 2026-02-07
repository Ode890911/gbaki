'use client'

import * as React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepCardProps {
  step: number
  icon: LucideIcon
  title: string
  description: string
  details: string[]
  gradient: string
  delay?: number
  isLast?: boolean
  hoverBorder?: string
  hoverBg?: string
}

export function StepCard({
  step,
  icon: Icon,
  title,
  description,
  details,
  gradient,
  delay = 0,
  isLast = false,
  hoverBorder = 'hover:border-gray-300 dark:hover:border-gray-700',
  hoverBg = '',
}: StepCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5])
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        className="relative perspective-1000"
      >
        {/* Glow effect */}
        <motion.div
          className={cn(
            "absolute -inset-1 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500",
            gradient
          )}
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
        />

        {/* Card */}
        <div className={cn(
          "relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl",
          hoverBorder,
          hoverBg
        )}>
          
          {/* Step Number Badge */}
          <motion.div
            className={cn(
              "absolute -top-6 -left-6 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg",
              gradient
            )}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {step}
          </motion.div>

          {/* Icon */}
          <motion.div
            className={cn(
              "inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 relative overflow-hidden",
              gradient
            )}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <Icon className="w-10 h-10 text-white relative z-10" strokeWidth={2} />
          </motion.div>

          {/* Content */}
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h3>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Details List */}
          <ul className="space-y-3">
            {details.map((detail, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: delay + 0.1 * index }}
                className="flex items-start gap-3"
              >
                <div className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5",
                  gradient
                )}>
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {detail}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Decorative corner element */}
          <div className="absolute bottom-0 right-0 w-40 h-40 -mb-20 -mr-20 opacity-5 dark:opacity-10 pointer-events-none">
            <Icon className="w-full h-full text-gray-900 dark:text-white" />
          </div>
        </div>
      </motion.div>

      {/* Connector Line - Hidden on last item and mobile */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
          className="hidden lg:block absolute left-1/2 -bottom-20 w-0.5 h-20 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700 origin-top"
        >
          {/* Animated dot */}
          <motion.div
            className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full", gradient)}
            animate={{
              y: [0, 80, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </div>
  )
}

