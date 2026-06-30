import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { verifyPassword, createToken, hashPassword } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    if (!isSupabaseConfigured || !supabase) {
      console.log('Supabase not configured - admin login unavailable')
      // Instead of returning 503, return a more descriptive error that won't cause 404
      return NextResponse.json({ 
        error: 'Database not configured. Admin login requires database configuration.', 
        requiresSetup: true 
      }, { status: 200 })
    }

    // Check if admin user exists
    const { data: admin, error } = await supabase.from('admin_users').select('*').eq('email', email).single()

    if (error || !admin) {
      // If no admin exists and this is the first login, create one with provided credentials
      const { data: allAdmins } = await supabase.from('admin_users').select('id')

      if (allAdmins?.length === 0 && email === 'admin@tunasky.com' && password === 'Admin123!') {
        // Create the default admin user
        const hashedPassword = await hashPassword(password)
        const { error: createError } = await supabase.from('admin_users').insert({
          email,
          password_hash: hashedPassword,
        })

        if (createError) {
          return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 })
        }

        const token = await createToken(email)
        return NextResponse.json({ token, email })
      }

      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    const passwordValid = await verifyPassword(password, admin.password_hash)

    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create JWT token
    const token = await createToken(admin.email)

    return NextResponse.json({ token, email: admin.email })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}