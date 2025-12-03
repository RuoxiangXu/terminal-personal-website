/**
 * Site Configuration Example
 * 
 * Copy this file content to src/config/siteConfig.ts and update with your information.
 */

export const siteConfig = {
  // Basic Information
  name: 'John Doe',
  title: 'terminal@johndoe.dev',
  description: 'Full-stack developer passionate about building elegant solutions',
  
  // Contact Information
  email: {
    primary: 'john.doe@example.com',
    secondary: 'johndoe.dev@gmail.com',
    university: 'jdoe@university.edu',
  },
  phone: {
    primary: '+1 (555) 123-4567',
    secondary: '+44 20 1234 5678',
  },
  
  // Social Links
  social: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
  
  // About Section
  about: {
    greeting: 'Hi there! I\'m John Doe',
    bio: `I'm a full-stack developer with a passion for creating elegant and efficient solutions.

My expertise spans across modern web technologies, cloud infrastructure, and AI/ML applications. I love building products that make a difference.

When I'm not coding, you'll find me hiking, reading sci-fi novels, or experimenting with new recipes in the kitchen.`,
    closing: 'Type \'contact\' to get in touch!',
  },
  
  // Education Background
  education: [
    {
      institution: 'Stanford University',
      degree: 'Master of Science in Computer Science',
      period: '2022 - 2024',
      gpa: '3.9/4.0',
      focus: 'Artificial Intelligence, Machine Learning',
      awards: 'Dean\'s List, Research Excellence Award',
    },
    {
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      period: '2018 - 2022',
      gpa: '3.8/4.0',
      focus: 'Software Engineering, Algorithms',
      awards: 'Cum Laude, Outstanding Senior Project',
    },
  ],
  
  // Domain for GitHub Pages
  domain: 'johndoe.dev', // Or undefined if not using custom domain

  // Resume link referenced by the /resume route
  resumeUrl: 'https://example.com/resume.pdf',
}
