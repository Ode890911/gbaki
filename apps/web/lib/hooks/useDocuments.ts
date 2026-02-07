import useSWR from 'swr'
import { documentsApi, type Document } from '@/lib/api'

export function useDocuments() {
  const { data, error, isLoading, mutate } = useSWR<Document[]>(
    '/documents',
    () => documentsApi.getDocuments()
  )
  
  return {
    documents: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useDocument(documentId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Document>(
    documentId ? `/documents/${documentId}` : null,
    () => documentId ? documentsApi.getDocument(documentId) : null
  )
  
  return {
    document: data,
    isLoading,
    isError: error,
    mutate,
  }
}

