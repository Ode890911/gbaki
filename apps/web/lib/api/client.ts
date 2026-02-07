import axios, { AxiosError } from 'axios'

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000, // 30 seconds
})

// Response interceptor - Handle session expiry
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // If 401, the session might be expired
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname
        // Only redirect to login if:
        // 1. Not already on auth pages (login, register, etc.)
        // 2. Not on public pages (home, about, contact, etc.)
        const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email', '/', '/about', '/contact', '/services', '/resources', '/success-stories', '/privacy', '/terms', '/cookie-policy']
        const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path))
        
        if (!isPublicPath) {
          // Store current path for redirect after login
          const redirectPath = encodeURIComponent(pathname + window.location.search)
          window.location.href = `/login?redirect=${redirectPath}`
        }
      }
    }

    return Promise.reject(error)
  }
)

// API Error Handler
export class ApiError extends Error {
  status: number
  data: unknown

  constructor(status: number, message: string, data?: unknown) {
    super(message)
    this.status = status
    this.data = data
    this.name = 'ApiError'
  }
}

// Helper function to handle API errors
export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500
    const message = (error.response?.data as { detail?: string } | undefined)?.detail || error.message
    const data = error.response?.data

    return new ApiError(status, message, data)
  }

  if (error instanceof Error) {
    return new ApiError(500, error.message)
  }

  return new ApiError(500, 'An unexpected error occurred')
}
