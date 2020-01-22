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
    return commitMessages
}

node {
    try {

      def region          = "eu-west-1"
      def repositoryId    = "708752839087"
      def repositoryName  = "prostoapp_api"
      def credentialsName = "iam-cred"

      def imageTag        = env.BRANCH_NAME
      def remoteImageTag
      def ecRegistry      = "https://${repositoryId}.dkr.ecr.${region}.amazonaws.com"

      stage("Checkout") {
        checkout scm
        def commit_hash = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()
        remoteImageTag  = "${imageTag}_${BUILD_NUMBER}_${commit_hash}"
      }

      stage("Start") {
        telegramSend "🛠☑️ Build №${env.BUILD_NUMBER}: Start ```#${remoteImageTag}``` \n\n${env.JOB_URL} \n${sendChangeLogs()}"
      }

      stage("Docker build") {
        sh "docker build -t ${repositoryName}:${remoteImageTag} ."
      }

      stage("Docker push") {
        docker.withRegistry(ecRegistry, "ecr:${region}:${credentialsName}") {
          docker.image("${repositoryName}:${remoteImageTag}").push(remoteImageTag)
        }
      }

      stage("notify") {
        telegramSend "🛠✅️ Build №${env.BUILD_NUMBER}: Finish ```#${remoteImageTag}```"
      }

    } catch(e) {
      telegramSend "🛠❌️ Build №${env.BUILD_NUMBER}: Error ```#${remoteImageTag}``` \n${e}"
      throw e
    }
}
