'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  FileText,
  HelpCircle,
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  Crown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Orders', href: '/dashboard/orders', icon: Package },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Support', href: '/dashboard/support', icon: HelpCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-screen"
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/30 group-hover:shadow-xl group-hover:shadow-green-600/40 transition-all duration-300 group-hover:scale-105">
            <Building2 className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-bold text-gray-900 dark:text-white"
            >
              Gbaki Digital
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
                isActive
                  ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 to-emerald-600 rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <Icon
                className={cn(
                  'w-5 h-5 transition-transform group-hover:scale-110',
                  isActive ? 'text-green-600 dark:text-green-400' : ''
                )}
              />

              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.name}
                </motion.span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade Prompt - Contextual based on package */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="m-4 p-4 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="relative z-10">
            <Crown className="w-8 h-8 mb-3" />
            <h3 className="font-bold mb-1">Upgrade Your Plan</h3>
            <p className="text-sm text-green-50 mb-3">
              Unlock more features and priority support
            </p>
            <Link
              href="/pricing"
              className="block w-full px-4 py-2 bg-white text-green-600 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors text-center"
            >
              View Plans
            </Link>
          </div>
        </motion.div>
      )}

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer group">
          {/* Avatar - Show image if available, otherwise show initials */}
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0">
            {/* TODO: Replace with actual user avatar URL from API */}
            {/* {userAvatar ? (
              <img 
                src={userAvatar} 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span>AJ</span>
            )} */}
            <span>AJ</span>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 min-w-0"
            >
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                Adeyemi Johnson
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                Lagos Kitchen LLC
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </motion.aside>
  )
}

