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

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { CreateTag } from './create-tag'
import { DeleteTag } from './delete-tag'

interface SearchTagProps {
  tags: Tags[]
  tagSelected: string
  tagName?: string
}

const SearchTag = (props: SearchTagProps) => {
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
        <Button variant="outline">
          {isOpened ? (
            <XIcon className="mr-2 size-4" />
          ) : (
            <TagsIcon className="mr-2 size-4" />
          )}
          {props.tagName ? (
            <span>
              {props.tags.map(tag => {
                if (tag.id === props.tagName) {
                  return tag.name
                }
              })}
            </span>
          ) : (
            <span className="hidden md:block">Select a tag</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="my-2 text-center text-sm font-medium">
          My Tags ({props.tags.length})
        </p>
        <div className="mb-2 flex w-full flex-col space-y-1">
          {props.tags.length === 0 && (
            <div className="my-4 flex flex-col items-center justify-center space-y-2 text-sm">
              <TagIcon className="stroke-1.5 size-6" />
              <span>No tags found</span>
            </div>
          )}
          {props.tags.map(tag => {
            return (
              <div
                key={tag.id}
                aria-label={tag.name}
                className="flex w-full items-center justify-between rounded-md border px-2 py-1 text-left text-sm transition-colors duration-200 hover:opacity-80"
                style={{
                  backgroundColor: tag.color
                    ? `${tag.color}`
                    : 'rgba(23, 23, 23, 0.5)' || '#171717',
                  color: tag.color ? '#fff' : '#171717'
                }}
              >
                <button
                  onClick={() => handleSearchTag(tag.id)}
                  className="w-full text-start"
                >
                  {tag.name}
                </button>
                <div className="flex items-center space-x-2">
                  {tag.id === props.tagSelected && (
                    <CheckIcon className="size-4" />
                  )}
                  <DeleteTag
                    tag={tag}
                    trigger={
                      <button className="rounded-md p-1 hover:opacity-80">
                        <XIcon className="size-4" />
                      </button>
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="outline" onClick={handleDeleteTag}>
            <SearchXIcon className="size-4" />
            <span>Clear search</span>
          </Button>
          <CreateTag tagsCreated={props.tags}>
            <Button variant="outline" className="w-full">
              <PlusIcon className="size-4" />
              <span>Create Tag</span>
            </Button>
          </CreateTag>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SearchTag
