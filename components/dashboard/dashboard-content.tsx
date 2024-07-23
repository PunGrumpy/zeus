'use client'

import { Links, LinkTags, Tags } from '@prisma/client'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { CardLink } from './link/card-link'
import { CreateLink } from './link/create-link'
import { LinksLimit } from './link/links-limit'
import { SearchLinks } from './link/search-link'
import { ViewLink } from './link/view-link'
import { SearchTag } from './tag/search-tags'

interface LinkWithTags extends Links {
  tags: LinkTags[]
}

interface DashboardContentProps {
  filteredLinks: LinkWithTags[]
  allLinks: LinkWithTags[]
  tags: Tags[]
  limit: number
  searchTag?: string
}

type SortOption = 'newest' | 'oldest' | 'most-clicked' | 'least-clicked'

export function DashboardContent({
  filteredLinks,
  allLinks,
  tags,
  limit,
  searchTag
}: DashboardContentProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  const sortedLinks = useMemo(() => {
    return [...filteredLinks].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case 'oldest':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        case 'most-clicked':
          return b.clicks - a.clicks
        case 'least-clicked':
          return a.clicks - b.clicks
        default:
          return 0
      }
    })
  }, [filteredLinks, sortBy])

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex w-full flex-1 items-center gap-2 sm:w-auto">
          <SearchLinks className="flex-1" />
          <LinksLimit
            userLinks={allLinks.length}
            maxLinks={limit}
            className="w-auto"
          />
        </div>
        <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <ViewLink
              currentView={view}
              onViewChange={setView}
              className="hidden sm:flex"
            />
            <SearchTag
              tags={tags}
              tagSelected={searchTag!}
              tagName={searchTag}
            />
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => setSortBy(value)}
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="most-clicked">Most Clicked</SelectItem>
                <SelectItem value="least-clicked">Least Clicked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CreateLink tags={tags}>
            <Button className="w-full md:w-auto">
              <PlusIcon className="mr-2 size-4" />
              <span>Create Link</span>
            </Button>
          </CreateLink>
        </div>
      </div>
      <div
        className={`grid gap-4 ${
          view === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
            : 'grid-cols-1'
        }`}
      >
        {sortedLinks.map(link => (
          <CardLink
            key={link.id}
            linkInfo={link}
            linkTags={link.tags}
            tagsInfo={tags}
          />
        ))}
      </div>
    </div>
  )
}
