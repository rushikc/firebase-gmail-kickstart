

npm install -g @google/clasp

clasp login

clasp create --title "Firebase Gmail App Script" --type standalone

clasp push

## record the deployment ID, use next deployment to avoid duplicate deployments
clasp deploy --description "Firebase Gmail v1"

clasp deploy --deploymentId <DEPLOYMENT_ID_FROM_PREVIOUS_CMD> --description "Firebase Gmail v2"

