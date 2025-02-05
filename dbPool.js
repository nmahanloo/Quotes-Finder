const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'g84t6zfpijzwx08q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'h815wr1okf8bhilm',
  password: 'iw4g8oizm8qh0dch',
  database: 'ac2ujofznb2xyj1g'
});

module.exports = pool;