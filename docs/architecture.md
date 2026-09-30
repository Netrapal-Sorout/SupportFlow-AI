# SupportFlow AI Architecture

```text
React UI
  ↓
TanStack Query / API clients
  ↓
Express REST API
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Prisma
  ↓
PostgreSQL
```

AI functionality is isolated under `backend/src/ai/` and should access business data through authorized application services/tools rather than connecting directly to PostgreSQL.

## Frontend

The frontend is organized by product feature. Shared application layout lives under `src/components/layout`, while feature-specific screens and API clients live under `src/features`.

## Backend

The backend separates HTTP concerns from business logic and persistence:

- Routes define endpoints.
- Controllers validate HTTP input and format responses.
- Services implement business rules.
- Repositories access Prisma/PostgreSQL.
- Middleware handles authentication and authorization.

## Dashboard

`GET /api/dashboard` is authenticated and aggregates current PostgreSQL data for the dashboard. Metrics that require additional domain state are intentionally left unavailable until their underlying feature is implemented.
