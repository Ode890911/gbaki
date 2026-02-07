import { apiClient, handleApiError } from './client'

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  address?: string
  email_verified: boolean
  is_active: boolean
  created_at: string
  last_login?: string
  marketing_consent: boolean
  onboarding_completed?: boolean
  role?: 'user' | 'admin' | 'super_admin'
  is_superuser?: boolean  // Legacy field
}

export interface UserUpdate {
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  marketing_consent?: boolean
}

export const usersApi = {
  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get('/users/me')
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Update current user
  updateCurrentUser: async (data: UserUpdate): Promise<User> => {
    try {
      const response = await apiClient.put('/users/me', data)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Delete current user (GDPR)
  deleteCurrentUser: async (): Promise<void> => {
    try {
      await apiClient.delete('/users/me')
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Export user data (GDPR)
  exportUserData: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/users/me/export')
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

