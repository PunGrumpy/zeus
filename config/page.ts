import {
  BugIcon,
  HeartHandshakeIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MonitorIcon,
  MoonIcon,
  SettingsIcon,
  SproutIcon,
  SunIcon,
  TelescopeIcon
} from 'lucide-react'

import { Icons } from '@/components/icons'
import { MainNavItem } from '@/types/nav'

interface PagesConfig {
  general: MainNavItem[]
  theme: MainNavItem[]
  documentation?: MainNavItem[]
  social?: MainNavItem[]
}

export const pageConfig: PagesConfig = {
  general: [
    {
      title: 'Home',
      href: '/',
      icon: HomeIcon
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboardIcon
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: SettingsIcon
    }
  ],
  theme: [
    {
      title: 'Light Theme',
      param: 'light',
      icon: SunIcon
    },
    {
      title: 'Dark Theme',
      param: 'dark',
      icon: MoonIcon
    },
    {
      title: 'System Theme',
      param: 'system',
      icon: MonitorIcon
    }
  ],
  documentation: [
    {
      title: 'Getting Started',
      href: 'https://github.com/PunGrumpy/zeus?tab=readme-ov-file#-getting-started',
      icon: SproutIcon
    },
    {
      title: 'Roadmap',
      href: 'https://github.com/PunGrumpy/zeus?tab=readme-ov-file#-roadmap',
      icon: TelescopeIcon
    },
    {
      title: 'Contributing',
      href: 'https://github.com/PunGrumpy/zeus?tab=readme-ov-file#%EF%B8%8F-contributing',
      icon: HeartHandshakeIcon
    },
    {
      title: 'Report a Bug',
      href: 'https://github.com/PunGrumpy/zeus/issues/new/choose',
      icon: BugIcon
    }
  ],
  social: [
    {
      title: 'GitHub Repository',
      href: 'https://github.com/PunGrumpy/zeus',
      icon: Icons.github
    }
  ]
}
