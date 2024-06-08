#!/bin/bash

# Start the backend server
cd /app
npm run start:backend &

# Wait for backend to start (optional)
sleep 5

# Start the frontend server
cd /app/frontend
serve -s build -l 3000 &

# Wait for all background processes to finish
wait
