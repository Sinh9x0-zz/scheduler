app.controller('scheduleController', function(sessionFactory, employeeFactory, scheduleFactory, shiftFactory,socket, $location) {
	var _this = this;

	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		if(currentUser == ' Require log in') { //if not log in yet
			$location.path('/');
		}
		scheduleFactory.getMySchedule(_this.currentUserData.id, function(response){
			if (_this.currentUserData.user_level == 1) {
				console.log(response)
				_this.mySchedule = response;
			} else {
				console.log('Administrators do not have schedules. They work when they want.')
			}
		})
		socket.on('update_schedule', function(){
			console.log('how did it not work omg')
			scheduleFactory.getMySchedule(_this.currentUserData.id, function(response){
				if (_this.currentUserData.user_level == 1) {
					console.log(response)
					_this.mySchedule = response;
					shiftFactory.getAllShift(function(response){
						_this.availableShift = response;
						console.log(response);
					})
				} else {
					console.log('Administrators do not have schedules. They work when they want.')
				}
			})
		})

		shiftFactory.getAllShift(function(response){
			_this.availableShift = response;
			console.log(response);
		})
	})	
});