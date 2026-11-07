import type { LaunchWithAvailability } from '../../types/astrobookings'

export function hasAvailableSeats(launch: LaunchWithAvailability): boolean {
  return launch.availableSeats > 0
}
