'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 85,
  loading = 'lazy',
  placeholder = 'blur',
  blurDataURL,
  sizes,
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='

  return (
    <div className={cn('relative overflow-hidden', fill && 'w-full h-full', className)}>
      {/* Loading shimmer */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</p>
        </div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        sizes={sizes}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          fill && 'object-cover'
        )}
        onLoad={() => {
          setIsLoading(false)
          onLoad?.()
        }}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
      />
    </div>
  )
}

// Lazy load wrapper for below-the-fold images
export function LazyImage(props: OptimizedImageProps) {
  const [isInView, setIsInView] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // Load 50px before entering viewport
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {isInView ? (
        <OptimizedImage {...props} />
      ) : (
        <div
          className={cn(
            'bg-gray-200 dark:bg-gray-800',
            props.fill ? 'w-full h-full' : '',
            props.className
          )}
          style={
            props.fill
              ? undefined
              : { width: props.width, height: props.height }
          }
        />
      )}
    </div>
  )
}

