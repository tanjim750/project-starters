# Database Schema

Document important models, relationships, indexes, and migration notes here.

## Supported Database Modes

SQLite is active by default in `starter/settings.py`.

- To use SQLite, keep the default `DATABASES` block active.
- To use MySQL, comment the SQLite block and uncomment the MySQL block.
- To use PostgreSQL, comment the SQLite block and uncomment the PostgreSQL block.
- To use MongoDB, uncomment the `MONGODB` block for service-layer document storage.

When using Docker, also uncomment the matching service and volume in `docker-compose.yml` or `docker-compose-prod.yml`, then comment any unused database service.
