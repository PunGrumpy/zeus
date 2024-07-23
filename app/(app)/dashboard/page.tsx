import { Links, LinkTags, Tags } from '@prisma/client'

import { DashboardContent } from '@/components/dashboard/dashboard-content'
import { getLinksAndTagsByUser } from '@/lib/query'

interface DashboardPageProps {
  params: {
    search?: string
    tag?: string
  }
}

interface LinkWithTags extends Links {
  tags: LinkTags[]
}

interface DashboardData {
  links: LinkWithTags[]
  tags: Tags[]
  limit: number
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const data = (await getLinksAndTagsByUser()) as DashboardData
  const { search: searchLink, tag: searchTag } = params

  if (!data) {
    return <div>No data available</div>
  }

  const filteredLinks = filterLinks(data.links, searchLink, searchTag)

  return (
    <main className="w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <DashboardContent
        filteredLinks={filteredLinks}
        allLinks={data.links}
        tags={data.tags}
        limit={data.limit}
        searchTag={searchTag}
      />
    </main>
  )
}

function filterLinks(
  links: LinkWithTags[],
  searchLink?: string,
  searchTag?: string
): LinkWithTags[] {
  return links.filter(link => {
    if (!searchLink && !searchTag) return true

    const matchSlug =
      !searchLink || link.slug.toLowerCase().includes(searchLink.toLowerCase())
    const matchTag =
      !searchTag || link.tags.some(tag => tag.tagId === searchTag)

    return matchSlug && matchTag
  })
}
