# Stage 1: Build the React frontend
FROM node:22 AS build-frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install
COPY frontend/ ./
RUN yarn build

# Stage 2: Setup the Express backend
FROM node:22 AS build-backend
WORKDIR /app/server
COPY server/package.json server/yarn.lock ./
RUN yarn install
COPY server/ ./

# Stage 3: Create final image
FROM node:22
WORKDIR /app

# Install serve globally and concurrently
RUN yarn global add serve concurrently

# Copy frontend build from Stage 1
COPY --from=build-frontend /app/frontend/build ./frontend/build

# Copy backend code from Stage 2
COPY --from=build-backend /app/server ./server

# Install backend dependencies
WORKDIR /app/server
RUN yarn install --production

# Expose ports
EXPOSE 3000
EXPOSE 5000

# Start the application
CMD ["concurrently", "\"serve -s /app/frontend/build -l 3000\"", "\"yarn --cwd /app/server start\""]
