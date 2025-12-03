'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/siteConfig'

export default function ResumePage() {
  const [targetUrl, setTargetUrl] = useState<string | null>(null)
  const [missingConfig, setMissingConfig] = useState(false)

  useEffect(() => {
    const configuredUrl = process.env.NEXT_PUBLIC_RESUME_URL || siteConfig.resumeUrl || ''

    if (!configuredUrl) {
      setMissingConfig(true)
      return
    }

    setTargetUrl(configuredUrl)
    window.location.href = configuredUrl
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{missingConfig ? 'Resume link missing' : 'Redirecting to resume...'}</h1>
        {missingConfig ? (
          <p className="text-gray-400">
            Please set <code>NEXT_PUBLIC_RESUME_URL</code> in your environment or provide <code>resumeUrl</code> in
            <code>src/config/siteConfig.ts</code> to enable this page.
          </p>
        ) : (
          <p className="text-gray-400">
            If you are not redirected automatically,{' '}
            {targetUrl && (
              <a href={targetUrl} className="text-blue-400 underline">
                click here
              </a>
            )}
          </p>
        )}
      </div>
    </div>
  )
}