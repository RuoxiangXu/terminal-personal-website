interface LinkBlockProps {
  content: string
  url: string
  icon?: string
}

export default function LinkBlock({ content, url, icon }: LinkBlockProps) {
  return (
    <div className="flex items-center gap-2 group">
      {icon && <span className="text-lg">{icon}</span>}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-500 dark:hover:text-neutral-400 underline underline-offset-2 transition-colors"
      >
        {content}
      </a>
      <span className="text-neutral-500 dark:text-neutral-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        ↗
      </span>
    </div>
  )
}