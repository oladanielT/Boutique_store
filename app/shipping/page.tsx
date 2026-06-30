'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { InfoPageLayout } from '@/components/sections'
import { getCartCount } from '@/lib/cart'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/currency'
import { STORE } from '@/lib/store'

export default function ShippingPage() {
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => setCartCount(getCartCount()), [])

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />
      <InfoPageLayout title="Shipping Information">
        <p>
          <strong>Free delivery</strong> on all orders over {formatPrice(FREE_SHIPPING_THRESHOLD)} within{' '}
          {STORE.state} and major cities in Nigeria.
        </p>
        <p>Standard delivery (3–5 business days): {formatPrice(2500)}</p>
        <p>Express delivery (1–2 business days, Lagos & Abuja): {formatPrice(5000)}</p>
        <p>
          Nationwide shipping across Nigeria. International delivery to Ghana and the UK available on
          request — contact us for a quote.
        </p>
        <p>
          Orders placed before 2pm WAT ship the same business day. You&apos;ll receive a tracking
          number via SMS and email once your order ships.
        </p>
      </InfoPageLayout>
      <Footer />
    </main>
  )
}
