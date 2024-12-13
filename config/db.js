const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'testing_admin',
});

module.exports = pool.promise();
