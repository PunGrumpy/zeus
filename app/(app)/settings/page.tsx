import { HeartCrackIcon } from 'lucide-react'

import { auth } from '@/auth'
import { DownloadAllLinks } from '@/components/dashboard/link/download-all-links'
import DeleteAccount from '@/components/settings/delete-account'
import { SettingsCard } from '@/components/settings/setting-card'
import { UpdateNameAvatar } from '@/components/settings/update-name-avatar'
import { Button } from '@/components/ui/button'

export default async function SettingsPage() {
  const session = await auth()

  if (!session) return null

  return (
    <main className="flex w-full flex-col space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <UpdateNameAvatar
        name={session.user.name!}
        username={session.user.username!}
        email={session.user.email!}
        avatar={session.user.image!}
      />
      <SettingsCard title="Account" description="Update your account settings">
        <div className="mb-5 flex w-52 flex-col space-y-2">
          <p>Export links</p>
          <DownloadAllLinks />
        </div>
        <div className="flex w-52 flex-col space-y-2">
          <p>Delete account</p>
          <DeleteAccount
            email={session.user.email!}
            trigger={
              <Button variant="destructive" size="sm">
                <HeartCrackIcon size={14} />
                <span>Delete Account</span>
              </Button>
            }
          />
        </div>
      </SettingsCard>
    </main>
  )
}
