@NonCPS
def sendChangeLogs() {
    def commitMessages = ""
    def changeLogSets = currentBuild.changeSets
    for (int i = 0; i < changeLogSets.size(); i++) {
        def entries = changeLogSets[i].items
        for (int j = 0; j < entries.length; j++) {
            def entry = entries[j]
            commitMessages = commitMessages + "\n*${entry.author}*: ${entry.msg}"
        }
    }
    telegramSend "✅ #jenkins №${env.BUILD_NUMBER} ${env.JOB_NAME} ${env.JOB_URL} \n${commitMessages}"
}

try {
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

    stage("telegram") {
      sendChangeLogs()
    }
  }

} catch (err) {
  telegramSend "⚠ #jenkins №${env.BUILD_NUMBER} ${env.JOB_NAME} ${env.JOB_URL}"
  throw err
}
