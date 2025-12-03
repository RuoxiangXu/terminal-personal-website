'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)
  const [hasManualPreference, setHasManualPreference] = useState(false)

  const applyTheme = (nextTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const detectThemeByLocalTime = (): Theme => {
    try {
      const { timeZone } = Intl.DateTimeFormat().resolvedOptions()
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: timeZone || undefined
      })
      const hour = parseInt(formatter.format(new Date()), 10)
      return hour >= 7 && hour < 19 ? 'light' : 'dark'
    } catch {
      const fallbackHour = new Date().getHours()
      return fallbackHour >= 7 && fallbackHour < 19 ? 'light' : 'dark'
    }
  }

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      setHasManualPreference(true)
      applyTheme(savedTheme)
    } else {
      const autoTheme = detectThemeByLocalTime()
      setTheme(autoTheme)
      setHasManualPreference(false)
      applyTheme(autoTheme)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (hasManualPreference) return

    const interval = setInterval(() => {
      const autoTheme = detectThemeByLocalTime()
      setTheme(prev => {
        if (prev !== autoTheme) {
          applyTheme(autoTheme)
          return autoTheme
        }
        return prev
      })
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [hasManualPreference])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setHasManualPreference(true)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  // Prevent flash of unstyled content
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return a default value for SSR instead of throwing error
    return {
      theme: 'dark' as Theme,
      toggleTheme: () => {},
    }
  }
  return context
}
