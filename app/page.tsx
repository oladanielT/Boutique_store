'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { LinkButton } from '@/components/link-button'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { ProductCard } from '@/components/product-card'
import { TrustSection } from '@/components/sections'
import { Footer } from '@/components/footer'
import { ProductImage } from '@/components/product-image'
import { fetchProducts } from '@/lib/products'
import { addToCart, getCartCount } from '@/lib/cart'
import { showToast } from '@/lib/toast'
import { COLLECTIONS } from '@/lib/mock-data'
import type { Product } from '@/lib/supabase'

export default function Home() {
  const [cartCount, setCartCount] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCartCount(getCartCount())
  }, [])

  useEffect(() => {
    fetchProducts({ limit: 6 }).then(({ products: data }) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setCartCount(getCartCount())
    showToast(`${product.name} added to cart`)
  }

  // WhatsApp number for Tunasky Wears
  const whatsappNumber = '2348034567890' // Using the same number from store.ts but removing the + prefix for WhatsApp
  const whatsappMessage = encodeURIComponent('Hello! I\'m interested in your boutique items. Can you help me with some questions?')

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />
      <HeroSection />

      {/* Collections strip */}
      <section id="collections" className="scroll-mt-16 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Shop by Collection</h2>
            <p className="text-muted-foreground">Explore curated edits for every occasion</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLLECTIONS.map((col, i) => (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={
                    col.filter === 'new'
                      ? '/products?filter=new'
                      : `/products?category=${encodeURIComponent(col.filter)}`
                  }
                  className="group block relative overflow-hidden rounded-xl aspect-[3/4]"
                >
                  <ProductImage src={col.image} alt={col.title} fill className="transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-semibold text-lg mb-1">{col.title}</h3>
                    <p className="text-white/80 text-sm">{col.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Featured Pieces</h2>
              <p className="text-muted-foreground">Handpicked from our latest arrivals</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl bg-secondary aspect-[4/5] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <TrustSection />

      {/* CTA banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[21/9] min-h-[240px]">
            <ProductImage
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80&auto=format&fit=crop"
              alt="Visit our boutique"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center px-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Lookbook</h2>
                <p className="text-white/80 mb-6 max-w-md mx-auto">
                  Editorial styling and seasonal inspiration from the Tunasky studio.
                </p>
                <LinkButton href="/lookbook" variant="accent" className="!bg-white !text-foreground hover:!opacity-100">
                  Explore Lookbook
                </LinkButton>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WhatsApp Chat Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <MessageCircle className="w-12 h-12 text-accent mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Need Style Advice?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Connect with our fashion consultants on WhatsApp for personalized recommendations and styling tips.
            </p>
            <Link
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with Our Stylists
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
