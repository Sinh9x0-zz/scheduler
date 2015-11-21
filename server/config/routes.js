var users = require('./../controllers/users.js');

module.exports = function(app) {

	app.get('/allUsers', function(req, res) {
		users.allUsers(req, res);
	});

	app.post('/addUser', function(req, res){
		users.addUser(req,res);
	});

	app.get('/deleteUser/:id', function(req, res){
		users.deleteUser(req, res);
	});

	app.post('/authenticateUser', function(req, res){
		users.authenticateUser(req,res);
	})

	app.get('/destroySession', function(req, res){
		req.session.destroy();
		res.json(true);
	});

	app.get('/checkSession', function(req, res){
		users.maintainUser(req, res);
	})

};