app.controller('adminNavController', function(sessionFactory, employeeFactory, $location){
 	var _this = this;
 
	sessionFactory.getUser(function(currentUser){
		if(currentUser == ' Require log in' || currentUser.length == 0) { //if not log in yet
			$location.path('/admin');
		}
	})
})