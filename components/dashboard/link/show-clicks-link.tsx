import { BarChartIcon } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn, formatDate } from '@/lib/utils'

interface ShowClicksProps {
  numberOfClicks: number
  lastDate: Date | null
  className?: string
}

export function ShowClicks({
  numberOfClicks,
  lastDate,
  className
}: ShowClicksProps) {
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            'flex cursor-default items-center space-x-2 text-xs',
            className
          )}
        >
          <BarChartIcon className="size-4" />
          <span className="font-mono">{numberOfClicks} clicks</span>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          {lastDate ? (
            <p>Last clicked: {formatDate(lastDate)}</p>
          ) : (
            <p>No clicks yet</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
