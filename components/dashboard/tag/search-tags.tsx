'use client'

import type { Tags } from '@prisma/client'
import {
  CheckIcon,
  PlusIcon,
  SearchXIcon,
  TagIcon,
  TagsIcon,
  XIcon
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { CreateTag } from '@/components/dashboard/tag/create-tag'
import { DeleteTag } from '@/components/dashboard/tag/delete-tag'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SearchTagProps {
  tags: Tags[]
  tagSelected: string
  tagName?: string
}

export function SearchTag(props: SearchTagProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const searchTagParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearchTag = (value: string) => {
    const params = new URLSearchParams(searchTagParams)
    if (value) {
      params.set('tag', value)
    } else {
      params.delete('tag')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleDeleteTag = () => {
    const params = new URLSearchParams(searchTagParams)
    params.delete('tag')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Popover open={isOpened} onOpenChange={setIsOpened}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          {isOpened ? (
            <XIcon className="mr-2 size-4" />
          ) : (
            <TagsIcon className="mr-2 size-4" />
          )}
          {props.tagName ? (
            <span className="truncate">
              {props.tags.find(tag => tag.id === props.tagName)?.name}
            </span>
          ) : (
            <>
              <span className="hidden sm:inline">Select a tag</span>
              <span className="sm:hidden">Tags</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 sm:w-[300px]">
        <div className="p-4 pb-0">
          <h3 className="mb-2 text-sm font-medium">
            My Tags ({props.tags.length})
          </h3>
        </div>
        <ScrollArea className="h-[200px] sm:h-[300px]">
          <div className="space-y-2 p-4">
            {props.tags.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-2 py-6 text-sm text-muted-foreground">
                <TagIcon className="stroke-1.5 size-6" />
                <span>No tags found</span>
              </div>
            ) : (
              props.tags.map(tag => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between rounded-md px-2 py-1 text-left text-sm transition-colors duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: tag.color || '#171717',
                    color: '#fff'
                  }}
                >
                  <button
                    onClick={() => handleSearchTag(tag.id)}
                    className="flex-1 truncate text-start"
                  >
                    {tag.name}
                  </button>
                  <div className="flex shrink-0 items-center space-x-2">
                    {tag.id === props.tagSelected && (
                      <CheckIcon className="size-4" />
                    )}
                    <DeleteTag
                      tag={tag}
                      trigger={
                        <button className="rounded-md p-1 hover:bg-black/20">
                          <XIcon className="size-3" />
                        </button>
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteTag}
              className="w-full"
            >
              <SearchXIcon className="mr-2 size-4" />
              Clear search
            </Button>
            <CreateTag tagsCreated={props.tags}>
              <Button variant="outline" size="sm" className="w-full">
                <PlusIcon className="mr-2 size-4" />
                Create Tag
              </Button>
            </CreateTag>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
