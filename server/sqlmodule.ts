const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'vsmo',
  password: 'vsmo',
  database: 'projectone'
});

connection.connect(function(err: any) {
  if (err) {
    throw err
  };

  console.log("Connected to 'projectone' MySQL database");
});

connection.query('SELECT 1 + 1 AS solution', (err: any, rows:any, fields:any ) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
});

connection.end(
  function(err: any) {
    if (err) {
      throw err
    };
  
    console.log("Disconnected from 'projectone' MySQL database");
  }
);