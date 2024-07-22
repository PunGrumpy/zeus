'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { OAuthSignIn } from '@/app/auth/oauth/actions'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

const providers = [
  {
    name: 'Google',
    provider: 'google',
    icon: <Icons.google className="size-5" />
  },
  {
    name: 'GitHub',
    provider: 'github',
    icon: <Icons.github className="size-5" />
  }
]

export function AuthForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const [loading, setLoading] = useState<boolean>(false)
  const [provider, setProvider] = useState<string | null>(null)

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setLoading(true)
      setProvider(provider)
      await OAuthSignIn({ provider, callbackUrl })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        {providers.map(pv => (
          <Button
            variant="outline"
            className="text-md flex h-10 w-full"
            disabled={loading}
            name={pv.provider}
            onClick={() => handleOAuthSignIn(pv.provider)}
            key={pv.provider}
          >
            <span className="mr-2 flex size-8 items-center justify-center">
              {provider === pv.provider && loading ? (
                <Icons.spinner className="size-5 animate-spin" />
              ) : (
                pv.icon
              )}
            </span>
            <span>Sign in with {pv.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
