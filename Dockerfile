# 1. Base image with Bun installed
FROM oven/bun:latest

# 2. Create app directory in container
WORKDIR /app

# 3. Copy everything into /app
COPY . .

# 4. Install dependencies (root package.json)
RUN bun install

# 5. Build the frontend. 
#    Either run the front-end script from root:
RUN bun run build-frontend 
#    OR run: RUN cd frontend && bun run build  (depends on where "build" script lives)

# 6. Expose the port (for local Docker usage; many hosts ignore EXPOSE though)
EXPOSE 3000

# 7. Start your Bun server 
CMD ["bun", "run", "start"]
