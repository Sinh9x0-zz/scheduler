app.controller('loginController', function(sessionFactory, employeeFactory) {
	var _this = this;

	_this.login = function(){
		console.log('logging in');
		employeeFactory.authenticate(_this.user, function(sessionUser){
			if(!sessionUser){
				_this.feedback = "Invalid Credentials";
			} else {				
				_this.feedback = "You've been logged in successfully!";
				session.storeUser(sessionUser);
				session.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 
				_this.user = {};
			}
		});
	}

	_this.currentUser = {};
});