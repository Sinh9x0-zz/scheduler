app.controller('scheduleController', function(sessionFactory, employeeFactory, scheduleFactory, $location) {
	var _this = this;

	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		if(currentUser == ' Require log in') { //if not log in yet
			$location.path('/');
		}
	})
	
});