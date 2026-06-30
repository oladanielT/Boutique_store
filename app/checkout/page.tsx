'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Loader } from 'lucide-react'

import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/currency'
import { LinkButton } from '@/components/link-button'
import { getCart, getCartCount, type CartItem } from '@/lib/cart'
import { showToast } from '@/lib/toast'

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'NG',
  })

  useEffect(() => {
    setCartItems(getCart())
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 2500
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create order first
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`,
          items: cartItems,
          total,
        }),
      })

      const data = await response.json()

      if (data.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = data.sessionUrl
      } else if (data.error) {
        showToast(data.error, 'error')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      showToast('An error occurred during checkout', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="bg-background">
        <Navbar cartCount={0} />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add items before checking out</p>
          <LinkButton href="/products" variant="accent">
            Back to Shopping
          </LinkButton>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-background">
      <Navbar cartCount={getCartCount(cartItems)} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link href="/cart" className="inline-flex items-center gap-2 text-accent hover:text-accent-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-foreground mb-12"
        >
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleCheckout}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Billing Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Ile-Ife"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Osun"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="220212"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="NG">Nigeria</option>
                      <option value="GH">Ghana</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-accent text-accent-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-50"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Complete Purchase</>
              )}
            </motion.button>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-fit sticky top-32"
          >
            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.selectedSize ?? ''}-${item.selectedColor ?? ''}`} className="flex justify-between text-foreground">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      {(item.selectedSize || item.selectedColor) && (
                        <p className="text-xs text-muted-foreground">
                          {[item.selectedSize, item.selectedColor].filter(Boolean).join(' / ')}
                        </p>
                      )}
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-accent">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
