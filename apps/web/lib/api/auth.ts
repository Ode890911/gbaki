import { apiClient, handleApiError } from './client'
import { User } from './users'

export interface AuthResponse {
    access_token: string
    refresh_token?: string
    token_type: string
    user: User
    reset_link?: string
    already_verified?: boolean
}

export const authApi = {
    login: async (credentials: Record<string, string>): Promise<AuthResponse> => {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
            return response.data
        } catch (error) {
            throw handleApiError(error)
        }
    },

    register: async (userData: Record<string, any>): Promise<AuthResponse> => {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/register', userData)
            return response.data
        } catch (error) {
            throw handleApiError(error)
        }
    },

    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/auth/logout')
        } catch (error) {
            throw handleApiError(error)
        }
    },

    forgotPassword: async (email: string): Promise<{ message: string; reset_link?: string }> => {
        try {
            const response = await apiClient.post('/auth/password-reset', { email })
            return response.data
        } catch (error) {
            throw handleApiError(error)
        }
    },

    resetPassword: async (token: string, newPassword: string): Promise<AuthResponse & { message: string }> => {
        try {
            const response = await apiClient.post('/auth/reset-password', {
                token,
                new_password: newPassword
            })
            return response.data
        } catch (error) {
            throw handleApiError(error)
        }
    },

    verifyEmail: async (token: string): Promise<AuthResponse & { message: string; already_verified?: boolean }> => {
        try {
            const response = await apiClient.get(`/auth/verify-email?token=${token}`)
            return response.data
        } catch (error) {
            throw handleApiError(error)
        }
    }
}
