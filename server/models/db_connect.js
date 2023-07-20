require('dotenv').config();
const mysql = require('mysql2');

//Creating connection
const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PSWD,
  database: process.env.MYSQL_DB
})

const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    con.query(sql, binding, (err, result, fields)=> {
      if(err) reject(err);
      resolve(result);
    });
  });
};

con.connect(function(err){
    if(err) throw err;
    console.log("CONNECTED");
    con.query("CREATE DATABASE IF NOT EXISTS test", function(err, result){
        if(err) throw err;
        console.log("Database succesfully created");
    })
})

module.exports = {con, query};