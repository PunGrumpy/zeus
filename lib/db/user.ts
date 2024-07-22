import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({ where: { email } })
    return user
  } catch (error) {
    console.error('👤❌ Failed to fetch user by email:', error)
    return null
  }
}

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findFirst({ where: { id } })
    return user
  } catch (error) {
    console.error('👤❌ Failed to fetch user by ID:', error)
    return null
  }
}
