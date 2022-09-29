FROM node:18.10.0-alpine3.15 as build

WORKDIR /app

COPY . ./

RUN yarn install \
    && sed -i 's/file:.\//file:\/app\/data\//g' server/data/schema.prisma \
    && $(npm bin)/prisma generate \
    && yarn run build \
    && $(npm bin)/prisma migrate dev --name init

FROM node:18.10.0-alpine3.15

ENV NODE_NO_WARNINGS=1

WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/data ./data

ENV HOST=0.0.0.0
ENV PORT=80

CMD ["node", ".output/server/index.mjs"]
