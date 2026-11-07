## Implementation Plan for feat-seat-booking.spec

### Step 1: Define booking contract
- [x] Confirm booking request, response, and conflict error fields.
- [x] Add typed mutation and query invalidation behavior.

### Step 2: Build booking flow
- [x] Add the labelled quantity form and local validation.
- [x] Add pending, success, API rejection, and refreshed availability states.

### Step 3: Verify behavior
- [x] Unit-test quantity boundary and validation rules with Vitest.
- [x] Exercise successful and over-availability journeys with Playwright.
