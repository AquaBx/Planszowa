FROM oven/bun:1 AS base

WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

CMD ["bun","index.ts"]