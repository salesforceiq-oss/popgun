FROM mhart/alpine-node:0.12

# install a specific npm version
RUN npm install npm@2.13

# install sassc bindings
RUN apk add --update git make g++ python && \
    mkdir -p /scss && cd /scss && \
    npm install node-sass && \
    mv /scss/node_modules/node-sass/vendor/linux-x64-14/binding.node /lib/libsass.node && \
    apk del git make g++ python && \
    rm -rf /node_modules && \
    rm -rf /scss

# utilities needed by the build (also silence parallel)
RUN apk add --update parallel jq zsh grep sed ncurses git findutils && \
    mkdir -p ~/.parallel && touch ~/.parallel/will-cite
RUN apk add --update rsync docker

ENV SASS_BINARY_PATH /lib/libsass.node

# because it's annoying.
RUN git config --global push.default simple

# entrypoint needs to actually exist, so create a symlink
# that will point to the place where it will eventually be
WORKDIR /app
ENTRYPOINT ["bin/iqb"]
