app.controller('scheduleController', function(sessionFactory, employeeFactory, scheduleFactory) {
	var _this = this;

	scheduleFactory.getMySchedule(1, function(mySchedule){
		_this.mySchedule = mySchedule;
	});

});