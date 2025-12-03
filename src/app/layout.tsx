import type { Metadata } from 'next'
import '../styles/globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import GithubButton from '@/components/GithubButton/GithubButton'
import { siteConfig } from '@/config/siteConfig'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: 'portfolio, developer, terminal, CLI, interactive',
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="font-mono antialiased min-h-[100dvh] h-full">
        <ThemeProvider>
          <div className="pointer-events-none fixed inset-0 z-50">
            <div className="pointer-events-auto absolute top-4 left-4">
              <ThemeToggle />
            </div>
            <div className="pointer-events-auto absolute top-4 right-4">
              <GithubButton />
            </div>
          </div>
          <div className="relative flex items-center justify-center min-h-[100dvh] w-full px-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}