FROM node:12.13.1 as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn && yarn install --modules-folder ./modules
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY config ./config
COPY src ./src
RUN yarn build
RUN cp -R ./src/email/template/ ./dist/src/email/template/

FROM node:12.13.1
WORKDIR /app
COPY --from=0 /app/modules /app/node_modules
COPY --from=0 /app/dist /app/
EXPOSE 80
CMD node src/main.js
