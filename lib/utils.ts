import { load } from 'cheerio'
import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

import { ResultCode } from '@/types/authenication'
import { MetadataResponse } from '@/types/metadata'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!'
    case ResultCode.UserCreated:
      return 'User created, welcome!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return 'Logged in!'
  }
}

export const formatDate = (date: Date) => {
  return format(date, 'dd MMMM, yyyy') // "23 January 2021"
}

export const getMetadata = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch URL: ${response.status} ${response.statusText}`
      )
    }
    const html = await response.text()
    const $ = load(html)

    const getContent = (selector: string): string | undefined =>
      $(selector).attr('content') || $(selector).text()

    const title =
      getContent('meta[property="og:title"]') ||
      getContent('title') ||
      getContent('meta[name="title"]')
    const description =
      getContent('meta[property="og:description"]') ||
      getContent('meta[name="description"]')
    const siteUrl = getContent('meta[property="og:url"]')
    const site_name = getContent('meta[property="og:site_name"]')
    const image =
      getContent('meta[property="og:image"]') ||
      getContent('meta[property="og:image:url"]')
    let icon =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href')

    if (icon && !icon.startsWith('http')) {
      const urlFromParams = new URL(siteUrl || url)
      icon = `${urlFromParams.origin}${icon}`
    }

    const keywords =
      getContent('meta[property="og:keywords"]') ||
      getContent('meta[name="keywords"]')

    return {
      title,
      description,
      siteUrl,
      site_name,
      image,
      icon,
      keywords
    } as MetadataResponse
  } catch (error) {
    console.error(
      '🌐❌ Error fetching metadata:',
      error instanceof Error ? error.message : String(error)
    )
    return null
  }
}
