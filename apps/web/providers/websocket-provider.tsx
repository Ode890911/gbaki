'use client'

import * as React from 'react'
import { toast } from 'sonner'

interface WebSocketContextType {
  isConnected: boolean
  sendMessage: (message: any) => void
}

const WebSocketContext = React.createContext<WebSocketContextType>({
  isConnected: false,
  sendMessage: () => {},
})

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = React.useState(false)
  const wsRef = React.useRef<WebSocket | null>(null)

  React.useEffect(() => {
    // Only connect in browser environment
    if (typeof window === 'undefined') return

    // TODO: Replace with your WebSocket URL
    const _wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws'
    void _wsUrl
    
    // For now, we'll simulate connection without actually connecting
    // Uncomment when you have a WebSocket server ready
    /*
    const ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      setIsConnected(true)
    }

    ws.onclose = () => {
      setIsConnected(false)
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (wsRef.current?.readyState === WebSocket.CLOSED) {
          // Reconnection logic would go here
        }
      }, 3000)
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        handleMessage(data)
      } catch (error) {
        console.error('Failed to parse message:', error)
      }
    }

    wsRef.current = ws

    return () => {
      ws.close()
    }
    */

    // Simulate connection for demo
    setIsConnected(true)
  }, [])

  const _handleMessage = (data: { type?: string; message?: string }) => {
    switch (data.type) {
      case 'order_update':
        toast.success('Order Update', {
          description: data.message,
          action: {
            label: 'View',
            onClick: () => (window.location.href = '/dashboard/orders'),
          },
        })
        break

      case 'document_ready':
        toast.info('New Document Available', {
          description: data.message,
          action: {
            label: 'Download',
            onClick: () => (window.location.href = '/dashboard/documents'),
          },
        })
        break

      case 'support_reply':
        toast('Support Reply', {
          description: data.message,
        })
        break

      default:
        // Unknown message type - silently ignore
        break
    }
  }
  void _handleMessage

  const sendMessage = (message: { type?: string; [key: string]: unknown }) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    }
  }

  return (
    <WebSocketContext.Provider value={{ isConnected, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => React.useContext(WebSocketContext)

