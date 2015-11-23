var db = require('mysql');
connection = db.createConnection({

	host: "localhost",
	port : 3306,
	user: "root",
	password: "root",
	database: "schedulerdb",
	multipleStatements: true
  
});