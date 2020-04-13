# Antropoloops wave service

## Server

A Docker image based on https://hub.docker.com/r/jrottenberg/ffmpeg/
Code based on https://github.com/surebert/docker-ffmpeg-service

## Requirements

- Docker and docker compose

## Start

```
docker-compose up -d server
```

#### Testing with curl

```
cd examples
curl -F "file=@pae.wav" 127.0.0.1:3033/convert/mp3 > output.mp3
```

## Client

WIP
