# steps to init the mysql for the project via docker

# build the docker image with the initial db set up from the Dockerfile in the ./mysql_node directory
docker build -t vacq-mysql ./mysql_node

# run the image into a container
docker run -d --name=vacq-mysql vacq-mysql

# login to the mysql server from the host
docker exec -it vacq-mysql mysql -uroot -p123

...

## clean up upon completion
docker stop vacq-mysql 
docker rm vacq-mysql