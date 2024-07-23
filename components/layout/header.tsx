import { auth } from '@/auth'
import { HeaderClient } from '@/components/layout/header-client'

export async function Header() {
  const session = await auth()

  return <HeaderClient session={session} />
}
