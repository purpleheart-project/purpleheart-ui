FROM node:16.14.0-alpine
MAINTAINER wr_zhang25

ENV CUSTOM_ENV=dev

RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
WORKDIR /usr/src/app

RUN node -v
RUN npm install
RUN npm run build
