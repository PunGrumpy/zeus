import type { ReactNode } from 'react'

import { SubMainNav } from '@/components/navigation/submain-nav'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <main className="container my-6 flex max-w-screen-2xl items-center">
        {children}
      </main>
    </>
  )
}
