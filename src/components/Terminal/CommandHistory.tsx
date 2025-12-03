import { CommandOutput } from '@/lib/types'
import TextBlock from '../OutputBlocks/TextBlock'
import LinkBlock from '../OutputBlocks/LinkBlock'
import ActionBlock from '../OutputBlocks/ActionBlock'
import MarkdownBlock from '../OutputBlocks/MarkdownBlock'
import { getTerminalPrompt } from '@/config/siteConfig'
import BannerBlock from '../OutputBlocks/BannerBlock'
import HelpBlock from '../OutputBlocks/HelpBlock'
import CoffeeBlock from '../OutputBlocks/CoffeeBlock'
import MatrixBlock from '../OutputBlocks/MatrixBlock'
import CountdownRedirectBlock from '../OutputBlocks/CountdownRedirectBlock'

interface CommandHistoryProps {
  history: CommandOutput[]
}

export default function CommandHistory({ history }: CommandHistoryProps) {
  const promptLabel = getTerminalPrompt()
  const renderOutput = (output: CommandOutput, index: number) => {
    switch (output.type) {
      case 'command':
        return (
          <div key={index} className="flex items-center">
            <span className="text-neutral-700 dark:text-neutral-300 font-semibold mr-2">{promptLabel}</span>
            <span className="text-neutral-600 dark:text-neutral-400 mr-2">~</span>
            <span className="text-neutral-700 dark:text-neutral-300 mr-2">$</span>
            <span>{output.content}</span>
          </div>
        )
      case 'text':
        return <TextBlock key={index} content={output.content} />
      case 'error':
        return <TextBlock key={index} content={output.content} isError />
      case 'link':
        return output.url ? (
          <LinkBlock key={index} content={output.content} url={output.url} icon={output.icon} />
        ) : (
          <TextBlock key={index} content={output.content} />
        )
      case 'action':
        return output.action ? (
          <ActionBlock key={index} content={output.content} action={output.action} url={output.url} />
        ) : (
          <TextBlock key={index} content={output.content} />
        )
      case 'markdown':
        return <MarkdownBlock key={index} content={output.content} />
      case 'banner':
        return <BannerBlock key={index} content={output.content} />
      case 'help':
        return <HelpBlock key={index} content={output.content} tips={output.tips} />
      case 'coffee':
        return <CoffeeBlock key={index} />
      case 'matrix':
        return <MatrixBlock key={index} />
      case 'countdown-redirect':
        return output.content ? (
          <CountdownRedirectBlock key={index} url={output.content} />
        ) : (
          <TextBlock key={index} content="No URL provided" />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-2">
      {history.map((output, index) => renderOutput(output, index))}
    </div>
  )
}