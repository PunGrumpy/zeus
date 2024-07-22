'use client'

import { ExitIcon } from '@radix-ui/react-icons'
import { LayoutDashboardIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DropdownMenuClientProps {
  session: Session
}

export function DropdownMenuClient({ session }: DropdownMenuClientProps) {
  const user = session?.user
  const name = user?.name ?? 'Zeus Admin'
  const email = user?.email ?? 'example@zeus.god'
  const image = user?.image ?? 'https://avatar.tobi.sh/zeus'

  const avatarFallback = name.charAt(0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar title="User avatar" className="size-8 cursor-pointer">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <span className="text-base">{name}</span>
            <span className="text-sm font-light text-muted-foreground">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            redirect('/dashboard')
          }}
          className="cursor-pointer"
        >
          Dashboard
          <DropdownMenuShortcut>
            <LayoutDashboardIcon className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            toast.promise(signOut(), {
              loading: 'Signing out...',
              success: 'Signed out successfully',
              error: 'Failed to sign out'
            })
          }}
          className="cursor-pointer"
        >
          Sign out
          <DropdownMenuShortcut>
            <ExitIcon className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
