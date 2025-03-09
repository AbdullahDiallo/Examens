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
        dir("backend") { // Exécute SonarQube dans le bon dossier
            sh 'mvn clean install sonar:sonar
'
        }
    }
}


         stage('Build & Push Docker Images') {
            steps {
                script {
                    def services = ['students', 'professeur', 'Cours', 'Classes', 'Timetable']
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
