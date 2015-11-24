app.factory('sessionFactory', function($http){
	var session = {};

	session.getErrors = function(callback){
		callback(session.errors);
	}

	session.getUser = function(callback){
		$http.get('/checkSession').success(function(response){
			if(response == 'havent logged in'){
				session.errors = ' Require log in';
				callback(session.errors);
			} else {
				session.errors = {};
				callback(response);
			}
		})
 	}

	session.destroySession = function(){
		$http.get('/destroySession').success(function(){
			console.log('session ended');
		});
	}

	return session;
})