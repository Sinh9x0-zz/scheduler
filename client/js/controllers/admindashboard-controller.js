app.controller('adminDashController', function(sessionFactory, adminFactory, shiftFactory, employeeFactory, $location) {
	var _this = this;
	
	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		_this.currentUser = _this.currentUserData[0].first_name + " " + _this.currentUserData[0].last_name;
		if(currentUser == ' Require log in' ||  _this.currentUserData.length == 0) { //if not log in yet
			$location.path('/admin');
		}
	})

	shiftFactory.getAllShift(function(response){
		_this.allShifts = response;
		for(var i = 0; i < response.length; i++){
			shiftFactory.getAllEmployees(response[i], i, function(employees, index){
				_this.allShifts[index].workers = employees;
			})
		}
	})

	employeeFactory.showAllEmployees(function(response){
		_this.allEmployees = response;

	shiftFactory.getAllShift(function(shifts){
		_this.allShifts = shifts;
	})

	employeeFactory.showAllEmployees(function(employees){
		_this.allEmployees = employees;
	})

	_this.assign = function(){
		console.log(_this.assignedEmployee);
	}

});