FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.18.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS common
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

FROM common AS dev
COPY tsconfig.json tsconfig.dev.json ./
ENV NODE_ENV=development
CMD ["pnpm", "start:dev"]

FROM common AS build
COPY . .
RUN pnpm build:prod
RUN pnpm prune --ignore-scripts --prod

FROM node:24-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

RUN chown node:node /app

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./

USER node

CMD ["node", "--enable-source-maps", "dist/main.js"]
