app.controller('loginController', function(sessionFactory, employeeFactory, $location) {
	var _this = this;

	sessionFactory.getErrors(function(response){
		_this.sessionErrors = response;
	})

	_this.login = function(){
		console.log('logging in');
		employeeFactory.authenticate(_this.user, function(sessionUser){
			if(sessionUser.length == 0){
				_this.feedback = "Invalid Credentials";
				console.log('invalid');
			} else {				
				_this.feedback = "You've been logged in successfully!";
				sessionFactory.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 
				_this.user = {};
				$location.path('/dashboard');
			}
		});
	}

	_this.currentUser = {};
});