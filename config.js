import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config({ path: "./.env" });
export const Pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

  // Test the MySQL connection
Pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database');

  // Release the connection
  connection.release();
});

// Handle MySQL connection errors
Pool.on('error', err => {
  console.error('MySQL pool error:', err.message);
});