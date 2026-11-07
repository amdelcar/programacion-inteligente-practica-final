# Launch Catalogue
- **Type**: feat
- **Status**: Planned

## Problem Description

Customers need to compare available rocket launches using the details supplied
by the AstroBookings API before choosing a booking.

### User Stories

- As a customer, I want to see available launches so that I can choose a trip.
- As a customer, I want to see rocket, price, and seats so that I can compare options.

## Solution Overview

### User/App interface

Provide a catalogue route with a responsive list or grid of launch summaries,
including an explicit empty state, loading state, and retryable error state.

### Model and logic

Render the API launch collection without changing its values. A launch with no
available seats remains visible but is clearly unavailable for booking.

### Persistence

Read launches through the typed API adapter and TanStack Query. Do not persist
catalogue data locally.

## Acceptance Criteria

- [ ] THE AstroBookings Client SHALL display each API launch with its rocket, price, and available-seat count.
- [ ] WHEN the launch request is pending THE AstroBookings Client SHALL display a loading state.
- [ ] WHEN the API returns no launches THE AstroBookings Client SHALL display an empty state.
- [ ] IF the launch request fails THEN THE AstroBookings Client SHALL display an error message and a retry action.
- [ ] WHEN a launch has zero available seats THE AstroBookings Client SHALL identify it as unavailable for booking.
