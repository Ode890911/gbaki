'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isDashboard) {
    // Dashboard routes use their own layout
    return <>{children}</>
  }

  // Marketing/public routes get Header and Footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

