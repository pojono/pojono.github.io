FROM node:lts

WORKDIR /app

RUN npm install hexo-cli -g -f

COPY src/ /app

RUN npm install

EXPOSE 5005

CMD [ "hexo", "s", "-p", "5005" ]