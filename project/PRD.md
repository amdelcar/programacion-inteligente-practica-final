# AstroBookings Client Product Requirements Document

AstroBookings Client is a responsive React web application for discovering
rocket launches and booking seats through the fictional AstroBookings API.

## Vision and Scope

The client gives customers a clear way to browse launches, understand current
seat availability, submit a booking, and receive immediate booking feedback.
It is an API consumer for training and architecture practice, not a replacement
for the backend.

The target users are customers choosing a launch and reviewing their bookings.
The initial scope includes launch discovery, availability-aware booking,
validation, booking status feedback, and recoverable UI states. The client
currently uses the API's email-based customer flow with a test customer.

Authentication, payment, administration, offline operation, and production
security are out of scope. Persistent booking history and a detailed
confirmation view are separate concerns; persistent client-side booking history
remains out of scope, while the confirmation detail is tracked in FR7.

## Functional Requirements

### FR1 Launch catalogue
- The client shall display API-provided launches with rocket, date, status, price, and available-seat details, including loading, empty, error, retry, and fully-booked states.
- **Status**: Implemented

### FR2 Launch selection and availability
- The client shall let a customer open a launch, inspect its current availability, and choose a positive integer seat quantity no greater than the available seats.
- **Status**: Implemented

### FR3 Booking submission
- The client shall submit a valid booking through the AstroBookings API, prevent invalid submissions, and refresh affected launch availability after a successful or rejected request.
- **Status**: Implemented

### FR4 Booking confirmation and status
- The client shall show pending, successful, or failed booking feedback and display the booking status and identifier returned by the API.
- **Status**: Implemented

### FR5 Booking history
- The client shall retrieve and display the current customer's bookings, including their statuses and links to booking details.
- **Status**: Implemented

### FR6 Recoverable states
- The client shall provide accessible loading, empty, API-error, validation-error, and retry states for the launch and booking journeys.
- **Status**: Implemented

### FR7 Booking confirmation detail
- The client shall provide a booking detail view at `/bookings/:bookingId` that retrieves the reservation from `GET /api/bookings/:id` and displays its identifier, booking status, payment status, mission, seat count, total price, and relevant timestamps.
- The view shall provide accessible loading, API-error, and retry states, and shall offer navigation back to the customer's booking history.
- **Status**: Implemented

## Technical Requirements

### TR1 Web stack
- The client shall use React, Vite, and TypeScript with strict typing.
- **Status**: Implemented

### TR2 Data and navigation
- The client shall use TanStack Query for API fetching, caching, mutation state, and invalidation, and React Router for route-level navigation.
- **Status**: Implemented

### TR3 Presentation
- The client shall use Tailwind CSS and Pico.css as the styling foundation and provide semantic controls, accessible labels, focus states, and responsive layouts.
- **Status**: Implemented

### TR4 Quality
- Unit tests shall use Vitest and end-to-end tests shall use Playwright, covering business rules, API adaptation, and primary customer journeys.
- **Status**: Implemented

### TR5 API boundary
- All API communication shall pass through a typed client adapter, and the API base URL shall be configurable per environment.
- **Status**: Implemented
