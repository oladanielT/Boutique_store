import bcryptjs from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

// Use a default secret for development/demo mode, but log a warning
const authSecret = process.env.AUTH_SECRET;
if (!authSecret && process.env.NODE_ENV === 'production') {
  console.warn('AUTH_SECRET is not set. Using fallback secret. This is insecure for production.');
}
const secret = new TextEncoder().encode(authSecret || 'fallback-secret-key-for-development-change-in-production');

export async function hashPassword(password: string): Promise<string> {
  return await bcryptjs.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcryptjs.compare(password, hash)
}

export async function createToken(email: string): Promise<string> {
  if (!authSecret) {
    // In demo mode, return a simple identifier instead of a real JWT
    return `demo_token_${email}_${Date.now()}`;
  }
  
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  if (!authSecret && token.startsWith('demo_token_')) {
    // Handle demo tokens
    const parts = token.split('_');
    if (parts.length >= 4) {
      return { email: parts.slice(3, -1).join('_') }; // Reconstruct email from remaining parts
    }
    return null;
  }
  
  try {
    const verified = await jwtVerify(token, secret)
    return verified.payload as { email: string }
  } catch (error) {
    console.error('Token verification error:', error);
    return null
  }
}