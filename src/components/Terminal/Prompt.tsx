import { RefObject } from 'react'
import { getTerminalPrompt } from '@/config/siteConfig'

interface PromptProps {
  value: string
  suggestion?: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  inputRef: RefObject<HTMLInputElement | null>
}

export default function Prompt({ value, suggestion = '', onChange, onKeyDown, inputRef }: PromptProps) {
  const promptLabel = getTerminalPrompt()
  
  return (
    <div className="flex items-center">
      <span className="text-neutral-700 dark:text-neutral-300 font-semibold mr-2">{promptLabel}</span>
      <span className="text-neutral-600 dark:text-neutral-400 mr-2">~</span>
      <span className="text-neutral-700 dark:text-neutral-300 mr-2">$</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="command-input w-full pr-4"
          autoComplete="off"
          spellCheck="false"
        />
        {suggestion && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 text-neutral-500/70 dark:text-neutral-400/60 italic whitespace-pre font-mono"
          >
            <span className="opacity-0">{value}</span>
            {suggestion}
          </span>
        )}
        <span
          className="terminal-cursor absolute top-0"
          style={{ left: `${value.length * 0.6}em` }}
        />
      </div>
    </div>
  )
}