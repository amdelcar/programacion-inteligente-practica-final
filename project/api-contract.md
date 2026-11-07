# AstroBookings API integration

The client integrates with the local API in:

`C:\Users\Ana\reposGithub\astro-bookings-demo`

## API availability

The backend is currently deployed and available at
`http://localhost:3000`. Check readiness with:

```text
GET http://localhost:3000/health
```

The API is in-memory, so data is reset whenever the backend process restarts.

## Local API lifecycle

When the backend must be rebuilt or started locally, use the API repository:

From the API repository:

```powershell
npm install
npm run build
npm start
```

The client API base URL is configurable with `VITE_API_BASE_URL`. In local
development, leave it empty so Vite proxies `/api` requests to
`http://localhost:3000`; for a deployed client, set it to the API origin.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Check API readiness |
| `GET` | `/api/rockets` | List rockets |
| `GET` | `/api/rockets/:id` | Read one rocket |
| `POST` | `/api/rockets` | Create a rocket |
| `PUT` | `/api/rockets/:id` | Update a rocket |
| `DELETE` | `/api/rockets/:id` | Delete a rocket |
| `GET` | `/api/launches` | List launches with availability |
| `GET` | `/api/launches/:id` | Read one launch with availability |
| `POST` | `/api/launches` | Create a launch |
| `PUT` | `/api/launches/:id` | Update a launch |
| `DELETE` | `/api/launches/:id` | Delete a launch |
| `GET` | `/api/launches/:launchId/availability` | Read seat availability |
| `GET` | `/api/customers` | List customers |
| `GET` | `/api/customers/:id` | Read one customer |
| `GET` | `/api/customers/email/:email` | Find a customer by email |
| `POST` | `/api/customers` | Create the customer used for a booking |
| `PUT` | `/api/customers/:id` | Update a customer |
| `DELETE` | `/api/customers/:id` | Delete a customer |
| `POST` | `/api/bookings` | Create a booking |
| `GET` | `/api/bookings/:id` | Read booking status |
| `GET` | `/api/bookings/launch/:launchId` | Read bookings for a launch |
| `GET` | `/api/bookings/customer/:email` | Read booking history |

Rocket listing supports the `range`, `minCapacity`, `page`, and `pageSize`
query parameters.

Launch list responses include `rocketName`, `totalSeats`, `bookedSeats`, and
`availableSeats`. Booking creation accepts:

```json
{
  "launchId": "launch-id",
  "customerEmail": "customer@example.com",
  "seatCount": 2
}
```

The API validates launch dates, prices, rocket capacity, and launch status
transitions. The client must surface API errors, including conflicts caused by
stale availability.

## Local test data

The currently running API has test data ready for booking flows:

- Customer email: `test.customer@astrobookings.local`
- Active launch ID: `launch-1`
- Available seats: `10`
- Rocket: `Test Falcon`

These records are in-memory and will disappear when the backend restarts.

## Validation workflow

Before running client integration or end-to-end tests:

1. Install dependencies in the API repository if needed.
2. Run `npm run build` in the API repository.
3. Start it with `npm start`.
4. Verify `/health`.
5. Run the client build and tests from this repository.
