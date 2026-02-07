'use client'

import { motion } from 'framer-motion'
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  MessageCircle,
  LucideIcon
} from 'lucide-react'
import { TikTokIcon } from '@/components/icons/TikTokIcon'

interface SocialLink {
  name: string
  href: string
  icon: LucideIcon | React.ComponentType<{ className?: string }>
  color: string
}

const socials: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/gbakidigital',
    icon: Twitter,
    color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/gbakidigital',
    icon: Facebook,
    color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/gbakidigital',
    icon: Instagram,
    color: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/gbakidigital',
    icon: Linkedin,
    color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@gbakidigital',
    icon: Youtube,
    color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/1234567890',
    icon: MessageCircle,
    color: 'hover:text-[#25D366] hover:bg-[#25D366]/10',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@gbakidigital',
    icon: TikTokIcon,
    color: 'hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10',
  },
]

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socials.map((social, index) => {
        const Icon = social.icon
        
        return (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color}`}
            aria-label={social.name}
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        )
      })}
    </div>
  )
}

