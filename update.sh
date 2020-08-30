docker build -t blog . && \
docker tag blog:latest pojono/blog:latest && \
docker push pojono/blog:latest && \
cd ansible && ansible-playbook -vv -u ubuntu playbook.yml -i hosts --tags "blog" && cd ..
