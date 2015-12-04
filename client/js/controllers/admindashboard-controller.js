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
		console.log(shifts);
	})

	employeeFactory.showAllEmployees(function(employees){
		_this.allEmployees = employees;
	})

	_this.assign = function(shift){
		console.log(shift);
		shiftFactory.assign(shift, function(response){
			shiftFactory.getAllShift(function(shifts){
				_this.allShifts = shifts;
				console.log(shifts);
			})
		})
	}

	_this.haveWorkers = function(workers){
		if(workers.length > 0) {
			return true;
		} else {
			return false;
		}
	}
});