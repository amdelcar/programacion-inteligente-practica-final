import { describe, expect, it } from 'vitest'
import { hasAvailableSeats } from './launch-availability'
import type { LaunchWithAvailability } from '../../types/astrobookings'

const launch = (availableSeats: number): LaunchWithAvailability => ({
  id: 'launch-1',
  rocketId: 'rocket-1',
  rocketName: 'Test Falcon',
  scheduledDate: '2026-12-07T18:29:32.421Z',
  price: 4999,
  minimumPassengers: 1,
  status: 'active',
  totalSeats: 10,
  bookedSeats: 10 - availableSeats,
  availableSeats,
})

describe('hasAvailableSeats', () => {
  it('returns true when seats remain', () => {
    expect(hasAvailableSeats(launch(3))).toBe(true)
  })

  it('returns false when the launch is full', () => {
    expect(hasAvailableSeats(launch(0))).toBe(false)
  })
})
