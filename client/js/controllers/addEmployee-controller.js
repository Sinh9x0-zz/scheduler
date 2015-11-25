app.controller('addEmployeeController', function(employeeFactory, locationFactory, $location, $routeParams){
	var _this = this;
	_this.newEmployee = {}

	locationFactory.getLocations(function(locations){
		_this.locations = locations;
	})

	_this.addEmployee = function(){
		console.log(_this.newEmployee);
		employeeFactory.addEmployee(_this.newEmployee, function(id){
			console.log('success!');
			console.log('id',id);
			$location.path('/availability/'+id);
		})
	}

	_this.addAvailability = function(){
		console.log($routeParams.id);
	}

});