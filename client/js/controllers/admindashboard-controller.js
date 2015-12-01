app.controller('adminDashController', function(sessionFactory, adminFactory, shiftFactory, employeeFactory, $location) {
	var _this = this;
	
	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
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
	})

	shiftFactory.getAllShift(function(shifts){
		_this.allShifts = shifts;
	})

	employeeFactory.showAllEmployees(function(employees){
		_this.allEmployees = employees;
	})

	_this.assign = function(id){
		console.log(id);
	}
});