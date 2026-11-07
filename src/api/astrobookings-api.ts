import type { LaunchWithAvailability } from '../types/astrobookings'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const LAUNCHES_ENDPOINT = `${API_BASE_URL}/api/launches`

export async function getLaunches(): Promise<LaunchWithAvailability[]> {
  const response = await fetch(LAUNCHES_ENDPOINT)

  if (!response.ok) {
    throw new Error(`AstroBookings API returned ${response.status}`)
  }

  const payload: unknown = await response.json()

  if (Array.isArray(payload)) {
    return payload as LaunchWithAvailability[]
  }

  if (isLaunchCollection(payload)) {
    return payload.value
  }

  throw new Error('AstroBookings API returned an invalid launches response')
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
