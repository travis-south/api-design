FROM nestjs/cli:latest as dev

WORKDIR /srv


FROM node:12.14-alpine3.10 as prod

WORKDIR /srv

ADD ./ /srv/

RUN yarn run build

ENTRYPOINT [ "yarn" ]

CMD [ "run", "start:prod" ]
