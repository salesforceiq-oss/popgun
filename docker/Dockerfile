FROM mhart/alpine-node:0.12

EXPOSE 80 443

ADD package.json /
RUN npm install

RUN mkdir -p /www
ADD public /www
ADD start-server /

CMD node start-server www

