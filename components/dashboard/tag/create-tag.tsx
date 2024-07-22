'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Tags } from '@prisma/client'
import { RocketIcon } from 'lucide-react'
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
import { createTag } from '@/lib/actions/tags'
import { CreateTagSchema } from '@/lib/schema'

interface CreateTagProps {
  children: ReactNode
  tagsCreated: Tags[]
}

export function CreateTag(props: CreateTagProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isError, setError] = useState<boolean>(false)

  const form = useForm<z.infer<typeof CreateTagSchema>>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      name: '',
      color: '#171717'
    }
  })

  const onSubmit = async (values: z.infer<typeof CreateTagSchema>) => {
    try {
      setLoading(true)

      if (props.tagsCreated.map(tag => tag.name).includes(values.name)) {
        toast.error('The tag is already exist. Write another name.')
        return
      }
      const result = await createTag(values)

      if (!result) {
        toast.error(
          'An unexpected error has occurred. Please try again later.',
          {
            duration: 10000,
            closeButton: true
          }
        )
        return
      }

      toast.success('Tag created successfully', {
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
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Create new tag</DialogTitle>
          <DialogDescription>
            Create a new tag to organize your links.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag name:</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} autoComplete="off" />
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
                  <RocketIcon className="size-4" />
                )}
                <span>{loading ? 'Creating...' : 'Create Tag'}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
