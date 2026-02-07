import useSWR from 'swr'
import { ordersApi, type Order } from '@/lib/api'

export function useOrders() {
  const { data, error, isLoading, mutate } = useSWR<Order[]>(
    '/orders',
    () => ordersApi.getOrders()
  )
  
  return {
    orders: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useOrder(orderId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Order>(
    orderId ? `/orders/${orderId}` : null,
    (url: string) => ordersApi.getOrder(url.replace(/^\/orders\//, ''))
  )
  
  return {
    order: data,
    isLoading,
    isError: error,
    mutate,
  }
}

