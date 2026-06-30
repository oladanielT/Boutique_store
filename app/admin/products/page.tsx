'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { formatPrice } from '@/lib/currency'
import { supabase, type Product } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Trash2, Edit2, Plus, Loader } from 'lucide-react'
import Link from 'next/link'

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
    if (!supabase) {
      setLoading(false)
      return
    }
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!supabase) {
      alert('Database not configured. Set Supabase environment variables to manage products.')
      return
    }

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        category: formData.category,
        image_url: formData.image_url,
        updated_at: new Date().toISOString(),
      }

      if (editingProduct) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingProduct.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert(payload)
        if (error) throw error
      }

      const wasEditing = !!editingProduct
      setFormData({ name: '', description: '', price: '', stock_quantity: '', category: '', image_url: '' })
      setEditingProduct(null)
      setShowModal(false)
      fetchProducts()

      const toast = document.createElement('div')
      toast.className =
        'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      toast.textContent = wasEditing ? 'Product updated!' : 'Product added successfully!'
      document.body.appendChild(toast)
      setTimeout(() => toast.remove(), 2000)
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product')
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    if (!supabase) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', productId)
      if (error) throw error
      fetchProducts()

      const toast = document.createElement('div')
      toast.className =
        'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-50'
      toast.textContent = 'Product deleted!'
      document.body.appendChild(toast)
      setTimeout(() => toast.remove(), 2000)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
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
            <p className="text-lg text-muted-foreground">Add, edit, and manage your product inventory</p>
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

        {/* Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.form
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              onClick={e => e.stopPropagation()}
              onSubmit={handleAddProduct}
              className="bg-card border border-border rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Premium T-Shirt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Product description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="85000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      name="stock_quantity"
                      value={formData.stock_quantity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Clothing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <motion.button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </section>
    </main>
  )
}
