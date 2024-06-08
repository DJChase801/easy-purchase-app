#!/bin/bash

# Exit script on any error
set -e

# Check if Heroku remote is already added
if ! git remote | grep -q heroku; then
    echo "Adding Heroku remote..."
    heroku git:remote -a easy-purchase-app
fi

# Add all changes to git
echo "Staging changes..."
git add .

# Commit the changes with a message
echo "Committing changes..."
git commit -m "Deploying to Heroku"

# Push to Heroku
echo "Pushing to Heroku..."
git push heroku master:main

# Open the app in the default web browser
echo "Opening the app..."
heroku open

echo "Deployment complete!"
