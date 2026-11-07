# AstroBookings Client Briefing

AstroBookings Client is a client application for the fictional AstroBookings
API. It should:

- Display available launches with rocket, price, and seat details.
- Allow customers to book seats without exceeding availability.
- Show booking status.
- Allow customers to view their bookings.

## Technology decision

The client will be implemented as a web application using:

- **Language:** TypeScript
- **UI framework:** React
- **Build tool and development server:** Vite
- **Data fetching and caching:** TanStack Query
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Unit testing:** Vitest
- **End-to-end testing:** Playwright

The application will consume the AstroBookings API directly from the browser.
Authentication, persistence, and production security are outside the initial
exercise scope unless the implementation explicitly adds them.

## Planned source structure

```text
src/
├── api/          # API client and request helpers
├── components/   # Shared UI components
├── features/     # Launches, bookings, and customer functionality
├── pages/        # Route-level page components
├── types/        # API and domain types
└── App.tsx       # Application composition and routes
```

See the root [exercise briefing](../astrobookings-cli.briefing.md) for the
original requirements.
