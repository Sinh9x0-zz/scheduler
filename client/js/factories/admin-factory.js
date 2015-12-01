app.factory('adminFactory', function($http){
	var factory = {};

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
		console.log(user);
		$http.post('/authenticateAdmin/', user).success(function(sessionUser){
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

	factory.deleteEmployee = function(empid, callback){
		$http.delete('/deleteEmployee/' + empid).success(function(){
			callback();
		});
	}

	return factory;
})