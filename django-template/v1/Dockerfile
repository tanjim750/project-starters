FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements/production.txt requirements/base.txt ./requirements/
RUN pip install --no-cache-dir -r requirements/production.txt

COPY . .

RUN chmod +x scripts/entrypoint.sh

ENTRYPOINT ["scripts/entrypoint.sh"]
CMD ["gunicorn", "starter.wsgi:application", "--bind", "0.0.0.0:8000"]
