app.controller('scheduleController', function(sessionFactory, employeeFactory, scheduleFactory, $location) {
	var _this = this;

	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		_this.currentUser = _this.currentUserData[0].first_name + " " + _this.currentUserData[0].last_name;
		if(currentUser == ' Require log in') { //if not log in yet
			$location.path('/');
		}
	})

});