import type { Links, LinkTags, Tags } from '@prisma/client'
import {
  ChevronDownIcon,
  CopyIcon,
  QrCodeIcon,
  SettingsIcon,
  TrashIcon
} from 'lucide-react'
import Link from 'next/link'

import { CopyLinkDropdown } from '@/components/dashboard/link/copy-link'
import { CopyQR } from '@/components/dashboard/link/copy-qr'
import { DeleteLink } from '@/components/dashboard/link/delete-link'
import { EditLink } from '@/components/dashboard/link/edit-link'
import { ShowClicks } from '@/components/dashboard/link/show-clicks-link'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn, formatDate } from '@/lib/utils'

interface CardLinkProps {
  linkInfo: Links
  linkTags: LinkTags[]
  tagsInfo: Tags[]
}

export function CardLink({ linkInfo, linkTags, tagsInfo }: CardLinkProps) {
  const cardTagsInfo = tagsInfo.filter(tag =>
    linkTags.some(linkTag => linkTag.tagId === tag.id)
  )

  return (
    <div className="flex w-full flex-col rounded-md border p-3 shadow-sm">
      <div className="mb-1 flex w-full items-center justify-between space-x-2">
        <Link
          href={`/${linkInfo.slug}`}
          className="block space-x-px overflow-hidden truncate font-medium transition-opacity duration-75 hover:opacity-80"
          passHref
        >
          <span className="text-sm opacity-40">/</span>
          <span>{linkInfo.slug}</span>
        </Link>
        <div className="flex items-center space-x-3">
          <ShowClicks
            numberOfClicks={linkInfo.clicks}
            lastDate={linkInfo.lastClicked}
            className="hidden border-r pr-2 md:flex"
          />
          {/* 
            Radix Dialog + DropdownMenu bug 🥺
            https://github.com/radix-ui/primitives/issues/1836
          */}
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger className="transition-opacity hover:opacity-75">
                <CopyIcon className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <CopyLinkDropdown slug={linkInfo.slug} />
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <QrCodeIcon className="size-4" />
                    <span>Copy QR Code</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <CopyQR linkInfo={linkInfo} />
          </Dialog>
          <EditLink
            trigger={
              <button className="transition-opacity hover:opacity-75">
                <SettingsIcon className="size-4" />
              </button>
            }
            link={linkInfo}
            linkTags={cardTagsInfo}
            allTags={tagsInfo}
          />
          <DeleteLink
            link={linkInfo}
            trigger={
              <button className="transition-opacity hover:opacity-75">
                <TrashIcon className="size-4" />
              </button>
            }
          />
        </div>
      </div>
      <p className="mb-2 truncate font-mono text-sm" title={linkInfo.url}>
        {linkInfo.url}
      </p>
      <Collapsible>
        <div className="flex items-center justify-between font-mono text-xs font-medium md:space-x-2">
          <div className="flex max-w-[75%] items-center space-x-2">
            {linkTags.length > 0 && (
              <div className="flex cursor-default items-center space-x-1">
                {linkTags.map(tag => {
                  const tagInfo = tagsInfo.find(t => t.id === tag.tagId)
                  return (
                    <span
                      key={tag.tagId}
                      className={cn(
                        'rounded-md border px-2 py-[0.5px] font-mono text-xs'
                      )}
                    >
                      {tagInfo?.name}
                    </span>
                  )
                })}
              </div>
            )}
            <p
              className="hidden truncate md:block"
              title={linkInfo.description ?? ''}
            >
              {linkInfo.description}
            </p>
            <CollapsibleTrigger className="flex items-center transition-colors md:hidden">
              <ChevronDownIcon className="size-4 md:mr-2" />
              <span>Info</span>
            </CollapsibleTrigger>
          </div>
          <p>{formatDate(linkInfo.createdAt)}</p>
        </div>
        <CollapsibleContent className="flex flex-col">
          <div className="my-2 p-2 shadow-sm">
            <ShowClicks
              numberOfClicks={linkInfo.clicks}
              lastDate={linkInfo.lastClicked}
            />
          </div>
          {linkInfo.description && (
            <div className="p-2 shadow-sm">
              <p
                className="text-pretty text-sm"
                title={linkInfo.description ?? ''}
              >
                {linkInfo.description}
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
