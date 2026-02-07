import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
        className
      )}
      {...props}
    />
  )
}

// Shimmer effect skeleton (more premium)
export function SkeletonShimmer({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-800',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
    </div>
  )
}

// Card skeleton wrapper
export function SkeletonCard({ className, children, ...props }: SkeletonProps & { children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
