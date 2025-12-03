import { Command, CommandOutput } from './types'
import { parseCommand } from './parser'
import { commands } from '@/config/commands'

const commandMap = new Map<string, Command>()

// Register all commands
commands.forEach(cmd => {
  commandMap.set(cmd.name, cmd)
  cmd.aliases?.forEach(alias => {
    commandMap.set(alias, cmd)
  })
})

export async function executeCommand(input: string): Promise<CommandOutput> {
  const parsed = parseCommand(input)
  const command = commandMap.get(parsed.command)

  if (!command) {
    const suggestions = findSimilarCommands(parsed.command)
    return {
      type: 'error',
      content: `Command not found: ${parsed.command}${
        suggestions.length > 0
          ? `\n\nDid you mean one of these?\n${suggestions.join('\n')}`
          : '\n\nType "help" for available commands.'
      }`
    }
  }

  try {
    return await command.handler(parsed.args)
  } catch (error) {
    return {
      type: 'error',
      content: `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

function findSimilarCommands(input: string): string[] {
  const allCommands = Array.from(new Set(commands.map(c => c.name)))
  return allCommands
    .filter(cmd => {
      const distance = levenshteinDistance(input, cmd)
      return distance <= 2
    })
    .slice(0, 3)
    .map(cmd => `  • ${cmd}`)
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

export function getAvailableCommands(): Command[] {
  return commands
}

export function getCommandRegistry(): Map<string, Command> {
  return commandMap
}