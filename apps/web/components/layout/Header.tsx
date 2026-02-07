'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { useAuth } from '@/providers/auth-provider'

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/services', label: 'Services' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/resources', label: 'Resources' },
]

export function Header() {
  const { isAuthenticated, logout } = useAuth()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { scrollY: scrollYProgress } = useScroll()

  // Transform values for scroll animations
  const headerBlur = useTransform(scrollYProgress, [0, 50], [0, 10])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm'
          : 'bg-transparent'
      )}
      style={{
        backdropFilter: isScrolled ? `blur(${headerBlur}px)` : 'none',
      } as React.CSSProperties}
      suppressHydrationWarning
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/30 group-hover:shadow-xl group-hover:shadow-green-600/40 transition-all duration-300 group-hover:scale-105">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Gbaki Digital
              </span>
              <span className="block text-xs text-gray-600 dark:text-gray-400 -mt-1">
                Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href.startsWith('/#') && pathname === '/')
              const isAboutPage = pathname === '/about' && link.href === '/about'
              const isSuccessStoriesPage = pathname === '/success-stories' && link.href === '/success-stories'
              const shouldBeWhite = isAboutPage || isSuccessStoriesPage

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={!link.href.startsWith('/#')}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    shouldBeWhite
                      ? 'text-white'
                      : isActive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {link.label}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                        shouldBeWhite
                          ? "bg-white"
                          : "bg-green-600 dark:bg-green-400"
                      )}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle - Desktop */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* Auth Buttons - Desktop */}
            {isAuthenticated ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden lg:inline-flex"
                >
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </Button>
                <Button
                  onClick={logout}
                  className="hidden lg:inline-flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden lg:inline-flex"
                >
                  <Link href="/login">
                    Sign In
                  </Link>
                </Button>

                <Button
                  asChild
                  className="hidden lg:inline-flex bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300"
                >
                  <Link href="/register">
                    Get Started
                  </Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Progress bar on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 origin-left"
        style={{
          scaleX: useTransform(scrollYProgress, [0, 1000], [0, 1]),
        }}
      />
    </motion.header>
  )
}

