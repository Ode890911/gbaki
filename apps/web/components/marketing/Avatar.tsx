'use client'

import * as React from 'react'

interface AvatarProps {
  name: string
  initials: string
  size?: number
}

export function Avatar({ name, initials, size = 96 }: AvatarProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=22c55e`

  return (
    <div 
      className="relative rounded-full bg-white/20 backdrop-blur-sm overflow-hidden ring-2 ring-white/30 flex-shrink-0"
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      {/* Fallback initials - always visible until image loads */}
      {!imageLoaded && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-white font-bold" style={{ fontSize: `${size * 0.4}px` }}>
          {initials}
        </div>
      )}
      
      {/* Avatar image */}
      {!imageError && (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true)
            setImageLoaded(false)
          }}
          style={{ 
            display: 'block',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      )}
      
      {/* Error fallback */}
      {imageError && (
        <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ fontSize: `${size * 0.4}px` }}>
          {initials}
        </div>
      )}
    </div>
  )
}

