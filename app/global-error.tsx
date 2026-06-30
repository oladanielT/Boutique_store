'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body className="bg-background min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Something went wrong!</h1>
          <p className="text-muted-foreground mb-6">
            An unexpected error occurred. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => reset()} 
              variant="default"
            >
              Try Again
            </Button>
            <Link href="/" passHref>
              <Button variant="secondary">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}