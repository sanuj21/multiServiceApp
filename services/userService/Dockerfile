# Stage 1: Install dependencies
FROM node:20.12-alpine AS builder
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Stage 2: Copy application code
FROM node:20.12-alpine
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
