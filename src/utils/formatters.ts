const EURO_CURRENCY_FORMATTER = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'EUR',
})

export function formatPrice(value: number): string {
  return EURO_CURRENCY_FORMATTER.format(value)
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
    new Date(value),
  )
}
