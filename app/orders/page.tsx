'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { formatPrice } from '@/lib/currency'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard, ChevronDown, ChevronUp } from 'lucide-react'
import { Order, OrderItem } from '@/lib/supabase'
import { getCartCount } from '@/lib/cart'

// Mock data for customer orders - in a real app this would come from an API
const MOCK_ORDERS: (Order & { items: OrderItem[], tracking_status: string, estimated_delivery: string })[] = [
  {
    id: 'order_12345',
    order_number: 'ORD-12345',
    customer_email: 'customer@example.com',
    customer_name: 'John Doe',
    status: 'delivered',
    total_amount: 15000,
    stripe_session_id: 'sess_123',
    stripe_payment_intent_id: 'pi_123',
    shipping_address: '123 Main St, City, Country',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      {
        id: 'item_1',
        order_id: 'order_12345',
        product_id: 'prod_1',
        quantity: 2,
        price: 5000,
        created_at: new Date().toISOString()
      },
      {
        id: 'item_2',
        order_id: 'order_12345',
        product_id: 'prod_2',
        quantity: 1,
        price: 5000,
        created_at: new Date().toISOString()
      }
    ],
    tracking_status: 'delivered',
    estimated_delivery: '2023-06-12'
  },
  {
    id: 'order_12346',
    order_number: 'ORD-12346',
    customer_email: 'customer@example.com',
    customer_name: 'John Doe',
    status: 'shipped',
    total_amount: 8500,
    stripe_session_id: 'sess_124',
    stripe_payment_intent_id: 'pi_124',
    shipping_address: '123 Main St, City, Country',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item_3',
        order_id: 'order_12346',
        product_id: 'prod_3',
        quantity: 1,
        price: 8500,
        created_at: new Date().toISOString()
      }
    ],
    tracking_status: 'shipped',
    estimated_delivery: '2023-06-15'
  },
  {
    id: 'order_12347',
    order_number: 'ORD-12347',
    customer_email: 'customer@example.com',
    customer_name: 'John Doe',
    status: 'pending',
    total_amount: 12000,
    stripe_session_id: 'sess_125',
    stripe_payment_intent_id: 'pi_125',
    shipping_address: '123 Main St, City, Country',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item_4',
        order_id: 'order_12347',
        product_id: 'prod_4',
        quantity: 1,
        price: 7000,
        created_at: new Date().toISOString()
      },
      {
        id: 'item_5',
        order_id: 'order_12347',
        product_id: 'prod_5',
        quantity: 1,
        price: 5000,
        created_at: new Date().toISOString()
      }
    ],
    tracking_status: 'pending',
    estimated_delivery: '2023-06-18'
  }
]

export default function OrderHistoryPage() {
  const [cartCount, setCartCount] = useState(0)
  const [orders, setOrders] = useState<(Order & { items: OrderItem[], tracking_status: string, estimated_delivery: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending' | 'processing'>('all')

  useEffect(() => {
    setCartCount(getCartCount())
    // Simulate API call to fetch customer orders
    setTimeout(() => {
      setOrders(MOCK_ORDERS)
      setLoading(false)
    }, 800)
  }, [])

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500'
      case 'processing':
        return 'text-blue-500'
      case 'shipped':
        return 'text-indigo-500'
      case 'delivered':
        return 'text-green-500'
      case 'cancelled':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-indigo-500" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'cancelled':
        return <Package className="w-5 h-5 text-red-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => 
        activeTab === 'completed' ? order.status === 'delivered' :
        activeTab === 'pending' ? order.status === 'pending' :
        activeTab === 'processing' ? order.status === 'processing' || order.status === 'shipped' : false
      )

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">My Orders</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View and track your recent orders
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'all'
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('processing')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'processing'
                ? 'bg-indigo-500 text-white'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Pending
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
            />
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No {activeTab === 'all' ? 'orders' : activeTab} yet</h3>
            <p className="text-muted-foreground">Your {activeTab === 'all' ? 'order' : activeTab} history will appear here</p>
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
                  onClick={() => toggleOrderDetails(order.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-6 flex-1 text-left">
                    <div>
                      <p className="font-mono font-bold text-foreground">#{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="font-medium text-foreground">{order.items?.length || 0}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold text-accent">{formatPrice(order.total_amount)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          order.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-600'
                            : order.status === 'delivered'
                              ? 'bg-green-500/20 text-green-600'
                              : order.status === 'processing' || order.status === 'shipped'
                                ? 'bg-indigo-500/20 text-indigo-600'
                                : 'bg-red-500/20 text-red-600'
                        }`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedOrderId === order.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expandedOrderId === order.id ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
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
                  <div className="px-6 py-4 space-y-6 bg-secondary/30">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-3 bg-background rounded-lg border border-border">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                            <div className="flex-1">
                              <p className="font-medium text-foreground">Product {item.product_id}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-accent">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {order.shipping_address && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Shipping Address
                        </h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{order.shipping_address}</p>
                      </div>
                    )}

                    {/* Payment Information */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Payment Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-medium text-foreground">Paid</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Method</p>
                          <p className="font-medium text-foreground">Stripe</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Transaction ID</p>
                          <p className="font-mono text-xs text-foreground truncate">{order.stripe_payment_intent_id}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium text-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Progress */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Order Progress</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status !== 'cancelled' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {order.status !== 'cancelled' ? <CheckCircle className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 pb-2 border-b border-border">
                            <p className={`font-medium ${order.status !== 'cancelled' ? 'text-foreground' : 'text-muted-foreground'}`}>Order Placed</p>
                            <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-500 text-white' : order.status === 'cancelled' ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-500'}`}>
                            {['processing', 'shipped', 'delivered'].includes(order.status) ? <CheckCircle className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 pb-2 border-b border-border">
                            <p className={`font-medium ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'text-foreground' : 'text-muted-foreground'}`}>Order Processed</p>
                            <p className="text-xs text-muted-foreground">Estimated: Within 24 hours</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['shipped', 'delivered'].includes(order.status) ? 'bg-green-500 text-white' : order.status === 'cancelled' ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-500'}`}>
                            {['shipped', 'delivered'].includes(order.status) ? <CheckCircle className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 pb-2 border-b border-border">
                            <p className={`font-medium ${['shipped', 'delivered'].includes(order.status) ? 'text-foreground' : 'text-muted-foreground'}`}>Shipped</p>
                            <p className="text-xs text-muted-foreground">Est. delivery: {order.estimated_delivery}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'delivered' ? 'bg-green-500 text-white' : order.status === 'cancelled' ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-500'}`}>
                            {order.status === 'delivered' ? <CheckCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${order.status === 'delivered' ? 'text-foreground' : 'text-muted-foreground'}`}>Delivered</p>
                            <p className="text-xs text-muted-foreground">Est. delivery: {order.estimated_delivery}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
      
      <Footer />
    </main>
  )
}