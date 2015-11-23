var employees = require('./../controllers/employees.js');

module.exports = function(app) {

	app.get('/allEmployees', employees.allEmployees);

	app.post('/addUser', function(req, res){
		console.log('connect to database');
	});

	app.get('/deleteUser/:id', function(req, res){
		console.log('connect to database');
	});

	app.post('/authenticateUser', function(req, res){
		console.log('connect to database');
	})

	app.get('/destroySession', function(req, res){
		req.session.destroy();
		res.json(true);
	});

	app.get('/checkSession', function(req, res){
		console.log('connect to database');
	})

};