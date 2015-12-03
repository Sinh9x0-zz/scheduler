app.controller('addEmployeeController', function(employeeFactory, shiftFactory, locationFactory, $location, $routeParams){
	var _this = this;
	_this.newEmployee = {}
	_this.employee = {}

	locationFactory.getLocations(function(locations){
		_this.locations = locations;
	})

	shiftFactory.getCategories(function(categories){
		_this.categories = categories;
	})

	_this.addEmployee = function(){
		employeeFactory.addEmployee(_this.newEmployee, function(feedback){
			if(Number.isInteger(feedback)){
				$location.path('/availability/' + feedback);
			} else {
				_this.errors = feedback;
			}
		})
	}

	_this.updateEmployeeAvailability = function(){
		_this.employee.id = $routeParams.id;
		employeeFactory.updateEmployeeAvailability(_this.employee, function(updated){
			console.log('reached', updated);
			$location.path('/admin/dashboard');
		});
	}

});