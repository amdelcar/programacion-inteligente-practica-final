# AstroBookings Client Product Requirements Document

AstroBookings Client is a web application for discovering rocket launches and
booking seats through the fictional AstroBookings API.

## Vision and Scope

The client gives customers a clear, responsive way to browse available launches,
submit a seat booking, and confirm or review booking status. It is an API
consumer for training and architecture practice, not a replacement for the
backend.

Target users are customers choosing a launch and checking their bookings.
The initial scope includes launch discovery, availability-aware booking,
confirmation/status feedback, and booking history. Customer selection uses the
API's email-based flow. Authentication, payment, administration, offline
operation, and production security are out of scope.

## Functional Requirements

### FR1 Launch catalogue
- The client shall display API-provided launches with rocket, price, and available-seat details.
- **Status**: NotStarted

### FR2 Launch selection and availability
- The client shall let a customer inspect a launch and choose a requested seat quantity without allowing a quantity above current availability.
- **Status**: NotStarted

### FR3 Booking submission
- The client shall submit a valid booking to the AstroBookings API and prevent submission when the requested quantity is invalid.
- **Status**: NotStarted

### FR4 Booking confirmation and status
- The client shall show a clear pending, successful, or failed result after a booking request, including the booking status returned by the API.
- **Status**: NotStarted

### FR5 Booking history
- The client shall display the customer's API-provided bookings and their statuses.
- **Status**: NotStarted

### FR6 Recoverable states
- The client shall provide loading, empty, API-error, validation-error, and retry states for launch and booking views.
- **Status**: NotStarted

## Technical Requirements

### TR1 Web stack
- The client shall use React, Vite, and TypeScript with strict typing.
- **Status**: NotStarted

### TR2 Data and navigation
- The client shall use TanStack Query for API fetching, caching, mutation state, and invalidation, and React Router for route-level navigation.
- **Status**: NotStarted

### TR3 Presentation
- The client shall use Tailwind CSS and provide accessible semantic controls, labels, focus states, and responsive layouts.
- **Status**: NotStarted

### TR4 Quality
- Unit tests shall use Vitest and end-to-end tests shall use Playwright, covering business rules and primary customer journeys.
- **Status**: NotStarted

### TR5 API boundary
- All API communication shall pass through a typed client/adapter so UI components do not depend on transport details. The API base URL shall be configurable per environment.
- **Status**: NotStarted
