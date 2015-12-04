var employees = require('./../controllers/employees.js');
var shifts = require('./../controllers/shifts.js');
var admins = require('./../controllers/admins.js');
var locations = require('./../controllers/locations.js');

module.exports = function(app) {

	app.get('/allEmployees', employees.allEmployees);

	app.get('/oneEmployee/:id', employees.getOneEmployee);

	app.delete('/deleteEmployee/:id', employees.deleteEmployee);

	app.post('/editEmployee', employees.editEmployee);

	app.post('/addEmployee', employees.addEmployee);

	app.post('/updateAvailability', employees.updateAvailability);

	app.post('/addShift', shifts.addShift);

	app.post('/authenticateUser', employees.login);

	app.post('/addLocation', locations.addLocation);

	app.post('/authenticateAdmin', function(req, res){
		admins.login(req,res);

	});
	app.get('/destroySession', function(req, res){
		req.session.destroy();
		res.json(true);
	});

	app.get('/checkSession', employees.retrieveUser);

	app.get('/getMySchedule/:id', shifts.employeeShift);

	app.get('/getLocations', locations.getLocations);

	app.get('/getCategories', shifts.getCategories);

	app.get('/availability/:id', function(req, res){
		console.log(req.params.id);
	});
	
	app.get('/destroySession', function(req, res){
		req.session.destroy();
		res.json(true);
	});

	app.get('/getAllShift', function(req,res){
		shifts.getAll(req,res);
	})

	app.post('/getAllEmployees', function(req,res){
		shifts.getAllEmployees(req,res);
	})

	app.post('/assign', function(req,res){
		shifts.assign(req,res);
	})

	app.post('/editPassword', employees.editPassword);

	// app.post('/getSchedule', function(req,res){
		
	// })
};