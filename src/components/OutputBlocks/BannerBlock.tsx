import HelpBlock from './HelpBlock'
import { siteConfig } from '@/config/siteConfig'

interface BannerBlockProps {
  content?: string
}

// Default ASCII art - can be customized in the future
// You can generate your own ASCII art at https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type+Something+&x=none&v=4&h=4&w=80&we=false
const ASCII_ART = String.raw`
$$$$$$$$\                                $$\                     $$\       $$$$$$$\                       $$\      $$$$$$\        $$\ $$\           
\__$$  __|                               \__|                    $$ |      $$  __$$\                      $$ |    $$  __$$\       $$ |\__|          
   $$ | $$$$$$\   $$$$$$\  $$$$$$\$$$$\  $$\ $$$$$$$\   $$$$$$\  $$ |      $$ |  $$ | $$$$$$\   $$$$$$\ $$$$$$\   $$ /  \__|$$$$$$\  $$ |$$\  $$$$$$\  
   $$ |$$  __$$\ $$  __$$\ $$  _$$  _$$\ $$ |$$  __$$\  \____$$\ $$ |      $$$$$$$  |$$  __$$\ $$  __$$\\_$$  _|  $$$$$\   $$  __$$\ $$ |$$ |$$  __$$\ 
   $$ |$$$$$$$$ |$$ |  \__|$$ / $$ / $$ |$$ |$$ |  $$ | $$$$$$$ |$$ |      $$  ____/ $$ /  $$ |$$ |  \__| $$ |    $$  __|  $$ /  $$ |$$ |$$ |$$ /  $$ |
   $$ |$$   ____|$$ |      $$ | $$ | $$ |$$ |$$ |  $$ |$$  __$$ |$$ |      $$ |      $$ |  $$ |$$ |       $$ |$$\ $$ |     $$ |  $$ |$$ |$$ |$$ |  $$ |
   $$ |\$$$$$$$\ $$ |      $$ | $$ | $$ |$$ |$$ |  $$ |\$$$$$$$ |$$ |      $$ |      \$$$$$$  |$$ |       \$$$$  |$$ |     \$$$$$$  |$$ |$$ |\$$$$$$  |
   \__| \_______|\__|      \__| \__| \__|\__|\__|  \__| \_______|\__|      \__|       \______/ \__|        \____/ \__|      \______/ \__|\__| \______/ 
`.trim()

export default function BannerBlock({ content }: BannerBlockProps) {
  return (
    <div className="my-4">
      <div className="text-left">
        <pre
          className="
            inline-block
            font-mono font-bold
            text-[5px] leading-[5px]
            whitespace-pre
            bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600
            bg-clip-text text-transparent
          "
        >
          {ASCII_ART}
        </pre>

        <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
          Welcome to {siteConfig.name}&apos;s portfolio! Type some commands to explore more.
        </div>
      </div>

      {content && <HelpBlock content={content} />}
    </div>
  )
}