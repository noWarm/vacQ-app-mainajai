const mysql = require('mysql2');

// create a connection from the parameters, make sure it's same with the Dockerfile envirionments
var connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'vaccenter',
    port: '3366'   // the must be the same as the exposed port in the docker run -p 3366:3306
});

module.exports = connection;