export function validateSeatCount(value: string, availableSeats: number): string | null {
  if (!/^[1-9]\d*$/.test(value)) {
    return 'Enter a positive whole number of seats.'
  }
  if (Number(value) > availableSeats) {
    return `Only ${availableSeats} seats are currently available.`
  }
  return null
}
