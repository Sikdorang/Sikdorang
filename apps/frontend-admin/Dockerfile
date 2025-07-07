# 1단계: 빌드
FROM node:18 AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY apps/frontend-admin/package.json ./apps/frontend-admin/
COPY packages/tokens/package.json ./packages/tokens/

RUN npm install -g pnpm
RUN pnpm install --filter ./apps/frontend-admin...

COPY apps/frontend-admin ./apps/frontend-admin
COPY packages/tokens ./packages/tokens

RUN pnpm --filter ./apps/frontend-admin build

# 2단계: 실행
FROM node:18-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend-admin/node_modules ./apps/frontend-admin/node_modules
COPY --from=builder /app/apps/frontend-admin/.next ./apps/frontend-admin/.next
COPY --from=builder /app/apps/frontend-admin/package.json ./apps/frontend-admin/package.json
COPY --from=builder /app/apps/frontend-admin/public ./apps/frontend-admin/public
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

WORKDIR /app/apps/frontend-admin

CMD ["pnpm", "start"]