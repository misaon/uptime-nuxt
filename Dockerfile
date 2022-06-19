FROM node:18.3.0-alpine3.15 as build

WORKDIR /app

COPY . ./

RUN yarn install \
    && yarn run build


FROM node:18.3.0-alpine3.15

ENV NODE_NO_WARNINGS=1

WORKDIR /app

COPY --from=build /app/.output /app/.output

RUN mkdir -p /app/data

ENV HOST=0.0.0.0
ENV PORT=80

CMD ["node", ".output/server/index.mjs"]
