# Deployment

Document deployment environments, release steps, required environment variables, and rollback procedures here.

## Docker Quick Start

Create a `.env` file from the committed example:

```bash
cd django-template
cp .env.example .env
```

Verify Docker can access `.env`:

```bash
docker compose --env-file .env config
docker compose --env-file .env run --rm web python -c "import os; print(os.environ['DJANGO_SECRET_KEY'])"
```

If `.env` is missing, unreadable, or missing required values, Compose fails before containers start.

Run the development stack with Django's built-in development server:

```bash
docker compose --env-file .env up --build
```

Run the production-like stack with Gunicorn:

```bash
docker compose --env-file .env -f docker-compose-prod.yml up --build
```

Run detached:

```bash
docker compose --env-file .env up --build -d
docker compose --env-file .env -f docker-compose-prod.yml up --build -d
```

Stop containers:

```bash
docker compose --env-file .env down
docker compose --env-file .env -f docker-compose-prod.yml down
```

Run migrations manually:

```bash
docker compose --env-file .env run --rm web python manage.py migrate
docker compose --env-file .env -f docker-compose-prod.yml run --rm web python manage.py migrate
```

Create a superuser:

```bash
docker compose --env-file .env run --rm web python manage.py createsuperuser
```

## Runtime Modes

- `docker-compose.yml` is for development and runs `python manage.py runserver 0.0.0.0:8000`.
- `docker-compose-prod.yml` is production-like and runs `gunicorn starter.wsgi:application --bind 0.0.0.0:8000 --workers 3`.
- Both files load credentials into containers with `env_file: .env`.
- Use `docker compose --env-file .env ...` so Compose also uses `.env` for `${...}` interpolation before containers start.

## Database Configuration

SQLite is active by default in `starter/settings.py` and needs no database container:

```env
SQLITE_NAME=db.sqlite3
```

To use MySQL:

1. Comment the SQLite `DATABASES` block in `starter/settings.py`.
2. Uncomment the MySQL `DATABASES` block in `starter/settings.py`.
3. Uncomment the `mysql` service and matching `mysql_*` volume in `docker-compose.yml` or `docker-compose-prod.yml`.
4. Keep the PostgreSQL service commented unless you need it too.

```env
MYSQL_DATABASE=django_template
MYSQL_USER=django
MYSQL_PASSWORD=django
MYSQL_ROOT_PASSWORD=root
MYSQL_HOST=mysql
MYSQL_PORT=3306
```

To use PostgreSQL:

1. Comment the SQLite `DATABASES` block in `starter/settings.py`.
2. Uncomment the PostgreSQL `DATABASES` block in `starter/settings.py`.
3. Uncomment the `postgres` service and matching `postgres_*` volume in `docker-compose.yml` or `docker-compose-prod.yml`.
4. Keep the MySQL service commented unless you need it too.

```env
POSTGRES_DB=django_template
POSTGRES_USER=django
POSTGRES_PASSWORD=django
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

To use MongoDB:

1. Uncomment the `MONGODB` block in `starter/settings.py`.
2. Uncomment the `mongodb` service and matching `mongodb_*` volume in `docker-compose.yml` or `docker-compose-prod.yml`.
3. Comment other unused database services so Docker only starts what the project needs.

```env
MONGODB_DATABASE=django_template
MONGODB_USER=mongo
MONGODB_PASSWORD=mongo
MONGODB_HOST=mongodb
MONGODB_PORT=27017
MONGODB_URI=mongodb://mongo:mongo@mongodb:27017/django_template?authSource=admin
```

Django's default ORM does not use MongoDB in this template. Use the `MONGODB` setting from custom integration or repository code when needed.
