import { afterEach, describe, expect, it, vi } from 'vitest'
import { getLaunches } from './astrobookings-api'

describe('getLaunches', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns launches from the AstroBookings API', async () => {
    const launches = [{ id: 'launch-1', availableSeats: 10 }]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(launches), { status: 200 }),
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
})
