import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'
import { ThemeProvider } from '@/providers/theme-provider'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { OrganizationSchema } from '@/components/seo/JsonLd'
import { AuthProvider } from '@/providers/auth-provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Optimize font loading
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gbakidigital.com'),
  title: {
    default: 'Gbaki Digital Solutions - Business Incubator for African Immigrants',
    template: '%s | Gbaki Digital Solutions',
  },
  description: 'Launch your US business in 30 days. Complete LLC formation, professional website, AI chatbot, and ongoing support for African immigrant entrepreneurs.',
  keywords: [
    'LLC formation',
    'business incubator',
    'African immigrants',
    'US business',
    'website builder',
    'AI chatbot',
    'immigrant entrepreneurs',
    'Nigerian business USA',
    'Ethiopian business USA',
    'Ghanaian business USA',
  ],
  authors: [{ name: 'Gbaki Digital Solutions' }],
  creator: 'Gbaki Digital Solutions',
  publisher: 'Gbaki Digital Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gbakidigital.com',
    title: 'Gbaki Digital Solutions - Business Incubator for African Immigrants',
    description: 'Launch your US business in 30 days. Complete LLC formation, professional website, AI chatbot, and ongoing support.',
    siteName: 'Gbaki Digital Solutions',
    images: [
      {
        url: 'https://gbakidigital.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gbaki Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gbaki Digital Solutions - Business Incubator for African Immigrants',
    description: 'Launch your US business in 30 days. Complete LLC formation, professional website, AI chatbot, and ongoing support.',
    site: '@gbakidigital',
    creator: '@gbakidigital',
    images: ['https://gbakidigital.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22c55e' },
    { media: '(prefers-color-scheme: dark)', color: '#16a34a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        {/* Schema Markup */}
        <OrganizationSchema
          name="Gbaki Digital Solutions"
          description="Business Incubator for African Immigrants"
          url="https://gbakidigital.com"
          logo="https://gbakidigital.com/logo.png"
          sameAs={[
            'https://twitter.com/gbakidigital',
            'https://facebook.com/gbakidigital',
            'https://linkedin.com/company/gbakidigital',
            'https://instagram.com/gbakidigital',
          ]}
          address={{
            streetAddress: '123 Tech Street',
            addressLocality: 'Elkridge',
            addressRegion: 'MD',
            postalCode: '21075',
            addressCountry: 'US',
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <CookieConsent />
            <Toaster />
            <SonnerToaster position="top-right" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
