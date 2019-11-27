node {
    try {

      def imageTag        = env.BRANCH_NAME
      def remoteImageTag  = env.BRANCH_NAME
      def ecRegistry      = "https://708752839087.dkr.ecr.eu-west-1.amazonaws.com"

      stage("Checkout") {
        checkout scm
      }

      stage("Docker build") {
        sh "docker build -t prostoapp_api:${remoteImageTag} ."
      }

      stage("Docker push") {
        docker.withRegistry(ecRegistry, "ecr:eu-west-1:iam-cred") {
          docker.image("prostoapp_api:${remoteImageTag}").push(remoteImageTag)
        }
      }

    } catch(e) {
      throw e
    }
}
