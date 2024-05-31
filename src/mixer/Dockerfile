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
COPY src/mixer ./src/mixer
RUN npm run prune:web

FROM base AS builder
WORKDIR /app
#install
COPY --from=pruner /app/out/json/ .
#COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci
# build
COPY --from=pruner /app/out/full/ .
RUN npm run build:web

FROM base as runtime
WORKDIR /app
COPY wait-for-it.sh .
RUN chmod u+x ./*.sh
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/mixer/web/.next/standalone/src/mixer/web ./
COPY --from=builder /app/src/mixer/web/.next/static ./.next/static
COPY --from=pruner /app/src/mixer/public ./public
ENV NODE_ENV=production
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["pm2-runtime", "server.js"]
