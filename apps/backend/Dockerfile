ARG BACKEND_DIR
ARG ROOT

FROM node:24-alpine AS base
ARG BACKEND_DIR
ARG ROOT
RUN ["echo", "${ROOT:?root must be specified}"]
RUN ["echo", "${BACKEND_DIR:?backend dir must be specified}"]
WORKDIR ${ROOT}
RUN corepack enable && corepack prepare pnpm@11.18.0 --activate
COPY --from=root package.json pnpm-lock.yaml pnpm-workspace.yaml ./
WORKDIR ${BACKEND_DIR}
COPY package.json ./
WORKDIR ${ROOT}

FROM base AS common
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

FROM common AS dev
WORKDIR ${BACKEND_DIR}
# COPY tsconfig.json tsconfig.dev.json ./
CMD ["pnpm", "start:dev"]

FROM common AS build
COPY . .
RUN pnpm build:prod
RUN pnpm prune --ignore-scripts --prod

FROM node:24-alpine AS prod
WORKDIR ${ROOT}
ENV NODE_ENV=production

RUN chown node:node /app

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./

USER node

CMD ["node", "--enable-source-maps", "dist/main.js"]
