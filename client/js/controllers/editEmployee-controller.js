app.controller('editEmployeeController', function($routeParams, employeeFactory, $location){
	var _this = this;
	
	employeeFactory.getOneEmployee($routeParams.id, function(oneEmployee){
			_this.oneEmployee = oneEmployee;
			// _this.oneEmployee[0].birthday = 
		})

	_this.deleteEmployee = function(empid){
			employeeFactory.deleteEmployee(empid, function(){
			$location.path('/showallemployees');

		})
	};

	_this.editEmployee = function(){
		employeeFactory.editEmployee(_this.oneEmployee, function(){
			$location.path('/showallemployees');
		})
	};


});