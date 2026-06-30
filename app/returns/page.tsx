'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { InfoPageLayout } from '@/components/sections'
import { getCartCount } from '@/lib/cart'

export default function ReturnsPage() {
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => setCartCount(getCartCount()), [])

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />
      <InfoPageLayout title="Returns & Exchanges">
        <p>We offer a <strong>30-day return policy</strong> on unworn items with original tags attached.</p>
        <p>To initiate a return, email returns@tunasky.com with your order number. We&apos;ll send a prepaid return label within 24 hours.</p>
        <p>Refunds are processed within 5–7 business days of receiving your return. Exchanges ship free of charge.</p>
        <p>Sale items and intimate apparel are final sale unless defective.</p>
      </InfoPageLayout>
      <Footer />
    </main>
  )
}
