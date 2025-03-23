FROM oven/bun:latest

WORKDIR /app

COPY . .

# Install root dependencies
RUN bun install

# Explicitly install frontend dependencies
RUN cd frontend && bun install

# Build frontend
RUN cd frontend && bun run build

# Expose port
EXPOSE 3000

# Start backend
CMD ["bun", "run", "start"]
