'use client'

import { useAuth } from '@/providers/auth-provider'
import { useOrders } from '@/lib/hooks/useOrders'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SmartCTAProps {
  /**
   * Package type for checkout (if applicable)
   */
  packageType?: 'starter' | 'growth' | 'premium'

  /**
   * Default text for the button
   */
  children: React.ReactNode

  /**
   * Button variant/style
   */
  variant?: 'primary' | 'secondary' | 'outline'

  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Additional className
   */
  className?: string

  /**
   * Icon to show (optional)
   */
  showArrow?: boolean

  /**
   * Custom href (overrides smart routing)
   */
  href?: string

  /**
   * Custom onClick handler (overrides smart routing)
   */
  onClick?: () => void
}

/**
 * Smart CTA component that routes based on authentication state
 * 
 * Behavior:
 * - Not logged in: Routes to /register
 * - Logged in + No orders: Routes to /checkout?package={packageType}
 * - Logged in + Has orders: Routes to /dashboard
 */
export function SmartCTA({
  packageType = 'starter',
  children,
  variant = 'primary',
  size = 'md',
  className,
  showArrow = true,
  href,
  onClick,
}: SmartCTAProps) {
  const { user, isAuthenticated } = useAuth()
  const { orders } = useOrders()

  // Don't check orders if not authenticated (avoid unnecessary API call)
  const hasOrders = isAuthenticated && orders && orders.length > 0

  // If custom href or onClick provided, use that
  if (href) {
    return (
      <Button
        asChild
        variant={variant === 'outline' ? 'outline' : variant === 'secondary' ? 'ghost' : 'default'}
        size={size === 'md' ? 'default' : size}
        className={cn(
          variant === 'primary' && 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white',
          className
        )}
        onClick={onClick}
      >
        <Link href={href}>
          {children}
          {showArrow && <ArrowRight className="ml-2 w-4 h-4" />}
        </Link>
      </Button>
    )
  }

  if (onClick) {
    return (
      <Button
        variant={variant === 'outline' ? 'outline' : variant === 'secondary' ? 'ghost' : 'default'}
        size={size === 'md' ? 'default' : size}
        className={cn(
          variant === 'primary' && 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white',
          className
        )}
        onClick={onClick}
      >
        {children}
        {showArrow && <ArrowRight className="ml-2 w-4 h-4" />}
      </Button>
    )
  }

  // Smart routing logic
  let destination = '/register'

  if (isAuthenticated && user) {
    // If user has orders, go to dashboard
    if (hasOrders) {
      destination = '/dashboard'
    } else {
      // If no orders (or still loading), go to checkout with selected package
      destination = `/checkout?package=${packageType}`
    }
  } else {
    // Not logged in, go to register
    destination = `/register?plan=${packageType}`
  }

  return (
    <Button
      asChild
      variant={variant === 'outline' ? 'outline' : variant === 'secondary' ? 'ghost' : 'default'}
      size={size === 'md' ? 'default' : size}
      className={cn(
        variant === 'primary' && 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white',
        className
      )}
    >
      <Link href={destination}>
        {children}
        {showArrow && <ArrowRight className="ml-2 w-4 h-4" />}
      </Link>
    </Button>
  )
}

