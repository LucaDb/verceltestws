ARG node_version=18.16.0
FROM node:${node_version}-alpine3.18 AS base
RUN apk add --no-cache libc6-compat && \
  apk add --no-cache bash && \
  apk update && \
  npm install pm2 -g

FROM base AS pruner
WORKDIR /app
RUN npm i -g turbo @websolutespa/bom-cli
COPY *.json ./
COPY src/bowl ./src/bowl
RUN npm run prune:bowl

FROM base AS builder
WORKDIR /app
#install
COPY --from=pruner /app/out/json/ .
#COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci
# build
COPY --from=pruner /app/out/full/ .
RUN npm run build:bowl

FROM base as runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/bowl/payload/dist ./
COPY --from=builder /app/src/bowl/payload/build ./build
COPY --from=builder /app/src/bowl/payload/.env* ./
ENV NODE_ENV=production
EXPOSE 4000
ENV PORT 4000
ENV HOSTNAME "0.0.0.0"
CMD ["pm2-runtime", "server.js"]
