import type {
  Booking,
  CreateBookingRequest,
  LaunchWithAvailability,
} from '../types/astrobookings'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const LAUNCHES_ENDPOINT = `${API_BASE_URL}/api/launches`

export async function getLaunches(): Promise<LaunchWithAvailability[]> {
  const response = await fetch(LAUNCHES_ENDPOINT)
  if (!response.ok) {
    throw new Error(`AstroBookings API returned ${response.status}`)
  }
  const payload: unknown = await response.json()
  if (Array.isArray(payload)) return payload as LaunchWithAvailability[]
  if (isLaunchCollection(payload)) return payload.value
  throw new Error('AstroBookings API returned an invalid launches response')
}

export async function getLaunch(launchId: string): Promise<LaunchWithAvailability> {
  const response = await fetch(`${LAUNCHES_ENDPOINT}/${encodeURIComponent(launchId)}`)
  return readResponse(response, 'launch')
}

export async function createBooking(
  request: CreateBookingRequest,
): Promise<Booking> {
  const response = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  return readResponse(response, 'booking')
}

async function readResponse<T>(response: Response, resource: string): Promise<T> {
  const payload: unknown = await response.json().catch(() => undefined)
  if (!response.ok) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'error' in payload &&
      typeof payload.error === 'string'
        ? payload.error
        : `AstroBookings API returned ${response.status}`
    throw new Error(message)
  }
  if (payload === undefined) {
    throw new Error(`AstroBookings API returned an invalid ${resource} response`)
  }
  return payload as T
}

function isLaunchCollection(
  payload: unknown,
): payload is { value: LaunchWithAvailability[] } {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'value' in payload &&
    Array.isArray(payload.value)
  )
}
