import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <main className="container my-16 flex max-w-screen-2xl items-center">
        {children}
      </main>
    </>
  )
}
