import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Create a mock client for when Supabase isn't configured
const createMockSupabaseClient = () => {
  return {
    from: (table: string) => {
      return {
        insert: (data: any) => ({ data: Array.isArray(data) ? data : [data], error: null }),
        select: (columns?: string) => {
          return {
            eq: (column: string, value: any) => ({ data: [], error: null }),
            single: () => ({ data: null, error: null }),
          }
        },
        update: (updates: any) => {
          return {
            eq: (column: string, value: any) => ({ error: null }),
          }
        },
      }
    }
  } as any as SupabaseClient
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createMockSupabaseClient()

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