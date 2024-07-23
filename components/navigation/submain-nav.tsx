'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import { navItems } from '@/config/nav'

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
        className="absolute inset-0 rounded-lg bg-background/50"
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

export function SubMainNav() {
  const pathname = usePathname()
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null)

  const activeNavItem = useMemo(() => {
    return (
      navItems.find(item => pathname?.startsWith(item.href || '/'))?.title ||
      null
    )
  }, [pathname])

  const handleNavItemClick = useCallback((navId: string) => {
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
      className="mx-auto mt-2 flex items-center justify-between border-b border-border"
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
            onClick={() => handleNavItemClick(nav.title)}
            onHover={() => handleNavItemHover(nav.title)}
            onLeave={handleNavItemMouseLeave}
          />
        ))}
      </ul>
    </nav>
  )
}
