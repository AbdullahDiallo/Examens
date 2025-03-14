pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'abdullahdiallo'
        DOCKER_CLI = '/usr/local/bin/docker' // Chemin correct sur macOS
        DOCKER_USERNAME = credentials('docker-username') // Ajoute ces credentials dans Jenkins
        DOCKER_PASSWORD = credentials('docker-password')
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
                    def services = ['students', 'professeur', 'cours', 'classes', 'timetable']
                    for (service in services) {
                        dir("backend/${service}") {
                            sh "mvn clean package"
                        }
                    }
                }
            }
        }

        stage('Save Artifacts') {
            steps {
                archiveArtifacts artifacts: 'backend/**/target/*.jar', fingerprint: true
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def services = ['students', 'professeur', 'cours', 'classes', 'timetable']
                    for (service in services) {
                        dir("backend/${service}") {
                            sh "mvn clean test"
                        }
                    }
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                dir("backend") {
                    sh "mvn clean install sonar:sonar"
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    // Connexion à Docker Hub
                    sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"

                    def services = ['students', 'professeur', 'cours', 'classes', 'timetable']
                    for (service in services) {
                        dir("backend/${service}") {
                            // Vérifier que Docker est installé et configuré
                            sh "docker version"

                            // Construire et pousser l'image
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
