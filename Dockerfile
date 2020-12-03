FROM node:12.13.1
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY config ./config
COPY src ./src
RUN yarn build
RUN cp -R ./src/email/template/ ./dist/src/email/template/
EXPOSE 80
CMD node dist/src/main
