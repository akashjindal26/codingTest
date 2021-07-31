const mysql = require("mysql");
require("dotenv").config()

var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  else{
      console.log(`DB IS CONNECTED`)
  }
});

module.exports = connection;