FROM node:18-alpine AS builder
WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn

COPY . .
RUN yarn build


FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

CMD ["yarn", "start:prod"]
