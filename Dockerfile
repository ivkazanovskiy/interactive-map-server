FROM node:18-alpine AS builder
WORKDIR /app
COPY /app/package.json ./
COPY /app/yarn.lock ./
RUN yarn

COPY /app/. ./
RUN yarn build


FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

