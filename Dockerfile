FROM node:lts AS builder
WORKDIR /app
RUN npm install hexo-cli -g -f
COPY src/package.json /app
RUN npm install
COPY src/ /app
RUN hexo generate

FROM flashspys/nginx-static
RUN apk update && apk upgrade
COPY --from=0 /app/public/ /static