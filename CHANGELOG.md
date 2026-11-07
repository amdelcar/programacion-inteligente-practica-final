# Changelog

## 0.2.0 - 2026-11-07

### Added

- React + Vite + TypeScript application foundation.
- React Router routes for launches, booking flow, confirmation, booking
  history, and not-found handling.
- TanStack Query integration through a typed AstroBookings API adapter.
- Launch catalogue with loading, empty, retryable error, and availability
  states.
- Responsive launch table with accessible navigation and actions.
- Pico.css styling foundation with custom responsive presentation.
- Vitest unit tests and Playwright end-to-end smoke tests.

### Development

- Configurable API base URL through `VITE_API_BASE_URL`.
- Vite development proxy for the local API at `http://localhost:3000`.

### Launch catalogue

- Added the API-backed launch catalogue with rocket, date, status, price, and
  seat availability.
- Added loading, empty, API error, retry, and fully booked states.
- Added unit and Playwright coverage for catalogue behavior.

### Seat booking

- Added seat quantity validation against current launch availability.
- Added booking submission through `POST /api/bookings`.
- Added pending, success, and API rejection states.
- Added query invalidation to refresh launch availability after booking.
- Added unit and Playwright coverage for booking validation and API conflicts.

### Booking history

- Added customer booking history through `GET /api/bookings/customer/:email`.
- Added booking, launch, seat count, status, and total price details.
- Added loading, empty, API error, and retry states.
- Added unit and Playwright coverage for booking history.
