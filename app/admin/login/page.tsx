'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Loader, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.token) {
        // Store token in cookie
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400`
        window.location.href = '/admin'
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Sign in to manage your store</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3 text-destructive"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                placeholder="admin@tunasky.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-50"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-2 font-semibold">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground">Email: admin@tunasky.com</p>
            <p className="text-xs text-muted-foreground">Password: Admin123!</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-accent hover:text-accent-foreground transition-colors">
            Back to Store
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
