import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/checkout', '/admin']
const authRoutes = ['/login', '/register']
const onboardingRoute = '/onboarding'
const checkoutRoute = '/checkout'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value ||
    (request.headers.get('authorization')?.startsWith('Bearer ') ? 'exists' : null)

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  // Check if it's an auth route
  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  )

  // Check if it's the onboarding route
  const isOnboardingRoute = pathname === onboardingRoute

  // Check if it's the checkout route
  const isCheckoutRoute = pathname === checkoutRoute

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname + request.nextUrl.search)
    return NextResponse.redirect(url)
  }

  // Protect checkout route
  if (isCheckoutRoute && !token) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', pathname + request.nextUrl.search)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if accessing auth routes with token (but allow onboarding)
  if (isAuthRoute && token && !isOnboardingRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Onboarding route requires authentication
  if (isOnboardingRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Admin routes require authentication (role check happens in layout)
  const isAdminRoute = pathname.startsWith('/admin')
  if (isAdminRoute && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname + request.nextUrl.search)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin',
    '/admin/:path*',
    '/login',
    '/register',
    '/onboarding',
    '/checkout',
  ],
}

