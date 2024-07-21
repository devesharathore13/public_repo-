                script {
                    // Login to Docker Hub
                    sh 'echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin'

                    // Push frontend Docker image
                    sh 'docker push $IMAGE_FRONTEND:latest'

                    // Push backend Docker image
                    sh 'docker push $IMAGE_BACKEND:latest'
                }
            }
        }
        stage('Deploy to EKS') {
            steps {
                script {
                    // Set the context for EKS cluster
                    sh 'aws eks --region $AWS_REGION update-kubeconfig --name $EKS_CLUSTER_NAME'

                    // Apply Kubernetes manifests for frontend
                    sh 'kubectl apply -f frontend/k8s/frontend-deployment.yaml'
                    sh 'kubectl apply -f frontend/k8s/frontend-service.yaml'

                    // Apply Kubernetes manifests for backend
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
