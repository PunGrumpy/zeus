import { LucideIcon } from 'lucide-react'
import React from 'react'

export interface BaseNavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: LucideIcon | React.ComponentType<{ className?: string }>
  param?: string
}

export type MainNavItem = BaseNavItem

export interface SettingsNavItem extends React.HTMLAttributes<HTMLElement> {
  items: BaseNavItem[]
}

export type NavItem = BaseNavItem
