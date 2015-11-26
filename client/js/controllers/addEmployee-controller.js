app.controller('addEmployeeController', function(employeeFactory, locationFactory, $location, $routeParams){
	var _this = this;
	_this.newEmployee = {}
	_this.employee = {}

	locationFactory.getLocations(function(locations){
		_this.locations = locations;
	})

	_this.addEmployee = function(){
		employeeFactory.addEmployee(_this.newEmployee, function(id){
			console.log('added employee', id);
			$location.path('/availability/' + id);
		})
	}

	_this.updateEmployeeAvailability = function(){
		_this.employee.id = $routeParams.id;
		employeeFactory.updateEmployeeAvailability(_this.employee);
	}

});