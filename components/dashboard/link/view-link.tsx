import { LayoutGridIcon, LayoutListIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ViewType = 'grid' | 'list'

interface ViewLinkProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  className?: string
}

export function ViewLink({
  currentView,
  onViewChange,
  className
}: ViewLinkProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant={currentView === 'grid' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewChange('grid')}
        title="Grid view"
      >
        <LayoutGridIcon className="size-4" />
      </Button>
      <Button
        variant={currentView === 'list' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewChange('list')}
        title="List view"
      >
        <LayoutListIcon className="size-4" />
      </Button>
    </div>
  )
}
