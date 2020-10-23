# Website

https://garronej.github.io/funcamp/.

# Deploy on GitHub Pages

```bash
yarn run deploy
```

# Dev

```bash

# Manually run the build and run the docker image

docker build -f Dockerfile.dev -t garronej/funcamp:dev .

docker run \
    -itd \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    garronej/funcamp:dev


# OR Relying on docker compose

docker-compose -f docker-compose.dev.yml up -d --build
# To run each time the dependencies have changed.
# After that it is possible to use docker dashboard to start the app.
# the app is available on http://localhost:3001

```

# Prod

```bash
docker build -f Dockerfile.prod -t garronej/funcamp:prod .
docker run -it --rm -p 1337:80 garronej/funcamp:prod

#OR

docker-compose -f docker-compose.prod.yml up -d --build
```
