'use server'

import { revalidatePath } from 'next/cache'
import type { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import type { CreateTagSchema } from '@/lib/schema'

const handleAuthError = () => {
  console.error('🔐❌ Not authenticated.')
  return null
}

export const createTag = async (values: z.infer<typeof CreateTagSchema>) => {
  const currentUser = await auth()
  if (!currentUser) return handleAuthError()

  try {
    const result = await db.tags.create({
      data: {
        name: values.name,
        color: values.color,
        creatorId: currentUser.user?.id
      }
    })

    revalidatePath('/')
    revalidatePath('/dashboard')

    return result
  } catch (error) {
    console.error(
      '🏷️❌ Error creating tag:',
      error instanceof Error ? error.message : String(error)
    )
    return null
  }
}

export const insertTagToLink = async (linkId: string, tagId: string) => {
  const currentUser = await auth()
  if (!currentUser) return handleAuthError()

  try {
    await db.linkTags.create({
      data: { linkId, tagId }
    })

    revalidatePath('/')
    return true
  } catch (error) {
    console.error(
      '🏷️❌ Error inserting tag to link:',
      error instanceof Error ? error.message : String(error)
    )
    return false
  }
}

export const removeTag = async (tagId: string) => {
  const currentUser = await auth()
  if (!currentUser) return handleAuthError()

  try {
    await db.tags.delete({
      where: { id: tagId }
    })

    revalidatePath('/')
    return true
  } catch (error) {
    console.error(
      '🏷️❌ Error removing tag:',
      error instanceof Error ? error.message : String(error)
    )
    return false
  }
}
