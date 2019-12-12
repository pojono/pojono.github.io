FROM node:12.13.1-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY config ./config
COPY src ./src
RUN yarn build
CMD node dist/src/main