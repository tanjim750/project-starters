# Frontend Architecture

This React template separates feature/domain UI from project-wide infrastructure, API clients, reusable visual components, static assets, and cross-feature tests.

## Mental Model

- `apps/`: feature/domain-specific UI and logic.
- `core/`: project-wide infrastructure.
- `services/`: API clients and external integrations.
- `shared/`: reusable visual components.
- `assets/`: images, fonts, icons, and static files.
- `docs/`: architecture and integration documentation.
- `tests/`: cross-feature integration and E2E tests.

## Request Flow

```text
Route
  → apps/<feature>/pages
  → apps/<feature>/components
  → apps/<feature>/hooks
  → apps/<feature>/services
  → services/api/client
  → backend API
```

Keep feature-specific logic inside `apps/<feature>` and reusable infrastructure in `core`, `services`, or `shared`.
