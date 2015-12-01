app.controller('loginController', function(sessionFactory, employeeFactory, $location) {
	var _this = this;

	sessionFactory.getErrors(function(response){
		_this.sessionErrors = response;
	});

	sessionFactory.getLogOutMessage(function(response){
		_this.logoutMessage = response;
	});

	sessionFactory.getUser(function(currentUser){
		if (currentUser) {
			if (currentUser.user_level == 9) {
				$location.path('/admin/dashboard')
			} else {
				$location.path('/dashboard')
			}
		} 
	});

	_this.login = function(){
		employeeFactory.authenticate(_this.user, function(sessionUser){
			if(sessionUser.errors != undefined){
				_this.sessionErrors = sessionUser.errors;
			} else {				
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