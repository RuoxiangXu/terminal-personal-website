export interface CommandOutput {
  type: 'command' | 'text' | 'error' | 'link' | 'action' | 'markdown' | 'banner' | 'help' | 'coffee' | 'matrix' | 'countdown-redirect'
  content: string
  url?: string
  icon?: string
  action?: string
  tips?: string[]
}

export interface Command {
  name: string
  description: string
  usage?: string
  handler: (args: string[]) => Promise<CommandOutput> | CommandOutput
  aliases?: string[]
}

export interface ParsedCommand {
  command: string
  args: string[]
  flags: Record<string, string | boolean>
}