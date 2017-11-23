#!/bin/bash
docker rm -f bagginzlab
docker rmi -f bagginzlab
docker volume rm node_modules_bagginzlab
docker build --no-cache -t bagginzlab:1.0 .
