'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, 
  Info, 
  AlertCircle,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
}

export function RealtimeNotifications() {
  const [notifications, setNotifications] = React.useState<Notification[]>([])

  React.useEffect(() => {
    // Simulate real-time notifications for demo
    // In production, this would come from WebSocket
    const interval = setInterval(() => {
      // Only add notifications occasionally for demo
      if (Math.random() > 0.7) {
        const mockNotifications: Notification[] = [
          {
            id: Date.now().toString(),
            type: 'success',
            title: 'LLC Approved!',
            message: 'Your Delaware LLC has been approved',
            timestamp: new Date(),
          },
        ]

        setNotifications((prev) => [...mockNotifications, ...prev].slice(0, 5))
      }
    }, 30000) // Check every 30 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5" />
      case 'info':
        return <Info className="w-5 h-5" />
      case 'warning':
        return <AlertCircle className="w-5 h-5" />
      case 'error':
        return <AlertCircle className="w-5 h-5" />
    }
  }

  const getColors = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'p-4 rounded-2xl border-2 shadow-lg backdrop-blur-sm',
              getColors(notification.type)
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold mb-1">{notification.title}</h4>
                <p className="text-sm opacity-90">{notification.message}</p>
                <p className="text-xs opacity-70 mt-2">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 w-6 h-6 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

