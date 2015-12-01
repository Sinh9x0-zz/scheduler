app.controller('navbarController', function(sessionFactory, employeeFactory, $location) {
	var _this = this; 

	sessionFactory.removeLogOutMessage();

	sessionFactory.getUser(function(currentUser){
		if(currentUser) {
			if(currentUser.user_level == 9){
				_this.admin = true;	
			}
			_this.currentUserData = currentUser;
		} else {
			$location.path('/')
		}
	})

	_this.logout = function(){
		sessionFactory.destroySession(function(response){
			$location.path('/');
		});
	}

});