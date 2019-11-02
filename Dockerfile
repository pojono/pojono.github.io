FROM node:lts

# Создать директорию app
WORKDIR /app

RUN npm install hexo-cli -g

COPY blog /app

EXPOSE 3000
CMD [ "hexo", "s" ]