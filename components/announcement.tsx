import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import AnimatedShinyText from './ui/animated-shiny-text'

export function Announcement() {
  return (
    <Link
      href="https://github.com/PunGrumpy/zues/issues"
      className="group rounded-full border border-primary/10 bg-background text-base transition-all ease-in hover:cursor-pointer hover:bg-primary/5"
      target="_blank"
      rel="noreferrer"
    >
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-primary hover:duration-300">
        <span>⚡ If you detect any issues, please report here</span>
        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedShinyText>
    </Link>
  )
}
