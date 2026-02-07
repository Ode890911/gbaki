'use client'

import * as React from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { RealtimeNotifications } from '@/components/dashboard/RealtimeNotifications'
import { WebSocketProvider } from '@/providers/websocket-provider'
import { ErrorBoundary } from '@/components/error-boundary'
import { Toaster } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <ErrorBoundary>
      <WebSocketProvider>
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar
              isCollapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                />

                {/* Sidebar */}
                <motion.div
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
                >
                  <Sidebar
                    isCollapsed={false}
                    onToggle={() => setMobileMenuOpen(false)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar onMenuClick={() => setMobileMenuOpen(true)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="max-w-[1600px] mx-auto">
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </div>
            </main>
          </div>

          {/* Real-time Notifications */}
          <RealtimeNotifications />
          
          {/* Toast Notifications */}
          <Toaster position="top-right" richColors />
        </div>
      </WebSocketProvider>
    </ErrorBoundary>
  )
}
