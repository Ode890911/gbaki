'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { authApi, usersApi } from '@/lib/api'
import type { User } from '@/lib/api/users'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  setUser: (user: User | null) => void
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  refreshUser: async () => { },
  setUser: () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check if user is logged in on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await usersApi.getCurrentUser()
        setUser(userData)
      } catch (error) {
        // If 401, handleApiError will be thrown or axios will return error.
        // We can ignore 401 on initial check as it just means user is not logged in.
        console.log('No active session found')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password })

      // Ensure user data is properly set
      if (response.user) {
        setUser(response.user)
      } else {
        // If user not in response, fetch it
        const userData = await usersApi.getCurrentUser()
        setUser(userData)
      }
    } catch (error) {
      console.error('Login error in provider:', error)
      throw error
    }
  }

  // Register function
  const register = async (data: any) => {
    try {
      const response = await authApi.register(data)
      setUser(response.user)
      router.push('/dashboard')
    } catch (error) {
      throw error
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await authApi.logout()
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    try {
      const userData = await usersApi.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Refresh user failed:', error)
    }
  }

  // Set user directly (for email verification auto-login)
  const setUserDirectly = (userData: User | null) => {
    setUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshUser,
        setUser: setUserDirectly,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

