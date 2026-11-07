# Booking confirmation detail Specification
- **Type**: feat
- **Status**: Verified

## Problem Description

Customers can submit a booking and view a history row, but they cannot open a
durable confirmation that explains the reservation and its current payment
state. The detail must be addressable directly because booking mutation state
is transient.

### User Stories

- As a customer, I want to open a booking from my history so that I can verify
  the reservation details and payment state.
- As a customer, I want clear loading, error, and retry feedback so that I can
  recover when the API is slow or unavailable.
- As a customer, I want to return to my booking history so that I can continue
  reviewing my reservations.

## Solution Overview

### User/App interface

Add a `/bookings/:bookingId` confirmation page that displays the booking
identifier, mission, seats, total price, booking status, payment status, and
created/updated timestamps. Provide accessible loading and API error states
with retry, plus a history navigation link. Direct navigation and refresh must
work.

### Model and logic

Use the typed API adapter to fetch one booking with `GET /api/bookings/:id`.
Use TanStack Query with the `['booking', bookingId]` key, disable the query
without an identifier, and expose API errors to the page. Format money and
timestamps consistently with existing utilities.

### Persistence

The AstroBookings API remains the source of truth. No client-side persistence
is introduced.

## Acceptance Criteria

- [ ] When a customer navigates to `/bookings/:bookingId`, the system shall
  request `GET /api/bookings/:id` and show a loading state until the response
  resolves.
- [ ] When the API returns a booking, the system shall display its identifier,
  mission, seat count, total price, booking status, payment status, and created
  and updated timestamps.
- [ ] If the API request fails, the system shall show an accessible error and a
  retry control that retries the same booking.
- [ ] When a customer selects the history navigation, the system shall navigate
  to `/bookings`.
- [ ] When a customer opens a history booking link, the system shall navigate
  to the corresponding detail route without relying on mutation state.
- [ ] The adapter shall reject non-successful or invalid responses with a typed
  booking result boundary consistent with existing API functions.
