app.controller('editEmployeeController', function($routeParams, employeeFactory, $location){
	var _this = this;
	
	employeeFactory.getOneEmployee($routeParams.id, function(oneEmployee){
			_this.oneEmployee = oneEmployee[0];
		})

	_this.deleteEmployee = function(id){
		employeeFactory.deleteEmployee(id, function(){
			$location.path('/showallemployees');
		})
	};

	_this.editEmployee = function(){
		employeeFactory.editEmployee(_this.oneEmployee, function(feedback){
			if(Number.isInteger(feedback)){
				$location.path('/showallemployees');
			} else {
				_this.errors = feedback;
			}

		})
	};

});