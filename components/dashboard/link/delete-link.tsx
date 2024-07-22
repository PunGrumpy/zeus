'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Links } from '@prisma/client'
import { TrashIcon } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { Icons } from '@/components/icons'
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
import { deleteLink } from '@/lib/actions/links'
import { DeleteLinkSchema } from '@/lib/schema'

interface DeleteLinkProps {
  link: Links
  trigger: ReactNode
}

export function DeleteLink({ link, trigger }: DeleteLinkProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof DeleteLinkSchema>>({
    resolver: zodResolver(DeleteLinkSchema)
  })

  const handleDelete = async (values: z.infer<typeof DeleteLinkSchema>) => {
    if (values.slug !== link.slug) {
      toast.error('The slug does not match.')
      return
    }

    try {
      setLoading(true)
      await deleteLink(link.id)
      setOpen(false)
      toast.success('Link deleted successfully.', {
        description: `The link /${link.slug} has been deleted.`
      })
    } catch (error) {
      toast.error(
        'An error occurred while deleting the link. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete /{link.slug}</DialogTitle>
          <DialogDescription className="text-red-500 dark:text-red-400">
            Access to the link will be permanently removed. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDelete)}>
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type <span className="font-mono">{link.slug}</span> to
                    confirm:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit" variant="destructive">
                {loading ? (
                  <Icons.spinner className="size-4 animate-spin" />
                ) : (
                  <TrashIcon className="size-4" />
                )}
                <span>{loading ? 'Deleting...' : 'Delete'}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
