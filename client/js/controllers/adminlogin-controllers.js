app.controller('adminLoginController', function(sessionFactory, adminFactory, $location) {
	var _this = this;
	_this.invalid = false;
	sessionFactory.getErrors(function(response){
		_this.sessionErrors = response;
	})

	sessionFactory.getLogOutMessage(function(response){
		_this.logoutMessage = response;
	})

	_this.login = function(){
		adminFactory.authenticate(_this.user, function(sessionUser){
			if(sessionUser.length == 0){
				_this.feedback = "Invalid Credentials";
				_this.invalid = true;
			} else {				
				_this.feedback = "You've been logged in successfully!";
				sessionFactory.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 
				_this.invalid = false;
				_this.user = {};
				$location.path('/admin/dashboard');
			}
		});
	}

	_this.currentUser = {};
});