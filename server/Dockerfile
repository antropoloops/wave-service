FROM jrottenberg/ffmpeg:4.1

RUN curl -sL https://deb.nodesource.com/setup_$NODE_MAJOR.x | bash -

RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    curl

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -yq --no-install-recommends \
    nodejs 

# Make sure Node.js is installed
RUN           node -v
RUN           npm -v

# =================================

# Setup a working directory to allow for
# docker run --rm -ti -v ${PWD}:/work ...
# =======================================
WORKDIR /workspace

RUN mkdir app

# CMD [ "node", "app.js" ]
ENTRYPOINT []