pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'abdullahdiallo'
        DOCKER_CLI = '/usr/local/bin/docker' // Chemin correct sur macOS
        // DOCKER_CLI = '/usr/bin/docker' // Décommente pour Linux
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
                    def services = ['students', 'professeur', 'cours', 'classes', 'timetable']
                    for (service in services) {
                        dir("backend/${service}") {
                            sh "$DOCKER_CLI build -t $DOCKER_REGISTRY/${service}:latest ."
                            sh "$DOCKER_CLI push $DOCKER_REGISTRY/${service}:latest"
                        }
                    }
                }
                dir('Gestion2-main') {
                    sh "$DOCKER_CLI build -t $DOCKER_REGISTRY/frontend:latest ."
                    sh "$DOCKER_CLI push $DOCKER_REGISTRY/frontend:latest"
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
