FROM node:latest

RUN mkdir -p /frontend

WORKDIR /frontend

ADD . /frontend

VOLUME ["/frontend"]

EXPOSE 3000

CMD yarn && yarn start
