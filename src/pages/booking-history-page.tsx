import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getBookingsByCustomer } from '../api/astrobookings-api'
import { Feedback } from '../components/feedback'
import { DEFAULT_CUSTOMER_EMAIL } from '../config/customer'
import { formatPrice } from '../utils/formatters'

export function BookingHistoryPage() {
  const bookingsQuery = useQuery({
    queryKey: ['bookings', DEFAULT_CUSTOMER_EMAIL],
    queryFn: () => getBookingsByCustomer(DEFAULT_CUSTOMER_EMAIL),
    retry: false,
  })

  return (
    <section aria-labelledby="bookings-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR TRAVEL PLANS</p>
          <h2 id="bookings-heading">My bookings</h2>
        </div>
        {bookingsQuery.isFetching && (
          <span className="status" role="status">
            Refreshing...
          </span>
        )}
      </div>
      {bookingsQuery.isPending && <Feedback message="Loading your bookings..." />}
      {bookingsQuery.isError && (
        <Feedback
          message="We could not load your bookings from the API."
          actionLabel="Try again"
          onAction={() => void bookingsQuery.refetch()}
        />
      )}
      {bookingsQuery.isSuccess && bookingsQuery.data.length === 0 && (
        <Feedback message="You do not have any bookings yet." />
      )}
      {bookingsQuery.isSuccess && bookingsQuery.data.length > 0 && (
        <div className="table-container">
          <table className="booking-table">
            <caption className="visually-hidden">
              Your AstroBookings reservations
            </caption>
            <thead>
              <tr>
                <th scope="col">Booking</th>
                <th scope="col">Mission</th>
                <th scope="col">Seats</th>
                <th scope="col">Status</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {bookingsQuery.data.map((booking) => (
                <tr key={booking.id}>
                  <th scope="row">
                    <Link to={`/bookings/${booking.id}`}>{booking.id}</Link>
                  </th>
                  <td>{booking.rocketName}</td>
                  <td>{booking.seatCount}</td>
                  <td>
                    <span
                      className={`booking-status booking-status-${booking.status}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>{formatPrice(booking.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link to="/">Browse launches</Link>
    </section>
  )
}
