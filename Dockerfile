# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Vite inlines VITE_* variables at build time, so they must be present
# during `npm run build`. In Coolify, add these as Build Variables so they
# get passed as --build-arg. Without them the app falls back to defaults
# (e.g. localhost for the API URL).
ARG VITE_API_BASE_URL
ARG VITE_GITHUB_URL
ARG VITE_LINKEDIN_URL
ARG VITE_RESUME_DOWNLOAD_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_GITHUB_URL=$VITE_GITHUB_URL \
    VITE_LINKEDIN_URL=$VITE_LINKEDIN_URL \
    VITE_RESUME_DOWNLOAD_URL=$VITE_RESUME_DOWNLOAD_URL

COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine AS runtime

# nginx ships with a correct mime.types map (js -> application/javascript),
# which is exactly what fixes the "text/plain" module-script error.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
