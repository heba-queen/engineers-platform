# backend/Dockerfile
FROM python:3.13.1

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/

EXPOSE 8080
CMD python manage.py collectsatic --noinput && python manage.py migrate && gunicorn engineering.wsgi:application --bind 0.0.0.0:8080
