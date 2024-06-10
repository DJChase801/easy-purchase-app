#!/bin/bash

# Exit script on any error
set -e

# Function to handle errors
handle_error() {
    echo "Error occurred in script execution. Exiting..."
    exit 1
}

# Trap any error and execute the handle_error function
trap 'handle_error' ERR

# Unset NODE_OPTIONS to avoid the --openssl-legacy-provider issue
unset NODE_OPTIONS

# Build the Docker image with the specified platform and no cache
echo "Building the Docker image..."
docker build --platform linux/amd64 --no-cache -t registry.heroku.com/easy-purchase-app/web . || handle_error

# Push the image to Heroku container registry
echo "Pushing the image to Heroku container registry..."
docker push registry.heroku.com/easy-purchase-app/web || handle_error

# Release the app on Heroku
echo "Releasing the app..."
heroku container:release web --app easy-purchase-app || handle_error

# Open the app in the default web browser
echo "Opening the app..."
heroku open || handle_error

echo "Deployment complete!"
