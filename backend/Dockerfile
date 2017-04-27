FROM node:latest

RUN mkdir -p /backend

WORKDIR /backend

ADD . /backend

VOLUME ["/backend"]

EXPOSE 8000

CMD yarn && yarn start
