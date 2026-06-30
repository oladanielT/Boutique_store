// Remove supabase import since we're using demo mode
// import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, {
    apiVersion: '2024-11-20.acacia', // Updated to a recent API version
  })
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url?: string
}

interface CreateOrderRequest {
  email: string
  name: string
  address: string
  items: OrderItem[]
  total: number
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()

    if (!body.email || !body.name || !body.items.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Always use demo mode for now until backend is ready
    console.log('Running in demo mode - checkout requires database configuration')
    return NextResponse.json({ 
      sessionUrl: `${baseUrl}/success?order_id=demo_order`, 
      orderId: 'demo_order',
      message: 'Demo mode: checkout requires database configuration'
    })

    /* Original Supabase and Stripe code - commented out for now
    if (!isSupabaseConfigured || !supabase) {
      console.log('Supabase not configured - running in demo mode')
      // Return a mock response instead of an error to prevent 404
      return NextResponse.json({ 
        sessionUrl: `${baseUrl}/success?order_id=demo_order`, 
        orderId: 'demo_order',
        message: 'Demo mode: checkout requires database configuration'
      })
    }

    const stripe = getStripe()
    if (!stripe) {
      console.log('Stripe not configured - running in demo mode')
      // Return a mock response instead of an error to prevent 404
      return NextResponse.json({ 
        sessionUrl: `${baseUrl}/success?order_id=demo_order`, 
        orderId: 'demo_order',
        message: 'Demo mode: payment processing is not configured'
      })
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}`

    // Create order in database first
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_email: body.email,
        customer_name: body.name,
        shipping_address: body.address,
        total_amount: body.total,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError || !orderData) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create order items in database
    const orderItems = body.items.map(item => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

    if (itemsError) {
      console.error('Order items error:', itemsError)
      return NextResponse.json({ error: 'Failed to add items to order' }, { status: 500 })
    }

    // Create Stripe checkout session
    const lineItems = body.items.map(item => ({
      price_data: {
        currency: 'ngn',
        product_data: {
          name: item.name,
          images: item.image_url ? [item.image_url] : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success?order_id=${orderData.id}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: body.email,
      metadata: {
        order_id: orderData.id,
        order_number: orderNumber,
      },
    })

    // Update order with Stripe session ID
    await supabase.from('orders').update({ stripe_session_id: session.id }).eq('id', orderData.id)

    return NextResponse.json({ sessionUrl: session.url, orderId: orderData.id })
    */
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}