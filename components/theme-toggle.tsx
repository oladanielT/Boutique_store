'use client'

import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="p-2 rounded-lg text-foreground hover:text-accent hover:bg-secondary transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </motion.button>
  )
}
