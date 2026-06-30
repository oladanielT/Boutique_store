import type { Product } from './supabase'
import { MOCK_PRODUCTS } from './mock-data'

const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

export function isNewArrival(product: Product): boolean {
  return new Date(product.created_at).getTime() > weekAgo
}

export async function fetchProducts(options?: {
  limit?: number
  category?: string
  newOnly?: boolean
}): Promise<{ products: Product[]; source: 'supabase' | 'mock' }> {
  // Using only mock data for now until backend is ready
  let products = [...MOCK_PRODUCTS]
  
  if (options?.category && options.category !== 'All') {
    products = products.filter(p => p.category === options.category)
  }
  if (options?.newOnly) products = products.filter(isNewArrival)
  if (options?.limit) products = products.slice(0, options.limit)
  
  return { products, source: 'mock' }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  // Using only mock data for now until backend is ready
  return MOCK_PRODUCTS.find(p => p.id === id) ?? null
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { products } = await fetchProducts()
  const q = query.toLowerCase().trim()
  if (!q) return products
  return products.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false) ||
      (p.category?.toLowerCase().includes(q) ?? false)
  )
}