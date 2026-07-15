# Project Starters

A collection of opinionated project starter templates for backend and frontend applications. Each template is versioned in its own folder so projects can copy a stable scaffold and evolve independently.

## Available Templates

```text
project-starters/
├── django-template/
│   └── v1/        # Django backend API template
└── react-template/
    └── v1/        # React + TypeScript frontend template
```

## Templates

### Django Template

Path: `django-template/v1`

A scalable Django backend starter organized around business domains, shared infrastructure, external integrations, scripts, scheduled jobs, documentation, and cross-domain tests.

Core structure:

- `apps/`: business domains and Django apps.
- `core/`: shared infrastructure, constants, responses, exceptions, utilities, permissions, pagination, and validators.
- `services/`: external integrations and cross-domain services.
- `scripts/`: setup, startup, seeding, health checks, and manual operations.
- `jobs/`: scheduled or background tasks.
- `docs/`: architecture, API, database, deployment, and integration docs.
- `tests/`: integration, E2E, factories, fixtures, and performance tests.

Quick start:

```bash
cd django-template/v1
cp .env.example .env
docker compose --env-file .env up --build
```

Production-like run:

```bash
cd django-template/v1
docker compose --env-file .env -f docker-compose-prod.yml up --build
```

More details: `django-template/v1/README.md`

### React Template

Path: `react-template/v1`

A scalable React + TypeScript frontend starter organized around feature apps, project-wide infrastructure, API services, reusable UI, assets, documentation, and cross-feature tests.

Core structure:

- `src/apps/`: feature/domain-specific UI and logic.
- `src/core/`: routing, providers, guards, constants, errors, storage, types, utilities, and shared hooks.
- `src/services/`: API clients, interceptors, endpoint maps, auth, analytics, storage, and external integrations.
- `src/shared/`: reusable components, layouts, forms, icons, and global styles.
- `src/assets/`: images, fonts, SVGs, and static files.
- `src/docs/`: architecture and integration documentation.
- `src/tests/`: cross-feature integration and E2E tests.

Quick start:

```bash
cd react-template/v1
cp .env.example .env
npm install
npm run dev
```

Docker run:

```bash
cd react-template/v1
docker compose --env-file .env up --build
```

Production-like run:

```bash
cd react-template/v1
docker compose --env-file .env -f docker-compose-prod.yml up --build
```

More details: `react-template/v1/README.md`

## Version Tags

- `v1.0.0`: Django template v1.
- `react-v1.0.0`: React template v1.

## How To Use A Template

Copy the versioned template folder into a new project:

```bash
cp -R django-template/v1 ../my-backend
cp -R react-template/v1 ../my-frontend
```

Then update the copied project's package name, environment values, README, and remote repository.

## Design Principles

- Keep templates small enough to understand quickly.
- Separate business/domain code from shared infrastructure.
- Keep external integrations isolated behind service modules.
- Include Docker and `.env.example` from the start.
- Document the mental model directly inside each template.
- Version templates so future changes do not break existing projects.
