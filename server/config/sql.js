var db = require('mysql');
connection = db.createConnection({

	host: "localhost",
	port : 3306,
	user: "root",
	password: "root",
	database: "schedulerdb",
	multipleStatements: true
  
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

connection.end();