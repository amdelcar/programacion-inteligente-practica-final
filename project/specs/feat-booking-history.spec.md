# Booking Status and History
- **Type**: feat
- **Status**: Implemented

## Problem Description

Customers need to confirm the state of a submitted booking and review their
existing bookings without repeating a booking request.

### User Stories

- As a customer, I want to see my booking status so that I know whether it was accepted.
- As a customer, I want to review my bookings so that I can track past and current trips.

## Solution Overview

### User/App interface

Provide a confirmation view for a newly submitted booking and a history route
listing customer bookings with launch reference, seat count, and status.

### Model and logic

Use the status returned by the API verbatim with a clear visual label. Support
loading, empty, API-error, and retry states.

### Persistence

Read booking history from the API through TanStack Query. The client stores no
permanent history.

## Acceptance Criteria

- [x] WHEN a booking is accepted THE AstroBookings Client SHALL show its identifier and API-provided status.
- [x] THE AstroBookings Client SHALL display each customer booking with its launch reference, seat count, and status.
- [x] WHEN the booking history request is pending THE AstroBookings Client SHALL display a loading state.
- [x] WHEN the customer has no bookings THE AstroBookings Client SHALL display an empty state.
- [x] IF the booking history request fails THEN THE AstroBookings Client SHALL display an error message and retry action.
