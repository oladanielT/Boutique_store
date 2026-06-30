/** Nigerian Naira formatting and store thresholds */
export const CURRENCY_CODE = 'NGN'
export const CURRENCY_SYMBOL = '₦'
export const FREE_SHIPPING_THRESHOLD = 50_000

export function formatPrice(amount: number, options?: { compact?: boolean }): string {
  if (options?.compact) {
    // Format large numbers with abbreviations (e.g., ₦1.2M, ₦500K)
    if (amount >= 1_000_000) {
      return `${CURRENCY_SYMBOL}${(amount / 1_000_000).toFixed(1)}M`;
    } else if (amount >= 1_000) {
      return `${CURRENCY_SYMBOL}${(amount / 1_000).toFixed(0)}K`;
    }
    return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
  }
  
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}