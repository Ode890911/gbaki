import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={cn('animate-spin text-green-600 dark:text-green-400', sizes[size], className)} />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

// Full page loading overlay
export function LoadingOverlay({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-800" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-green-600 dark:border-green-400 border-t-transparent animate-spin" />
        </div>
        {text && (
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {text}
          </p>
        )}
      </div>
    </div>
  )
}

