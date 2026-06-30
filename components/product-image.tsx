import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'

interface ProductImageProps {
  src: string | StaticImageData | null | undefined
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  quality?: number
}

export function ProductImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 33vw',
  quality = 85,
}: ProductImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-secondary text-muted-foreground text-sm',
          className
        )}
      >
        No image
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn('object-cover', className)}
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={false}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 1000}
      className={cn('object-cover', className)}
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={false}
    />
  )
}
