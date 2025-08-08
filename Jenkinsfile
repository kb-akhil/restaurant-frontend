pipeline {
    agent any

    environment {
        // IMPORTANT: Replace this with your actual S3 bucket name
        S3_BUCKET = 'your-unique-restaurant-frontend-bucket'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Cloning the frontend repository..."
                // Jenkins automatically checks out the code from the Git repository
            }
        }
        stage('Build Frontend') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'npm install'
                echo "Building the React application..."
                sh 'npm run build'
            }
        }
        stage('Deploy to S3') {
            steps {
                echo "Deploying the built application to S3 bucket: ${S3_BUCKET}"
                sh "aws s3 sync build/ s3://${S3_BUCKET} --delete"
                echo "Frontend deployed successfully!"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}