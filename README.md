# Antropoloops wave service

## Server

A Docker image based on https://hub.docker.com/r/jrottenberg/ffmpeg/

#### Curl examples

```
cd examples
curl -F "file=@pae.wav" 127.0.0.1:3033/convert/mp3 > output.mp3
```
