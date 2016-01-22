app.factory('sessionFactory', function($http, $location, $q){
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
			if(response){
				delete session.errors;
			} else { 
				session.errors = 'You must be logged in to access that page!';
			}

			callback(response);
		});
 	}

 	session.checkUser = function(){
 		$http.get('/checkSession').success(function(response){
 			return response;
 		})
 	}

 	 session.checkAdmin = function(){
 	 	var user = session.checkUser(); 
		if(user != undefined && response.user_level == 9){
			return response;
 		} else {
 			return user;
 		}
 	}

 	session.editPassword = function(currentUser, callback){
 		$http.post('/editPassword', currentUser).success(function(updatedPassword){
 			callback(updatedPassword);
 		})
 	}

	return session;
})