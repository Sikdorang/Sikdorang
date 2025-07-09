FROM node:18

WORKDIR /app

RUN npm install -g pnpm @nestjs/cli

# 가장 먼저 루트 패키지 잠금 파일 복사
COPY package.json pnpm-lock.yaml ./

# 백엔드 패키지 복사
COPY apps/backend/package.json apps/backend/package.json

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 전체 소스 복사
COPY . .

# Prisma Client 생성
RUN pnpm --filter ./apps/backend prisma generate

# NestJS 빌드
RUN pnpm --filter ./apps/backend build

CMD ["pnpm", "--filter", "./apps/backend", "start"]
