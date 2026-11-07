import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getLaunches } from '../api/astrobookings-api'
import { Feedback } from '../components/feedback'

export function LaunchCataloguePage() {
  const launchesQuery = useQuery({
    queryKey: ['launches'],
    queryFn: getLaunches,
  })

  return (
    <section aria-labelledby="launches-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">AVAILABLE MISSIONS</p>
          <h2 id="launches-heading">Upcoming launches</h2>
        </div>
        {launchesQuery.isFetching && (
          <span className="status" role="status">
            Refreshing...
          </span>
        )}
      </div>

      {launchesQuery.isPending && <Feedback message="Loading launches..." />}
      {launchesQuery.isError && (
        <Feedback
          message="We could not load launches from the API."
          actionLabel="Try again"
          onAction={() => void launchesQuery.refetch()}
        />
      )}
      {launchesQuery.isSuccess && launchesQuery.data.length === 0 && (
        <Feedback message="No launches are available right now." />
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
