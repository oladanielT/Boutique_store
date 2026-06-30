'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'
import { HERO_SLIDES } from '@/lib/mock-data'
import { STORE } from '@/lib/store'
import { ProductImage } from './product-image'
import { LinkButton } from './link-button'

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(previous => (previous + 1) % HERO_SLIDES.length)
  }, [])

  const previous = () => {
    setCurrent(value => (value - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(next, 6000)
    return () => window.clearInterval(timer)
  }, [next, paused])

  const slide = HERO_SLIDES[current]

  return (
    <section
      className="relative min-h-[680px] h-[min(900px,100svh)] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured Tunasky collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <ProductImage
              src={slide.image}
              alt={slide.alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,4,.84)_0%,rgba(4,4,4,.58)_40%,rgba(4,4,4,.12)_75%),linear-gradient(0deg,rgba(4,4,4,.74)_0%,transparent_48%)]" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 pb-8 flex flex-col justify-between">
        <div className="flex-1 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.45 }}
              className="max-w-2xl"
            >
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-white/80">
                  <MapPin className="w-3.5 h-3.5" />
                  {STORE.city}, {STORE.country}
                </span>
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-xs font-semibold uppercase text-white/80">{slide.label}</span>
              </div>

              <h1 className="font-heading text-[clamp(2.7rem,7vw,5.8rem)] font-bold text-white mb-6 leading-[0.98]">
                {slide.headline}
              </h1>
              <p className="text-base sm:text-lg text-white/85 mb-8 leading-relaxed max-w-xl">
                {slide.subtext}
              </p>

              <div className="flex flex-wrap gap-3">
                <LinkButton href="/products" variant="accent" className="min-h-12 px-6">
                  Shop Collection
                  <ArrowRight className="w-5 h-5" />
                </LinkButton>
                <LinkButton
                  href="/lookbook"
                  variant="outline"
                  className="min-h-12 px-6 border-white/40 text-white hover:bg-white/10"
                >
                  View Lookbook
                </LinkButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="hidden sm:grid grid-cols-3 divide-x divide-white/20 border-t border-white/25 pt-5 max-w-2xl flex-1">
            <div className="flex items-center gap-3 pr-5">
              <Sparkles className="w-5 h-5 text-accent shrink-0" />
              <span className="text-xs font-medium text-white/80">Curated boutique pieces</span>
            </div>
            <div className="flex items-center gap-3 px-5">
              <Truck className="w-5 h-5 text-accent shrink-0" />
              <span className="text-xs font-medium text-white/80">Delivery across Nigeria</span>
            </div>
            <div className="flex items-center gap-3 pl-5">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
              <span className="text-xs font-medium text-white/80">Secure checkout</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous slide"
              className="p-2.5 rounded-full border border-white/35 bg-black/25 backdrop-blur-sm text-white hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2" aria-label={`Slide ${current + 1} of ${HERO_SLIDES.length}`}>
              {HERO_SLIDES.map((item, index) => (
                <button
                  key={item.headline}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === current ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current ? 'w-8 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="p-2.5 rounded-full border border-white/35 bg-black/25 backdrop-blur-sm text-white hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <a
        href="#collections"
        aria-label="Explore collections"
        className="absolute z-10 bottom-7 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors hidden lg:block"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  )
}
