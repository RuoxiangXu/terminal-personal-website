import { Command } from '@/lib/types'
import { siteConfig } from './siteConfig'

const buildCommandList = () =>
  commands
    .filter(cmd => !cmd.aliases?.includes(cmd.name))
    .map(cmd => `  ${cmd.name.padEnd(12)} - ${cmd.description}`)
    .join('\n')

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Show available commands',
    handler: () => ({
      type: 'help',
      content: buildCommandList()
    })
  },
  {
    name: 'banner',
    description: 'Display welcome banner',
    handler: () => ({
      type: 'banner',
      content: buildCommandList()
    })
  },
  {
    name: 'about',
    description: 'Learn about me',
    handler: () => ({
      type: 'text',
      content: `${siteConfig.about.greeting}

${siteConfig.about.bio}${siteConfig.about.closing ? '\n\n' + siteConfig.about.closing : ''}`
    })
  },
  {
    name: 'edu',
    description: 'View education background',
    handler: () => {
      if (!siteConfig.education || siteConfig.education.length === 0) {
        return {
          type: 'text',
          content: 'No education information configured yet.'
        }
      }
      
      const eduEntries = siteConfig.education.map(edu => {
        let entry = `🎓 ${edu.institution} (${edu.period})\n   ${edu.degree}`
        if (edu.gpa) entry += `\n   GPA: ${edu.gpa}`
        if (edu.focus) entry += `\n   Focus: ${edu.focus}`
        if (edu.awards) entry += `\n   Awards: ${edu.awards}`
        return entry
      }).join('\n\n')
      
      return {
        type: 'text',
        content: `Education Background
========================================
${eduEntries}
========================================`
      }
    }
  },
  {
    name: 'contact',
    description: 'Get in touch',
    handler: () => {
      let contactInfo = 'Contact Information\n========================================'
      
      if (siteConfig.phone.primary || siteConfig.phone.secondary) {
        contactInfo += '\n'
        if (siteConfig.phone.primary) contactInfo += `\n📱 Phone: ${siteConfig.phone.primary}`
        if (siteConfig.phone.secondary) contactInfo += `\n📱 Phone (Alt): ${siteConfig.phone.secondary}`
      }
      
      contactInfo += '\n'
      if (siteConfig.email.university) contactInfo += `\n📧 Email (University): ${siteConfig.email.university}`
      contactInfo += `\n📧 Email: ${siteConfig.email.primary}`
      if (siteConfig.email.secondary) contactInfo += `\n📧 Email (Alt): ${siteConfig.email.secondary}`
      
      contactInfo += '\n\nFeel free to reach out for collaborations or opportunities!'
      
      const socialLinks = []
      if (siteConfig.social.github) socialLinks.push('github')
      if (siteConfig.social.linkedin) socialLinks.push('linkedin')
      if (socialLinks.length > 0) {
        contactInfo += `\n\nType '${socialLinks.join('\' or \'')}' to visit my profiles.`
      }
      
      return {
        type: 'text',
        content: contactInfo
      }
    }
  },
  {
    name: 'resume',
    description: 'Display my resume',
    handler: () => {
      const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || siteConfig.resumeUrl

      if (!resumeUrl) {
        return {
          type: 'text',
          content: `Resume link not configured.

Set NEXT_PUBLIC_RESUME_URL in your environment or provide siteConfig.resumeUrl. Then rerun this command.`
        }
      }

      return {
        type: 'countdown-redirect',
        content: resumeUrl
      }
    }
  },
  {
    name: 'github',
    description: 'Visit my GitHub profile',
    handler: () => {
      if (!siteConfig.social.github) {
        return {
          type: 'text',
          content: 'GitHub profile not configured. Please update siteConfig.social.github in src/config/siteConfig.ts'
        }
      }
      return {
        type: 'countdown-redirect',
        content: siteConfig.social.github
      }
    }
  },
  {
    name: 'linkedin',
    description: 'Visit my LinkedIn profile',
    handler: () => {
      if (!siteConfig.social.linkedin) {
        return {
          type: 'text',
          content: 'LinkedIn profile not configured. Please update siteConfig.social.linkedin in src/config/siteConfig.ts'
        }
      }
      return {
        type: 'countdown-redirect',
        content: siteConfig.social.linkedin
      }
    }
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    handler: () => ({
      type: 'text',
      content: ''
    })
  },
  {
    name: 'coffee',
    description: 'Brew some fresh coffee',
    handler: () => ({ type: 'coffee', content: '' })
  },
  {
    name: 'matrix',
    description: 'What will this command do?',
    handler: () => ({ type: 'matrix', content: '' })
  }
]
