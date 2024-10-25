'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import type { z } from 'zod'

import { auth, signOut } from '@/auth'
import { db } from '@/lib/db'
import type { UpdateProfileSchema } from '@/lib/schema'

const handleAuthError = () => {
  console.error('Not authenticated.')
  return null
}

export const updateProfile = async (
  values: z.infer<typeof UpdateProfileSchema>
) => {
  const currentUser = await auth()
  if (!currentUser) return handleAuthError()

  try {
    const result = await db.user.update({
      where: { id: currentUser.user.id },
      data: { ...values }
    })

    revalidatePath('/')
    revalidatePath('/settings')

    return result
  } catch (error) {
    console.error(
      'Error updating profile:',
      error instanceof Error ? error.message : String(error)
    )
    return null
  }
}

export const deleteProfile = async (): Promise<boolean> => {
  const currentUser = await auth()
  if (!currentUser) return false

  try {
    await db.user.delete({
      where: { id: currentUser.user.id }
    })

    const cookieStore = await cookies()
    cookieStore.getAll().forEach(cookie => {
      cookieStore.delete(cookie.name)
    })

    await signOut({ redirect: false })
    return true
  } catch (error) {
    console.error(
      'Error deleting profile:',
      error instanceof Error ? error.message : String(error)
    )
    return false
  }
}
