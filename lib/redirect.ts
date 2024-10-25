'use server'

import { db } from '@/lib/db'

interface UrlFromServerResult {
  error: boolean
  message: string
  redirect404?: boolean
  url?: string
}

export const urlFromServer = async (
  slug: string
): Promise<UrlFromServerResult> => {
  if (!slug) {
    console.error('urlFromServer: Zeus is empty or undefined')
    return {
      error: true,
      message: 'Invalid slug provided.'
    }
  }

  try {
    const link = await db.links.findUnique({
      where: { slug },
      select: { id: true, url: true }
    })

    if (!link) {
      console.warn(`🔍 urlFromServer: Zeus "${slug}" not found`)
      return {
        error: false,
        message: 'Zeus not found or invalid.',
        redirect404: true
      }
    }

    await db.links.update({
      where: { id: link.id },
      data: {
        clicks: { increment: 1 },
        lastClicked: new Date()
      }
    })

    console.log(`✅ urlFromServer: Successfully processed slug "${slug}"`)
    return {
      error: false,
      message: 'Success',
      url: link.url
    }
  } catch (error) {
    console.error(
      '🚨 urlFromServer error:',
      error instanceof Error ? error.message : String(error)
    )
    return {
      error: true,
      message: 'An unexpected error occurred while processing the link.'
    }
  }
}
