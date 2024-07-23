'use client'

import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '@/config/site'

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-4 flex items-center space-x-2 transition-opacity hover:opacity-80 lg:mr-6 rtl:space-x-reverse"
      >
        <Icons.logo className="size-5" />
        <span className="hidden text-2xl font-bold lg:inline-block">
          {siteConfig.name}
        </span>
        <Badge
          variant="outline"
          className="hidden cursor-pointer rounded-xl font-mono lg:inline-block"
        >
          Beta
        </Badge>
      </Link>
    </div>
  )
}
