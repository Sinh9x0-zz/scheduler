app.controller('scheduleController', function(sessionFactory, employeeFactory, scheduleFactory, shiftFactory, $location) {
	var _this = this;

	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		if(currentUser == ' Require log in') { //if not log in yet
			$location.path('/');
		}
		scheduleFactory.getMySchedule(_this.currentUserData.id, function(response){
			_this.mySchedule = response;
		})

		shiftFactory.getAllShift(function(response){
			_this.availableShift = response;
			console.log(response);
		})
	})	
});