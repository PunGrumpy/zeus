'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface HeaderAnimatedProps {
  children: React.ReactNode
  className?: string
}

export function HeaderAnimated(props: HeaderAnimatedProps) {
  const { children, className } = props

  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 1])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClasses = cn(
    'sticky top-0 z-50 w-full border-b transition-all duration-200',
    isScrolled
      ? 'border-border/40 backdrop-blur'
      : 'border-transparent bg-transparent'
  )

  return (
    <motion.header
      className={cn(headerClasses, className)}
      style={{
        opacity: headerOpacity,
        backgroundColor: useTransform(
          scrollY,
          [0, 50],
          ['rgba(var(--background), 0)', 'rgba(var(--background), 0.9)']
        )
      }}
    >
      {children}
    </motion.header>
  )
}
