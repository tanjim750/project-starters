# Django Template

A scalable Django project starter that separates business domains, shared infrastructure, external integrations, operational scripts, background jobs, documentation, and cross-domain tests.

This template is designed for API-first Django projects that may grow into multiple business domains, external integrations, scheduled jobs, and production Docker deployments.

## Architecture Overview

The project is organized around clear boundaries:

```text
Client/API request
    ↓
apps/<domain>/views.py
    ↓
apps/<domain>/serializers.py + validators.py + permissions.py
    ↓
apps/<domain>/services.py   # write operations and business workflows
apps/<domain>/selectors.py  # read/query operations
    ↓
apps/<domain>/models.py
    ↓
Database
```

Shared utilities live in `core/`, external systems are wrapped in `services/`, scheduled/background work lives in `jobs/`, and cross-domain tests live in top-level `tests/`.

The main rule: keep domain behavior inside `apps/`, reusable infrastructure inside `core/`, and third-party communication inside `services/`.

## Project Layout

```text
django-template/
├── apps/          # Business domains
├── core/          # Shared infrastructure
├── services/      # External integrations and cross-domain services
├── scripts/       # Setup and manual operations
├── jobs/          # Scheduled or background tasks
├── docs/          # Architecture and API documentation
├── tests/         # Cross-domain verification
├── requirements/  # Environment-specific dependencies
├── starter/       # Django project settings package
├── Dockerfile     # Application image definition
├── docker-compose.yml       # Development stack
├── docker-compose-prod.yml  # Production-like stack
├── .env.example   # Example runtime configuration
└── manage.py
```

## Directory Responsibilities

### `apps/`

Business-domain Django apps live here. Each app owns its models, serializers, views, validators, selectors, services, URLs, permissions, admin registrations, migrations, and app-local tests.

Use this layer for what the business does.

Recommended flow:

- `views.py` receives HTTP requests and calls serializers/services/selectors.
- `serializers.py` converts API input/output.
- `validators.py` keeps domain validation close to the domain.
- `selectors.py` contains read/query logic.
- `services.py` contains write operations and business workflows.
- `models.py` owns persistence shape and relationships.

### `core/`

Shared reusable infrastructure lives here: constants, response helpers, exception handling, utilities, pagination, permissions, and validators.

Use this layer for code every part of the project can reuse.

### `services/`

External integrations and cross-domain business services live here. Integration folders keep clients, schemas, adapters, exceptions, service facades, and tests together.

Use this layer for how the system communicates with external systems.

Recommended integration flow:

- `client.py` handles low-level HTTP/SDK calls.
- `schemas.py` defines request/response shapes.
- `adapters.py` maps third-party payloads to internal data.
- `service.py` exposes a stable interface to the rest of the project.
- `exceptions.py` keeps integration-specific failures explicit.

### `scripts/`

Manual and startup helpers live here, such as entrypoints, setup scripts, seeders, superuser creation, database readiness checks, and health checks.

Use this layer for how the project is started or prepared.

### `jobs/`

Scheduled or background tasks live here, such as backups, cleanup tasks, report generation, and external data synchronization.

Use this layer for work that runs periodically or outside a request cycle.

### `tests/`

Cross-domain verification lives here: factories, fixtures, integration tests, end-to-end tests, and performance tests.

Use app-local `apps/<app>/tests/` for domain-specific behavior and top-level `tests/` for workflows spanning multiple domains.

### `docs/`

Human and tool-facing documentation lives here: architecture, API conventions, database schema notes, deployment, integrations, and OpenAPI specs.

Use this layer for explaining how the system works and how to operate it.

### `starter/`

The Django project package lives here. It contains settings, root URLs, ASGI, and WSGI configuration.

Use this layer for project-level Django configuration, not domain logic.

## Runtime Files

- `Dockerfile`: builds the deployable Python/Django image.
- `docker-compose.yml`: development stack using Django's default development server.
- `docker-compose-prod.yml`: production-like stack using Gunicorn.
- `.env.example`: safe example environment values.
- `.env`: local runtime secrets and credentials; ignored by Git.
- `requirements/base.txt`: shared Python dependencies.
- `requirements/development.txt`: local/test dependencies.
- `requirements/production.txt`: production dependencies.

## Suggested App Pattern

Each business app follows this shape:

```text
apps/app_1/
├── migrations/
├── tests/
├── admin.py
├── apps.py
├── filters.py
├── models.py
├── permissions.py
├── selectors.py
├── serializers.py
├── services.py
├── urls.py
├── validators.py
└── views.py
```

- `models.py`: database entities and relationships.
- `selectors.py`: read/query logic.
- `services.py`: write operations and business workflows.
- `serializers.py`: request and response serialization.
- `views.py`: API endpoints and request orchestration.
- `validators.py`: domain-specific validation rules.
- `permissions.py`: domain-specific access rules.
- `filters.py`: query parameter filtering.

