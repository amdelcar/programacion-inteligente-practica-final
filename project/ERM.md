# AstroBookings Client Domain Model

The client displays API entities; it does not persist them locally.

```mermaid
erDiagram
  CUSTOMER ||--o{ BOOKING : places
  LAUNCH ||--o{ BOOKING : receives
  LAUNCH {
    string id
    string rocket
    number price
    number availableSeats
  }
  CUSTOMER {
    string id
    string displayName
  }
  BOOKING {
    string id
    string launchId
    string customerId
    number seats
    string status
  }
```

`Customer` fields and the mechanism for selecting the current customer are
API-contract dependencies because the briefing does not define authentication.
The API remains the source of truth for booking status and seat availability.
