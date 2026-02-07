import { apiClient } from './client'
import { User } from './users'

export interface AdminOverview {
  overview: {
    total_revenue: number
    total_orders: number
    total_users: number
    active_orders?: number
    pending_documents?: number
    open_tickets?: number
  }
  this_month: {
    revenue: number
    orders: number
    new_users: number
  }
  recent_activity: {
    orders_last_7_days: number
    users_last_7_days: number
  }
  orders_by_status?: Record<string, number>
}

export interface RevenueStats {
  daily_revenue: Array<{
    date: string
    revenue: number
    orders: number
  }>
}

export interface AdminOrder {
  id: string
  order_number: string
  status: string
  amount: number
  package_type: string
  payment_status: string
  progress: number
  created_at: string
  user: {
    name: string
    email: string
  }
}

export interface AdminTicket {
  id: string
  ticket_number: string
  subject: string
  status: string
  priority: string
  category: string
  message_count: number
  created_at: string
  updated_at: string
  user: {
    name: string
    email: string
  }
}

export const adminApi = {
  // Get overview statistics
  async getOverview(): Promise<AdminOverview> {
    const response = await apiClient.get('/admin/stats/overview')
    return response.data
  },

  // Get revenue statistics
  async getRevenueStats(days: number = 30): Promise<RevenueStats> {
    const response = await apiClient.get('/admin/stats/revenue', {
      params: { days },
    })
    return response.data
  },

  // List all orders (paginated)
  async listOrders(params?: {
    page?: number
    per_page?: number
    status?: string
    search?: string
    package_type?: string
    payment_status?: string
  }): Promise<{
    data: AdminOrder[]
    page: number
    per_page: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }> {
    const response = await apiClient.get('/admin/orders/list', { params })
    return response.data
  },

  // Get pending documents
  async getPendingDocuments(limit: number = 50) {
    const response = await apiClient.get('/admin/documents/pending', {
      params: { limit },
    })
    return response.data
  },

  // List all tickets (paginated)
  async listTickets(params?: {
    page?: number
    per_page?: number
    status?: string
    priority?: string
    search?: string
  }): Promise<{
    data: AdminTicket[]
    page: number
    per_page: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }> {
    const response = await apiClient.get('/admin/tickets/list', { params })
    return response.data
  },

  // List all users (paginated)
  async listUsers(params?: {
    page?: number
    per_page?: number
    search?: string
    role?: string
    is_active?: boolean
  }): Promise<{
    data: User[]
    page: number
    per_page: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }> {
    const response = await apiClient.get('/users', { params })
    return response.data
  },

  // Toggle user active status
  async toggleUserActive(userId: string): Promise<User> {
    const response = await apiClient.patch(`/users/${userId}/toggle-active`)
    return response.data
  },
}
