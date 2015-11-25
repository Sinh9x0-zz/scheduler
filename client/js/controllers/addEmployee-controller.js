app.controller('addEmployeeController', function(employeeFactory, locationFactory){
	var _this = this;
	_this.newEmployee = {}
	_this.addEmployee = function(){
		console.log(_this.newEmployee);
		employeeFactory.addEmployee(_this.newEmployee, function(){
			console.log('success!');
		})
	}
	locationFactory.getLocations(function(locations){
			console.log('success getting locations');
			_this.locations = locations;
		})
});