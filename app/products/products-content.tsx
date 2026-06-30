'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Loader } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { fetchProducts } from '@/lib/products'
import { addToCart, getCartCount } from '@/lib/cart'
import { showToast } from '@/lib/toast'
import { CATEGORIES } from '@/lib/mock-data'
import type { Product } from '@/lib/supabase'

export default function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [newOnly, setNewOnly] = useState(false)

  useEffect(() => {
    setCartCount(getCartCount())
    const cat = searchParams.get('category')
    const filter = searchParams.get('filter')
    if (cat) setCategory(cat)
    if (filter === 'new') setNewOnly(true)
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    fetchProducts({
      category: category !== 'All' ? category : undefined,
      newOnly,
    }).then(({ products: data }) => {
      setProducts(data)
      setLoading(false)
    })
  }, [category, newOnly])

  const filtered = products.filter(p => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false) ||
      (p.category?.toLowerCase().includes(q) ?? false)
    )
  })

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setCartCount(getCartCount())
    showToast(`${product.name} added to cart`)
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />

      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Our Collection</h1>
          <p className="text-lg text-muted-foreground">
            {filtered.length} piece{filtered.length !== 1 ? 's' : ''} curated for the modern wardrobe
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat)
                  setNewOnly(false)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat && !newOnly
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => {
                setNewOnly(true)
                setCategory('All')
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                newOnly ? 'bg-accent text-accent-foreground' : 'bg-secondary text-foreground hover:bg-muted'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="w-10 h-10 text-accent animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">No products match your search.</p>
            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
                setNewOnly(false)
              }}
              className="text-accent font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
