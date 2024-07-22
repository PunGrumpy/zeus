'use client'

import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchLinksProps {
  className?: string
}

const SearchLinks = ({ className }: SearchLinksProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams)
      if (e.target.value) {
        params.set('search', e.target.value)
      } else {
        params.delete('search')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    300
  )

  return (
    <div className={cn('relative', className)}>
      <SearchIcon className="absolute left-2 top-1/2 size-4 -translate-y-1/2" />
      <Input
        type="search"
        autoComplete="off"
        placeholder="Search links"
        className="pl-8"
        onChange={handleSearch}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  )
}

export default SearchLinks
