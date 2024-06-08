#!/bin/bash

# Set Docker default platform
export DOCKER_DEFAULT_PLATFORM=linux/amd64

# Build Docker images
docker-compose build

# Tag Docker images
docker tag easy-purchase-app-frontend:latest registry.heroku.com/easy-purchase-app/web
docker tag easy-purchase-app-backend:latest registry.heroku.com/easy-purchase-app/web

# Push Docker images to Heroku registry
docker push registry.heroku.com/easy-purchase-app/web

# Release the container to Heroku
heroku container:release web --app easy-purchase-app

# Unset Docker default platform
unset DOCKER_DEFAULT_PLATFORM
