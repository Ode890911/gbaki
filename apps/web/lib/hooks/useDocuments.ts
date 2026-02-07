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
    (url: string) => documentsApi.getDocument(url.replace(/^\/documents\//, ''))
  )
  
  return {
    document: data,
    isLoading,
    isError: error,
    mutate,
  }
}

