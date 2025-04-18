FROM oven/bun:1 AS base

WORKDIR /app
COPY . .
RUN bun install

CMD ["bun","host"]