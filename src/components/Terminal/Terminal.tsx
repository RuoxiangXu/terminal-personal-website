'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import TerminalFrame from './TerminalFrame'
import Prompt from './Prompt'
import CommandHistory from './CommandHistory'
import BootScreen from './BootScreen'
import { executeCommand, getAvailableCommands } from '@/lib/commandRegistry'
import { CommandOutput } from '@/lib/types'

export default function Terminal() {
  const [history, setHistory] = useState<CommandOutput[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBooting, setIsBooting] = useState(true)
  const [suggestion, setSuggestion] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const availableCommands = useMemo(() => {
    const list: string[] = []
    getAvailableCommands().forEach(cmd => {
      list.push(cmd.name.toLowerCase())
      cmd.aliases?.forEach(alias => list.push(alias.toLowerCase()))
    })
    return Array.from(new Set(list))
  }, [])

  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isBooting, history])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const computeSuggestion = (input: string) => {
    if (!input || input.includes(' ')) return ''
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return ''
    const matches = availableCommands.filter(cmd => cmd.startsWith(trimmed))
    if (matches.length === 1) {
      const match = matches[0]
      if (match !== trimmed) {
        return match.slice(trimmed.length)
      }
    }
    return ''
  }

  const updateInputValue = (nextValue: string) => {
    setCurrentInput(nextValue)
    setSuggestion(computeSuggestion(nextValue))
  }

  const handleCommand = async (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    const userOutput: CommandOutput = {
      type: 'command',
      content: trimmedCommand,
    }

    if (trimmedCommand.toLowerCase() === 'clear') {
      setHistory([])
      updateInputValue('')
      return
    }

    const result = await executeCommand(trimmedCommand)
    setHistory(prev => [...prev, userOutput, result])
    setCommandHistory(prev => [...prev, trimmedCommand])
    setHistoryIndex(-1)
    updateInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        updateInputValue(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        updateInputValue(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        updateInputValue('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestion) {
        updateInputValue(currentInput + suggestion)
        return
      }
      // Tab completion
      const input = currentInput.trim().toLowerCase()
      if (!input) return

      // Find matching commands
      const matches = availableCommands.filter(cmd => cmd.startsWith(input))

      if (matches.length === 1) {
        // Single match - autocomplete
        updateInputValue(matches[0])
      } else if (matches.length > 1) {
        // Multiple matches - show them
        const matchList = matches.join('  ')
        const output: CommandOutput = {
          type: 'text',
          content: matchList
        }
        setHistory(prev => [...prev, output])
      }
    }
  }

  const handleBootComplete = async () => {
    setIsBooting(false)

    // Automatically show banner command after boot
    const userCommand: CommandOutput = {
      type: 'command',
      content: 'banner',
    }
    const bannerResult = await executeCommand('banner')

    setHistory([userCommand, bannerResult])
  }

  const handleTerminalClick = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      return
    }

    const container = terminalRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)

    if (distanceFromBottom <= 20) {
      inputRef.current?.focus()
    }
  }

  return (
    <TerminalFrame>
      <div
        ref={terminalRef}
        className="h-full overflow-y-auto scrollbar-thin px-4 py-3"
        onClick={handleTerminalClick}
      >
        {isBooting ? (
          <BootScreen onComplete={handleBootComplete} />
        ) : (
          <>
            <CommandHistory history={history} />
            <Prompt
              value={currentInput}
              suggestion={suggestion}
              onChange={updateInputValue}
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
            />
          </>
        )}
      </div>
    </TerminalFrame>
  )
}