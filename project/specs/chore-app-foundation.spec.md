# Application Foundation
- **Type**: chore
- **Status**: Planned

## Problem Description

The client needs a predictable structure for navigation, server-state handling,
responsive presentation, and verification before feature work is implemented.

### User Stories

- As a customer, I want navigation between launches and bookings so that I can complete the main journeys.
- As a maintainer, I want consistent API and UI boundaries so that features remain testable.

## Solution Overview

### User/App interface

Define routes for the launch catalogue, booking flow, confirmation, and booking
history, with a shared layout and not-found state.

### Model and logic

Configure React Router, TanStack Query, typed API error handling, and shared
loading/error/empty primitives. Keep feature logic outside route composition.

### Persistence

Use in-memory TanStack Query cache only. Configure the API base URL from the
runtime environment.

## Acceptance Criteria

- [ ] THE AstroBookings Client SHALL expose routes for launches, booking flow, confirmation, and booking history.
- [ ] THE AstroBookings Client SHALL render a not-found state for an unknown route.
- [ ] THE AstroBookings Client SHALL obtain API data only through typed adapter functions.
- [ ] THE AstroBookings Client SHALL configure the API base URL without changing source code.
- [ ] THE AstroBookings Client SHALL provide keyboard-accessible labels, focus states, and semantic controls.
