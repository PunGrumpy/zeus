import { PlusIcon } from 'lucide-react'

import { CardLink } from '@/components/dashboard/link/card-link'
import { CreateLink } from '@/components/dashboard/link/create-link'
import { LinksLimit } from '@/components/dashboard/link/links-limit'
import { SearchLinks } from '@/components/dashboard/link/search-link'
import { SearchTag } from '@/components/dashboard/tag/search-tags'
import { Button } from '@/components/ui/button'
import { getLinksAndTagsByUser } from '@/lib/query'

interface DashboardPageProps {
  params: {
    search?: string
    tag?: string
  }
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const data = await getLinksAndTagsByUser()
  const searchLink = params?.search
  const searchTag = params?.tag

  if (!data) {
    return null
  }

  const filteredLinks = data.links.filter(link => {
    if (!searchLink && !searchTag) return true

    const matchSlug = !searchLink || link.slug.includes(searchLink)
    const matchTag =
      !searchTag || link.tags.some(tag => tag.tagId === searchTag)

    return matchSlug && matchTag
  })

  return (
    <main className="w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <div className="mb-3 flex w-full items-center space-x-2 md:justify-between">
        <SearchLinks className="flex w-full items-center md:w-72 md:max-w-72" />
        <div className="flex items-center space-x-2">
          <LinksLimit userLinks={data.links.length} maxLinks={data.limit} />
          <SearchTag
            tags={data.tags}
            tagSelected={searchTag!}
            tagName={searchTag}
          />
          <CreateLink tags={data.tags}>
            <Button>
              <PlusIcon className="size-4 md:mr-2" />
              <span className="hidden md:block">Create Link</span>
            </Button>
          </CreateLink>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
        {filteredLinks
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })
          .map(link => {
            return (
              <CardLink
                key={link.id}
                linkInfo={link}
                linkTags={link.tags}
                tagsInfo={data.tags}
              />
            )
          })}
      </div>
    </main>
  )
}
