pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'abdullahdiallo'
        DOCKER_USERNAME = credentials('docker-username') // Ajoute ces credentials dans Jenkins
        DOCKER_PASSWORD = credentials('docker-password')
        PATH = "/usr/local/bin:$PATH" 
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
                    // Vérifier que Docker fonctionne avant de continuer
                    sh "docker version || exit 1"

                    // Connexion à Docker Hub avec test
                    sh """
                        echo "Connexion à Docker Hub..."
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        if [ $? -ne 0 ]; then
                            echo "Échec de la connexion à Docker Hub"
                            exit 1
                        fi
                    """

                    def services = ['students', 'professeur', 'cours', 'classes', 'timetable']
                    for (service in services) {
                        dir("backend/${service}") {
                            sh """
                                echo "Construction de l'image pour $service..."
                                docker build -t $DOCKER_REGISTRY/${service}:latest .
                                
                                echo "Push de l'image vers Docker Hub..."
                                docker push $DOCKER_REGISTRY/${service}:latest
                            """
                        }
                    }
                }

                // Build & Push du frontend
                dir('Gestion2-main') {
                    sh """
                        echo "Construction et push du frontend..."
                        docker build -t $DOCKER_REGISTRY/frontend:latest .
                        docker push $DOCKER_REGISTRY/frontend:latest
                    """
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
