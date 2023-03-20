# steps to init the mysql for the project via docker

## build the docker image with the initial db set up from the Dockerfile in the ./mysql_node directory
`docker build -t vacq-mysql ./mysql_node`

## run the image into a container (the p flag is a must, the EXPOSE keyword in the Dockerfile doesn't do the port mapping nor any real expose!)
`docker run -it -p3366:3306 --name=vacq-mysql vacq-mysql`

## connect to the node server via postman route from the node server
`curl -L localhost:6000/api/v1/hospitals/vacCenters` or use postman

## clean up upon completion
`docker stop vacq-mysql`
`docker rm vacq-mysql`

## misc: notes login to the mysql server container from the host
`docker exec -it vacq-mysql mysql -uroot -p123`

## confirm the status of the server/ try logging in via terminal
`lsof -i:3366`
`mysql -h 127.0.0.1 -P 3366 -u root -p123`

