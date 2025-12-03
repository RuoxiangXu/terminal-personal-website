interface TextBlockProps {
  content: string
  isError?: boolean
}

export default function TextBlock({ content, isError = false }: TextBlockProps) {
  return (
    <div className={`whitespace-pre-wrap ${isError ? 'text-red-400' : ''}`}>
      {content}
    </div>
  )
}