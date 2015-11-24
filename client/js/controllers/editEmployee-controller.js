app.controller('editEmployeeController', function($routeParams, employeeFactory){
	var _this = this;
	employeeFactory.getOneEmployee($routeParams.id, function(oneEmployee){
			
			_this.oneEmployee = oneEmployee;
			console.log(_this.oneEmployee);
		})
});