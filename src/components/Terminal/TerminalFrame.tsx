import { ReactNode } from 'react'
import { getTerminalTitle } from '@/config/siteConfig'

interface TerminalFrameProps {
  children: ReactNode
}

export default function TerminalFrame({ children }: TerminalFrameProps) {
  const windowTitle = getTerminalTitle()
  return (
    <div className="w-full max-w-2xl mx-auto h-[420px] terminal-glass relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-9 bg-gradient-to-b from-white/5 to-transparent rounded-t-2xl flex items-center px-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
        </div>
        <div className="flex-1 text-center text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
          <div className="inline-flex items-center justify-center w-full">
            {windowTitle}
          </div>
        </div>
        <div className="w-16" aria-hidden="true" />
      </div>
      <div className="h-full pt-9 terminal-text">
        {children}
      </div>
    </div>
  )
}