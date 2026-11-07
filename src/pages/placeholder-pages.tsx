import { Link } from 'react-router-dom'

export function BookingFlowPage() {
  return (
    <section className="feedback" aria-labelledby="booking-heading">
      <h2 id="booking-heading">Book your seats</h2>
      <p>Select a launch from the catalogue to start a booking.</p>
      <Link to="/">Back to launches</Link>
    </section>
  )
}

export function BookingConfirmationPage() {
  return (
    <section className="feedback" aria-labelledby="confirmation-heading">
      <h2 id="confirmation-heading">Booking confirmation</h2>
      <p>Your booking status will appear here after submission.</p>
      <Link to="/bookings">View my bookings</Link>
    </section>
  )
}

export function BookingHistoryPage() {
  return (
    <section className="feedback" aria-labelledby="history-heading">
      <h2 id="history-heading">My bookings</h2>
      <p>Booking history will appear here.</p>
      <Link to="/">Browse launches</Link>
    </section>
  )
}

export function NotFoundPage() {
  return (
    <section className="feedback" aria-labelledby="not-found-heading">
      <h2 id="not-found-heading">Page not found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/">Return to launches</Link>
    </section>
  )
}
