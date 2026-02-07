import { apiClient, handleApiError } from './client'

export interface OnboardingData {
  firstName: string
  lastName: string
  phone: string
  country: string
  businessName: string
  businessType: string
  industry: string
  businessStage?: string
  mainGoal: string
  timeline: string
  budget?: string
  preferredState?: string
  needWebsite: boolean
  needPhone: boolean
  needEmail: boolean
}

export interface OnboardingStatus {
  completed: boolean
  data?: OnboardingData
}

export const onboardingApi = {
  // Complete onboarding
  async completeOnboarding(data: OnboardingData): Promise<{ message: string; user: any }> {
    try {
      const response = await apiClient.post('/onboarding/complete', data)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // Check onboarding status
  async getStatus(): Promise<OnboardingStatus> {
    try {
      const response = await apiClient.get('/onboarding/status')
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

