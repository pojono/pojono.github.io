node("master") {

  stage('checkout') {
      checkout scm
  }

  stage("build") {
    sh 'docker build -t blog .'
  }

  stage("start") {
    sh 'docker-compose up -d'
  }

}