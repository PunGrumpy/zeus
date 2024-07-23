import { LayoutGridIcon, LayoutListIcon } from 'lucide-react'
import React from 'react'

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
    <div
      className={cn(
        'flex rounded-md border p-[5px] text-secondary-foreground',
        className
      )}
    >
      <button
        onClick={() => onViewChange('grid')}
        className={cn(
          'flex items-center justify-center rounded px-2 py-1 text-primary/50 transition-colors duration-200',
          currentView === 'grid'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary-hover'
        )}
        title="Grid view"
      >
        <LayoutGridIcon className="size-4" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={cn(
          'flex items-center justify-center rounded px-2 py-1 text-primary/50 transition-colors duration-200',
          currentView === 'list'
            ? 'bg-primary text-primary-foreground'
            : 'hover:text-primary'
        )}
        title="List view"
      >
        <LayoutListIcon className="size-4" />
      </button>
    </div>
  )
}
