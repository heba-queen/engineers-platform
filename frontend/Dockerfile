# frontend/Dockerfile
FROM node:23.11.1 AS builder

WORKDIR /app

COPY frontend/ .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf
