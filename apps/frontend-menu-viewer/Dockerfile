# 1단계: 빌드
FROM node:20 AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY apps/frontend-menu-viewer/package.json ./apps/frontend-menu-viewer/
COPY packages/tokens/package.json ./packages/tokens/

RUN npm install -g pnpm
RUN pnpm install --filter ./apps/frontend-menu-viewer...

COPY apps/frontend-menu-viewer ./apps/frontend-menu-viewer
COPY packages/tokens ./packages/tokens

RUN pnpm --filter ./apps/frontend-menu-viewer build

# 2단계: 실행
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend-menu-viewer/node_modules ./apps/frontend-menu-viewer/node_modules
COPY --from=builder /app/apps/frontend-menu-viewer/dist ./apps/frontend-menu-viewer/dist
COPY --from=builder /app/apps/frontend-menu-viewer/package.json ./apps/frontend-menu-viewer/package.json
COPY --from=builder /app/apps/frontend-menu-viewer/public ./apps/frontend-menu-viewer/public
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

WORKDIR /app/apps/frontend-menu-viewer

CMD ["pnpm", "start"] 