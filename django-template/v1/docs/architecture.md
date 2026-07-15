# Architecture

This template separates domain logic, shared infrastructure, integrations, operational scripts, and verification into dedicated top-level folders.

- `apps/` contains business domains.
- `core/` contains reusable project infrastructure.
- `services/` contains external integrations and cross-domain services.
- `jobs/` contains scheduled or background tasks.
- `scripts/` contains setup and manual operation helpers.
- `tests/` contains cross-domain integration, e2e, and performance tests.
