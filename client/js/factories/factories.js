app.factory('userFactory', function($http){
	var factory = {};

	factory.getUsers = function(callback){
		$http.get('/allUsers').success(function(output){
			callback(output);
		});
	}

	factory.addUser = function(newUser, callback){
		$http.post('/addUser', newUser).success(function(user){
			callback(user);
		});
	}

	factory.removeUser = function(id, callback){
		$http.get('/deleteUser/' + id).success(function(){
			callback();
		});
	}

	factory.authenticate = function(user, callback){
		$http.post('/authenticateUser/', user).success(function(sessionUser){
			callback(sessionUser);
		});
	}

	return factory;
})

app.factory('sessionFactory', function($http){
	var session = {};

	session.user = {}

	session.storeUser = function(user){
		session.user = user;
	}

	session.getUser = function(callback){
		callback(session.user);
	}

	session.destroySession = function(){
		$http.get('/destroySession').success(function(){
			console.log('session ended');
		});
	}

	session.checkSession = function(callback){
		$http.get('/checkSession').success(function(sessionUser){
			callback(sessionUser);
		});
	}

	return session;
})