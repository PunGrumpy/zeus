import { db } from '@/lib/db'

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token
      }
    })
    return twoFactorToken
  } catch (error) {
    console.error('🔢❌ Failed to fetch two-factor token by token:', error)
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: {
        email
      }
    })
    return twoFactorToken
  } catch (error) {
    console.error('🔢❌ Failed to fetch two-factor token by email:', error)
    return null
  }
}
