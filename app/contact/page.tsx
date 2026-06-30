'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { InfoPageLayout } from '@/components/sections'
import { getCartCount } from '@/lib/cart'
import { STORE } from '@/lib/store'

function InfoPage({ title, children }: { title: string; children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => setCartCount(getCartCount()), [])
  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />
      <InfoPageLayout title={title}>{children}</InfoPageLayout>
      <Footer />
    </main>
  )
}

export default function ContactPage() {
  return (
    <InfoPage title="Contact Us">
      <p>We&apos;d love to hear from you. Visit our boutique or reach us during store hours.</p>
      <p><strong>Email:</strong> {STORE.email}</p>
      <p><strong>Phone:</strong> {STORE.phone}</p>
      <p><strong>Boutique:</strong> {STORE.address}</p>
      <p><strong>Hours:</strong> {STORE.hours}</p>
      <p>For order inquiries, please include your order number in the subject line.</p>
    </InfoPage>
  )
}
