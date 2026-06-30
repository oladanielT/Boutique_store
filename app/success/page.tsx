'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Package } from 'lucide-react'

export default function SuccessPage() {
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setOrderId(params.get('order_id') || '')
    localStorage.removeItem('cart')
  }, [])

  return (
    <main className="bg-background">
      <Navbar cartCount={0} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8 flex justify-center"
          >
            <CheckCircle className="w-24 h-24 text-accent" />
          </motion.div>

          <h1 className="text-5xl font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-2">Thank you for your purchase.</p>

          {orderId && (
            <p className="text-lg text-accent font-semibold mb-8">
              Order ID: <span className="text-foreground">{orderId.slice(0, 8)}</span>
            </p>
          )}

          <div className="bg-card border border-border rounded-lg p-8 mb-8 text-left">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-accent" />
              What&apos;s Next?
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold">1.</span>
                <span>You&apos;ll receive a confirmation email shortly with your order details</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">2.</span>
                <span>Your order will be prepared and shipped within 2-3 business days</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">3.</span>
                <span>You&apos;ll receive a tracking number via email when your order ships</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">4.</span>
                <span>Most orders arrive within 5-7 business days</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
              </motion.button>
            </Link>
            <Link href="/products">
              <motion.button
                className="px-8 py-4 bg-secondary text-foreground rounded-lg font-semibold whitespace-nowrap hover:bg-muted transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
