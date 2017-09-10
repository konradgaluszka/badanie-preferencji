FROM node:latest

RUN mkdir -p /frontend && yarn global add serve

WORKDIR /frontend

ADD . /frontend

VOLUME ["/frontend"]

EXPOSE 5000

CMD yarn && yarn build && serve -s build
