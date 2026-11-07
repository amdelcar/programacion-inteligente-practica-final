import type { LaunchWithAvailability } from '../types/astrobookings'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function getLaunches(): Promise<LaunchWithAvailability[]> {
  const response = await fetch(`${API_BASE_URL}/api/launches`)

  if (!response.ok) {
    throw new Error(`AstroBookings API returned ${response.status}`)
  }

  return (await response.json()) as LaunchWithAvailability[]
}
