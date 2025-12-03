'use client'

import { useEffect, useState } from 'react'

interface CountdownRedirectBlockProps {
  url: string
  title?: string
  icon?: string
}

export default function CountdownRedirectBlock({ url, title }: CountdownRedirectBlockProps) {
  const [countdown, setCountdown] = useState(3)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    if (cancelled) return

    if (countdown <= 0) {
      window.open(url, '_blank')
      return
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, cancelled, url])

  useEffect(() => {
    if (cancelled || countdown <= 0) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === 'c' || event.key === 'C')) {
        event.preventDefault()
        setCancelled(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cancelled, countdown])

  return (
    <div className="my-2 text-terminal-text">
      {title && (
        <div className="mb-1 font-semibold">
          {title}
        </div>
      )}
      <div className="mb-1">
        <span className="opacity-60">Link: </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-70 transition-opacity"
        >
          {url}
        </a>
      </div>
      {countdown > 0 && !cancelled && (
        <div className="opacity-60">
          <div>
            Redirecting automatically in {countdown} second{countdown !== 1 ? 's' : ''}...
          </div>
          <div>
            Press Ctrl + C to cancel this redirect.
          </div>
        </div>
      )}
      {cancelled && (
        <div className="opacity-70">
          Redirect cancelled. You can click the link above to open it manually.
        </div>
      )}
    </div>
  )
}
