'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { formatPrice } from '@/lib/currency'
import { supabase, type Order, type OrderItem } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { ChevronDown, Loader } from 'lucide-react'

interface OrderWithItems extends Order {
  items?: OrderItem[]
}

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    const client = supabase
    try {
      const { data, error } = await client.from('orders').select('*').order('created_at', { ascending: false })
      if (error) throw error

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        (data || []).map(async order => {
          const { data: items } = await client.from('order_items').select('*').eq('order_id', order.id)
          return { ...order, items: items || [] }
        })
      )

      setOrders(ordersWithItems)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!supabase) return
    try {
      const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)

      if (error) throw error

      setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)))

      const toast = document.createElement('div')
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      toast.textContent = 'Order status updated!'
      document.body.appendChild(toast)
      setTimeout(() => toast.remove(), 2000)
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const filteredOrders =
    filterStatus === 'all' ? orders : orders.filter(order => order.status === filterStatus)

  return (
    <main className="bg-background">
      <Navbar isAdmin={true} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-foreground mb-2">Manage Orders</h1>
          <p className="text-lg text-muted-foreground">View and manage customer orders</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {['all', 'pending', 'processing', 'completed', 'cancelled'].map(status => (
            <motion.button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                filterStatus === status
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'bg-secondary text-foreground hover:bg-muted'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Loader className="w-12 h-12 text-accent" />
            </motion.div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground">
              {filterStatus === 'all' ? 'No orders yet' : `No ${filterStatus} orders`}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-4"
          >
            {filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Order Header */}
                <motion.button
                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-6 flex-1 text-left">
                    <div>
                      <p className="font-mono font-bold text-foreground">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{order.customer_email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold text-accent">{formatPrice(order.total_amount)}</p>
                    </div>

                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'pending'
                            ? 'bg-orange-500/20 text-orange-600'
                            : order.status === 'completed'
                              ? 'bg-green-500/20 text-green-600'
                              : order.status === 'processing'
                                ? 'bg-blue-500/20 text-blue-600'
                                : 'bg-red-500/20 text-red-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedOrderId === order.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </motion.button>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedOrderId === order.id ? 'auto' : 0,
                    opacity: expandedOrderId === order.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-border"
                >
                  <div className="px-6 py-4 space-y-4 bg-secondary/30">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items?.map(item => (
                          <div key={item.id} className="flex justify-between text-sm py-2 border-b border-border">
                            <div>
                              <p className="font-medium text-foreground">Item {item.id.slice(0, 8)}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-accent">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {order.shipping_address && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Shipping Address</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{order.shipping_address}</p>
                      </div>
                    )}

                    {/* Status Update */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Update Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {['pending', 'processing', 'completed', 'cancelled'].map(status => (
                          <motion.button
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              order.status === status
                                ? 'bg-accent text-accent-foreground shadow-md'
                                : 'bg-card border border-border text-foreground hover:border-accent'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  )
}
