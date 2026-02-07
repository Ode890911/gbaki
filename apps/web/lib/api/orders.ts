import { apiClient, handleApiError } from './client'
import type { OrderStatus } from '@/lib/dashboard/types'

export interface Order {
  id: string
  order_number: string
  user_id: string
  package_type: 'starter' | 'growth' | 'premium'
  package_name?: string  // ✅ Package display name
  status: OrderStatus
  progress: number  // Legacy field (0-100)
  progress_percentage?: number  // ✅ Real progress percentage (0-100)
  current_milestone?: string  // ✅ Current milestone name
  amount: number
  total_amount?: number  // ✅ Total order amount
  currency: string
  payment_status: string
  created_at: string
  updated_at?: string
  estimated_completion?: string
  services: OrderService[]
  documents_submitted?: boolean  // ✅ Track document submission
  documents_approved?: boolean  // ✅ Track document approval
  // ✅ Milestone tracking fields
  milestone_order_placed?: boolean
  milestone_documents_submitted?: boolean
  milestone_documents_approved?: boolean
  milestone_llc_filed?: boolean
  milestone_website_ready?: boolean
  milestone_services_setup?: boolean
  milestone_completed?: boolean
}

export interface OrderService {
  service_name: string
  service_type: string
  status: string
}

export interface OrderCreate {
  package_type: 'starter' | 'growth' | 'premium'
}

export const ordersApi = {
  // Create new order
  createOrder: async (data: OrderCreate): Promise<Order> => {
    try {
      const response = await apiClient.post('/orders', data)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Get all orders
  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiClient.get('/orders')
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Get single order
  getOrder: async (orderId: string): Promise<Order> => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Cancel order
  cancelOrder: async (orderId: string): Promise<void> => {
    try {
      await apiClient.delete(`/orders/${orderId}`)
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // ✅ NEW: Admin update milestone
  async updateMilestone(orderId: string, milestone: string, completed: boolean = true) {
    try {
      const response = await apiClient.patch(`/orders/${orderId}/milestone`, {
        milestone,
        completed,
      })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

