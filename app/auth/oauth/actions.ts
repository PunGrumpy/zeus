'use server'

import { signIn } from '@/auth'

interface OAuthSignInProps {
  provider: string
  callbackUrl: string | null
}

export async function OAuthSignIn({ provider, callbackUrl }: OAuthSignInProps) {
  await signIn(provider, {
    callbackUrl: callbackUrl || undefined
  })
}
