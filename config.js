import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config({ path: "./.env" });
export const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

