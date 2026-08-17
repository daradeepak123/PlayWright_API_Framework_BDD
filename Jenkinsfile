pipeline {
    agent any

    environment {
        REQRES_BASE_URL = 'https://reqres.in/api'
        ORANGEHRM_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
        ORANGEHRM_USERNAME = 'Admin'
        ORANGEHRM_PASSWORD = 'admin123'
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run OrangeHRM UI Tests') {
            steps {
                sh '''
                    export ORANGEHRM_URL="${ORANGEHRM_URL}"
                    export ORANGEHRM_USERNAME="${ORANGEHRM_USERNAME}"
                    export ORANGEHRM_PASSWORD="${ORANGEHRM_PASSWORD}"
                    npx playwright test tests/OrangeHRM*.spec.ts tests/PIM_Module_Complete.spec.ts --reporter=line --workers=1
                '''
            }
        }

        stage('Run API Tests') {
            steps {
                withCredentials([
                    string(credentialsId: 'reqres-api-key', variable: 'REQRES_API_KEY')
                ]) {
                    sh '''
                        export REQRES_BASE_URL="${REQRES_BASE_URL}"
                        export REQRES_API_KEY="${REQRES_API_KEY}"
                        npx playwright test tests/reqresApi.spec.ts --reporter=line --workers=1
                    '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
            junit 'test-results/**/*.xml'
        }
        success {
            echo 'OrangeHRM + API pipeline completed successfully'
        }
        failure {
            echo 'OrangeHRM + API pipeline failed'
        }
    }
}
