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

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'
export type PaymentStatus = 'pending' | 'completed' | 'failed'

export interface CreateBookingRequest {
  launchId: string
  customerEmail: string
  seatCount: number
}

export interface Booking {
  id: string
  launchId: string
  customerId: string
  customerEmail: string
  rocketName: string
  seatCount: number
  totalPrice: number
  launchPrice: number
  status: BookingStatus
  paymentStatus: PaymentStatus
  createdAt: string
  updatedAt: string
}
