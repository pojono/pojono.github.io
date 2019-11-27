# prostoapp

npm i -g @nestjs/cli
nest new prostoapp_api

##ENVIRONMENTS

Default - содержит все параметры, подгружается всегда по умолчанию.
Development - загружается по умолчанию, если NODE_ENV не указана. Используем для локальной разработки.
Staging - тестовый сервер
Production

##Start local database:
docker run --name prosto-postgres -p 5454:5432 -e POSTGRES_PASSWORD=postgres -d postgres
