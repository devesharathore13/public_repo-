pipeline {
    agent any
    environment {
        REGISTRY = 'docker.io'
        IMAGE_FRONTEND = 'deveshrathore13/large-frontend-app'
        IMAGE_BACKEND = 'deveshrathore13/large-backend-app'
        EKS_CLUSTER_NAME = 'my_small_cluster'
        AWS_REGION = 'ap-south-1'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/deveshrathore13/github_project.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t $IMAGE_FRONTEND:latest -f frontend/Dockerfile .'                    sh 'docker build -t $IMAGE_BACKEND:latest -f backend/Dockerfile .'
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    sh 'echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin'

                    sh 'docker push $IMAGE_FRONTEND:latest'

                    sh 'docker push $IMAGE_BACKEND:latest'
                }
            }
        }
        stage('Deploy to EKS') {
            steps {
                script {
                    sh 'aws eks --region $AWS_REGION update-kubeconfig --name $EKS_CLUSTER_NAME'

                    sh 'kubectl apply -f frontend/k8s/frontend-deployment.yaml'
                    sh 'kubectl apply -f frontend/k8s/frontend-service.yaml'

                    sh 'kubectl apply -f backend/k8s/backend-deployment.yaml'
                    sh 'kubectl apply -f backend/k8s/backend-service.yaml'
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
