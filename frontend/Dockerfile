FROM node:latest

RUN mkdir -p /frontend

WORKDIR /frontend

ADD . /frontend

VOLUME ["/frontend"]

EXPOSE 5000

CMD yarn && yarn build && yarn global add serve && serve -s build
