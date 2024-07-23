'use client'

import Link from 'next/link'

import { Announcement } from '@/components/announcement'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8"
    >
      <div className="inline-flex h-6 animate-fade-in items-center opacity-0 backdrop-blur transition-all ease-in">
        <Announcement />
      </div>
      <h1 className="-translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-primary from-30% to-primary/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] sm:text-6xl md:text-7xl lg:text-8xl">
        Harness the Power of Zeus for Your Links
      </h1>
      <p className="mb-12 -translate-y-4 animate-fade-in text-balance text-lg tracking-tight text-muted-foreground opacity-0 [--animation-delay:400ms] md:text-xl">
        Unleash the thunderbolt of efficiency with our divine URL shortener.
        Forge legendary links,
        <br className="hidden md:block" />
        command insightful analytics, and reign supreme over your digital
        domain—all with the might of Zeus.
      </p>
      <div className="-translate-y-4 animate-fade-in space-x-2 opacity-0 [--animation-delay:600ms]">
        <Link href="/dashboard" className={cn(buttonVariants())}>
          Get Started
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({
              variant: 'outline'
            })
          )}
        >
          GitHub
        </Link>
      </div>
    </section>
  )
}
