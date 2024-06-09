#!/bin/bash

# Exit script on any error
set -e

# Build with linux/amd64 platform and push to Heroku container registry
echo "Building and deploying the app..."
docker build --platform linux/amd64 -t registry.heroku.com/easy-purchase-app/web .

# Push the image to Heroku container registry and release the app
echo "Pushing the image to Heroku container registry..."
docker push registry.heroku.com/easy-purchase-app/web

# Release the app
echo "Releasing the app..."
heroku container:release web --app easy-purchase-app

# Open the app in the default web browser
echo "Opening the app..."
heroku open

echo "Deployment complete!"
