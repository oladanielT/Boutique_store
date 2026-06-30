export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const colors = {
    success: 'bg-accent text-accent-foreground',
    error: 'bg-destructive text-white',
    info: 'bg-primary text-primary-foreground',
  }
  const toast = document.createElement('div')
  toast.className = `fixed bottom-6 right-6 ${colors[type]} px-6 py-3 rounded-lg shadow-xl z-[100] text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300`
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300')
    setTimeout(() => toast.remove(), 300)
  }, 2500)
}
