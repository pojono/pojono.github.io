node("master") {

  stage('checkout') {
      checkout scm
  }

  stage("ps") {
    sh 'sudo docker ps'
  }

  stage("build") {
    sh 'sudo docker build -t blog .'
  }

  stage("start") {
    sh 'sudo docker-compose up -d'
  }

}