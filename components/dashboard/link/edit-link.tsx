'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Links, Tags } from '@prisma/client'
import { LockIcon, LockOpenIcon, SaveIcon } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { Icons } from '@/components/icons'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { updateLink } from '@/lib/actions/links'
import { env } from '@/lib/env.mjs'
import { EditLinkSchema } from '@/lib/schema'

interface EditLinkProps {
  trigger: ReactNode
  link: Links
  linkTags: Tags[]
  allTags: Tags[]
}

export function EditLink(props: EditLinkProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isError, setError] = useState<boolean>(false)
  const [unlockSlug, setUnlockSlug] = useState<boolean>(true)

  const form = useForm<z.infer<typeof EditLinkSchema>>({
    resolver: zodResolver(EditLinkSchema),
    defaultValues: {
      id: props.link.id,
      url: props.link.url,
      slug: props.link.slug,
      description: props.link.description ?? ''
    }
  })

  const onSubmit = async (values: z.infer<typeof EditLinkSchema>) => {
    if (values.slug === values.url) {
      setLoading(false)
      setError(true)
      setMessage('The URL and the slug cannot be the same')
      return
    }

    try {
      setLoading(true)
      await updateLink(values)

      toast.success('Link edited successfully.', {
        description: `${env.NEXT_PUBLIC_VERCEL_URL}/${values.slug}`,
        duration: 10000,
        closeButton: true
      })
      form.reset()
      setOpen(false)
    } catch (error) {
      toast.error('An unexpected error has occurred. Please try again later.')
    } finally {
      setError(false)
      setMessage('')
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="overflow-hidden">
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription className="block truncate">
            /{props.link.slug}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination URL:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={props.link.url}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short link:</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          placeholder={props.link.slug}
                          disabled={unlockSlug}
                        />
                        {unlockSlug ? (
                          <Popover>
                            <PopoverTrigger className="absolute inset-y-0 right-0 flex items-center px-3">
                              <LockIcon className="size-4" />
                            </PopoverTrigger>
                            <PopoverContent className="max-w-72 text-sm">
                              <p className="mb-2">
                                Editing the custom link will remove access from
                                the previous link and it will be available to
                                everyone. Are you sure you want to continue?
                              </p>
                              <Button
                                onClick={() => setUnlockSlug(false)}
                                variant="outline"
                                className="w-full"
                              >
                                <LockOpenIcon className="size-4" />
                                <span>Unlock</span>
                              </Button>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setUnlockSlug(true)}
                            className="absolute inset-y-0 right-0 flex items-center px-3"
                          >
                            <LockOpenIcon className="size-4" />
                          </button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional):</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        defaultValue={props.link.description ?? 'Description'}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && <Alert variant="destructive">{message}</Alert>}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Icons.spinner className="size-4 animate-spin" />
                ) : (
                  <SaveIcon className="size-4" />
                )}
                <span>{loading ? 'Saving...' : 'Save'}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
