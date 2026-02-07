import { apiClient, handleApiError } from './client'

export interface Document {
  id: string
  order_id: string
  user_id: string
  name: string
  document_type: string
  file_url: string
  file_size?: number
  mime_type?: string
  is_verified: boolean
  uploaded_at: string
}

export const documentsApi = {
  // Upload document
  uploadDocument: async (
    orderId: string,
    documentType: string,
    file: File
  ): Promise<Document> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('order_id', orderId)
      formData.append('document_type', documentType)
      
      const response = await apiClient.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Get all documents
  getDocuments: async (orderId?: string): Promise<Document[]> => {
    try {
      const params = orderId ? { order_id: orderId } : {}
      const response = await apiClient.get('/documents', { params })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Get single document
  getDocument: async (documentId: string): Promise<Document> => {
    try {
      const response = await apiClient.get(`/documents/${documentId}`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Get download URL
  getDownloadUrl: async (documentId: string): Promise<{ download_url: string; expires_in: number }> => {
    try {
      const response = await apiClient.get(`/documents/${documentId}/download`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
  
  // Delete document
  deleteDocument: async (documentId: string): Promise<void> => {
    try {
      await apiClient.delete(`/documents/${documentId}`)
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

