import { describe, expect, it } from 'vitest'
import { validateSeatCount } from './booking-validation'

describe('validateSeatCount', () => {
  it('accepts a positive integer within availability', () => {
    expect(validateSeatCount('2', 3)).toBeNull()
  })

  it.each(['', '0', '-1', '1.5', 'abc'])('rejects %s', (value) => {
    expect(validateSeatCount(value, 3)).toContain('positive whole number')
  })

  it('rejects quantities above availability', () => {
    expect(validateSeatCount('4', 3)).toContain('Only 3 seats')
  })
})
