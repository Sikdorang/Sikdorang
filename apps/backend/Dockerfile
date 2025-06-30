# 1. node 이미지
FROM node:18

# 2. 작업 디렉토리
WORKDIR /app

# 3. 패키지 파일
COPY package.json pnpm-lock.yaml ./
COPY . .

# 4. pnpm 설치
RUN npm install -g pnpm

# 5. 전체 소스 복사
COPY apps/backend ./apps/backend

# 6. 의존성
RUN pnpm install --filter ./apps/backend...

# 7. 빌드
RUN pnpm --filter ./apps/backend build

# 8. 실행
CMD ["pnpm", "--filter", "./apps/backend", "start"]
