'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut, Menu, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { STORE } from '@/lib/store'

export function Navbar({ cartCount = 0, isAdmin = false }: { cartCount?: number; isAdmin?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappNumber = STORE.phone.replace(/\D/g, '')
  const whatsappMessage = encodeURIComponent('Hello! I\'m interested in your boutique items. Can you help me with some questions?')
  const transparent = !scrolled && !isAdmin && !menuOpen

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex justify-between items-center w-full">
          <Link href={isAdmin ? '/admin' : '/'} className="flex items-center gap-2 group">
            <span className={`text-xl font-bold tracking-tight group-hover:text-accent transition-colors ${transparent ? 'text-white' : 'text-foreground'}`}>
              Tunasky
            </span>
            <span className={`text-xs font-medium hidden sm:inline tracking-widest uppercase ${transparent ? 'text-white/70' : 'text-muted-foreground'}`}>
              Wears
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-5">
            {!isAdmin ? (
              <>
                <Link href="/" className={`text-sm font-medium transition-colors ${transparent ? 'text-white hover:text-accent' : 'text-foreground hover:text-accent'} hidden md:inline`}>
                  Home
                </Link>
                <Link href="/products" className={`text-sm font-medium transition-colors ${transparent ? 'text-white hover:text-accent' : 'text-foreground hover:text-accent'} hidden md:inline`}>
                  Shop
                </Link>
                <Link href="/orders" className={`text-sm font-medium transition-colors ${transparent ? 'text-white hover:text-accent' : 'text-foreground hover:text-accent'} hidden md:inline`}>
                  My Orders
                </Link>
                <Link href="/lookbook" className={`text-sm font-medium transition-colors ${transparent ? 'text-white hover:text-accent' : 'text-foreground hover:text-accent'} hidden md:inline`}>
                  Lookbook
                </Link>
                <Link 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium transition-colors ${transparent ? 'text-white hover:text-accent' : 'text-foreground hover:text-accent'} hidden lg:block`}>
                  WhatsApp
                </Link>
                <div className={transparent ? '[&_button]:text-white' : ''}><ThemeToggle /></div>
                <Link href="/cart" aria-label={`Shopping cart with ${cartCount} items`} className="relative group p-2">
                  <ShoppingBag className={`w-5 h-5 group-hover:text-accent transition-colors ${transparent ? 'text-white' : 'text-foreground'}`} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(open => !open)}
                  className={`md:hidden p-2 ${transparent ? 'text-white' : 'text-foreground'}`}
                  aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <>
                <Link href="/admin" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                  Dashboard
                </Link>
                <Link
                  href="/admin/products"
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="/admin/orders"
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    document.cookie = 'admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                    window.location.href = '/admin/login'
                  }}
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
        {!isAdmin && menuOpen && (
          <div className="md:hidden border-t border-border py-3 grid">
            <Link href="/products" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium text-foreground">Shop</Link>
            <Link href="/lookbook" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium text-foreground">Lookbook</Link>
            <Link href="/orders" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium text-foreground">My Orders</Link>
            <Link href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="py-3 text-sm font-medium text-foreground flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
