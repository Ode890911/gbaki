import { apiClient } from './client'

export interface Notification {
  id: string
  type: string
  priority: string
  title: string
  message: string
  is_read: boolean
  action_url?: string
  action_text?: string
  order_id?: string
  document_id?: string
  ticket_id?: string
  metadata?: any
  created_at: string
  read_at?: string
}

export const notificationsApi = {
  // Get notifications list
  async getNotifications(unreadOnly: boolean = false, limit: number = 50) {
    const response = await apiClient.get('/notifications/list', {
      params: { unread_only: unreadOnly, limit },
    })
    return response.data
  },

  // Get unread count
  async getUnreadCount() {
    const response = await apiClient.get('/notifications/unread-count')
    return response.data
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    const response = await apiClient.patch(`/notifications/${notificationId}/read`)
    return response.data
  },

  // Mark all as read
  async markAllAsRead() {
    const response = await apiClient.patch('/notifications/mark-all-read')
    return response.data
  },

  // Delete notification
  async deleteNotification(notificationId: string) {
    const response = await apiClient.delete(`/notifications/${notificationId}`)
    return response.data
  },
}

