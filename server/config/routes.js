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

	app.post('/authenticateAdmin', admins.login);

	app.get('/destroySession', function(req, res){
		req.session.destroy();
		res.json(true);
	});

	app.get('/checkSession', employees.retrieveUser);

	app.get('/getMySchedule/:id', shifts.employeeShift);

	app.get('/getLocations', locations.getLocations);

	app.get('/getCategories', shifts.getCategories);

	// app.get('/availability/:id', function(req, res){
	// 	console.log(req.params.id);
	// });
	
	app.get('/getAllShift', shifts.getAll);

	app.post('/getAllEmployees', shifts.getAllEmployees);

	app.post('/assign', shifts.assign);

	app.post('/unassign', shifts.unassign);
	app.post('/editPassword', employees.editPassword);

	// app.post('/getSchedule', function(req,res){
		
	// })

};