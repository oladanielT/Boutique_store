'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Ruler, Palette } from 'lucide-react'
import type { Product } from '@/lib/supabase'
import { ProductImage } from './product-image'
import { formatPrice } from '@/lib/currency'
import { isNewArrival } from '@/lib/products'

interface ProductCardProps {
  product: Product
  index?: number
  onAddToCart?: (product: Product) => void
  showAddButton?: boolean
}

export function ProductCard({ product, index = 0, onAddToCart, showAddButton = true }: ProductCardProps) {
  const isNew = isNewArrival(product)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-secondary aspect-[4/5] mb-4">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            fill
            className="transition-transform duration-500 group-hover:scale-105 object-cover"
            priority={index < 4} // Load first 4 images with priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          {isNew && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full z-10">
              New
            </span>
          )}
          {product.category && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {product.category}
            </span>
          )}
        </div>
      </Link>

      <Link href={`/products/${product.id}`}>
        <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
      </Link>

      {product.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
      )}

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-lg font-bold text-foreground font-heading">{formatPrice(product.price)}</span>
        <div className="flex items-center gap-2">
          {product.stock_quantity > 0 ? (
            <>
              <span className="text-xs text-muted-foreground hidden sm:inline">In stock</span>
              {showAddButton && onAddToCart && (
                <motion.button
                  onClick={e => {
                    e.preventDefault()
                    onAddToCart(product)
                  }}
                  className="p-2 bg-primary text-primary-foreground rounded-lg hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingBag className="w-4 h-4" />
                </motion.button>
              )}
            </>
          ) : (
            <span className="text-xs font-medium text-destructive">Sold out</span>
          )}
        </div>
      </div>

      {/* Display size and color options */}
      <div className="flex flex-wrap gap-2">
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Ruler className="w-3 h-3" />
            <span>Sizes: {product.sizes.slice(0, 3).join(', ')}</span>
            {product.sizes.length > 3 && <span>...</span>}
          </div>
        )}
        
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Palette className="w-3 h-3" />
            <span>{product.colors.length} colors</span>
          </div>
        )}
      </div>
    </motion.article>
  )
}