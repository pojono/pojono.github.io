FROM node:13.1.0-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY config ./config
COPY src ./
RUN chmod 777 ./node_modules/typescript/bin/tsc
COPY tsc ./node_modules/typescript/bin/tsc
RUN yarn build
CMD node dist/src/main
