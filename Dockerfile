# syntax=docker/dockerfile:1.5
ARG BUN_VERSION=1.2.8

###############################
# Stage 1: Build Frontend Assets
###############################
FROM oven/bun:${BUN_VERSION}-slim AS frontend-build
WORKDIR /app/frontend

# Copy only the frontend's package.json first (for caching)
COPY frontend/package.json ./

# Install front-end dependencies
# (Remove --frozen-lockfile if you don't have a lock file)
RUN bun install

# Copy the rest of the frontend source code
COPY frontend/ .

# Build the frontend (creates /app/frontend/dist)
RUN bun run build

###############################
# Stage 2: Build Server with Cached Dependency Install
###############################
FROM oven/bun:${BUN_VERSION}-slim AS server-build
WORKDIR /app/Server

# Copy the server’s package.json
COPY Server/package.json ./

# Install server dependencies
RUN bun install

# Copy the rest of the server code
COPY Server/ .

###############################
# Stage 3: Final Production Image
###############################
FROM oven/bun:${BUN_VERSION}-slim AS prod
WORKDIR /app

# Copy fully built server (with node_modules) from server-build
COPY --from=server-build /app/Server /app

# Copy the built frontend assets from frontend-build
COPY --from=frontend-build /app/frontend/dist /app/public

ENV PORT=3000
EXPOSE 3000

# Start your server (replace if your main file differs)
CMD ["bun", "src/index.ts"]
