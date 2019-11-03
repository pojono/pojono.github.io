# How to create a new blog?

##Step 1. Set DNS A records:
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



traefik.frontend.auth.basic.users=EXPR:
To create user:password pair, it's possible to use this command:
echo $(htpasswd -nb pojono jklha2@893hAldkj) | sed -e s/\\$/\\$\\$/g
The result will be user:$$apr1$$9Cv/OMGj$$ZomWQzuQbL.3TRCS81A1g/, note additional symbol $ makes escaping.