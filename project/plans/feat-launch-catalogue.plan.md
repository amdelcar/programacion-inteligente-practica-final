## Implementation Plan for feat-launch-catalogue.spec

### Step 1: Define launch contract
- [ ] Confirm the API launch response fields and map them to typed domain data.
- [ ] Add adapter/query functions with normalized errors.

### Step 2: Build catalogue states
- [ ] Compose the catalogue route and launch summary presentation.
- [ ] Add loading, empty, unavailable, error, and retry states.

### Step 3: Verify behavior
- [ ] Add Vitest coverage for mapping and availability presentation rules.
- [ ] Add a Playwright catalogue journey using a deterministic API fixture.
