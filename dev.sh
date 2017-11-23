#!/bin/bash
docker rm -f bagginzlab
docker volume create --name=node_modules_bagginzlab
docker run -it -p 30664:30664 --restart always --name bagginzlab -e 'dev-true' -v /$(pwd)/project:/project -v node_modules_bagginzlab:/project/node_modules_bagginzlab bagginzlab:1.0