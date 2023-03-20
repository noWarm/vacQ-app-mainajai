steps to do execute mysql practice command via docker

# pull and run mysql server container
`docker run --name=mysql-container -p 3306:3306 -d mysql/mysql-server:latest`

# execute the mysql shell from the container terminal, connecting to the heroku mysql database
`docker exec -it mysql-container mysqlsh mysql://abc:def@ghi.jkl.us-east-1.rds.amazonaws.com:3306/db`

# some assignment commands
`SELECT firstlady_birthplace, COUNT(*) FROM firstlady WHERE firstlady_birthplace LIKE "N%" GROUP BY firstlady_birthplace;`

# this command will create a cartesian product of the two table (bad performance)
`SELECT p.presi_lastname, f.firstlady_firstname FROM president p, firstlady f WHERE p.firstlady_num = f.firstlady_num;`

# this command will join only on the matched rows (result is equivalent to the above with better performance)
`SELECT p.presi_lastname, f.firstlady_firstname FROM president p INNER JOIN firstlady f ON p.firstlady_num = f.firstlady_num;`
