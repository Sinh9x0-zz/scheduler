app.controller('addEmployeeController', function(employeeFactory){
	var _this = this;
	_this.newEmployee = {}
	_this.addEmployee = function(){
		console.log(_this.newEmployee);
		employeeFactory.addEmployee(_this.newEmployee, function(){
			console.log('success!');
		})
	}

});