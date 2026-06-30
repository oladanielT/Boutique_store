'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Truck, RefreshCw, Lock, Sparkles } from 'lucide-react'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/currency'
import { STORE } from '@/lib/store'

const features = [
  {
    icon: Truck,
    title: 'Complimentary Shipping',
    description: `Free delivery on orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)} within ${STORE.state}`,
  },
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    description: 'Easy exchanges and hassle-free refunds',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: 'Pay securely with card via Stripe',
  },
  {
    icon: Sparkles,
    title: 'Boutique Quality',
    description: 'Curated pieces, never mass-produced',
  },
]

export function TrustSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface InfoPageLayoutProps {
  title: string
  children: React.ReactNode
}

export function InfoPageLayout({ title, children }: InfoPageLayoutProps) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-foreground mb-8"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed"
      >
        {children}
      </motion.div>
    </section>
  )
}
