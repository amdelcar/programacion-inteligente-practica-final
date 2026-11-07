## Implementation Plan for feat-seat-booking.spec

### Step 1: Define booking contract
- [ ] Confirm booking request, response, and conflict error fields.
- [ ] Add typed mutation and query invalidation behavior.

### Step 2: Build booking flow
- [ ] Add the labelled quantity form and local validation.
- [ ] Add pending, success, API rejection, and refreshed availability states.

### Step 3: Verify behavior
- [ ] Unit-test quantity boundary and validation rules with Vitest.
- [ ] Exercise successful and over-availability journeys with Playwright.
