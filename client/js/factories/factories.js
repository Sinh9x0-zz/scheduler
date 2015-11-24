app.factory('userFactory', function($http){
	var factory = {};

	factory.getUsers = function(callback){
		$http.get('/allUsers').success(function(output){
			callback(output);
		});
	}

	factory.addEmployee = function(newEmployee, callback){
		$http.post('/addemployee', newEmployee).success(function(user){
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
	session.getErrors = function(callback){
		callback(session.errors);
	}

	session.getUser = function(callback){
		if(Object.getOwnPropertyNames(session.user).length === 0){
			session.errors = ' Require log in';
			callback(session.errors);
		} else {
			session.errors = {};
			callback(session.user);
		}
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

app.factory('myScheduleFactory', function($http){
	var factory = {};

	factory.getMySchedule = function(id, callback){
		console.log(id);
		$http.get('/getMySchedule/' + id).success(function(mySchedule){
			callback(mySchedule);
		});	
	}
	

	return factory;
})