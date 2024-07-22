import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'

import { authConfig } from '@/auth.config'
import {
  apiAuthPrefix,
  authRoutes,
  checkRoutesPrefix,
  DEFAULT_LOGIN_REDIRECT_URL,
  protectedRoutes,
  publicRoutes
} from '@/config/route'
import { urlFromServer } from '@/lib/redirect'

const { auth } = NextAuth(authConfig)

export default auth(async request => {
  const { nextUrl } = request
  const isLoggedIn = !!request.auth
  const pathname = nextUrl.pathname

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
  const isCheckRoute = pathname.startsWith(checkRoutesPrefix)
  const isProtectedRoute = protectedRoutes.includes(pathname)
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    return isLoggedIn
      ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
      : NextResponse.next()
  }

  const zeusRoute = pathname.split('/').pop()
  if (zeusRoute?.endsWith('&c')) {
    return NextResponse.redirect(
      new URL(`/check/${zeusRoute.replace('&c', '')}`, nextUrl)
    )
  }

  if (!isLoggedIn && isProtectedRoute) {
    const callbackUrl = nextUrl.search
      ? `${pathname}${nextUrl.search}`
      : pathname
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(
      new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  if (!isPublicRoute && !isProtectedRoute && !isCheckRoute) {
    try {
      const getDataApi = await urlFromServer(zeusRoute!)

      if (getDataApi.redirect404) {
        console.warn('🚧 Warning - Redirect 404: ', zeusRoute)
      }

      if (getDataApi.error) {
        return NextResponse.json({ error: getDataApi.message }, { status: 500 })
      }

      if (getDataApi.url) {
        return NextResponse.redirect(new URL(getDataApi.url).toString())
      }
    } catch (error) {
      console.error('🚨 Error in dynamic route handling:', error)
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }

  return
})

export const config = {
  matcher: [
    '/((?!api/|_next/|images/|docs/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)',
    '/s/:slug*'
  ]
}
