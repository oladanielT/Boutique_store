'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { formatPrice } from '@/lib/currency'
// Remove supabase import since we're using mock data
import { type Order, type OrderItem } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { ChevronDown, Loader } from 'lucide-react'

interface OrderWithItems extends Order {
  items?: OrderItem[]
}

// Mock data for orders
const MOCK_ORDERS: OrderWithItems[] = [
  {
    id: 'order_1',
    order_number: 'ORD-12345',
    customer_email: 'customer@example.com',
    customer_name: 'John Doe',
    status: 'completed',
    total_amount: 15000,
    stripe_session_id: 'sess_123',
    stripe_payment_intent_id: 'pi_123',
    shipping_address: '123 Main St, City, Country',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item_1',
        order_id: 'order_1',
        product_id: 'prod_1',
        quantity: 2,
        price: 5000,
        created_at: new Date().toISOString()
      },
      {
        id: 'item_2',
        order_id: 'order_1',
        product_id: 'prod_2',
        quantity: 1,
        price: 5000,
        created_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'order_2',
    order_number: 'ORD-12346',
    customer_email: 'jane@example.com',
    customer_name: 'Jane Smith',
    status: 'pending',
    total_amount: 8500,
    stripe_session_id: 'sess_124',
    stripe_payment_intent_id: 'pi_124',
    shipping_address: '456 Oak Ave, Town, Country',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item_3',
        order_id: 'order_2',
        product_id: 'prod_3',
        quantity: 1,
        price: 8500,
        created_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'order_3',
    order_number: 'ORD-12347',
    customer_email: 'bob@example.com',
    customer_name: 'Bob Johnson',
    status: 'processing',
    total_amount: 22000,
    stripe_session_id: 'sess_125',
    stripe_payment_intent_id: 'pi_125',
    shipping_address: '789 Pine Rd, Village, Country',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item_4',
        order_id: 'order_3',
        product_id: 'prod_4',
        quantity: 1,
        price: 12000,
        created_at: new Date().toISOString()
      },
      {
        id: 'item_5',
        order_id: 'order_3',
        product_id: 'prod_5',
        quantity: 2,
        price: 5000,
        created_at: new Date().toISOString()
      }
    ]
  }
]

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    // Using mock data instead of Supabase
    // Simulate loading delay
    setTimeout(() => {
      setOrders(MOCK_ORDERS)
      setLoading(false)
    }, 500)
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    // Update order status in mock data
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus, updated_at: new Date().toISOString() } : order
    )
    setOrders(updatedOrders)

    const toast = document.createElement('div')
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    toast.textContent = 'Order status updated!'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 2000)
  }

  const filteredOrders =
    filterStatus === 'all' ? orders : orders.filter(order => order.status === filterStatus)

  return (
    <main className="bg-background">
      <Navbar isAdmin={true} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Orders Management</h1>
          <p className="text-lg text-muted-foreground">Manage and track customer orders</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'all'
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'pending'
                ? 'bg-orange-500 text-white'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('processing')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'processing'
                ? 'bg-blue-500 text-white'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Orders List */}
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
                        <button
                          onClick={() => updateOrderStatus(order.id, 'pending')}
                          className={`px-3 py-1.5 text-sm rounded-lg font-medium ${
                            order.status === 'pending'
                              ? 'bg-orange-500 text-white'
                              : 'bg-secondary text-foreground hover:bg-secondary/80'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                          className={`px-3 py-1.5 text-sm rounded-lg font-medium ${
                            order.status === 'processing'
                              ? 'bg-blue-500 text-white'
                              : 'bg-secondary text-foreground hover:bg-secondary/80'
                          }`}
                        >
                          Processing
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className={`px-3 py-1.5 text-sm rounded-lg font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-500 text-white'
                              : 'bg-secondary text-foreground hover:bg-secondary/80'
                          }`}
                        >
                          Completed
                        </button>
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