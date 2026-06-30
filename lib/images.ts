/** Build optimized Unsplash / remote image URLs for fast loading */
export function optimizeImage(url: string, width = 800, height?: number) {
  if (!url) return url
  const separator = url.includes('?') ? '&' : '?'
  const size = height ? `w=${width}&h=${height}` : `w=${width}`
  return `${url}${separator}${size}&q=90&auto=format&fit=crop&fm=webp`
}