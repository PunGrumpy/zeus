import { cache } from 'react'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const getLinksAndTagsByUser = cache(async () => {
  const currentUser = await auth()

  if (!currentUser) {
    console.error('Authentication failed: User not logged in.')
    return null
  }

  try {
    const linkData = await db.links.findMany({
      where: {
        creatorId: currentUser.user?.id
      },
      include: {
        tags: true
      }
    })

    const tagsData = await db.tags.findMany({
      where: {
        creatorId: currentUser.user?.id
      }
    })

    return {
      limit: currentUser.user?.limitLinks,
      links: linkData,
      tags: tagsData
    }
  } catch (error) {
    console.error('Oops! Failed to fetch links and tags:', error)
    throw error
  }
})

export const getTagsByUser = cache(async () => {
  const currentUser = await auth()

  if (!currentUser) {
    console.error('Authentication failed: User not logged in.')
    return null
  }

  const tagsData = await db.tags.findMany({
    where: {
      creatorId: currentUser.user?.id
    }
  })

  return tagsData
})
