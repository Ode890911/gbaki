import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Gbaki Digital Solutions - Business Incubator for African Immigrants',
  description: 'Launch your US business in 30 days. LLC formation, website, banking, and more.',
  keywords: 'LLC formation, business incubator, African immigrants, US business, website builder',
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* Footer will go here later */}
    </>
  )
}

