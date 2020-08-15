# How to create a new blog?

## Step 0. Start
Launch a new EC2 instance

Allocate Elastic IP

Set inbound rules: 0.0.0.0 for HTTP and HTTPS

## Step 1. Set the DNS A-records:
pojono.com

*.pojono.com

## Step 2. Connect by SSH
````
sudo nano /etc/ssh/sshd_config
PasswordAuthentication no => yes
sudo passwd ubuntu
sudo service ssh restart
````

## Step 3. Install docker
````
cd ansible && ansible-playbook -vv -u ubuntu playbook.yml -i hosts --tags "system" && cd ..
````

## Step 4. Install traefik
````
cd ansible && ansible-playbook -vv -u ubuntu playbook.yml -i hosts --tags "traefik" && cd ..
````

## Step 5. Install blog
````
docker build -t blog . && \
docker tag blog:latest pojono/blog:latest && \
docker push pojono/blog:latest && \
cd ansible && ansible-playbook -vv -u ubuntu playbook.yml -i hosts --tags "blog" && cd ..
````

## Local check
````
docker run -p 8080:80 blog:latest 
````

## Step X. Install Jenkins:
cd ~/blog/jeknins
docker-compose up -d --build
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

## Step X. Install Netdata:

> cd ~/blog/netdata
  docker-compose up -d

Edit notifications parameters:
> docker exec -it netdata /etc/netdata/edit-config health_alarm_notify.conf 

Set these parameters and save (:wq):      
> TELEGRAM_BOT_TOKEN=""
  DEFAULT_RECIPIENT_TELEGRAM=""  

Test notification:

> docker exec -it netdata su -s /bin/bash netdata \
 export NETDATA_ALARM_NOTIFY_DEBUG=1 \
 /usr/libexec/netdata/plugins.d/alarm-notify.sh test

## Links:
Blog: [pojono.com](https://pojono.com)

Traefik: [traefik.pojono.com](https://traefik.pojono.com)
