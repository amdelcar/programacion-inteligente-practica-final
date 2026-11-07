## Implementation Plan for feat-launch-catalogue.spec

### Step 1: Define launch contract
- [x] Confirm the API launch response fields and map them to typed domain data.
- [x] Add adapter/query functions with normalized errors.

### Step 2: Build catalogue states
- [x] Compose the catalogue route and launch summary presentation.
- [x] Add loading, empty, unavailable, error, and retry states.

### Step 3: Verify behavior
- [x] Add Vitest coverage for mapping and availability presentation rules.
- [x] Add a Playwright catalogue journey using the local API.
