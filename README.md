# Terminal Personal Website Template

An interactive terminal-style personal website that uses commman line inputs to display personal information. Built with Next.js 15 and Tailwind CSS.
Create your own unique personal website with a retro command-line interface! Check https://ruoxiangxu.com for live demo.

## Disclaimer
This website was completely developed using **vibe coding** approach:
- **Claude Code** - Primary code development and architecture
- **GPT-5.1-Codex** - Bug fixes and additional feature implementation

## ✨ Features

- 🖥️ **MacOS-style Terminal UI** - Beautiful terminal interface with boot sequence animation
- ⌨️ **Interactive Command System** - Full-featured terminal with command history and autocomplete
- 🎯 **Customizable Commands** - Easy-to-configure command system
- 🔄 **History Navigation** - Navigate command history with ⬆/⬇ arrow keys
- ✅ **Tab Autocompletion** - Tab key autocompletes commands with ghost text preview
- 🎭 **Multiple Output Types** - Support for text, banners, markdown, animations, and redirects
- ⚡ **Built with Next.js 15** - Modern React framework with App Router
- 🎨 **Styled with Tailwind CSS** - Utility-first CSS framework

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

1. Clone this repository:
```bash
git clone https://github.com/RuoxiangXu/terminal-personal-website.git
cd terminal-personal-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy `siteConfig.example.ts` to `src/config/siteConfig.ts` (if needed) and update it with your details.

4. (Optional) Copy `.env.example` to `.env.local` and set any environment variables such as `NEXT_PUBLIC_RESUME_URL`.

5. Start the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## ⚙️ Configuration

### Site Configuration

Edit `src/config/siteConfig.ts` to customize your site:

```typescript
export const siteConfig: SiteConfig = {
  name: 'Your Name',
  title: 'terminal@yourname.com',
  description: 'Your personal website description',
  resumeUrl: 'https://example.com/resume.pdf', // Optional fallback if env var is not set
  
  email: {
    primary: 'your.email@example.com',
  },
  
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
  
  about: {
    greeting: 'Hi there! I\'m [Your Name]',
    bio: 'Your bio goes here...',
  },
  
  education: [
    {
      institution: 'Your University',
      degree: 'Your Degree',
      period: '2020 - 2024',
      // ... more fields
    }
  ],
}
```

### Available Commands

The template includes these built-in commands:
- `help` - Show available commands
- `banner` - Display welcome banner
- `about` - Learn about you
- `edu` - View education background
- `contact` - Get contact information
- `resume` - Display resume (customizable)
- `github` - Visit GitHub profile
- `linkedin` - Visit LinkedIn profile
- `clear` - Clear the terminal
- `coffee` - Brew some coffee (animated)
- `matrix` - Matrix effect

You can customize commands in `src/config/commands.ts`.

### Environment Variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_RESUME_URL` – Public URL to your resume PDF or hosted doc. Used by the `/resume` page and the `resume` command. If omitted, the app will fall back to `siteConfig.resumeUrl` or show a helpful warning.

## 🎨 Customization

### Adding Custom Commands

Edit `src/config/commands.ts`:

```typescript
export const commands: Command[] = [
  // ... existing commands
  {
    name: 'mycommand',
    description: 'My custom command',
    handler: () => ({
      type: 'text',
      content: 'Your custom content here'
    })
  }
]
```

### Styling

- Global styles: `src/styles/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles are inline with Tailwind classes

## 📦 Build & Deployment

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm start
```

### Deploy to GitHub Pages

1. (Optional) Copy `public/CNAME.example` to `public/CNAME` and add your custom domain before publishing.
2. Run `pnpm build` to generate the static `out/` folder.
3. Upload the `out/` folder to GitHub Pages (or your preferred static host) using your own workflow or manual deployment. This template does not include a GitHub Actions workflow by default.

The site is configured for static export and can be deployed to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

> **Project Pages note:** If you deploy to `https://username.github.io/<repo>` (GitHub Project Pages), update `basePath` and `assetPrefix` in `next.config.mjs` to match `/<repo>` before building so relative assets resolve correctly.

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## ⭐ Support This Project

If this template saves you time or sparks ideas, please consider giving the repository a star. This helps a lot. Thank you!

## 📝 License

MIT License - feel free to use this template for your own personal website!
