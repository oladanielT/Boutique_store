'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { InfoPageLayout } from '@/components/sections'
import { getCartCount } from '@/lib/cart'

export default function PrivacyPage() {
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => setCartCount(getCartCount()), [])

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />
      <InfoPageLayout title="Privacy Policy">
        <p>Last updated: June 2026</p>
        <p>Tunasky Wears respects your privacy. We collect only the information needed to process orders and improve your shopping experience — name, email, shipping address, and payment details (processed securely by Stripe).</p>
        <p>We do not sell your personal data. You may unsubscribe from marketing emails at any time. For data requests, contact privacy@tunasky.com.</p>
      </InfoPageLayout>
      <Footer />
    </main>
  )
}
