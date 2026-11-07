## Implementation Plan for feat-booking-confirmation-detail.spec

### Step 1: Extend the typed API boundary
Add the individual booking adapter function using the existing response
normalization and booking model.
- [x] Implement `getBooking(bookingId)` against `/api/bookings/:id`.
- [x] Add unit coverage for successful, failed, and malformed responses.

### Step 2: Build the confirmation detail page
Replace the placeholder confirmation page with a route-parameterized TanStack
Query view.
- [x] Fetch with the `['booking', bookingId]` query key and disable missing IDs.
- [x] Render booking/payment/status, mission, seats, price, and timestamps.
- [x] Render loading, error/retry, and history navigation states accessibly.

### Step 3: Preserve route and history behavior
Keep history links and direct route navigation compatible with the new detail
page.
- [x] Verify history links point to `/bookings/:bookingId`.
- [x] Keep the legacy confirmation route safe and usable.

### Step 4: Verify customer journeys
Cover the adapter and UI behavior with focused unit and Playwright tests.
- [x] Test detail success and displayed booking fields.
- [x] Test detail API failure followed by retry.
- [x] Test navigation from detail back to booking history.

### Step 5: Validate delivery
Run the build and test suites, then check a local preview.
- [x] Run `npm run build`, `npm run test:unit`, and `npm run test:e2e`.
- [x] Start `npm run preview` and verify the booking detail route responds.
- [x] Update FR7 status and relevant documentation after verification.
