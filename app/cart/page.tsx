"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, ArrowLeft, Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductImage } from "@/components/product-image";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/currency";
import {
  getCart,
  getCartCount,
  getCartItemKey,
  removeFromCart,
  updateCartQuantity,
  type CartItem,
} from "@/lib/cart";
import { LinkButton } from "@/components/link-button";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCartItems(getCart());
    setLoading(false);
  }, []);

  const cartCount = getCartCount(cartItems);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 2500;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleRemove = (item: CartItem) =>
    setCartItems(
      removeFromCart(item.id, item.selectedSize, item.selectedColor),
    );
  const handleQuantity = (item: CartItem, qty: number) =>
    setCartItems(
      updateCartQuantity(item.id, qty, item.selectedSize, item.selectedColor),
    );

  if (loading) return <div className="min-h-screen bg-background" />;

  return (
    <main className="bg-background min-h-screen">
      <Navbar cartCount={cartCount} />

      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-foreground mb-10"
        >
          Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl font-semibold text-foreground mb-2">
              Your cart is empty
            </p>
            <p className="text-muted-foreground mb-8">
              Discover pieces crafted for everyday elegance.
            </p>
            <LinkButton href="/products" variant="accent">
              Start Shopping
            </LinkButton>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, i) => (
                <motion.div
                  key={getCartItemKey(item)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-xl"
                >
                  <div className="relative w-24 h-28 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <ProductImage
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-accent font-medium mt-1">
                      {formatPrice(item.price)}
                    </p>
                    {(item.selectedSize || item.selectedColor) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {[item.selectedSize, item.selectedColor]
                          .filter(Boolean)
                          .join(" / ")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
                      <button
                        onClick={() => handleQuantity(item, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-accent"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantity(item, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-accent"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-fit sticky top-28 p-6 bg-card border border-border rounded-xl"
            >
              <h2 className="text-lg font-bold text-foreground mb-5">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-accent">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more
                    for free shipping
                  </p>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                  <span>Total</span>
                  <span className="text-accent">{formatPrice(total)}</span>
                </div>
              </div>
              <LinkButton href="/checkout" variant="accent" className="w-full">
                <Check className="w-4 h-4" />
                Checkout
              </LinkButton>
            </motion.div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
