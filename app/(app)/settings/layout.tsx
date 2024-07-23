import type { ReactNode } from 'react'

import { SubMainNav } from '@/components/navigation/submain-nav'

interface SettingsLayoutProps {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <SubMainNav />
      <main className="container my-6 flex max-w-screen-2xl items-center">
        {children}
      </main>
    </>
  )
}
