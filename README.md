# prostoapp

npm i -g @nestjs/cli
nest new prostoapp_api

##ENVIRONMENTS

Default - содержит все параметры, подгружается всегда по умолчанию.
Development - загружается по умолчанию, если NODE_ENV не указана. Используем для локальной разработки.
Staging - тестовый сервер
Production - продакшен сервер.

##Start local database:
docker run --name postgres -p 5454:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=prostoapp -d postgres:11.5

##Start minio:
cd minio && docker-compose up -d
Minio UI: URL: http://localhost:9000/ Login: minio Pass: minio125

##Сборка на Jenkins:
http://jenkins.prostoapp.com/

Статистика в приложении:
Во время прослушивания занятия на сервер приходят следующие данные:
а) progress - текущая позиция на треке (в %)
b) diff - сколько % трека было прослушано с момента последней отправки статистики (в %)
c) utcDiff - разница в минутах между UTC и местным временем пользователя
d) trackId - id прослушиваемого трека

На основании этих данных вычисляется следующее:
ListenTime = diff \* Track.duration / 100 (в секундах) - длительность прослушанного отрезка
Определяется lessonId и courseId, если этот трек относится к занятию
Если нет записи в StatisticTrack, то она создаётся
Если определен courseId и нет записи в таблице StatisticCourse, то она создаётся
Если определен lessonId и нет записи в таблице StatisticLesson, то она создаётся
В StatisticTrack обновляется lastProgress на присланный и maxProgress,
если он больше, чем lastProgress
Если в StatisticLesson есть запись и присланный progress больше имеющегося, то он обновляется
Если Lesson относящийся к этому треку помечен как isLatest: true и progress >= 90, то
в таблице StatisticCourse выставляется isFinished: true
Если последняя lastActivity была позавчера или ранее (с поправкой на местное время),
то счетчик страйка (currentStrike) сбрасывается на 1
Если последняя lastActivity была за вчерашние сутки с поправкой на местное время пользователя,
то счетчик страйка увеличивается на 1
Если последняя lastActivity была за текущие сутки с поправкой на местное время пользователя,
то счетчик страйка не меняется
Если последняя lastActivity была более чем за 10 минут от текущего момента,
то счетчик sessionCounter увеличивается на 1
Если нет записи в таблице StatisticHour, то она создаётся
Запись в таблице StatisticHour увеличивается на ListenTime
Запись в таблице User.sessionDuration увеличивается на ListenTime
Запись в таблице User.lastActivity обновляется на текущий момент
Запись в таблице User.utcDiff обновляется только что присланный

1. Количество занятий в курсе
   Считаем количество записей в таблице Lesson с данным courseId.

2. Сколько человек сегодня занималось
   Берём текущий момент, вычитаем из него 24 часа
   и делаем поправку на часовой пояс пользователя.
   Считаем у скольки пользователей была активность после этого момента.

3. Сегодня минут осознанности
   Берём текущий момент, вычитаем из него 24 часа
   и делаем поправку на часовой пояс пользователя.
   Считаем по таблице StatisticHour сумму времени всех пользователей после этого момента.

4. Самый длинный страйк среди всех пользователей
   Берём максимальное значение по полю maxStrike среди всех записей в таблице User

5. Количество пройденных занятий в курсе данного пользователя
   Берём количество записей в таблице StatisticLesson, фильтруем по courseId и по пользователю
   и считаем сколько занятий имеют прогресс 90 или больше

6. Сколько человек проходили или проходят этот курс
   Берём количество записей в таблице StatisticCourse по данному courseId

7. Текущий страйк данного пользователя
   Берём значение currentStrike у текущего пользователя в таблице User

8. Общее время занятий данного пользователя
   Берём значение sessionDuration у текущего пользователя в таблице User

9. Среднее время занятий данного пользователя
   Делим значение sessionDuration на sessionCounter у текущего пользователя в таблице User

10. Общее время занятий в текущем месяце данного пользователя
    Берём текущий момент, от него находим начало месяца
    и делаем поправку на часовой пояс пользователя.
    Считаем по таблице StatisticHour сумму времени всех занятий этого пользователя после этого момента.

11. Общее время для сна у данного пользователя
    Быстрая помощь считается в эти минуты или нет?

12. Количество завершенных курсов у данного пользователя
    Берём количество записей в таблице StatisticCourse по данному пользователю
    где isFinished равно true

13. Количество завершенных занятий у данного пользователя
    Берём количество записей в таблице StatisticLesson, фильтруем по пользователю
    и считаем сколько занятий имеют прогресс 90 или больше

14. Последняя позиция у прослушанного трека
    Берем значение lastProgress у записи с данным trackId у этого пользователя
    в таблице StatisticTrack

При пересборке Jenkins контейнера:
docker exec -it jenkins sh
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws configure
(admin IAM)
Access key ID AKIA2KBHWCGXUW2B3DUH
Secret access key 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
Region eu-west-1

wget https://releases.hashicorp.com/terraform/0.11.14/terraform_0.11.14_linux_amd64.zip
unzip terraform_0.11.14_linux_amd64.zip
chmod +x terraform
sudo mv terraform /usr/local/bin/
terraform --version

docker build -t prostoapp_api . && docker stop prostoapp_api && docker rm prostoapp_api && docker run --name prostoapp_api -p 3002:3001 prostoapp_api:latest
