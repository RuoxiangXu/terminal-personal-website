/**
 * Site Configuration
 * 
 * This file contains all the personalizable information for your terminal website.
 * Update these values to customize the site for yourself.
 */

export interface SiteConfig {
  // Basic Information
  name: string
  title: string
  description: string
  
  // Contact Information
  email: {
    primary: string
    secondary?: string
    university?: string
  }
  phone: {
    primary?: string
    secondary?: string
  }
  
  // Social Links
  social: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  
  // About Section
  about: {
    greeting: string
    bio: string
    closing?: string
  }
  
  // Education Background
  education?: Array<{
    institution: string
    degree: string
    period: string
    gpa?: string
    focus?: string
    awards?: string
  }>
  
  // Domain (for CNAME file in GitHub Pages)
  domain?: string

  // Optional resume PDF URL used by the /resume route and resume command
  resumeUrl?: string
}

// TODO: Update this configuration with your own information
export const siteConfig: SiteConfig = {
  // Basic Information
  name: 'Your Name',
  title: 'terminal@yourname.com',
  description: 'Interactive CLI-style personal portfolio',
  
  // Contact Information
  email: {
    primary: 'your.email@example.com',
    secondary: 'secondary@example.com',
    university: 'your.university.email@edu',
  },
  phone: {
    primary: '+1 (123) 456-7890',
    secondary: '+86 123-4567-8901',
  },
  
  // Social Links
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
  
  // About Section
  about: {
    greeting: 'Hi there! I\'m [Your Name]',
    bio: `This is where you write your bio. Tell people about yourself, your interests, and what you do.
    
You can write multiple paragraphs here. Share your passions, skills, and what makes you unique.`,
    closing: 'Type \'contact\' to get in touch!',
  },
  
  // Education Background (optional)
  education: [
    {
      institution: 'Your University',
      degree: 'Bachelor/Master of Science in Computer Science',
      period: '2020.9 - 2024.6',
      gpa: '3.8/4.0',
      focus: 'Software Engineering, AI/ML',
      awards: 'Dean\'s List, Outstanding Student Award',
    },
    // Add more education entries as needed
  ],
  
  // Domain for GitHub Pages (optional)
  domain: undefined, // e.g., 'yourname.com'

  // Resume link (optional)
  resumeUrl: undefined,
}

// Internal helper to derive a domain/identifier used across the terminal UI
const getTerminalDomain = () => {
  const trimmedDomain = siteConfig.domain?.trim()
  if (trimmedDomain) return trimmedDomain

  const titleDomain = siteConfig.title?.replace(/^terminal@/i, '').trim()
  if (titleDomain) return titleDomain

  const emailDomain = siteConfig.email.primary?.split('@')[1]?.trim()
  if (emailDomain) return emailDomain

  // Fallback to a sanitized version of the name if nothing else is available
  return siteConfig.name.toLowerCase().replace(/\s+/g, '-')
}

// Helper function to get the full name for display
export const getDisplayName = () => siteConfig.name

// Helper functions for consistent terminal labels
export const getTerminalPrompt = () => `guest@${getTerminalDomain()}`
export const getTerminalTitle = () => `terminal@${getTerminalDomain()}`
export const getTerminalDomainLabel = () => getTerminalDomain()
