# Installation

## Step 0. Start
* Launch a new EC2 instance
* Allocate Elastic IP
* Set inbound rules: 0.0.0.0 for HTTP and HTTPS

## Step 1. Set up the DNS A-records:
* pojono.com
* *.pojono.com

## Step 2. Connect by SSH
````
sudo nano /etc/ssh/sshd_config
PasswordAuthentication no => yes
sudo passwd ubuntu
sudo service ssh restart
````

## Step 3. Install docker
````
ansible-playbook -vv -u ubuntu playbook.yml -i hosts --tags "system"
````

## Step 4. Install traefik
````
ansible-playbook -vv -u ubuntu playbook.yml -i hosts --tags "traefik"
````

## Step 5. Install blog
````
docker build -t blog . && \
docker tag blog:latest pojono/blog:latest && \
docker push pojono/blog:latest && \
cd ansible && ansible-playbook -vv -u ubuntu playbook.yml -i hosts --tags "blog" && cd ..
````

## Local check blog
````
docker run -p 8080:80 blog:latest 
````

## Links:
Blog: [pojono.com](https://pojono.com)

