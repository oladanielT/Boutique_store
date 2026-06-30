'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Loader, ArrowLeft, Heart, Ruler, Palette, Package, RotateCcw } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { ProductImage } from '@/components/product-image'
import { fetchProductById, fetchProducts } from '@/lib/products'
import { addToCart, getCartCount } from '@/lib/cart'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/currency'
import { LinkButton } from '@/components/link-button'
import { showToast } from '@/lib/toast'
import type { Product } from '@/lib/supabase'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)

  const productId = params.id as string

  useEffect(() => {
    setCartCount(getCartCount())
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlisted(wishlist.includes(productId))
  }, [productId])

  useEffect(() => {
    async function load() {
      const data = await fetchProductById(productId)
      if (!data) {
        router.push('/products')
        return
      }
      setProduct(data)
      const { products: all } = await fetchProducts()
      setRelated(
        all.filter(p => p.category === data.category && p.id !== data.id).slice(0, 3)
      )
      setLoading(false)
      
      // Auto-select first available size if available
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0])
      }
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0])
      }
    }
    load()
  }, [productId, router])

  const handleAddToCart = () => {
    if (!product) return
    
    // Create a modified product with selected size info
    const productWithSize = {
      ...product,
      selectedSize: selectedSize ?? undefined,
      selectedColor: selectedColor ?? undefined,
    }
    
    addToCart(productWithSize, quantity)
    setCartCount(getCartCount())
    showToast(`Added ${quantity} × ${product.name}${selectedSize ? ` (${selectedSize})` : ''} to cart`)
    setQuantity(1)
  }

  const toggleWishlist = () => {
    const wishlist: string[] = JSON.parse(localStorage.getItem('wishlist') || '[]')
    if (wishlisted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist.filter(id => id !== productId)))
      showToast('Removed from wishlist', 'info')
    } else {
      wishlist.push(productId)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      showToast('Saved to wishlist')
    }
    setWishlisted(!wishlisted)
  }

  if (loading) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <Loader className="w-10 h-10 text-accent animate-spin" />
      </main>
    )
  }

  if (!product) return null

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />

      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary"
          >
            <ProductImage src={product.image_url} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            {product.category && (
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent rounded-full">
                {product.category}
              </span>
            )}

            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{product.name}</h1>
              <button
                onClick={toggleWishlist}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`p-2.5 rounded-full border transition-colors ${
                  wishlisted ? 'bg-accent/10 border-accent text-accent' : 'border-border hover:border-accent'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-bold text-foreground font-heading">{formatPrice(product.price)}</span>
              {product.stock_quantity > 0 ? (
                <span className="text-sm text-muted-foreground">{product.stock_quantity} in stock</span>
              ) : (
                <span className="text-sm font-medium text-destructive">Sold out</span>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Ruler className="w-4 h-4" /> Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedSize === size
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      aria-pressed={selectedColor === color}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedColor === color
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.stock_quantity > 0 && (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                  <div className="inline-flex items-center gap-1 bg-secondary rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:text-accent transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center hover:text-accent transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  disabled={(product.sizes?.length ? !selectedSize : false) || (product.colors?.length ? !selectedColor : false)}
                  className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    (!(product.sizes?.length) || selectedSize) && (!(product.colors?.length) || selectedColor)
                      ? 'bg-primary text-primary-foreground hover:opacity-90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  whileHover={(!(product.sizes?.length) || selectedSize) && (!(product.colors?.length) || selectedColor) ? { scale: 1.01 } : {}}
                  whileTap={(!(product.sizes?.length) || selectedSize) && (!(product.colors?.length) || selectedColor) ? { scale: 0.98 } : {}}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart — {formatPrice(product.price * quantity)}
                </motion.button>

                <LinkButton href="/cart" variant="secondary" className="w-full">
                  View Cart
                </LinkButton>
              </div>
            )}

            {/* Product Details Section */}
            {(product.material || product.care_instructions) && (
              <div className="border-t border-border pt-6 space-y-4">
                {product.material && (
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Material</h4>
                      <p className="text-sm text-muted-foreground">{product.material}</p>
                    </div>
                  </div>
                )}
                
                {product.care_instructions && (
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Care Instructions</h4>
                      <p className="text-sm text-muted-foreground">{product.care_instructions}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-border pt-6 space-y-3 text-sm text-muted-foreground mt-6">
              <p className="flex gap-2"><span className="text-accent">✓</span> Free delivery on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}</p>
              <p className="flex gap-2"><span className="text-accent">✓</span> 30-day hassle-free returns</p>
              <p className="flex gap-2"><span className="text-accent">✓</span> Secure checkout with Stripe</p>
            </div>
          </motion.div>
        </motion.div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onAddToCart={prod => {
                    addToCart(prod)
                    setCartCount(getCartCount())
                    showToast(`${prod.name} added to cart`)
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
