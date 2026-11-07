## Implementation Plan for feat-booking-history.spec

### Step 1: Define history contract
- [ ] Confirm customer context and booking response fields with the API contract.
- [ ] Add typed history query and status presentation mapping.

### Step 2: Build status and history views
- [ ] Add confirmation route consuming the booking result.
- [ ] Add history route with loading, empty, error, retry, and booking rows.

### Step 3: Verify behavior
- [ ] Unit-test status and empty-state mapping.
- [ ] Add Playwright coverage for confirmation and history journeys.
