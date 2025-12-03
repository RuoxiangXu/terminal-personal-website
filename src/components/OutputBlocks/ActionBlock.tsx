'use client'

import { useEffect } from 'react'

interface ActionBlockProps {
  content: string
  action: string
  url?: string
}

export default function ActionBlock({ content, action, url }: ActionBlockProps) {
  useEffect(() => {
    if (action === 'open' && url) {
      const timer = setTimeout(() => {
        window.open(url, '_blank')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [action, url])

  return (
    <div className="flex items-center gap-2">
      <span className="text-yellow-400">→</span>
      <span>{content}</span>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline ml-2"
        >
          {url}
        </a>
      )}
    </div>
  )
}