FROM node:16 AS builder
LABEL maintainer="shunnyjang"

ARG TZ="Asia/Seoul"

ENV TZ="${TZ}"

RUN apt-get update -y
RUN apt-get install -y vim

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./
CMD ["yarn", "start:prod"]

