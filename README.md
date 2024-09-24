# Servicing Helper

## This is my first project in which I use docker, vite, microservices, graphql and signals (I had some problem with them so they made the code a little bit messed)

## Production mode is not tested!

## A task given to me by Kamil from Likescoding (company's head)
Main idea of the project is to help managing servicin. The goal was to check my skills and to learn new solutions.

This project uses multiple microservices, normally I would split it into multiple repositories - one for each microservice, but since I am doing it only by myself I do not find it necessery to do - it would take more time to review it.

## To initialize you need to follow instructions specified in each app's folder's README.

Makefile instruction:
```
make name-up -> run in shell (example auth-up)
make name-start -> run detached in background (example auth-start)
make name-build -> build (example auth-build)
make backend-build -> build all backend apps
make backend-start -> start all backend apps
make backend-down -> down all backend containers
make backend-destroy -> destroy all backend containers
make all-start -> start all apps
make all-down -> down all containers
make all-destroy -> destroy all containers
```
To run (after initialization) you simply need to for example
```
make all-start
```
Or for example to run backend in background and debug frontend
```
make backend-start
make frontend-up
```

By default frontend can be accessed at http://localhost:4000/
