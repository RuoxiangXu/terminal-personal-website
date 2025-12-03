'use client'

import { useEffect, useState } from 'react'

export default function CoffeeBlock() {
  const staticLines = ['∽  ≈  ∽', '≈  ∿  ≈', '∼  ≋  ∼', '≈  ∼  ≈', '∽  ≈  ∽']
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => prev + 0.35)
    }, 140)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="my-3 font-mono">
      {/* Enhanced Steam */}
      <div className="text-center mb-1 relative" style={{ height: '80px' }}>
        {staticLines.map((line, i) => {
          const intensity = (Math.sin(phase + i * 0.8) + 1) / 2 // 0-1
          return (
            <div
              key={i}
              className="absolute w-full transition-all duration-300 ease-out"
              style={{
                transform: `translateY(${60 - i * 12}px) translateX(${(intensity - 0.5) * 6}px)` ,
                color: `rgba(var(--steam-base-rgb), ${0.35 + intensity * 0.45})`,
                fontWeight: 400 + intensity * 300,
                fontSize: `${0.7 + intensity * 0.18}rem`,
                opacity: 0.3 + intensity * 0.6,
                textShadow: `0 0 ${4 + intensity * 8}px rgba(var(--steam-base-rgb), ${0.4 + intensity * 0.4})`
              }}
            >
              {line}
            </div>
          )
        })}
      </div>

      {/* Cup */}
      <pre className="text-center leading-tight select-none" style={{ fontSize: '0.8rem' }}>
        <span style={{ color: '#d4a574' }}>     ( (</span>
        {'\n'}
        <span style={{ color: '#d4a574' }}>      ) )</span>
        {'\n'}
        <span style={{ color: '#8b4513' }}>    ........</span>
        {'\n'}
        <span style={{ color: '#8b4513' }}>    |</span>
        <span style={{ color: '#6f4e37' }}>██████</span>
        <span style={{ color: '#8b4513' }}>|]</span>
        {'\n'}
        <span style={{ color: '#8b4513' }}>    \\</span>
        <span style={{ color: '#6f4e37' }}>██████</span>
        <span style={{ color: '#8b4513' }}>/</span>
        {'\n'}
        <span style={{ color: '#8b4513' }}>     `----&apos;</span>
      </pre>

      {/* Message */}
      <div className="text-center mt-3 space-y-1">
        <div className="text-terminal-text animate-pulse">
          Brewing a fresh cup of coffee... ☕
        </div>
        <div className="text-terminal-muted text-xs">
          Perfect fuel for coding!
        </div>
      </div>
    </div>
  )
}
