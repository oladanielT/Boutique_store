// Remove supabase import since we're using demo mode
// import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, verifyPassword } from '@/lib/auth'

// Mock admin user for demo purposes
const MOCK_ADMIN_USER = {
  id: 'demo-admin',
  email: 'admin@example.com',
  password_hash: '$2b$10$8K1p/a0SIuIY6VJOFn4ZFeBuz6GnvTieztWWN/.Ey.CGrvD.PAPaC', // Hash for 'password123'
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // In demo mode, allow hardcoded credentials
    if (email === 'admin@example.com' && password === 'password123') {
      // Generate a simple token for demo purposes (in production, use proper JWT)
      const token = `demo_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Set cookie with token
      const response = NextResponse.json({ success: true, user: { id: 'demo-admin', email } })
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
        sameSite: 'strict',
      })
      
      return response
    }

    // For other credentials, return unauthorized
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/* Original Supabase code - commented out for now
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (!isSupabaseConfigured || !supabase) {
      // In demo mode, allow hardcoded credentials
      if (email === 'admin@example.com' && password === 'password123') {
        // Generate a simple token for demo purposes (in production, use proper JWT)
        const token = `demo_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        // Set cookie with token
        const response = NextResponse.json({ success: true, user: { id: 'demo-admin', email } })
        response.cookies.set('admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 24 hours
          path: '/',
          sameSite: 'strict',
        })
        
        return response
      }
      
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify admin credentials against the database
    const { data: admin, error } = await supabase.from('admin_users').select('*').eq('email', email).single()

    if (error || !admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await verifyPassword(password, admin.password_hash)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token (simplified for demo)
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const response = NextResponse.json({ success: true, user: { id: admin.id, email: admin.email } })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      sameSite: 'strict',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
*/