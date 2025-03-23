# Dockerfile
FROM oven/bun:latest

# Create a folder for your app
WORKDIR /app

# Copy all source files into the container
# (Make sure you have a proper .dockerignore so you don’t copy node_modules, etc.)
COPY . .

# Install dependencies (this will run `bun install`)
RUN bun install

# Build the frontend (Vite)
RUN cd frontend && bun run build

# Expose the port (for local Docker usage; some PaaS don’t rely on EXPOSE though)
EXPOSE 3000

# Start the server (the script we defined in package.json)
CMD ["bun", "run", "start"]
