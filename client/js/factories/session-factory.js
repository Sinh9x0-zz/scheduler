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