app.controller('accountController', function(sessionFactory, employeeFactory, $location){
 	var _this = this;
 
	sessionFactory.getUser(function(currentUser){
		if(currentUser) {
			_this.currentUserData = currentUser;
		} else {
			$location.path('/')
		}
	})
})