'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangleIcon, LoaderIcon, SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { SettingsCard } from '@/components/settings/setting-card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateProfile } from '@/lib/actions/profile'
import { UpdateProfileSchema } from '@/lib/schema'

interface UpdateNameAvatarProps {
  name: string
  username: string
  avatar: string
  email: string
}

export function UpdateNameAvatar({ ...props }: UpdateNameAvatarProps) {
  const [loading, setLoading] = useState<boolean>(false)

  const hookForm = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: props.name,
      username: props.username,
      email: props.email
    }
  })

  const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
    try {
      setLoading(true)
      await updateProfile(values)
      toast.success('Profile updated successfully.')
    } catch (error) {
      toast.error('An unexpected error has occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SettingsCard
      title="General"
      description="Update your personal information"
    >
      <Form {...hookForm}>
        <form onSubmit={hookForm.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={hookForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={hookForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled />
                </FormControl>
                <FormDescription className="flex items-center gap-2 pl-1">
                  <AlertTriangleIcon size={14} />
                  <span>Email address is managed by your OAuth provider.</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={loading || hookForm.getValues().name === props.name}
            >
              {loading ? (
                <LoaderIcon size={16} className="animate-spin" />
              ) : (
                <SaveIcon size={16} />
              )}
              <span>{loading ? 'Saving...' : 'Save'}</span>
            </Button>
          </div>
        </form>
      </Form>
    </SettingsCard>
  )
}
