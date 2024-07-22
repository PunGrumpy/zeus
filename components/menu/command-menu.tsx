'use client'

import { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import { LucideIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { pageConfig } from '@/config/page'
import { cn } from '@/lib/utils'
import { MainNavItem } from '@/types/nav'

export function CommandMenu({ ...props }: AlertDialogProps) {
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()
  const [isMac, setIsMac] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen(prevOpen => !prevOpen)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  React.useEffect(() => {
    setIsMac(navigator.userAgent.toLowerCase().includes('mac'))
  }, [])

  const handleCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const renderNavItems = React.useCallback(
    (items: MainNavItem[]) => {
      return items.map(item => {
        const Icon = item.icon as
          | LucideIcon
          | React.ComponentType<{ className?: string }>
          | undefined
        return (
          <CommandItem
            key={item.href || item.param}
            value={item.title}
            onSelect={() => {
              if (item.href) {
                handleCommand(() =>
                  window.open(item.href, item.external ? '_blank' : '_self')
                )
              } else if (item.param) {
                handleCommand(() =>
                  setTheme(item.param as 'light' | 'dark' | 'system')
                )
              }
            }}
          >
            {Icon && <Icon className="mr-2 size-4" />}
            {item.title}
          </CommandItem>
        )
      })
    },
    [handleCommand, setTheme]
  )

  const General = React.useMemo(
    () => renderNavItems(pageConfig.general),
    [renderNavItems]
  )
  const Themes = React.useMemo(
    () => renderNavItems(pageConfig.theme),
    [renderNavItems]
  )
  const Documentation = React.useMemo(
    () => pageConfig.documentation && renderNavItems(pageConfig.documentation),
    [renderNavItems]
  )
  const Socials = React.useMemo(
    () => pageConfig.social && renderNavItems(pageConfig.social),
    [renderNavItems]
  )

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-8 w-full justify-start rounded-lg bg-background/50 text-sm font-normal text-muted-foreground shadow-none backdrop-blur-sm sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="General">{General}</CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">{Themes}</CommandGroup>
          {Documentation && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Documentation">
                {Documentation}
              </CommandGroup>
            </>
          )}
          {Socials && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Social">{Socials}</CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
