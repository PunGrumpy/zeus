import { db } from '@/lib/db'

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token: token }
    })
    return verificationToken
  } catch (error) {
    console.error('Failed to fetch verification token by token:', error)
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    })
    return verificationToken
  } catch (error) {
    console.error('Failed to fetch verification token by email:', error)
    return null
  }
}

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { token }
    })
    return passwordResetToken
  } catch (error) {
    console.error('Failed to fetch password reset token by token:', error)
    return null
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email }
    })
    return passwordResetToken
  } catch (error) {
    console.error('Failed to fetch password reset token by email:', error)
    return null
  }
}
