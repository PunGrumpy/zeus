'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

import { Icons } from '@/components/icons'
import { CommandMenu } from '@/components/menu/command-menu'
import { DropdownMenuClient } from '@/components/menu/dropdown-menu'
import { MainNav } from '@/components/navigation/main-nav'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { HeaderAnimated } from '@/components/ui/header-animated'
import { protectedRoutes } from '@/config/route'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

interface HeaderProps {
  session?: Session | null
}

const HeaderGuest = ({ session }: HeaderProps) => {
  return (
    <HeaderAnimated className="sticky top-0 z-50">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center space-x-2">
            <div className="items-center md:flex">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: 'ghost'
                    }),
                    'w-9 px-0'
                  )}
                >
                  <GitHubLogoIcon className="size-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <ThemeToggle />
            </div>
            <div className="flex items-center space-x-2">
              {!session ? (
                <>
                  <Link href="/auth/login" className={cn(buttonVariants())}>
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  <DropdownMenuClient session={session} />
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </HeaderAnimated>
  )
}

export function HeaderClient({ session }: HeaderProps) {
  const pathname = usePathname()
  const isProtectedRoute = protectedRoutes.includes(pathname)

  return (
    <>
      {isProtectedRoute ? (
        <>
          <HeaderAnimated>
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="mr-4 flex items-center space-x-2 transition-opacity hover:opacity-80 lg:mr-6 rtl:space-x-reverse"
                >
                  <Icons.logo className="size-5" />
                  <span className="inline-block text-2xl font-bold">
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
              <div className="flex flex-1 items-center justify-end space-x-2">
                <nav className="flex items-center space-x-2">
                  <div className="items-center md:flex">
                    <Link
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div
                        className={cn(
                          buttonVariants({
                            variant: 'ghost'
                          }),
                          'w-9 px-0'
                        )}
                      >
                        <GitHubLogoIcon className="size-5" />
                        <span className="sr-only">GitHub</span>
                      </div>
                    </Link>
                    <ThemeToggle />
                  </div>
                  <div className="flex items-center space-x-2">
                    {session && <DropdownMenuClient session={session} />}
                  </div>
                </nav>
              </div>
            </div>
          </HeaderAnimated>
          <div className="rgba(var(--background), 0.9) sticky top-0 z-50 backdrop-blur">
            <MainNav type="client" />
          </div>
        </>
      ) : (
        <HeaderGuest session={session} />
      )}
    </>
  )
}
