# Integrations

Document external services, credentials, retry behavior, webhooks, and failure handling here.

## MongoDB

MongoDB connection values can be exposed through the `MONGODB` Django setting. To enable them, uncomment the `MONGODB` block in `starter/settings.py`, then uncomment the `mongodb` service and matching volume in `docker-compose.yml` or `docker-compose-prod.yml`.

```python
from django.conf import settings

mongodb_uri = settings.MONGODB["URI"]
```

Use MongoDB from integration or repository code when a document database is needed. Keep document persistence logic outside Django models unless you intentionally add a MongoDB-specific ORM or adapter.
