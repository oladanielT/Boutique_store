import Link from 'next/link'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-base transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]',
  accent:
    'inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-semibold text-base transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]',
  outline:
    'inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground/20 text-foreground rounded-xl font-semibold text-base bg-background/80 backdrop-blur-sm transition-all hover:border-accent hover:text-accent hover:bg-accent/5 active:scale-[0.98]',
  ghost:
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-foreground rounded-xl font-medium transition-all hover:bg-foreground/10 active:scale-[0.98]',
  secondary:
    'inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary/80 text-foreground rounded-xl font-semibold transition-all hover:bg-secondary active:scale-[0.98]',
}

type LinkButtonProps = {
  href: string
  variant?: keyof typeof variants
  className?: string
  children: React.ReactNode
}

export function LinkButton({ href, variant = 'primary', className, children }: LinkButtonProps) {
  return (
    <Link href={href} className={cn(variants[variant], className)}>
      {children}
    </Link>
  )
}