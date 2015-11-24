app.controller('allEmployeesController', function(employeeFactory){

	var _this = this;

		employeeFactory.showAllEmployees(function(allEmployees){
			for (index in allEmployees){
				allEmployees[index].name = allEmployees[index].first_name + " " + allEmployees[index].last_name;
			}
			_this.allEmployees = allEmployees;
			console.log(_this.allEmployees);
		})
});
