const mysql = require("mysql2");

const connection = mysql.createConnection({
  user: "root",
  password: "root",
  database: "luks",
  port: 3306,
});

module.exports = connection;