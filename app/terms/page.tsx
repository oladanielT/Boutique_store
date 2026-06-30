'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { InfoPageLayout } from '@/components/sections'
import { getCartCount } from '@/lib/cart'

export default function TermsPage() {
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => setCartCount(getCartCount()), [])

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />
      <InfoPageLayout title="Terms of Service">
        <p>Last updated: June 2026</p>
        <p>By using tunasky.com you agree to these terms. All products are subject to availability. Prices are listed in USD and may change without notice.</p>
        <p>We reserve the right to refuse or cancel orders. Tunasky Wears is not liable for delays caused by shipping carriers or events beyond our control.</p>
      </InfoPageLayout>
      <Footer />
    </main>
  )
}
