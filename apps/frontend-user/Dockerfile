# 1단계: 빌드
FROM node:18 AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY apps/frontend-user/package.json ./apps/frontend-user/
COPY packages/tokens/package.json ./packages/tokens/

RUN npm install -g pnpm
RUN pnpm install --filter ./apps/frontend-user...

COPY apps/frontend-user ./apps/frontend-user
COPY packages/tokens ./packages/tokens

RUN pnpm --filter ./apps/frontend-user build

# 2단계: 실행
FROM node:18-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend-user/node_modules ./apps/frontend-user/node_modules
COPY --from=builder /app/apps/frontend-user/.next ./apps/frontend-user/.next
COPY --from=builder /app/apps/frontend-user/package.json ./apps/frontend-user/package.json
COPY --from=builder /app/apps/frontend-user/public ./apps/frontend-user/public
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

WORKDIR /app/apps/frontend-user

CMD ["pnpm", "start"]