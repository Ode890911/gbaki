import { apiClient, handleApiError } from './client'

export interface SupportTicket {
  id: string
  ticket_number: string
  user_id: string
  subject: string
  category: string
  status: string
  priority: string
  created_at: string
  updated_at?: string
  messages: TicketMessage[]
}

export interface TicketMessage {
  message: string
  is_staff: boolean
  created_at: string
}

export interface TicketCreate {
  subject: string
  category: string
  description: string
  priority?: string
  order_id?: string
}

export const supportApi = {
  // Create ticket with optional order_id
  createTicket: async (data: TicketCreate): Promise<SupportTicket> => {
    try {
      // Backend expects 'message' not 'description'
      const payload = {
        subject: data.subject,
        category: data.category,
        message: data.description, // Map description to message
        order_id: data.order_id,
        priority: data.priority || 'normal',
      }
      const response = await apiClient.post('/support/', payload)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // List tickets with optional order filter
  getTickets: async (status?: string, orderId?: string): Promise<SupportTicket[]> => {
    try {
      const params: any = {}
      if (status) params.status_filter = status
      if (orderId) params.order_id = orderId
      const response = await apiClient.get('/support/', { params })
      return Array.isArray(response.data) ? response.data : []
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Get single ticket
  getTicket: async (ticketId: string): Promise<SupportTicket> => {
    try {
      const response = await apiClient.get(`/support/${ticketId}`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Add message to ticket
  addTicketMessage: async (ticketId: string, message: string): Promise<void> => {
    try {
      await apiClient.post(`/support/${ticketId}/messages`, { message })
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // Update ticket status (user can close their own tickets)
  updateStatus: async (ticketId: string, status: string): Promise<void> => {
    try {
      // Backend uses PATCH /support/{id}/status
      await apiClient.patch(`/support/${ticketId}/status`, { status })
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

