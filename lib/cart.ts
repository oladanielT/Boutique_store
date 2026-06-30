export interface CartItem {
  id: string
  name: string
  price: number
  image_url: string | null
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export function getCartItemKey(item: Pick<CartItem, 'id' | 'selectedSize' | 'selectedColor'>): string {
  return [item.id, item.selectedSize ?? '', item.selectedColor ?? ''].join('::')
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('cart')
    const items: CartItem[] = raw ? JSON.parse(raw) : []
    return consolidateCart(items)
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(consolidateCart(items)))
}

/** Merge duplicate product lines into single entries with summed quantity */
export function consolidateCart(items: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>()
  for (const item of items) {
    // Create a unique key that includes size and color if present
    const key = getCartItemKey(item)
    const existing = map.get(key)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      map.set(key, { ...item })
    }
  }
  return Array.from(map.values())
}

export function getCartCount(items?: CartItem[]): number {
  const cart = items ?? getCart()
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

export function addToCart(
  product: { id: string; name: string; price: number; image_url: string | null; selectedSize?: string; selectedColor?: string },
  quantity = 1
): CartItem[] {
  const cart = getCart()
  
  // Create a unique key that includes size and color if present
  const key = getCartItemKey(product)
  
  const existingIndex = cart.findIndex(item => {
    const itemKey = getCartItemKey(item)
    return itemKey === key
  })
  
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity,
      selectedSize: product.selectedSize,
      selectedColor: product.selectedColor,
    })
  }
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string, selectedSize?: string, selectedColor?: string): CartItem[] {
  // Create a unique key that includes size and color if present
  const key = getCartItemKey({ id: productId, selectedSize, selectedColor })
  
  const cart = getCart().filter(item => {
    const itemKey = getCartItemKey(item)
    return itemKey !== key
  })
  saveCart(cart)
  return cart
}

export function updateCartQuantity(productId: string, quantity: number, selectedSize?: string, selectedColor?: string): CartItem[] {
  if (quantity <= 0) return removeFromCart(productId, selectedSize, selectedColor)
  
  const cart = getCart().map(item => {
    const itemKey = getCartItemKey(item)
    const targetKey = getCartItemKey({ id: productId, selectedSize, selectedColor })
    
    return itemKey === targetKey ? { ...item, quantity } : item
  })
  saveCart(cart)
  return cart
}
