'use server'

export async function onScroll(): Promise<boolean> {
  if (typeof window === 'undefined') return false
  return window.scrollY > 0
}
