export type LaunchStatus = 'scheduled' | 'active' | 'completed' | 'cancelled'

export interface LaunchWithAvailability {
  id: string
  rocketId: string
  rocketName: string
  scheduledDate: string
  price: number
  minimumPassengers: number
  status: LaunchStatus
  totalSeats: number
  bookedSeats: number
  availableSeats: number
}
