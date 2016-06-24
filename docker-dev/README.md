# docker-dev

This folder contains a Dockerfile that can be used to execute iqb inside
a container.  This is useful for running on build agents so the build process
isn't dependent on the server configuration.

## Building

```bash
docker build .
```

## Tagging and Pushing

```bash
docker tag -f IMAGE_ID docker.amz.relateiq.com/bedrock:latest
docker push docker.amz.relateiq.com/bedrock
```

## Running

```bash
docker run -it --rm -v /path/to/your/apps/source:/app docker.amz.relateiq.com/bedrock IQB_COMMAND IQB_ARGS
```

For convenience, you can alias this for particular projects:

```bash
alias iqbr="docker run -it --rm -v $RIQ/LucidWeb:/app docker.amz.relateiq.com/bedrock"
iqbr install
iqbr build
```

## Limitations

Does not currently forward ports, so running in local dev doesn't work right now.
