'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { navItems } from '@/config/nav'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

interface MainNavProps {
  type?: 'guest' | 'client'
  className?: string
}

interface NavItemProps {
  id: string
  label: string
  path: string
  isActive: boolean
  isHovered: boolean
  onClick: () => void
  onHover: () => void
  onLeave: () => void
}

const GuestNav = ({ className }: MainNavProps) => (
  <nav className={cn('mr-4 hidden md:flex', className)}>
    <Link
      href="/"
      className="mr-4 flex items-center space-x-2 transition-opacity hover:opacity-80 lg:mr-6 rtl:space-x-reverse"
    >
      <Icons.logo className="size-5" />
      <span className="inline-block text-2xl font-bold">{siteConfig.name}</span>
      <Badge
        variant="outline"
        className="hidden cursor-pointer rounded-xl font-mono lg:inline-block"
      >
        Beta
      </Badge>
    </Link>
  </nav>
)

const NavItem = ({
  label,
  path,
  isActive,
  isHovered,
  onClick,
  onHover,
  onLeave
}: NavItemProps) => (
  <li
    onClick={onClick}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className="relative px-4 py-2"
  >
    <Link
      href={path}
      className={`relative z-20 ${
        isActive ? 'text-primary' : 'text-muted-foreground'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
    {isHovered && (
      <motion.span
        layoutId="hover"
        transition={{ type: 'spring', duration: 0.4 }}
        className="absolute inset-x-0 inset-y-1 rounded-md bg-muted/30"
      />
    )}
    {isActive && (
      <motion.span
        layoutId="active"
        transition={{ type: 'spring', duration: 0.5 }}
        className="absolute inset-0 z-10 border-b-2 border-primary"
      />
    )}
  </li>
)

const ClientNav = ({ className }: MainNavProps) => {
  const pathname = usePathname()
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null)

  const activeNavItem = useMemo(() => {
    return (
      navItems.find(item => pathname?.startsWith(item.href || '/'))?.title ||
      null
    )
  }, [pathname])

  const handleNavItemClick = useCallback(() => {
    setHoveredNavItem(null)
  }, [])

  const handleNavItemHover = useCallback((navId: string) => {
    setHoveredNavItem(navId)
  }, [])

  const handleNavItemMouseLeave = useCallback(() => {
    setHoveredNavItem(null)
  }, [])

  return (
    <nav
      className={cn(
        'mx-auto flex items-center justify-between border-b border-border',
        className
      )}
      aria-label="Sub navigation"
    >
      <ul className="container flex max-w-screen-2xl">
        {navItems.map(nav => (
          <NavItem
            key={nav.title}
            id={nav.title}
            label={nav.title}
            path={nav.href || '/'}
            isActive={activeNavItem === nav.title}
            isHovered={hoveredNavItem === nav.title}
            onClick={handleNavItemClick}
            onHover={() => handleNavItemHover(nav.title)}
            onLeave={handleNavItemMouseLeave}
          />
        ))}
      </ul>
    </nav>
  )
}

export function MainNav({ type = 'guest' }: MainNavProps) {
  return type === 'guest' ? <GuestNav /> : <ClientNav />
}
