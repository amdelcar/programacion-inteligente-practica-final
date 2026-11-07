import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createBooking, getBooking, getLaunch } from '../api/astrobookings-api'
import { Feedback } from '../components/feedback'
import { DEFAULT_CUSTOMER_EMAIL } from '../config/customer'
import { validateSeatCount } from '../features/bookings/booking-validation'
import type { Booking } from '../types/astrobookings'
import { formatDate, formatPrice } from '../utils/formatters'

export function BookingFlowPage() {
  const { launchId = '' } = useParams()
  const queryClient = useQueryClient()
  const [seatCount, setSeatCount] = useState('1')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const launchQuery = useQuery({
    queryKey: ['launch', launchId],
    queryFn: () => getLaunch(launchId),
    enabled: Boolean(launchId),
    retry: false,
  })
  const bookingMutation = useMutation({
    mutationFn: () =>
      createBooking({
        launchId,
        customerEmail: DEFAULT_CUSTOMER_EMAIL,
        seatCount: Number(seatCount),
      }),
    onSuccess: async (booking) => {
      setApiError(null)
      setBookingId(booking.id)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['launch', launchId] }),
        queryClient.invalidateQueries({ queryKey: ['launches'] }),
        queryClient.invalidateQueries({
          queryKey: ['bookings', DEFAULT_CUSTOMER_EMAIL],
        }),
      ])
    },
    onError: async (error) => {
      setApiError(error instanceof Error ? error.message : 'Booking failed.')
      await queryClient.invalidateQueries({ queryKey: ['launch', launchId] })
    },
  })

  if (launchQuery.isPending) {
    return <Feedback message="Loading launch details..." />
  }

  if (launchQuery.isError) {
    return (
      <Feedback
        message="We could not load this launch."
        actionLabel="Back to launches"
        onAction={() => window.history.back()}
      />
    )
  }

  const launch = launchQuery.data
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const error = validateSeatCount(seatCount, launch.availableSeats)
    setValidationError(error)
    setApiError(null)
    if (error) {
      return
    }

    bookingMutation.mutate()
  }

  return (
    <section aria-labelledby="booking-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">RESERVE YOUR SEATS</p>
          <h2 id="booking-heading">{launch.rocketName}</h2>
        </div>
        <Link to="/">Back to launches</Link>
      </div>
      <p>{launch.availableSeats} seats available</p>
      <form className="booking-form" onSubmit={submit} noValidate>
        <label htmlFor="seat-count">Number of seats</label>
        <input
          id="seat-count"
          name="seatCount"
          type="number"
          min="1"
          max={launch.availableSeats}
          step="1"
          value={seatCount}
          onChange={(event) => {
            setSeatCount(event.target.value)
            setValidationError(null)
            setApiError(null)
          }}
          aria-describedby="seat-help seat-error"
        />
        <small id="seat-help">Choose between 1 and {launch.availableSeats} seats.</small>
        {validationError && (
          <p id="seat-error" role="alert">
            {validationError}
          </p>
        )}
        {apiError && (
          <p id="booking-api-error" role="alert">
            {apiError}
          </p>
        )}
        <button type="submit" disabled={bookingMutation.isPending}>
          {bookingMutation.isPending ? 'Booking...' : 'Book seats'}
        </button>
      </form>
      {bookingId && (
        <section className="feedback" aria-live="polite">
          <h3>Booking accepted</h3>
          <p>
            Status: <strong>{bookingMutation.data?.status}</strong>
          </p>
          <p>Booking ID: {bookingId}</p>
          <Link to={`/bookings/${bookingId}`}>View confirmation</Link>
        </section>
      )}
    </section>
  )
}

export function BookingConfirmationPage() {
  const { bookingId } = useParams()
  const bookingQuery = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId ?? ''),
    enabled: Boolean(bookingId),
    retry: false,
  })

  if (!bookingId) {
    return (
      <section className="feedback" aria-labelledby="confirmation-heading">
        <h2 id="confirmation-heading">Booking confirmation</h2>
        <p>Open a booking from your history to view its confirmation.</p>
        <Link to="/bookings">View my bookings</Link>
      </section>
    )
  }

  if (bookingQuery.isPending) {
    return <Feedback message="Loading booking confirmation..." />
  }

  if (bookingQuery.isError) {
    return (
      <Feedback
        message="We could not load this booking from the API."
        actionLabel="Try again"
        onAction={() => void bookingQuery.refetch()}
      />
    )
  }

  const booking = bookingQuery.data
  return (
    <section aria-labelledby="confirmation-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">BOOKING CONFIRMATION</p>
          <h2 id="confirmation-heading">{booking.rocketName}</h2>
        </div>
        <Link to="/bookings">Back to my bookings</Link>
      </div>
      <div className="confirmation-card">
        <BookingDetailsTable booking={booking} />
      </div>
    </section>
  )
}

interface BookingDetailsTableProps {
  booking: Booking
}

interface BookingDetailRow {
  label: string
  value: string | number
}

function BookingDetailsTable({ booking }: BookingDetailsTableProps) {
  const details: BookingDetailRow[] = [
    { label: 'Booking ID', value: booking.id },
    { label: 'Mission', value: booking.rocketName },
    { label: 'Booking status', value: booking.status },
    { label: 'Payment status', value: booking.paymentStatus },
    { label: 'Seats', value: booking.seatCount },
    { label: 'Total price', value: formatPrice(booking.totalPrice) },
    { label: 'Booked', value: formatDate(booking.createdAt) },
    { label: 'Last updated', value: formatDate(booking.updatedAt) },
  ]

  return (
    <div className="table-container">
      <table className="booking-detail-table">
        <caption className="visually-hidden">
          Details for booking {booking.id}
        </caption>
        <thead>
          <tr>
            <th scope="col">Detail</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {details.map(({ label, value }) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function NotFoundPage() {
  return (
    <section className="feedback">
      <h2>Page not found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/">Return to launches</Link>
    </section>
  )
}
