'use client'

import * as React from 'react'

interface RotatingTypingTextProps {
  words: string[]
  speed?: number
  delay?: number
  pauseBetweenWords?: number
  className?: string
}

export function RotatingTypingText({ 
  words = [], 
  speed = 150, 
  delay = 0,
  pauseBetweenWords = 2000,
  className = ''
}: RotatingTypingTextProps) {
  const [displayedText, setDisplayedText] = React.useState('')
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    // Safety check
    if (!words || words.length === 0) {
      return undefined
    }

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseBetweenWords)
      return () => clearTimeout(pauseTimeout)
    }

    const currentWord = words[currentWordIndex]
    
    // Safety check for current word
    if (!currentWord) {
      return undefined
    }
    
    if (!isDeleting) {
      // Typing mode
      if (currentCharIndex < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, currentCharIndex + 1))
          setCurrentCharIndex(prev => prev + 1)
        }, currentCharIndex === 0 ? delay : speed)
        return () => clearTimeout(timeout)
      } else {
        // Word complete, pause then start deleting
        setIsPaused(true)
        return undefined
      }
    } else {
      // Deleting mode
      if (currentCharIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, currentCharIndex - 1))
          setCurrentCharIndex(prev => prev - 1)
        }, speed / 2) // Delete faster than typing
        return () => clearTimeout(timeout)
      } else {
        // Word deleted, move to next word
        setIsDeleting(false)
        setCurrentWordIndex(prev => (prev + 1) % words.length)
        setCurrentCharIndex(0)
        setDisplayedText('')
        return undefined
      }
    }
  }, [currentCharIndex, currentWordIndex, isDeleting, isPaused, words, speed, delay, pauseBetweenWords])

  const showCursor = !isPaused

  // Safety check - if no words, return empty
  if (!words || words.length === 0) {
    return <span className={className}></span>
  }

  return (
    <span className="inline-flex items-center">
      <span className={className}>
        {displayedText}
      </span>
      {showCursor && (
        <span className="inline-block ml-1 text-green-600 dark:text-green-400 font-bold animate-blink" style={{ fontSize: 'inherit' }}>|</span>
      )}
    </span>
  )
}

