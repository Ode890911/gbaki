'use client'

import * as React from 'react'
import Link from 'next/link'
import { Search, Menu, Sun, Moon, Sparkles } from 'lucide-react'
import { useTheme } from 'next-themes'
import NotificationDropdown from '@/components/dashboard/NotificationDropdown'

interface TopBarProps {
  onMenuClick?: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-6">

        {/* Left: Mobile menu + Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            title="Toggle Menu"
            aria-label="Toggle Menu"
            className="lg:hidden w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, documents..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-md">
              ⌘K
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Theme"
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Quick Action Button */}
          <Link
            href="/pricing"
            className="hidden sm:flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-green-600/30 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            View Plans
          </Link>
        </div>
      </div>
    </header>
  )
}
