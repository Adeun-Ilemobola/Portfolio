# syntax=docker/dockerfile:1.5
ARG BUN_VERSION=1.2.8

###############################
# Stage 1: Build Frontend Assets
###############################
FROM oven/bun:${BUN_VERSION}-slim AS frontend-build
WORKDIR /app/frontend

# Copy only frontend package.json for caching
COPY frontend/package.json ./
RUN bun install

# Copy frontend source code
COPY frontend/ .

# 👇 Copy server code so @server/* paths work
COPY Server /app/Server

# 👇 Install server dependencies in frontend context (needed for zod etc)
RUN cd /app/Server && bun install

# Run the frontend build (Vite + TSC)
RUN bun run build

###############################
# Stage 2: Build Server with Cached Dependency Install
###############################
FROM oven/bun:${BUN_VERSION}-slim AS server-build
WORKDIR /app/Server

# Copy server package.json and install deps
COPY Server/package.json ./
RUN bun install

# Copy the full server source
COPY Server/ .

###############################
# Stage 3: Final Production Image
###############################
FROM oven/bun:${BUN_VERSION}-slim AS prod
WORKDIR /app

# Copy built server
COPY --from=server-build /app/Server /app

# Copy built frontend assets to public dir
COPY --from=frontend-build /app/frontend/dist /app/public

ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:7HeZhUPtRPQ8qJYN@db.mgmcrxxlvvkyigdlzids.supabase.co:5432/postgres
ENV PORT=3000
EXPOSE 3000

# Launch the server
CMD ["bun", "src/index.ts"]
