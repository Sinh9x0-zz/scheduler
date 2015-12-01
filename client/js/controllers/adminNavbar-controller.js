app.controller('adminNavController', function(sessionFactory, employeeFactory, $location){
 	var _this = this;

	sessionFactory.getUser(function(currentUser){
		if(currentUser && currentUser.user_level == 9) {
			_this.admin = true;
			_this.currentUserData = currentUser;
		} else if (currentUser) {
			_this.admin = false;
			$location.path('/dashboard')
		} else {
			$location.path('/')
		}
	})

	_this.logout = function(){
		sessionFactory.destroySession(function(){
			$location.path('/admin');
		});
	}

})