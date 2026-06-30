'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { InfoPageLayout } from '@/components/sections'
import { getCartCount } from '@/lib/cart'

const faqs = [
  { q: 'What sizes do you carry?', a: 'Most pieces run XS–XL. Size details are listed in each product description. Contact us for fit guidance.' },
  { q: 'How do I track my order?', a: 'You\'ll receive a tracking link via email once your order ships. Check your spam folder if you don\'t see it within 48 hours.' },
  { q: 'Do you offer gift wrapping?', a: 'Yes — complimentary gift wrapping is available at checkout. Add a note in the order comments field.' },
  { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 2 hours of placement. Email hello@tunasky.com with your order number.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards via Stripe secure checkout.' },
]

export default function FAQPage() {
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => setCartCount(getCartCount()), [])

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />
      <InfoPageLayout title="Frequently Asked Questions">
        <div className="space-y-6 not-prose">
          {faqs.map(faq => (
            <div key={faq.q} className="border-b border-border pb-5">
              <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </InfoPageLayout>
      <Footer />
    </main>
  )
}
