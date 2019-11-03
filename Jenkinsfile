node("master") {
  stage("ps") {
    sh 'docker ps'
  }

  stage("build") {
    sh 'docker build -t blog .'
  }

}