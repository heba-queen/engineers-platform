## Engineering Platform

A full-stack web application built with Django REST Framework (DRF) for the backend and React (Vite) for the frontend, allowing engineers to publish their projects while keeping their projects right protection by adding license to their projects and finding investors who are intersted in collaborate with them securely.

## 📦 Project Structure

project-root/
├── backend/ # Django app
│ └── engineeringapi/
├── frontend/ # React app (Vite)
├── nginx/ # Custom Nginx config
├── docker-compose.yml
└── README.md

## 🚀 Features

User authentication with token-based auth (DRF + authtoken)

Custom user model with user type (Engineer or Investor)

Profile management with image upload

Projects and Posts CRUD functionality

Invitations and Comments system

Password reset via token + email link

Caching via Redis

Structured logging with log levels

Dockerized backend, frontend, Redis, and Nginx via docker-compose

## ⚙️ Setup

1 - Build and start all services:

docker-compose down -v # optional: clean up first
docker-compose build
docker-compose up

2 - Access services:

Frontend: http://localhost:3000

API: http://localhost:8000/api/

Admin panel: http://localhost:8000/admin/

3 - Stop services:

docker-compose down

## Testing Instructions

To run unit tests for backend logic:

cd backend
python manage.py test

The tests include:

Signup/login endpoints

Project CRUD

Permission checks

Password reset

Profile access

Serializer validatio

## 🧠 Environment Variables

Use .env files for configuration:

backend/.env.dev (for development)

backend/.env.prod (for production)

## 🔒 Security & Protection

CSRF: Enabled via Django middleware

XSS: Escaped by frontend frameworks and backend serializers

SQL Injection: Prevented via Django ORM

Passwords: Hashed using make_password

Authentication: Token-based with DRF + IsAuthenticated

## 🧰 Logging

Structured logging is enabled using Python’s logging module:

DEBUG: SQL queries (if DEBUG=True)

INFO: Application startup and request flow

WARNING: Non-critical issues

ERROR: Exceptions (500s)

Logs go to stdout (console), view with:

docker-compose logs backend

## ⚡ Caching with Redis

Redis is used for caching expensive queries or frequent lookups

Installed via docker-compose

We Cached Projects and Posts because they have images and a lot of data so it is a good practice
