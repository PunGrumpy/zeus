'use client'

import type { Tags } from '@prisma/client'
import { type ReactNode, useState } from 'react'
import { toast } from 'sonner'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { removeTag } from '@/lib/actions/tags'

interface DeleteTagProps {
  tag: Tags
  trigger: ReactNode
}

export function DeleteTag({ trigger, tag }: DeleteTagProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleDeleteTag = async () => {
    try {
      setLoading(true)
      await removeTag(tag.id)
      setOpen(false)
      toast.success('Link deleted successfully.', {
        description: `The tag ${tag.name} has been deleted.`
      })
    } catch (error) {
      toast.error('An error occurred while deleting the tag. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete &quot;{tag.name}&quot; tag</DialogTitle>
          <DialogDescription>
            Delete the tag will not delete the links associated with it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDeleteTag}
            disabled={loading}
          >
            {loading ? (
              <Icons.spinner className="size-4 animate-spin" />
            ) : (
              'Delete Tag'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
