app.factory('sessionFactory', function($http){
	var session = {};

	session.destroySession = function(callback){
		$http.get('/destroySession').success(function(){
			session.logoutMessage = 'You have logged out';
			callback();
		});
	}

	session.removeLogOutMessage = function(){
		session.logoutMessage = '';
	}

	session.getLogOutMessage = function(callback){
		callback(session.logoutMessage);
	}
	session.getErrors = function(callback){
		callback(session.errors);
	}

	session.getUser = function(callback){
		$http.get('/checkSession').success(function(response){
			console.log(response);
			if(response == 'havent logged in' || response.length == 0){
				session.errors = ' Require log in';
				callback(session.errors);
			} else {
				delete session.errors;
				callback(response);
			}
		})
 	}


	return session;
})