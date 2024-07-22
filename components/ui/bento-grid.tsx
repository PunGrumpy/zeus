import Link from 'next/link'

import { cn } from '@/lib/utils'

export const BentoGrid = ({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  href?: string
}) => {
  const content = (
    <>
      {header}
      <div className="text-muted-foreground/50 transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="my-2 font-bold text-primary">{title}</div>
        <div className="text-xs font-normal text-muted-foreground">
          {description}
        </div>
      </div>
    </>
  )

  const classes = cn(
    'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-primary/[0.15] bg-background p-4 shadow-input transition duration-200 hover:shadow-xl dark:shadow-none',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return <div className={classes}>{content}</div>
}
