# Changelog

## 0.1.0 - 2026-11-07

### Added

- React + Vite + TypeScript application foundation.
- React Router routes for launches, booking flow, confirmation, booking
  history, and not-found handling.
- TanStack Query integration through a typed AstroBookings API adapter.
- Launch catalogue with loading, empty, retryable error, and availability
  states.
- Responsive launch table with accessible navigation and actions.
- Pico.css styling foundation with custom responsive presentation.
- Vitest unit tests and Playwright end-to-end smoke tests.

### Development

- Configurable API base URL through `VITE_API_BASE_URL`.
- Vite development proxy for the local API at `http://localhost:3000`.
