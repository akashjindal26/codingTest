const mysql = require("mysql2");
require("dotenv").config()

// mysql connection string
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

//mysql connection
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