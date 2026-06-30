'use client'

import { Suspense } from 'react'
import ProductsContent from './products-content'

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsContent />
    </Suspense>
  )
}
