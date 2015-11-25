app.controller('addEmployeeController', function(employeeFactory, locationFactory, $location, $routeParams){
	var _this = this;
	_this.newEmployee = {}
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
	locationFactory.getLocations(function(locations){
			console.log('success getting locations');
			_this.locations = locations;
		})
});