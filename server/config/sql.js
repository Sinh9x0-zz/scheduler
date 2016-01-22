var db = require('mysql');
var config = require('./config.js')

connection = db.createConnection({

	host: config.sql.host,
	port : config.sql.port,
	user: config.sql.user,
	password: config.sql.password,
	database: config.sql.db,
	multipleStatements: true
  
});