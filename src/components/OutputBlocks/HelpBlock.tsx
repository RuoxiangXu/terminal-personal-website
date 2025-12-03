interface HelpBlockProps {
  content: string
  tips?: string[]
}

const DEFAULT_TIPS = [
  'Tip: Use Tab to autocomplete commands',
  'Tip: Press ⬆/⬇ to navigate command history'
]

export default function HelpBlock({ content, tips = DEFAULT_TIPS }: HelpBlockProps) {
  return (
    <div className="mt-4 text-left">
      <div className="mb-2">
        Available Commands:
      </div>
      <pre className="text-xs font-mono text-neutral-600 dark:text-neutral-400 whitespace-pre">
        {content}
      </pre>
      <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
        {tips.map((tip, index) => (
          <div key={index}>💡 {tip}</div>
        ))}
      </div>
    </div>
  )
}
