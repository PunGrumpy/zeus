import type { ReactNode } from 'react'

interface SettingsLayoutProps {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <main className="container my-6 flex max-w-screen-2xl items-center">
        {children}
      </main>
    </>
  )
}
