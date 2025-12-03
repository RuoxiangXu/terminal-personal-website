'use client'

import { siteConfig } from '@/config/siteConfig'

export default function GithubButton() {
  // Don't render if GitHub URL is not configured
  if (!siteConfig.social.github) {
    return null
  }

  return (
    <a
      href={siteConfig.social.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-neutral-300/40 dark:border-neutral-700/60 bg-neutral-50/80 dark:bg-neutral-900/70 px-3 py-1.5 shadow-lg shadow-black/10 dark:shadow-black/30 transition-colors hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-white/90 dark:hover:bg-neutral-800/80"
      aria-label="Open GitHub profile"
    >
      <svg
        className="h-5 w-5 text-neutral-700 dark:text-neutral-200 transition-colors group-hover:text-black dark:group-hover:text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.9 10.96.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.21.7-3.89-1.55-3.89-1.55-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.74 1.27 3.41.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.09-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.63.23 2.83.11 3.13.75.8 1.2 1.83 1.2 3.09 0 4.43-2.71 5.41-5.29 5.69.42.36.8 1.06.8 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56 4.6-1.53 7.9-5.86 7.9-10.96C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{siteConfig.name}</span>
    </a>
  )
}
