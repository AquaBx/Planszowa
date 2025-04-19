FROM oven/bun:1 AS base

WORKDIR /app
COPY . .
RUN bun install
RUN bun run build
RUN bun build index.ts --outdir build --target node

FROM oven/bun:1 AS release

WORKDIR /app

WORKDIR app
COPY --from=base /app/build .

CMD ["bun","index.js"]