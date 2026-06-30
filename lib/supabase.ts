// Commenting out Supabase integration for now - using mock data only
/*
import { createClient } from '@supabase/supabase-js'

// Define the Product type
export type Product = {
  id: string
  name: string
  description?: string
  price: number
  image_url: string
  stock_quantity: number
  category?: string
  created_at: string
  updated_at: string
  sizes?: string[]
  colors?: string[]
  material?: string
  care_instructions?: string
}

export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  stock_quantity: number
  category: string | null
  created_at: string
  updated_at: string
  sizes?: string[]
  colors?: string[]
  material?: string | null
  care_instructions?: string | null
}

export type Order = {
  id: string
  order_number: string
  customer_email: string
  customer_name: string
  status: string
  total_amount: number
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  shipping_address: string | null
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export type AdminUser = {
  id: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

// Check if all required environment variables are set
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Export the configuration status and client
export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY)

// Initialize Supabase client only if properly configured
export const supabase = isSupabaseConfigured 
  ? createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
  : null

// Export a flag indicating we're in demo mode
export const isDemoMode = !isSupabaseConfigured
*/

// Export the types without Supabase integration for now
export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  stock_quantity: number
  category: string | null
  created_at: string
  updated_at: string
  sizes?: string[]
  colors?: string[]
  material?: string | null
  care_instructions?: string | null
}

export type Order = {
  id: string
  order_number: string
  customer_email: string
  customer_name: string
  status: string
  total_amount: number
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  shipping_address: string | null
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export type AdminUser = {
  id: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

// Export a mock client and configuration status for compatibility
export const supabase = null;
export const isSupabaseConfigured = false;
export const isDemoMode = true;