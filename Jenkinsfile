pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'abdullahdiallo'
        
    }

    tools {
        maven 'Maven'
        nodejs 'Node' 
        dockerTool 'Docker'
        git 'Git' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/AbdullahDiallo/Examens.git'
            }
        }

        




        stage('Install Node.js & Angular CLI') {
            steps {
                script {
                    sh 'npm install -g @angular/cli'
                }
            }
        }

        stage('Build Backend Services') {
            steps {
                script {
                    def services = ['students', 'professeur', 'Cours', 'Classes', 'Timetable']
                    for (service in services) {
                        dir("backend/${service}") {
                            sh "mvn clean package"
                        }
                    }
                }
            }
        }

        stage('Load Prebuilt Docker Images') {
            steps {
                script {
                    def services = ['students', 'professeur', 'Cours', 'Classes', 'Timetable']
                    for (service in services) {
                        sh "docker load -i /path/to/local/${service}.tar" 
                    }
                }
                sh "docker load -i /path/to/local/frontend.tar"
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    def services = ['students', 'professeurs', 'cours', 'classes', 'timetable']
                    for (service in services) {
                        sh "docker push $DOCKER_REGISTRY/${service}:latest"
                    }
                }
                sh "docker push $DOCKER_REGISTRY/frontend:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            when {
                branch 'main'
            }
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
