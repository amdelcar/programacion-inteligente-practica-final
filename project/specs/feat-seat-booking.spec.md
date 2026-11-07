# Seat Booking
- **Type**: feat
- **Status**: Complete

## Problem Description

Customers need to reserve seats on a selected launch without requesting more
seats than the API currently reports as available.

### User Stories

- As a customer, I want to choose a seat quantity so that I can book for my party.
- As a customer, I want invalid quantities rejected before submission so that I receive predictable feedback.
- As a customer, I want the API result shown so that I know whether my booking was accepted.

## Solution Overview

### User/App interface

Provide a launch booking view with available seats, a labelled quantity control,
validation feedback, a submit action, and a confirmation/status result.

### Model and logic

Accept only a positive integer no greater than the displayed availability.
Disable duplicate submission while pending. Display API rejection when
availability changed after the launch was read.

### Persistence

Submit through the API adapter. On success, invalidate the selected launch and
customer booking queries; do not create a local booking record.

## Acceptance Criteria

- [x] THE AstroBookings Client SHALL provide a labelled seat quantity control for a selected launch.
- [x] IF the quantity is not a positive integer THEN THE AstroBookings Client SHALL prevent submission and display validation feedback.
- [x] IF the quantity exceeds displayed availability THEN THE AstroBookings Client SHALL prevent submission and display validation feedback.
- [x] WHILE a booking request is pending THE AstroBookings Client SHALL disable duplicate submission and show progress.
- [x] WHEN the API accepts a booking THE AstroBookings Client SHALL display the returned booking status.
- [x] IF the API rejects a booking because availability changed THEN THE AstroBookings Client SHALL display the rejection and current launch data after refresh.
