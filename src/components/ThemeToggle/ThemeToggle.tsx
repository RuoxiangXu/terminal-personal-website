'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything on server-side
  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
      aria-label="Toggle theme"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun Icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50'
          }`}
        >
          <svg
            className="w-5 h-5 text-neutral-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        {/* Moon Icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        >
          <svg
            className="w-5 h-5 text-neutral-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>

        {/* Animated background circle */}
        <div
          className={`absolute inset-1.5 rounded-full transition-all duration-700 ${
            theme === 'light'
              ? 'bg-gradient-to-br from-yellow-200 to-orange-200 opacity-30 scale-0 group-hover:scale-100'
              : 'bg-gradient-to-br from-blue-900 to-purple-900 opacity-30 scale-0 group-hover:scale-100'
          }`}
        />
      </div>

      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 blur-lg ${
          theme === 'light'
            ? 'bg-yellow-300/50'
            : 'bg-blue-500/50'
        }`}
      />
    </button>
  )
}
