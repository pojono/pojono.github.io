node("master") {

  stage('checkout') {
      checkout scm
  }

  stage("ps") {
    sh 'docker ps'
  }

  stage("build") {
    sh 'docker build -t blog .'
  }

}