# React Template V1

A scalable React + TypeScript frontend starter organized around feature/domain apps, shared infrastructure, API services, reusable UI, assets, documentation, and cross-feature tests.

## Architecture Overview

```text
User route
  ↓
src/core/routing
  ↓
src/apps/<feature>/pages
  ↓
src/apps/<feature>/components + hooks + services + store
  ↓
src/services/api
  ↓
Backend API
```

## Project Layout

```text
src/
├── apps/       # Business features and domain-specific UI
├── core/       # Shared application infrastructure
├── services/   # API clients and external integrations
├── shared/     # Reusable UI components and common assets
├── assets/     # Static files
├── docs/       # Documentation
├── tests/      # Cross-feature integration and E2E tests
├── App.tsx
└── main.tsx
```

## Directory Responsibilities

### `src/apps/`

Feature/domain-specific UI and logic live here. Examples include authentication, dashboard, reports, profile, settings, billing, and notifications.

Each app may contain:

- `components/`: feature-only UI pieces.
- `pages/`: route-level screens.
- `hooks/`: feature-specific hooks.
- `services/`: feature-specific API orchestration.
- `store/`: feature state.
- `types/`: feature TypeScript types.
- `validators/`: feature validation schemas.
- `tests/`: feature-local tests.

### `src/core/`

Project-wide infrastructure lives here:

- `constants/`: app-level constants.
- `responses/`: shared API response types.
- `errors/`: shared error classes and handling.
- `guards/`: auth and permission route guards.
- `hooks/`: reusable infrastructure hooks.
- `providers/`: global providers.
- `routing/`: routes and router composition.
- `storage/`: storage keys and persistence utilities.
- `types/`: shared TypeScript types.
- `utils/`: small reusable helpers.

### `src/services/`

API clients and external integrations live here:

- `api/client.ts`: Axios/fetch client.
- `api/interceptors.ts`: auth headers and request/response interception.
- `api/endpoints.ts`: central API endpoint map.
- `api/error-handler.ts`: convert API failures to app errors.
- `auth/`: auth service wrappers.
- `analytics/`: analytics SDK wrappers.
- `storage/`: persistence service wrappers.
- `external-service/`: third-party integrations.

### `src/shared/`

Reusable visual building blocks live here:

- `components/`: buttons, tables, modals, cards.
- `layouts/`: application layouts.
- `forms/`: reusable form controls.
- `icons/`: app icon components.
- `styles/`: global styles, tokens, and themes.

### `src/assets/`

Static assets live here, including images, fonts, icons, and SVGs.

### `src/docs/`

Architecture decisions and API integration guides live here.

### `src/tests/`

Cross-feature integration and E2E tests live here. Feature-local tests stay inside `src/apps/<feature>/tests`.

## Mental Model

- `apps/` → feature/domain-specific UI and logic.
- `core/` → project-wide infrastructure.
- `services/` → API clients and external integrations.
- `shared/` → reusable visual components.
- `tests/` → cross-feature or E2E verification.

## Getting Started

```bash
cd react-template/v1
cp .env.example .env
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build production assets |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Docker

Create your local environment file:

```bash
cd react-template/v1
cp .env.example .env
```

Start the development server:

```bash
docker compose --env-file .env up --build
```

Start the production-like Nginx build:

```bash
docker compose --env-file .env -f docker-compose-prod.yml up --build
```

Verify Docker can read `.env`:

```bash
docker compose --env-file .env config
docker compose --env-file .env run --rm web node -e "console.log(process.env.VITE_API_BASE_URL)"
```

## Environment Variables

```env
VITE_APP_NAME=React Template
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_ANALYTICS=false
```

Only variables prefixed with `VITE_` are exposed to frontend code by Vite.

## Template Notes

- Add new business features under `src/apps/`.
- Keep project-wide infrastructure in `src/core/`.
- Keep third-party SDKs and API clients in `src/services/`.
- Keep reusable UI primitives in `src/shared/`.
- Keep feature-local tests beside the feature and cross-feature tests in `src/tests/`.
