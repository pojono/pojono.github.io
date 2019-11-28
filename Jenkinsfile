node {
    try {

      def region          = "eu-west-1"
      def repositoryId    = "708752839087"
      def repositoryName  = "prostoapp_api"
      def credentialsName = "iam-cred"

      def imageTag        = env.BRANCH_NAME
      def remoteImageTag  = env.BRANCH_NAME
      def ecRegistry      = "https://${repositoryId}.dkr.ecr.${region}.amazonaws.com"

      stage("Checkout") {
        checkout scm
      }

      stage("Docker build") {
        sh "docker build -t ${repositoryName}:${remoteImageTag} ."
      }

      stage("Docker push") {
        docker.withRegistry(ecRegistry, "ecr:${region}:${credentialsName}") {
          docker.image("${repositoryName}:${remoteImageTag}").push(remoteImageTag)
        }
      }

    } catch(e) {
      throw e
    }
}
