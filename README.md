# GitAPI
A webservice that provides capabilities to create organization and manage the comments on your organization of your favorite Git service provider. Right now, supported provider is Github Enterprise.

Please note that I didn't write the actual logic for the Github API integration as I don't have any Github Enterprise account.

## Architecture
It's just a simple node app written in Typescript (NestJS) that provides adapter to other git service provider. 

## How to run/hack
You should have docker and docker-compose on your machine for you to be able to run and edit this.

To install dependencies, run `docker-composer run --rm workspace yarn install`.

To run built-in server and watch/reload while editing code, run `docker-compose up --build workspace`.

If you want to run tests, run `docker-compose run --rm workspace yarn run test`. 

You can view the documentation by accessing the index page `http://localhost:3000/`.

## Deployment
I have included a helm chart for easier deployment to k8s cluster.

To deploy, you must edit the `./build-containers.sh` and change the container registry to the one that you have access.

Your k8s cluster must also have `tiller` installed and an ingress controller that's defined by the ingress class `gitapi-public-ingress`.

To start deploying, run `./build-containers.sh` to build and push to registry. Then run `./deploy.sh` to deploy to your k8s cluster. Grab a coffee and wait until deployment is finished.

## Monitoring
You can easily use an EFK Stack (Elasticsearch, FluentD, Kibana) in your cluster and enable the logger library in NestJS to monitor your application.

## Autoscaling
This already includes Horizontal Pod-Autoscaler (HPA) to help you manage scaling needs.
