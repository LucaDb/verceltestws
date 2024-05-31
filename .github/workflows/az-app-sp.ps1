# Log into Azure
az login

# Show current subscription (use 'Az account set' to change subscription)
az account show

# create ad-hoc ad sp: https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure?tabs=azure-cli%2Clinux#use-the-azure-login-action-with-a-service-principal-secret
$subscriptionId = $(az account show --query id -o tsv)
$githubOrgName = "websolute-dev"
$githubRepoName = "websolute"
$appName = "gh-ws-bom-actions-$githubOrgName-$githubRepoName-sp"
az ad sp create-for-rbac --name $appName --role contributor --scopes /subscriptions/$subscriptionId --json-auth

{
  "clientId": "****",
  "clientSecret": "****",
  "subscriptionId": "****",
  "tenantId": "****",
  "...": "...."
}

