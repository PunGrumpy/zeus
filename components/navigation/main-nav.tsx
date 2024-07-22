'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-4 flex items-center space-x-2 transition-opacity hover:opacity-80 lg:mr-6 rtl:space-x-reverse"
      >
        <Icons.logo className="size-5" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
        <Badge
          variant="outline"
          className="hidden cursor-pointer rounded-xl font-mono lg:inline-block"
        >
          Beta
        </Badge>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/dashboard' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/setting"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/dashboard/setting'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Setting
        </Link>
      </nav>
    </div>
  )
}
