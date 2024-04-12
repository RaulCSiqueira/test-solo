pipeline {
    agent any  // Uses any available agent

    tools {
        // Explicitly defines Node.js version (replace "16.19.0" with desired version)
        nodejs "node"
    }
environment {
        SONARQUBE_HOSTNAME = 'sonarqube'  // Assuming this is set in Jenkins environment
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'  // Installs dependencies from package.json
            }
        }
    stage('Build with Gradle') {
            steps {
                script {
                    // Use environment variable or directly set hostname
                    sh "gradle -Dsonar.host.url=${env.SONARQUBE_HOSTNAME} tasks"  // Example with specific task
                }
            }
        }
        // Add additional stages for your specific workflow (e.g., build, test, deploy)
        // Replace "Example" with meaningful stage names and relevant steps within each stage.
        stage('Example') {
            steps {
                sh 'npm config ls'  // Example command (replace with your desired task)
            }
        }
    }
    
}