## Getting Started

```bash
cd django-template
python -m venv .venv
source .venv/bin/activate
pip install -r requirements/development.txt
python manage.py migrate
python manage.py runserver
```

## Docker

Create your local environment file first:

```bash
cd django-template
cp .env.example .env
```

Start the development stack with Django's default development server:

```bash
cd django-template
docker compose --env-file .env up --build
```

The app is available at `http://localhost:8000`.

Start the production-like stack with Gunicorn:

```bash
cd django-template
docker compose --env-file .env -f docker-compose-prod.yml up --build
```

Verify Docker can read `.env` before starting containers:

```bash
cd django-template
docker compose --env-file .env config
docker compose --env-file .env run --rm web python -c "import os; print(os.environ['DJANGO_SECRET_KEY'])"
```

The Compose files intentionally reference required values like `DJANGO_SECRET_KEY`. If `.env` is missing or unreadable, `docker compose --env-file .env config` fails before containers start.

### Docker Command Reference

| Task | Command |
| --- | --- |
| Validate development Compose config | `docker compose --env-file .env config` |
| Start development server | `docker compose --env-file .env up --build` |
| Start development server detached | `docker compose --env-file .env up --build -d` |
| Stop development stack | `docker compose --env-file .env down` |
| Run migrations | `docker compose --env-file .env run --rm web python manage.py migrate` |
| Create superuser | `docker compose --env-file .env run --rm web python manage.py createsuperuser` |
| Validate production Compose config | `docker compose --env-file .env -f docker-compose-prod.yml config` |
| Start production-like Gunicorn stack | `docker compose --env-file .env -f docker-compose-prod.yml up --build` |
| Stop production-like stack | `docker compose --env-file .env -f docker-compose-prod.yml down` |

### Docker Modes

| File | Purpose | Server |
| --- | --- | --- |
| `docker-compose.yml` | Local development | `python manage.py runserver 0.0.0.0:8000` |
| `docker-compose-prod.yml` | Production-like runtime | `gunicorn starter.wsgi:application --bind 0.0.0.0:8000 --workers 3` |

Both Compose files use `env_file: .env` to inject values into containers and the `--env-file .env` command flag to make Compose interpolation read the same file before containers start.

### Database Selection

SQLite is active by default in `starter/settings.py`:

```env
SQLITE_NAME=db.sqlite3
```

To use MySQL, comment the SQLite `DATABASES` block, uncomment the MySQL `DATABASES` block in `starter/settings.py`, and uncomment the `mysql` service plus its volume in `docker-compose.yml` or `docker-compose-prod.yml`.

```env
MYSQL_DATABASE=django_template
MYSQL_USER=django
MYSQL_PASSWORD=django
MYSQL_ROOT_PASSWORD=root
MYSQL_HOST=mysql
MYSQL_PORT=3306
```

To use PostgreSQL, comment the SQLite `DATABASES` block, uncomment the PostgreSQL `DATABASES` block in `starter/settings.py`, and uncomment the `postgres` service plus its volume in `docker-compose.yml` or `docker-compose-prod.yml`.

```env
POSTGRES_DB=django_template
POSTGRES_USER=django
POSTGRES_PASSWORD=django
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

To use MongoDB, uncomment the `MONGODB` block in `starter/settings.py` and uncomment the `mongodb` service plus its volume in `docker-compose.yml` or `docker-compose-prod.yml`. If another database service is active, comment it out so only the services you need run.

```env
MONGODB_DATABASE=django_template
MONGODB_USER=mongo
MONGODB_PASSWORD=mongo
MONGODB_HOST=mongodb
MONGODB_PORT=27017
MONGODB_URI=mongodb://mongo:mongo@mongodb:27017/django_template?authSource=admin
```

Note: Django's built-in ORM uses SQLite, PostgreSQL, or MySQL in this template. MongoDB is exposed as a separate config object for custom service/repository code, not as the default Django ORM database.

### Database Activation Checklist

When switching databases:

1. Update values in `.env`.
2. In `starter/settings.py`, keep only the matching database settings block active.
3. In the Compose file you use, uncomment the matching database service.
4. Uncomment the matching named volume at the bottom of the Compose file.
5. Keep unused database services commented out.
6. Run `docker compose --env-file .env config` to verify the final configuration.
7. Run migrations with `docker compose --env-file .env run --rm web python manage.py migrate`.

## Template Notes

- Add new business domains under `apps/`.
- Keep reusable code in `core/`, not in individual apps.
- Keep third-party API details in `services/`.
- Prefer selectors for reads and services for writes.
- Put app-specific tests beside the app and cross-domain tests in top-level `tests/`.
