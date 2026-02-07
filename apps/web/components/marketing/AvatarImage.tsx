'use client'

import * as React from 'react'

interface AvatarImageProps {
  name: string
  initials: string
  size?: number
}

export function AvatarImage({ name, initials, size = 96 }: AvatarImageProps) {
  const [imageError, setImageError] = React.useState(false)
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=22c55e`

  return (
    <div 
      className="relative rounded-full bg-white/20 backdrop-blur-sm overflow-hidden ring-2 ring-white/30 flex-shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      {!imageError ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ fontSize: `${size * 0.4}px` }}>
          {initials}
        </div>
      )}
    </div>
  )
}

