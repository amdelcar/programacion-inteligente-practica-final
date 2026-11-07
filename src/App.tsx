import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getLaunches } from './api/astrobookings-api'
import './App.css'

function App() {
  const launchesQuery = useQuery({
    queryKey: ['launches'],
    queryFn: getLaunches,
  })

  return (
    <main className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">ASTROBOOKINGS CLIENT</p>
          <h1>Choose your next launch</h1>
          <p className="intro">
            Explore upcoming missions and reserve your seats through the
            AstroBookings API.
          </p>
        </div>
        <nav aria-label="Main navigation">
          <Link to="/">Launches</Link>
          <Link to="/bookings">My bookings</Link>
        </nav>
      </header>

      <section aria-labelledby="launches-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">AVAILABLE MISSIONS</p>
            <h2 id="launches-heading">Upcoming launches</h2>
          </div>
          {launchesQuery.isFetching && <span className="status">Refreshing...</span>}
        </div>

        {launchesQuery.isPending && <p className="feedback">Loading launches...</p>}
        {launchesQuery.isError && (
          <div className="feedback feedback-error" role="alert">
            <p>We could not load launches from the API.</p>
            <button type="button" onClick={() => void launchesQuery.refetch()}>
              Try again
            </button>
          </div>
        )}
        {launchesQuery.isSuccess && launchesQuery.data.length === 0 && (
          <p className="feedback">No launches are available right now.</p>
        )}
        {launchesQuery.isSuccess && launchesQuery.data.length > 0 && (
          <div className="launch-grid">
            {launchesQuery.data.map((launch) => (
              <article className="launch-card" key={launch.id}>
                <div className="card-topline">
                  <span className="launch-status">{launch.status}</span>
                  <span>{formatDate(launch.scheduledDate)}</span>
                </div>
                <h3>{launch.rocketName}</h3>
                <dl className="launch-details">
                  <div>
                    <dt>Price</dt>
                    <dd>{formatPrice(launch.price)}</dd>
                  </div>
                  <div>
                    <dt>Seats available</dt>
                    <dd>{launch.availableSeats}</dd>
                  </div>
                </dl>
                <Link className="card-action" to={`/launches/${launch.id}`}>
                  View launch
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
    new Date(value),
  )
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export default App
