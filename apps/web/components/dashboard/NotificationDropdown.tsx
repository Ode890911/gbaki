'use client'

import { useState, useEffect } from 'react'
import { notificationsApi } from '@/lib/api/notifications'
import { useRouter } from 'next/navigation'
import {
  Bell,
  CheckCheck,
  X,
  Package,
  FileText,
  MessageSquare,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function NotificationDropdown() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUnreadCount()

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen])

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationsApi.getUnreadCount()
      setUnreadCount(response.unread_count)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  const fetchNotifications = async () => {
    setIsLoading(true)
    try {
      const response = await notificationsApi.getNotifications(false, 20)
      setNotifications(response.notifications)
      setUnreadCount(response.unread_count)
    } catch (error) {
      console.error('Error fetching notifications:', error)
      toast.error('Failed to load notifications')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId: string, actionUrl?: string) => {
    try {
      await notificationsApi.markAsRead(notificationId)

      // Update local state
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      )
      setUnreadCount(prev => Math.max(0, prev - 1))

      // Navigate if there's an action URL
      if (actionUrl) {
        setIsOpen(false)
        router.push(actionUrl)
      }
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead()

      setNotifications(prev =>
        prev.map(n => ({ ...n, is_read: true }))
      )
      setUnreadCount(0)

      toast.success('All notifications marked as read')
    } catch (error) {
      console.error('Error marking all as read:', error)
      toast.error('Failed to mark all as read')
    }
  }

  const handleDelete = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      await notificationsApi.deleteNotification(notificationId)

      const wasUnread = notifications.find(n => n.id === notificationId)?.is_read === false

      setNotifications(prev => prev.filter(n => n.id !== notificationId))

      if (wasUnread) {
        setUnreadCount(prev => Math.max(0, prev - 1))
      }

      toast.success('Notification deleted')
    } catch (error) {
      console.error('Error deleting notification:', error)
      toast.error('Failed to delete notification')
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'order_created':
      case 'order_status_updated':
      case 'milestone_completed':
        return <Package className="w-5 h-5" />
      case 'document_requested':
      case 'document_approved':
      case 'document_rejected':
        return <FileText className="w-5 h-5" />
      case 'support_reply':
      case 'support_resolved':
        return <MessageSquare className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getColor = (type: string, priority: string) => {
    if (priority === 'urgent' || priority === 'high') {
      return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
    }

    switch (type) {
      case 'order_created':
      case 'milestone_completed':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'document_approved':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
      case 'document_rejected':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      case 'support_reply':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const date = new Date(timestamp)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle notifications"
        aria-label="Toggle notifications"
        className="relative w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl z-50 max-h-[600px] flex flex-col"
            >

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Notifications
                </h3>

                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    className="text-sm"
                  >
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Mark all read
                  </Button>
                )}
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Clock className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleMarkAsRead(notification.id, notification.action_url)}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${!notification.is_read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColor(notification.type, notification.priority)}`}>
                            {getIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                {notification.title}
                              </h4>

                              {/* Delete Button */}
                              <button
                                onClick={(e) => handleDelete(notification.id, e)}
                                title="Delete notification"
                                aria-label="Delete notification"
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                              >
                                <X className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(notification.created_at)}
                              </span>

                              {!notification.is_read && (
                                <span className="w-2 h-2 rounded-full bg-blue-600" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-4 border-t-2 border-gray-200 dark:border-gray-800">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false)
                      router.push('/dashboard/notifications')
                    }}
                  >
                    View All Notifications
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

