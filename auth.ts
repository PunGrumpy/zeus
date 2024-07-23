import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import { authConfig } from '@/auth.config'
import { db } from '@/lib/db'
import { getAccountByUserId } from '@/lib/db/account'
import { getTwoFactorConfirmationByUserId } from '@/lib/db/two-factor-confirm'
import { getUserById } from '@/lib/db/user'
import { env } from '@/lib/env.mjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  basePath: '/api/auth',
  secret: env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth sign in without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id)

      // Prevent sign in if user is not verified
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        )

        if (!twoFactorConfirmation) return false

        // Delete two-factor confirmation after successful sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email!
        session.user.isOAuth = token.isOAuth as boolean
        session.user.limitLinks = token.limitLinks as number
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.limitLinks = existingUser.limitLinks

      return token
    }
  },
  ...authConfig
})
