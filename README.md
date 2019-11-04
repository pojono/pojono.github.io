# How to create a new blog?

##Step 1. Set a DNS A records:
pojono.ru 
*.pojono.ru 

##Step 2. Install on VPS:
apt install htop
apt install mc
curl -sSL https://get.docker.com/ | bash
usermod -aG docker $USER
curl -L https://github.com/docker/compose/releases/download/1.24.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

##Step 3. Install traefik:
docker network create web
cd ~
git clone https://github.com/pojono/blog.git
cd blog/traefik
docker-compose up -d

##Step 4. Install Jenkins:
cd ~/blog/jeknins
docker-compose up -d --build
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

##Step 5. Install Netdata:

> cd ~/blog/netdata
  docker-compose up -d

Edit notifications parameters:
> docker exec -it netdata /etc/netdata/edit-config health_alarm_notify.conf 

Set these parameters and save (:wq):      
> TELEGRAM_BOT_TOKEN="823689878:AAH7Wv6f6mnLr3v9sJtcDwd9g5PohKM_4fg"
  DEFAULT_RECIPIENT_TELEGRAM="360376015"  

Test notification:

> docker exec -it netdata su -s /bin/bash netdata \
 export NETDATA_ALARM_NOTIFY_DEBUG=1 \
 /usr/libexec/netdata/plugins.d/alarm-notify.sh test


##Links:
Blog: pojono.ru
Jenkins: jenkins.pojono.ru
Traefik: traefik.pojono.ru