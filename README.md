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

##Links:
Blog: pojono.ru
Jenkins: jenkins.pojono.ru
Traefik: traefik.pojono.ru