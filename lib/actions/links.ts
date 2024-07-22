'use server'

import { revalidatePath } from 'next/cache'
import type { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import type { CreateLinkSchema, EditLinkSchema } from '@/lib/schema'

const handleAuthError = () => {
  console.error('🔐❌ Not authenticated.')
  return null
}

export const getSingleLink = async (id: string) => {
  const currentUser = await auth()
  if (!currentUser) return handleAuthError()

  try {
    return await db.links.findUnique({ where: { id } })
  } catch (error) {
    console.error(
      '🔗❌ Error fetching link:',
      error instanceof Error ? error.message : String(error)
    )
    return null
  }
}

export const checkIfSlugExist = async (slug: string): Promise<boolean> => {
  try {
    const result = await db.links.findUnique({ where: { slug } })
    return !!result
  } catch (error) {
    console.error(
      '🔗❌ Error checking slug:',
      error instanceof Error ? error.message : String(error)
    )
    return false
  }
}

interface CreateLinkResult {
  limit?: boolean
  error?: string
  linkId?: string
}

export const createLink = async (
  values: z.infer<typeof CreateLinkSchema>
): Promise<CreateLinkResult> => {
  const currentUser = await auth()
  if (!currentUser)
    return { error: '🔐 Not authenticated. Please login again.' }

  try {
    const count = await db.links.count({
      where: { creatorId: currentUser.user?.id }
    })
    const limit = currentUser.user?.limitLinks

    if (count >= limit) {
      return {
        limit: true,
        error: `📊 You have reached the limit of ${limit} links.`
      }
    }

    const result = await db.links.create({
      data: { ...values, creatorId: currentUser.user?.id }
    })

    revalidatePath('/')
    revalidatePath('/dashboard')

    return { limit: false, linkId: result.id }
  } catch (error) {
    console.error(
      '🔗❌ Error creating link:',
      error instanceof Error ? error.message : String(error)
    )
    return { error: 'Failed to create link. Please try again.' }
  }
}

export const updateLink = async (values: z.infer<typeof EditLinkSchema>) => {
  const currentUser = await auth()
  if (!currentUser) return handleAuthError()

  try {
    await db.links.update({
      where: { id: values.id },
      data: { ...values, creatorId: currentUser.user?.id }
    })

    revalidatePath('/')
    revalidatePath('/dashboard')
  } catch (error) {
    console.error(
      '🔗❌ Error updating link:',
      error instanceof Error ? error.message : String(error)
    )
    return null
  }
}

export const deleteLink = async (id: string) => {
  const currentUser = await auth()
  if (!currentUser) return handleAuthError()

  try {
    const result = await db.links.delete({
      where: { id, creatorId: currentUser.user?.id }
    })

    revalidatePath('/dashboard')
    return result
  } catch (error) {
    console.error(
      '🔗❌ Error deleting link:',
      error instanceof Error ? error.message : String(error)
    )
    return null
  }
}

export const downloadAllLinks = async () => {
  const currentUser = await auth()
  if (!currentUser) return handleAuthError()

  try {
    const result = await db.links.findMany({
      where: { creatorId: currentUser.user?.id },
      select: { slug: true, url: true, createdAt: true }
    })

    return result
  } catch (error) {
    console.error(
      '🔗❌ Error downloading links:',
      error instanceof Error ? error.message : String(error)
    )
    return null
  }
}
