'use client'

import { ClipboardIcon } from 'lucide-react'
import { toast } from 'sonner'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useCopyToClipboard } from '@/lib/actions/copy-to-clipboard'
import { env } from '@/lib/env.mjs'

interface CopyLinkProps {
  slug: string
  className?: string
}

export function CopyLinkDropdown(props: CopyLinkProps) {
  const [, copy] = useCopyToClipboard()
  const url = env.NEXT_PUBLIC_URL

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success('Link copied to clipboard', {
          description: `${text}`
        })
      })
      .catch(error => {
        toast.error(
          'An unexpected error has occurred. Please try again later.',
          {
            description: error instanceof Error ? error.message : ''
          }
        )
      })
  }

  return (
    <DropdownMenuItem onClick={handleCopy(`${url}/${props.slug}`)}>
      <ClipboardIcon className="size-4" />
      <span>Copy to clipboard</span>
    </DropdownMenuItem>
  )
}
