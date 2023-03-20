FROM mysql:latest

# Set the root user password
ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_USER swpractice
ENV MYSQL_PASSWORD 123

# Copy the SQL file into the container
COPY VacQ-initdb.sql /docker-entrypoint-initdb.d/

# Run the SQL query to change the root user's authentication method
# RUN /usr/bin/mysqld --initialize-insecure --user=mysql && \
#     /usr/bin/mysqld_safe --skip-grant-tables --skip-networking & \
#     sleep 5 && \
#     echo "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; flush privileges;" | mysql && \

# Start the MySQL server
CMD ["mysqld"]

