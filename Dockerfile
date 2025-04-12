 # syntax=docker/dockerfile:1.5

# # ----- common base ---------------------------------------------------------
#     ARG BUN_VERSION=1.2.8          # pin the Bun image you want
#     FROM oven/bun:${BUN_VERSION}-slim AS base
#     WORKDIR /app
    
#     # # 1‑copy only manifests first – maximises layer‑cache reuse
#     # COPY bun.lockb package.json ./
#     # RUN bun install --frozen-lockfile          # installs work‑space stubs only
    
#     # 2‑copy the rest of the source
#     COPY . .
    
#     # ---------- build frontend -------------------------------------------------
#     WORKDIR /app/frontend
#     RUN bun install --frozen-lockfile
#     RUN bun run build                          # vite build → dist/
    
#     # ---------- prep server ----------------------------------------------------
#     WORKDIR /app/Server
#     RUN bun install --frozen-lockfile
    
#     # ---------- final, tiny production image -----------------------------------
#     FROM oven/bun:${BUN_VERSION}-slim AS prod
#     WORKDIR /app
    
#     # copy server code and runtime deps
#     COPY --from=base /app/Server /app
#     # copy built static assets
#     COPY --from=base /app/frontend/dist /app/public
    
#     ENV PORT=3000
#     EXPOSE 3000
    
#     # hono entry – adjust if your file name differs
#     CMD ["bun", "src/index.ts"]
    



# syntax=docker/dockerfile:1.5

ARG BUN_VERSION=1.2.8

###########################
# Stage 1: Build (builder)
###########################
FROM oven/bun:${BUN_VERSION}-slim AS builder
WORKDIR /app

# === Front-end Build ===
# Set working directory to frontend
WORKDIR /app/frontend
# Copy only the manifest files for the front‑end (caching can be added here if desired)
COPY frontend/package.json frontend/bun.lockb ./
# Install front‑end dependencies
RUN bun install --frozen-lockfile
# Copy the rest of the front‑end source code
COPY frontend/ ./
# Run the front‑end build (produces build artifacts in /app/frontend/dist)
RUN bun run build

# === Server Build with Cached Dependencies ===
# Change to the Server directory
WORKDIR /app/Server
# First, copy only the manifest files for the server. This lets Docker cache the dependency installation.
COPY Server/package.json Server/bun.lockb ./
RUN bun install --frozen-lockfile
# Now copy the remainder of the server source code
COPY Server/ ./

###########################
# Stage 2: Production (final image)
###########################
FROM oven/bun:${BUN_VERSION}-slim AS prod
WORKDIR /app

# Copy the server code (with installed dependencies) from the builder stage
COPY --from=builder /app/Server /app
# Copy the already-built front‑end assets into a folder (e.g. public)
COPY --from=builder /app/frontend/dist /app/public

ENV PORT=3000
EXPOSE 3000

# Start the server – adjust the entry point if your main file differs
CMD ["bun", "src/index.ts"]
