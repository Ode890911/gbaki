'use client'

import * as React from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export function TypingText({ 
  text, 
  speed = 100, 
  delay = 0,
  className = '',
  onComplete 
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = React.useState('')
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isComplete, setIsComplete] = React.useState(false)

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, currentIndex === 0 ? delay : speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      if (onComplete) {
        onComplete()
      }
      return undefined
    }
    return undefined
  }, [currentIndex, text, speed, delay, isComplete, onComplete])

  return (
    <span className="inline-flex items-center">
      <span className={className}>
        {displayedText}
      </span>
      {!isComplete && (
        <span className="inline-block ml-1 text-green-600 dark:text-green-400 font-bold animate-blink" style={{ fontSize: 'inherit' }}>|</span>
      )}
    </span>
  )
}

