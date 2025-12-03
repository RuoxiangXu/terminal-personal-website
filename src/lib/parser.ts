import { ParsedCommand } from './types'

export function parseCommand(input: string): ParsedCommand {
  const parts: string[] = []
  const flags: Record<string, string | boolean> = {}
  let current = ''
  let inQuote = false
  let quoteChar = ''

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if ((char === '"' || char === "'") && !inQuote) {
      inQuote = true
      quoteChar = char
    } else if (char === quoteChar && inQuote) {
      inQuote = false
      quoteChar = ''
    } else if (char === ' ' && !inQuote) {
      if (current) {
        parts.push(current)
        current = ''
      }
    } else {
      current += char
    }
  }

  if (current) {
    parts.push(current)
  }

  const command = parts[0] || ''
  const args: string[] = []

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]

    if (part.startsWith('--')) {
      const [key, value] = part.slice(2).split('=')
      flags[key] = value || true
    } else if (part.startsWith('-')) {
      const key = part.slice(1)
      flags[key] = true
    } else {
      args.push(part)
    }
  }

  return { command: command.toLowerCase(), args, flags }
}