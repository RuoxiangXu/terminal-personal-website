'use client'

import { useEffect, useState } from 'react'

const bootMessages = [
  '[SYSTEM] Initializing terminal interface...',
  '[SYSTEM] Loading system modules...',
  '[SYSTEM] Establishing connection...',
  '[SYSTEM] Mounting filesystem...',
  '[SYSTEM] Loading user profile...',
  '[SYSTEM] Starting shell...',
  '',
  '[OK] System initialized successfully'
]

interface BootScreenProps {
  onComplete: () => void
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState<string[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < bootMessages.length) {
        setDisplayedText(prev => [...prev, bootMessages[currentLine]])
        setCurrentLine(prev => prev + 1)
      } else {
        setTimeout(onComplete, 500)
      }
    }, currentLine === 0 ? 100 : 80)

    return () => clearTimeout(timer)
  }, [currentLine, onComplete])

  return (
    <div className="space-y-1">
      {displayedText.map((line, index) => (
        <div key={index} className="text-xs opacity-80">
          {line}
        </div>
      ))}
    </div>
  )
}