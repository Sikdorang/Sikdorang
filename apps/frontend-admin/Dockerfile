# 1단계: 빌드
FROM node:18 AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/

RUN npm install -g pnpm
RUN pnpm install --filter ./apps/frontend...

COPY apps/frontend ./apps/frontend

RUN pnpm --filter ./apps/frontend build

# 2단계: 실행
FROM node:18-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

WORKDIR /app/apps/frontend

CMD ["pnpm", "start"]