import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { auth } from '@/auth'
import { CommandMenu } from '@/components/menu/command-menu'
import { DropdownMenuClient } from '@/components/menu/dropdown-menu'
import { MainNav } from '@/components/navigation/main-nav'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { HeaderAnimated } from '@/components/ui/header-animated'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export async function Header() {
  const session = await auth()

  return (
    <HeaderAnimated>
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