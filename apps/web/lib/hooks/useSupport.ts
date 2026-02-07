import useSWR from 'swr'
import { supportApi, type SupportTicket } from '@/lib/api'

export function useSupportTickets() {
  const { data, error, isLoading, mutate } = useSWR<SupportTicket[]>(
    '/support',
    () => supportApi.getTickets()
  )
  
  return {
    tickets: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useSupportTicket(ticketId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<SupportTicket>(
    ticketId ? `/support/${ticketId}` : null,
    (url: string) => supportApi.getTicket(url.replace(/^\/support\//, ''))
  )
  
  return {
    ticket: data,
    isLoading,
    isError: error,
    mutate,
  }
}

