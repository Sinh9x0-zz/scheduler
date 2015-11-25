app.controller('editEmployeeController', function($routeParams, employeeFactory, $location){
	var _this = this;
	employeeFactory.getOneEmployee($routeParams.id, function(oneEmployee){
			_this.oneEmployee = oneEmployee;
			console.log(_this.oneEmployee);
		})

	_this.deleteEmployee = function(empid){
			employeeFactory.deleteEmployee(empid, function(){
			$location.path('/showallemployees');

		})
	};


});