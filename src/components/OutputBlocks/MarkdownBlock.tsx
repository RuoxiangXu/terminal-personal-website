'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownBlockProps {
  content: string
}

export default function MarkdownBlock({ content }: MarkdownBlockProps) {
  return (
    <div className="prose dark:prose-invert prose-sm max-w-none prose-neutral">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-500 dark:hover:text-neutral-400 underline"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-200">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}