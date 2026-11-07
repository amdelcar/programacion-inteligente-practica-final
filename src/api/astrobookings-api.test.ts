import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createBooking,
  getBookingsByCustomer,
  getLaunch,
  getLaunches,
} from './astrobookings-api'

describe('getLaunches', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns launches from the AstroBookings API', async () => {
    const launches = [{ id: 'launch-1', availableSeats: 10 }]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ value: launches, Count: 1 }), { status: 200 }),
    )

    await expect(getLaunches()).resolves.toEqual(launches)
    expect(fetch).toHaveBeenCalledWith('/api/launches')
  })

  it('rejects when the API returns an error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('unavailable', { status: 503 }),
    )

    await expect(getLaunches()).rejects.toThrow(
      'AstroBookings API returned 503',
    )
  })

  it('rejects an invalid launches response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ value: 'not-a-list' }), { status: 200 }),
    )

    await expect(getLaunches()).rejects.toThrow(
      'AstroBookings API returned an invalid launches response',
    )
  })

  it('creates a booking and surfaces API errors', async () => {
    const booking = { id: 'booking-1', status: 'pending' }
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(booking), { status: 201 }),
    )
    await expect(
      createBooking({
        launchId: 'launch-1',
        customerEmail: 'test.customer@astrobookings.local',
        seatCount: 2,
      }),
    ).resolves.toEqual(booking)
    expect(fetch).toHaveBeenCalledWith(
      '/api/bookings',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('reads one launch and reports API rejection details', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Insufficient seats available' }), {
        status: 400,
      }),
    )
    await expect(getLaunch('launch-1')).rejects.toThrow('Insufficient seats available')
  })

  it('gets booking history for an encoded customer email', async () => {
    const bookings = [{ id: 'booking-1', status: 'confirmed' }]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(bookings), { status: 200 }),
    )

    await expect(
      getBookingsByCustomer('test.customer@astrobookings.local'),
    ).resolves.toEqual(bookings)
    expect(fetch).toHaveBeenCalledWith(
      '/api/bookings/customer/test.customer%40astrobookings.local',
    )
  })

  it('rejects an invalid booking history response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ value: [] }), { status: 200 }),
    )

    await expect(
      getBookingsByCustomer('test.customer@astrobookings.local'),
    ).rejects.toThrow(
      'AstroBookings API returned an invalid booking history response',
    )
  })
})
