'use client'

import { useEffect, useState, useRef } from 'react'

type MatrixRainProps = {
  onFinish?: () => void
}

export default function MatrixBlock() {
  const [finished, setFinished] = useState(false)

  if (finished) {
    return (
      <div className="my-2 text-terminal-text opacity-60">
        The Matrix fades away...
      </div>
    )
  }

  return (
    <div className="my-2">
      <MatrixRain onFinish={() => setFinished(true)} />
    </div>
  )
}

function MatrixRain({ onFinish }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Create fullscreen canvas overlay - transparent, non-blocking
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    `

    const fullCanvas = document.createElement('canvas')
    fullCanvas.width = window.innerWidth
    fullCanvas.height = window.innerHeight
    fullCanvas.style.pointerEvents = 'none'
    overlay.appendChild(fullCanvas)
    document.body.appendChild(overlay)

    const fullCtx = fullCanvas.getContext('2d')
    if (!fullCtx) return

    // Get current theme colors
    const isDark =
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'

    // Matrix rain settings - moderate density
    const fontSize = 16
    const columns = Math.floor(fullCanvas.width / fontSize)
    const drops: number[] = []
    const trailLengths: number[] = [] // Store individual trail length for each column

    // Activate more columns for better density (25%)
    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.75) {
        drops[i] = Math.floor(Math.random() * -50) // Start at random positions
        trailLengths[i] = Math.floor(Math.random() * 5) + 2 // 2-6 characters per trail
      } else {
        drops[i] = -999 // Inactive column
        trailLengths[i] = 0
      }
    }

    const chars = '01' // Only 0 and 1
    let allowReset = true // Control whether drops can reset

    // Stop allowing resets after 5 seconds to let drops finish naturally
    const resetTimeout = window.setTimeout(() => {
      allowReset = false
    }, 5000)

    function draw() {
      if (!fullCtx || !fullCanvas) return

      // Clear canvas completely for transparency
      fullCtx.clearRect(0, 0, fullCanvas.width, fullCanvas.height)

      fullCtx.font = `${fontSize}px "SF Mono", Monaco, monospace`
      fullCtx.fillStyle = isDark
        ? 'rgba(201, 201, 201, 0.6)'
        : 'rgba(74, 74, 74, 0.6)'

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] === -999) continue // Skip inactive columns

        const x = i * fontSize
        const trailLength = trailLengths[i]

        // Draw trail with individual length
        for (let j = 0; j < trailLength; j++) {
          const y = (drops[i] - j) * fontSize

          if (y > 0 && y < fullCanvas.height) {
            const text = chars[Math.floor(Math.random() * chars.length)]
            fullCtx.fillText(text, x, y)
          }
        }

        // Check if entire trail (including the topmost character) is below screen
        const topmostCharY = (drops[i] - (trailLength - 1)) * fontSize

        if (topmostCharY > fullCanvas.height) {
          // Entire trail has left the screen
          if (allowReset && Math.random() > 0.95) {
            drops[i] = 0
            trailLengths[i] = Math.floor(Math.random() * 5) + 2 // New random length
          } else if (!allowReset) {
            drops[i] = -999 // Deactivate this column
          }
        }

        // Move drop down for next frame
        if (drops[i] !== -999) {
          drops[i]++
        }
      }

      // Count active drops AFTER processing
      let activeDropCount = 0
      for (let i = 0; i < drops.length; i++) {
        if (drops[i] !== -999) {
          activeDropCount++
        }
      }

      // If no active drops remain, clean up and notify parent
      if (activeDropCount === 0) {
        clearInterval(interval)
        clearTimeout(resetTimeout)
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay)
        }
        onFinish?.()
      }
    }

    const interval = window.setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      clearTimeout(resetTimeout)
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay)
      }
    }
  }, [onFinish])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}