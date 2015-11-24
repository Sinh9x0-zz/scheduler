app.factory('employeeFactory', function($http){
	var factory = {};

	factory.getUsers = function(callback){
		$http.get('/allUsers').success(function(output){
			callback(output);
		});
	}

	factory.addEmployee = function(newEmployee, callback){
		$http.post('/addemployee', newEmployee).success(function(user){
			callback(user);
		});
	}

	factory.removeUser = function(id, callback){
		$http.get('/deleteUser/' + id).success(function(){
			callback();
		});
	}

	factory.authenticate = function(user, callback){
		$http.post('/authenticateUser/', user).success(function(sessionUser){
			callback(sessionUser);
		});
	}

	factory.showAllEmployees = function(callback){
		$http.get('/allEmployees').success(function(showAll){
			callback(showAll);
		})
	}

	factory.getOneEmployee = function(oneEmpid, callback){
		$http.get('/oneEmployee/' + oneEmpid).success(function(oneEmployee){
			callback(oneEmployee);
		})
	}

	return factory;
})



