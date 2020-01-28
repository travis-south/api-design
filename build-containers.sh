#!/usr/bin/env sh

red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
neutral='\033[0m'


# Check for requirements
command -v git >/dev/null 2>&1 || { printf >&2 ${red}"I require git. Aborting.${red}\n"; exit 1; }
command -v docker >/dev/null 2>&1 || { printf >&2 ${red}"I require docker. Aborting.${red}\n"; exit 1; }

set -e

# Initialize defaults
PUSH="YES"
IMAGE_TAG=$(git rev-parse HEAD)

while [ "$1" != "" ]; do
  case $1 in
    --no-push ) shift
        PUSH="NO"
        ;;
    * ) break
  esac
  shift
done

echo "IMAGE_TAG =" ${IMAGE_TAG}

export CONTAINER_REGISTRY_BASE="travissouth"
export IMAGE_TAG=${IMAGE_TAG}

printf ${yellow}"Building image(s)"${neutral}
docker build --pull -t ${CONTAINER_REGISTRY_BASE}/gitapi:${IMAGE_TAG} -t ${CONTAINER_REGISTRY_BASE}/gitapi:latest . --target prod

if [ "${PUSH}" = "YES" ]
then
    printf ${yellow}"Pushing image(s)\n"${neutral}
    docker push ${CONTAINER_REGISTRY_BASE}/gitapi:${IMAGE_TAG}
    docker push ${CONTAINER_REGISTRY_BASE}/gitapi:latest
fi
