app.controller('loginController', function(sessionFactory, employeeFactory, $location) {
	var _this = this;

	sessionFactory.getErrors(function(response){
		_this.sessionErrors = response;
	});

	sessionFactory.getLogOutMessage(function(response){
		_this.logoutMessage = response;
	});


	sessionFactory.getUser(function(currentUser){
		_this.redirect(currentUser);
	});

	this.redirect = function(currentUser){
		if (currentUser) {
			if (currentUser.user_level == 9) {
				$location.path('/admin/dashboard')
			} else {
				$location.path('/dashboard')
			}
		} else {
			$location.path('/')
		}
	}

	this.login = function(){
		employeeFactory.authenticate(_this.user, function(sessionUser){
			if(sessionUser.errors != undefined){
				_this.sessionErrors = sessionUser.errors;
			} else {				
				_this.redirect(sessionUser);
				_this.user = {};
			} 	
		});
	}

});