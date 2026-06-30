'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LinkButton } from '@/components/link-button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductImage } from '@/components/product-image'
import { LOOKBOOK_ITEMS } from '@/lib/mock-data'
import { STORE } from '@/lib/store'
import { getCartCount } from '@/lib/cart'

export default function LookbookPage() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(getCartCount())
  }, [])

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />

      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Editorial</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">The Lookbook</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Seasonal styling from our {STORE.city} studio — how we wear our favourite pieces, layered,
            lived-in, and always intentional.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOOKBOOK_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-xl group ${
                i === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-[16/10] sm:aspect-auto sm:min-h-[480px]' : 'aspect-[4/5]'
              }`}
            >
              <ProductImage
                src={item.image}
                alt={item.title}
                fill
                sizes={i === 0 ? '66vw' : '33vw'}
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-white text-xl font-semibold mb-1">{item.title}</h2>
                <p className="text-white/75 text-sm">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Ready to build your wardrobe?</p>
          <LinkButton href="/products" variant="primary">
            Shop the Collection
          </LinkButton>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
