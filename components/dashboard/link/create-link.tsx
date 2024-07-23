'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Tags } from '@prisma/client'
import JSConfetti from 'js-confetti'
import { RocketIcon, ShuffleIcon, TagsIcon } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { checkIfSlugExist, createLink } from '@/lib/actions/links'
import { insertTagToLink } from '@/lib/actions/tags'
import { CreateLinkSchema } from '@/lib/schema'

import SelectTagsLink from './select-tags-link'

interface CreateLinkProps {
  children: ReactNode
  slug?: string
  tags: Tags[]
}

export function CreateLink(props: CreateLinkProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isError, setError] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const form = useForm<z.infer<typeof CreateLinkSchema>>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      url: '',
      slug: props.slug ?? '',
      description: ''
    }
  })

  const handleAddTags = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(tag => tag !== tagId))
      return
    }

    if (selectedTags.length >= 2) {
      toast.error("You can't add more than 2 tags to a link.")
      return
    }
    setSelectedTags([...selectedTags, tagId])
  }

  const handleDeleteTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagId))
  }

  const onSubmit = async (values: z.infer<typeof CreateLinkSchema>) => {
    if (values.slug === values.url) {
      setLoading(false)
      setError(true)
      setMessage('The URL and the slug cannot be the same')
      return
    }

    try {
      setLoading(true)

      const slugExists = await checkIfSlugExist(values.slug)

      if (slugExists) {
        toast.error(
          'The slug is already exist. Write another or generate a random slug.'
        )
        return
      }

      const result = await createLink(values)

      if (result.error && result.limit) {
        toast.info(result.error)
        return
      }

      if (selectedTags.length > 0) {
        await Promise.all(
          selectedTags.map(async tag => {
            await insertTagToLink(result.linkId!, tag)
          })
        )
      }

      toast.success('Link created successfully', {
        description: `Url: https://slug.vercel.app/${values.slug}`,
        duration: 10000,
        closeButton: true
      })

      form.reset()
      setOpen(false)
      await generateConfetti()
    } catch (error) {
      toast.error('An unexpected error has occurred. Please try again later.')
    } finally {
      setError(false)
      setMessage('')
      setLoading(false)
    }
  }

  const generateConfetti = async () => {
    const jsConfetti = new JSConfetti()
    await jsConfetti.addConfetti({
      confettiColors: ['#fdd835', '#4caf50', '#2196f3', '#f44336', '#ff9800'],
      confettiRadius: 3,
      confettiNumber: 50
    })
  }

  const handleGenerateRandomSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const randomSlug = Math.random().toString(36).substring(7)
    form.setValue('slug', randomSlug)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Create new link</DialogTitle>
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
                        autoComplete="off"
                        placeholder="https://"
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
                          placeholder="mylink"
                          disabled={loading}
                        />
                        <Button
                          onClick={handleGenerateRandomSlug}
                          variant="outline"
                          className="absolute right-0 rounded-none rounded-r-md"
                        >
                          <ShuffleIcon className="size-4" />
                          <span>Randomize</span>
                        </Button>
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
                        placeholder="Enter a description"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && <Alert variant="destructive">{message}</Alert>}
              {props.tags.length > 0 ? (
                <SelectTagsLink
                  selectedTags={selectedTags}
                  onSelectTag={handleAddTags}
                  onDeleteTag={handleDeleteTag}
                  tags={props.tags}
                />
              ) : (
                <div className="flex items-center justify-center space-x-2 rounded-md border py-3 text-sm">
                  <TagsIcon className="size-4" />
                  <p className="font-medium">
                    You don&apos;t have any tag created.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                ) : (
                  <RocketIcon className="mr-2 size-4" />
                )}
                <span>{loading ? 'Creating...' : 'Create'}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
