'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/services', label: 'Services' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/about', label: 'About Us' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden w-9 h-9"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        
        <nav className="flex flex-col gap-4 mt-8">
          {navLinks.map((link) => {
            const isAboutPage = pathname === '/about' && link.href === '/about'
            const isSuccessStoriesPage = pathname === '/success-stories' && link.href === '/success-stories'
            const shouldBeWhite = isAboutPage || isSuccessStoriesPage
            
            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  scroll={!link.href.startsWith('/#')}
                  className={cn(
                    "text-lg font-medium transition-colors py-2",
                    shouldBeWhite
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </SheetClose>
            )
          })}
          
          <div className="border-t border-gray-200 dark:border-gray-800 my-4" />
          
          <SheetClose asChild>
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-lg font-medium"
              >
                Sign In
              </Button>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Get Started
              </Button>
            </Link>
          </SheetClose>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

