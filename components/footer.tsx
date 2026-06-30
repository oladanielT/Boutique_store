'use client'

import Link from 'next/link'
import { useState } from 'react'
import { STORE } from '@/lib/store'
import { showToast } from '@/lib/toast'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error')
      return
    }
    showToast('Welcome to the Tunasky list — check your inbox soon!', 'success')
    setEmail('')
  }

  // WhatsApp number for Tunasky Wears
  const whatsappNumber = '2348034567890' // Using the same number from store.ts but removing the + prefix for WhatsApp
  const whatsappMessage = encodeURIComponent('Hello! I\'m interested in your boutique items. Can you help me with some questions?')

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <h3 className="font-bold text-foreground mb-3 text-lg">Tunasky Wears</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              A boutique in {STORE.city}, {STORE.state} — premium fabrics, timeless cuts, and pieces
              you&apos;ll reach for season after season.
            </p>
            
            {/* WhatsApp Chat Button */}
            <Link 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat with us
            </Link>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-accent transition-colors">All Products</Link></li>
              <li><Link href="/products?filter=new" className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link href="/lookbook" className="hover:text-accent transition-colors">Lookbook</Link></li>
              <li><Link href="/products?category=Outerwear" className="hover:text-accent transition-colors">Outerwear</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-accent transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tunasky Wears. All rights reserved.</p>
          <p className="text-xs">{STORE.city}, {STORE.country} · Boutique fashion since 2024</p>
        </div>
      </div>
    </footer>
  )
}