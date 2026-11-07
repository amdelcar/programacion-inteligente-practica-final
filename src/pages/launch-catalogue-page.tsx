import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getLaunches } from '../api/astrobookings-api'
import { Feedback } from '../components/feedback'
import { hasAvailableSeats } from '../features/launches/launch-availability'
import type { LaunchWithAvailability } from '../types/astrobookings'
import { formatDate, formatPrice } from '../utils/formatters'

export function LaunchCataloguePage() {
  const launchesQuery = useQuery({
    queryKey: ['launches'],
    queryFn: getLaunches,
    retry: false,
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
        <div className="table-container">
          <table className="launch-table">
            <caption className="visually-hidden">Available rocket launches</caption>
            <thead>
              <tr>
                <th scope="col">Mission</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Price</th>
                <th scope="col">Availability</th>
                <th scope="col"><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {launchesQuery.data.map((launch) => (
                <LaunchRow key={launch.id} launch={launch} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

interface LaunchRowProps {
  launch: LaunchWithAvailability
}

function LaunchRow({ launch }: LaunchRowProps) {
  const isAvailable = hasAvailableSeats(launch)

  return (
    <tr>
      <th scope="row">
        <span className="mission-name">{launch.rocketName}</span>
        <span className="mission-id">ID {launch.id}</span>
      </th>
      <td>{formatDate(launch.scheduledDate)}</td>
      <td>
        <span className={`launch-status launch-status-${launch.status}`}>
          <span className="status-dot" aria-hidden="true" />
          {launch.status}
        </span>
      </td>
      <td className="table-number">{formatPrice(launch.price)}</td>
      <td>
        <span
          className={`availability-badge ${
            isAvailable ? 'availability-open' : 'availability-full'
          }`}
        >
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
        <span className="availability-count">{launch.availableSeats}</span>
        <span className="availability-label"> seats</span>
      </td>
      <td className="table-action">
        {isAvailable ? (
          <Link className="card-action" to={`/launches/${launch.id}`}>
            View details
          </Link>
        ) : (
          <span className="card-action card-action-disabled" aria-disabled="true">
            Fully booked
          </span>
        )}
      </td>
    </tr>
  )
}
