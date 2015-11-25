var employees = require('./../controllers/employees.js');
var shifts = require('./../controllers/shifts.js');

module.exports = function(app) {

	app.get('/allEmployees', employees.allEmployees);

	app.get('/oneEmployee/:id',function(req,res){
		employees.getOneEmployee(req,res);
	});

	app.delete('/deleteEmployee/:id', function(req,res){
		employees.deleteEmployee(req,res);
	});

	app.post('/editEmployee', employees.editEmployee);

	app.post('/addEmployee', employees.addEmployee);

	app.get('/deleteUser/:id', function(req, res){
		console.log('connect to database');
	});

	app.post('/authenticateUser', employees.login);

	app.get('/destroySession', function(req, res){
		req.session.destroy();
		res.json(true);
	});

	app.get('/checkSession', function(req, res){
		console.log('here');
		employees.retrieveUser(req,res);
	})

	app.get('/getMySchedule/:id', function(req, res){
		shifts.employeeShift(req,res);
	});


};