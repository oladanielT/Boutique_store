'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/currency'
// Remove supabase import since we're using mock data
import { type Order, type Product } from '@/lib/supabase'
import { ShoppingBag, TrendingUp, Package, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  pendingOrders: number
}

// Mock data for dashboard
const MOCK_ORDERS: Order[] = [
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
  },
  {
    id: 'order_4',
    order_number: 'ORD-12348',
    customer_email: 'alice@example.com',
    customer_name: 'Alice Williams',
    status: 'completed',
    total_amount: 32000,
    stripe_session_id: 'sess_126',
    stripe_payment_intent_id: 'pi_126',
    shipping_address: '321 Elm St, Town, Country',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'order_5',
    order_number: 'ORD-12349',
    customer_email: 'charlie@example.com',
    customer_name: 'Charlie Brown',
    status: 'pending',
    total_amount: 12500,
    stripe_session_id: 'sess_127',
    stripe_payment_intent_id: 'pi_127',
    shipping_address: '654 Maple Ave, City, Country',
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }
]

// Import MOCK_PRODUCTS from mock-data
import { MOCK_PRODUCTS } from '@/lib/mock-data'

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    // Simulate loading with mock data
    setTimeout(() => {
      // Calculate stats from mock data
      const totalRevenue = MOCK_ORDERS.reduce((sum, order) => sum + (order.total_amount || 0), 0)
      const pendingOrders = MOCK_ORDERS.filter(order => order.status === 'pending').length

      setStats({
        totalOrders: MOCK_ORDERS.length,
        totalRevenue,
        totalProducts: MOCK_PRODUCTS.length,
        pendingOrders,
      })

      // Get recent orders (last 5)
      setRecentOrders(MOCK_ORDERS.slice(0, 5))
      setLoading(false)
    }, 500)
  }

  const StatCard = ({
    icon: Icon,
    label,
    value,
    subtext,
    color,
  }: {
    icon: React.ReactNode
    label: string
    value: string | number
    subtext?: string
    color: string
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-muted-foreground">{label}</h3>
        <div className={`p-3 rounded-lg ${color}`}>{Icon}</div>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {subtext && <p className="text-sm text-muted-foreground mt-2">{subtext}</p>}
    </motion.div>
  )

  return (
    <main className="bg-background">
      <Navbar isAdmin={true} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Welcome back! Here&apos;s your store performance.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<ShoppingBag className="w-6 h-6 text-accent" />}
            label="Total Orders"
            value={stats.totalOrders}
            color="bg-accent/10"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-green-500" />}
            label="Total Revenue"
            value={formatPrice(stats.totalRevenue)}
            color="bg-green-500/10"
          />
          <StatCard
            icon={<Package className="w-6 h-6 text-blue-500" />}
            label="Total Products"
            value={stats.totalProducts}
            color="bg-blue-500/10"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-orange-500" />}
            label="Pending Orders"
            value={stats.pendingOrders}
            subtext="Awaiting fulfillment"
            color="bg-orange-500/10"
          />
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <Link href="/admin/products" className="block">
            <motion.div
              className="p-8 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              <Package className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold text-foreground mb-2">Manage Products</h2>
              <p className="text-muted-foreground">Add, edit, or delete products from your store</p>
            </motion.div>
          </Link>

          <Link href="/admin/orders" className="block">
            <motion.div
              className="p-8 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              <ShoppingBag className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold text-foreground mb-2">Manage Orders</h2>
              <p className="text-muted-foreground">View and update order statuses</p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Orders</h2>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No orders yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Order ID</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Customer</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Amount</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-mono text-foreground">{order.order_number}</td>
                      <td className="px-4 py-4 text-sm text-foreground">{order.customer_name}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-accent">{formatPrice(order.total_amount)}</td>
                      <td className="px-4 py-4 text-sm">
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
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Link href="/admin/orders">
            <motion.button
              className="mt-6 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Orders
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}