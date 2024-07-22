import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

import { env } from '@/lib/env.mjs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const turso = createClient({
  url: env.TURSO_DATABASE_URL ?? '',
  authToken: env.TURSO_AUTH_TOKEN ?? ''
})

const adapter = new PrismaLibSQL(turso)

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db
