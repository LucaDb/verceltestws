# bom-deploy

## az setup

Ask an admin to obtain all necessary azure secrets (registry & az cli).
You can also create a specific AD service principal for the GitHub Actions workflow: [guide](az-app-sp.ps1), otherwise use the default one: az ad sp list --display-name gh-ws-bom-actions-sp

### create GitHub secret/variables

1. Open your GitHub repository and go to Settings.
![Settings](https://learn.microsoft.com/en-us/azure/developer/reusable-content/media/github-secrets-nav-item.png)
2. Select Security > Secrets and variables > Actions.
![Secrets](https://learn.microsoft.com/en-us/azure/developer/reusable-content/media/github-select-actions.png)
3. Create the following secrets:

- ci

  | Secret                |      Value        |
  | --------------------- | ----------------- |
  | APP_NAME               | \<az-webapp-name\>           |
  | AZURE_CONTAINER_REGISTRY_USER | \<az-container-registry-user\>       |  
  | AZURE_CONTAINER_REGISTRY_PWD  | \<az-container-registry-password\> |  

- cd

  | Secret                |      Value        |
  | --------------------- | ----------------- |
  | AZURE_CREDENTIALS       | \<az-ad-sp-json-creds\>            |
  | AZURE_RESOURCE_GROUP  | \<app-resourse-group-name\> |

![Variables](https://learn.microsoft.com/en-us/azure/developer/reusable-content/media/github-select-actions.png)
4. Create the following variables, containing key-value pairs that will be merged with the existing production .env* files:

- ci

  | Secret                |      Value        |
  | --------------------- | ----------------- |
  | BOWL_ENV_PRODUCTION | \<MONGO_URI,PAYLOAD_SECRET...\>       |  
  | MIXER_ENV_PRODUCTION  | \<STORE_STRATEGY,STORE_URL...\> |

## run gh actions locally

Install [act](https://github.com/nektos/act) to run/test GitHub Actions locally

```powershell
choco install act-cli
#winget install nektos.act
```

Setup secrets

```powershell
cp ./.github/workflows/act/.secrets.sample ./.github/workflows/act/.secrets
code ./.github/workflows/act/.secrets
```

Run

```powershell
#run all workflows
#act --secret-file ./.github/workflows/act/.secrets

#specific workflow: ci
act --pull=false --secret-file ./.github/workflows/act/.secrets -W ./.github/workflows/az-ci.yml

#specific workflow: cd
act --pull=false --secret-file ./.github/workflows/act/.secrets -W ./.github/workflows/az-cd.yml
```
