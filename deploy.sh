#!/usr/bin/env sh

red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
neutral='\033[0m'


# Check for requirements
command -v kubectl >/dev/null 2>&1 || { printf >&2 ${red}"I require kubectl. Aborting.${red}\n"; exit 1; }
command -v git >/dev/null 2>&1 || { printf >&2 ${red}"I require git. Aborting.${red}\n"; exit 1; }
command -v helm >/dev/null 2>&1 || { printf >&2 ${red}"I require helm. Aborting.${red}\n"; exit 1; }
command -v aws >/dev/null 2>&1 || { printf >&2 ${red}"I require aws-cli. Aborting.${red}\n"; exit 1; }

set -e

# Initialize defaults
IMAGE_TAG=$(git rev-parse HEAD)
PROJECT="gitapi"
CHART="./helm"
ENV="prod"

while [ "$1" != "" ]; do
  case $1 in
    --image-tag ) shift
        IMAGE_TAG=${1}
        ;;
    --project ) shift
        PROJECT=${1}
        ;;
    --chart ) shift
        CHART=${1}
        ;;
    --env ) shift
        ENV=${1}
        ;;
    * ) break
  esac
  shift
done

ECR_NS="${PROJECT}-${ENV}"
DEPLOYMENT="deployment/${ECR_NS}-node"

echo "PROJECT =" ${PROJECT}
echo "ENV =" ${ENV}
echo "ECR_NS =" ${ECR_NS}
echo "IMAGE_TAG =" ${IMAGE_TAG}

echo "helm init"
helm init --client-only

echo "helm repo update"
helm repo update

echo "helm dependency update"
helm dependency update ${CHART}

echo "helm upgrade"
helm upgrade --install ${ECR_NS} ${CHART} --namespace=${ECR_NS} --set tag=${IMAGE_TAG} -f ${CHART}/values/main.yaml -f ${CHART}/values/${ENV}.yaml \
    --force --wait --debug --timeout 180

echo "kubectl rollout"
kubectl rollout status --watch ${DEPLOYMENT} --namespace=${ECR_NS}
