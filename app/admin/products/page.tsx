'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { formatPrice } from '@/lib/currency'
import { type Product } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Trash2, Edit2, Plus, Loader } from 'lucide-react'
import Link from 'next/link'
import { MOCK_PRODUCTS } from '@/lib/mock-data'

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category: '',
    image_url: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    // Simulate loading with mock data
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS)
      setLoading(false)
    }, 500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      id: editingProduct ? editingProduct.id : `mock-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock_quantity: parseInt(formData.stock_quantity),
      category: formData.category,
      image_url: formData.image_url,
      created_at: editingProduct ? editingProduct.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    if (editingProduct) {
      // Update the product in the local state
      setProducts(products.map(p => p.id === editingProduct.id ? payload : p))
    } else {
      // Add the new product to the local state
      setProducts([payload, ...products])
    }

    setFormData({ name: '', description: '', price: '', stock_quantity: '', category: '', image_url: '' })
    setEditingProduct(null)
    setShowModal(false)

    const toast = document.createElement('div')
    toast.className =
      'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    toast.textContent = editingProduct ? 'Product updated!' : 'Product added successfully!'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 2000)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This is only simulated in demo mode.')) return

    // In demo mode, we just remove from local state
    setProducts(products.filter(p => p.id !== productId))

    const toast = document.createElement('div')
    toast.className =
      'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-50'
    toast.textContent = 'Product removed (demo only)!'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 2000)
  }

  return (
    <main className="bg-background">
      <Navbar isAdmin={true} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-2">Manage Products</h1>
            <p className="text-lg text-muted-foreground">
              Manage your product catalog (demo mode - changes not persisted)
            </p>
          </div>

          <motion.button
            onClick={() => {
              setEditingProduct(null)
              setFormData({ name: '', description: '', price: '', stock_quantity: '', category: '', image_url: '' })
              setShowModal(true)
            }}
            className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add Product
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Loader className="w-12 h-12 text-accent" />
            </motion.div>
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground mb-6">No products yet. Add your first product!</p>
            <motion.button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Add Product
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4 mb-4">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center text-3xl">✨</div>
                  )}

                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="font-semibold text-accent">{formatPrice(product.price)}</span>
                      <span className="text-muted-foreground">Stock: {product.stock_quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex gap-2">
                  <motion.button
                    onClick={() => {
                      setEditingProduct(product)
                      setFormData({
                        name: product.name,
                        description: product.description || '',
                        price: product.price.toString(),
                        stock_quantity: product.stock_quantity.toString(),
                        category: product.category || '',
                        image_url: product.image_url || '',
                      })
                      setShowModal(true)
                    }}
                    className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </motion.button>

                  <motion.button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Add/Edit Product Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowModal(false)
              setEditingProduct(null)
              setFormData({ name: '', description: '', price: '', stock_quantity: '', category: '', image_url: '' })
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <form onSubmit={handleAddProduct}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Price (NGN)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="100"
                        className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Stock</label>
                      <input
                        type="number"
                        name="stock_quantity"
                        value={formData.stock_quantity}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Image URL</label>
                    <input
                      type="text"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingProduct(null)
                      setFormData({ name: '', description: '', price: '', stock_quantity: '', category: '', image_url: '' })
                    }}
                    className="flex-1 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 py-3 bg-accent text-accent-foreground rounded-lg hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editingProduct ? 'Update' : 'Add'} Product
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </section>
    </main>
  )
}
