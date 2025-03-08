pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'abdullahdiallo'
    }

    tools {
        maven 'Maven'
        nodejs 'Node' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/AbdullahDiallo/ExamenDevops.git'
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
                    def services = ['students', 'professeur', 'cours', 'classes', 'timetable']
                    for (service in services) {
                        dir("backend/${service}") {
                            sh "mvn clean package"
                        }
                    }
                }
            }
        }

        stage('Build Frontend (Angular)') {
            steps {
                dir('Gestion2-main') {  // Assure-toi que ton frontend est bien dans ce dossier
                    sh 'npm install'  // Installation des dépendances
                    sh 'ng build --configuration=production'  // Build du frontend
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    def services = ['students', 'professeurs', 'cours', 'classes', 'timetable']
                    for (service in services) {
                        dir("backend/${service}") {
                            sh "docker build -t $DOCKER_REGISTRY/${service}:latest ."
                            sh "docker push $DOCKER_REGISTRY/${service}:latest"
                        }
                    }
                }
                // Build & Push du frontend
                dir('Gestion2-main') {
                    sh "docker build -t $DOCKER_REGISTRY/frontend:latest ."
                    sh "docker push $DOCKER_REGISTRY/frontend:latest"
                }
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
