/**
 * 🛣️ Configuration file for route definitions and authentication settings.
 * This file contains constants used throughout the application to manage
 * route access, authentication requirements, and default redirects.
 */

/**
 * 🌐 Public routes that do not require authentication.
 * These routes are accessible to all users, whether logged in or not.
 * 🔓 No authentication required.
 * @type {ReadonlyArray<string>}
 */
export const publicRoutes: ReadonlyArray<string> = [
  '/',
  '/docs',
  '/verify',
  '/check'
] as const

/**
 * 🔐 Authentication-related routes.
 * These routes are used for user authentication processes.
 * 🔓 No authentication required to access these routes.
 * @type {ReadonlyArray<string>}
 */
export const authRoutes: ReadonlyArray<string> = [
  '/auth',
  '/auth/register',
  '/auth/login',
  '/register',
  '/auth-error',
  '/verify',
  '/reset',
  '/new-password'
] as const

/**
 * 🛡️ Protected routes that require authentication.
 * Users must be logged in to access these routes.
 * 🔒 Authentication required.
 * @type {ReadonlyArray<string>}
 */
export const protectedRoutes: ReadonlyArray<string> = [
  '/dashboard',
  '/dashboard/settings'
] as const

/**
 * 🔍 Prefix for routes that handle slug checking.
 * Routes starting with this prefix are used for verifying or processing slugs.
 * ✍️ Only type the prefix, with "/".
 * 🔓 No authentication required.
 * @type {string}
 */
export const checkRoutesPrefix: string = '/check'

/**
 * 🔑 Prefix for API authentication routes.
 * Routes starting with this prefix are used for API-based authentication processes.
 * ⚡ These routes are handled separately in the middleware.
 * 🔓 No authentication required.
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth'

/**
 * 🏠 Default redirect URL after successful login.
 * Users will be redirected to this URL when they log in successfully,
 * unless a specific callback URL is provided.
 * 🔒 Typically leads to a protected route.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL: string = '/dashboard'

/**
 * 📝 Type definitions for route categories to ensure type safety when using these constants.
 */
export type PublicRoute = (typeof publicRoutes)[number]
export type AuthRoute = (typeof authRoutes)[number]
export type ProtectedRoute = (typeof protectedRoutes)[number]
