import { HomeIcon } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default async function NotFoundPage() {
  const headersList = await headers()
  const domain = headersList.get('host')

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto text-center">
        <h1 className="mb-4 font-mono text-6xl font-bold tracking-tight lg:text-7xl">
          404
        </h1>
        <p className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">
          Page not found
        </p>
        <p className="mb-4 font-mono text-sm font-light">
          {`The page you're looking for doesn't exist on ${domain}`}
        </p>
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'flex items-center space-x-2'
            )}
          >
            <HomeIcon className="size-4" />
            <span>Go back home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
