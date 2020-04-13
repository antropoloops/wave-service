FROM jrottenberg/ffmpeg:4.1

RUN curl -sL https://deb.nodesource.com/setup_$NODE_MAJOR.x | bash -

RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    curl

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -yq --no-install-recommends \
    nodejs 

# Used in development
WORKDIR /workspace

# Make sure Node.js is installed
RUN           node -v
RUN           npm -v


RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install

#Bundle app source
COPY . /app

ENTRYPOINT []
CMD [ "node", "src/index.js" ]