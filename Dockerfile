# syntax=docker/dockerfile:1.5

# ----- common base ---------------------------------------------------------
    ARG BUN_VERSION=1.2.8          # pin the Bun image you want
    FROM oven/bun:${BUN_VERSION}-slim AS base
    WORKDIR /app
    
    # 1‑copy only manifests first – maximises layer‑cache reuse
    COPY bun.lockb package.json ./
    RUN bun install --frozen-lockfile          # installs work‑space stubs only
    
    # 2‑copy the rest of the source
    COPY . .
    
    # ---------- build frontend -------------------------------------------------
    WORKDIR /app/frontend
    RUN bun install --frozen-lockfile
    RUN bun run build                          # vite build → dist/
    
    # ---------- prep server ----------------------------------------------------
    WORKDIR /app/Server
    RUN bun install --frozen-lockfile
    
    # ---------- final, tiny production image -----------------------------------
    FROM oven/bun:${BUN_VERSION}-slim AS prod
    WORKDIR /app
    
    # copy server code and runtime deps
    COPY --from=base /app/Server /app
    # copy built static assets
    COPY --from=base /app/frontend/dist /app/public
    
    ENV PORT=3000
    EXPOSE 3000
    
    # hono entry – adjust if your file name differs
    CMD ["bun", "src/index.ts"]
    