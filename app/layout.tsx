import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ]
}

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_VERCEL_URL
    ? new URL(`${process.env.NEXT_PUBLIC_VERCEL_URL}`)
    : new URL('http://localhost:3000'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  robots: 'follow, index',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-dark.ico'
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-light.ico'
      }
    ],
    shortcut: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-dark.ico'
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-light.ico'
      }
    ],
    apple: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/apple-touch-icon-dark.png'
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/apple-touch-icon-light.png'
      }
    ]
  },
  openGraph: {
    title: siteConfig.name,
    siteName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: '/twitter-card.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ],
    site: '@papertrail'
  },
  applicationName: siteConfig.name,
  generator: 'Papertrail'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable,
          'min-h-screen'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div>
              <div className="relative flex min-h-screen flex-col bg-background">
                {children}
                <Analytics />
              </div>
            </div>
            <Toaster position="bottom-right" containerAriaLabel="Toaster" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
