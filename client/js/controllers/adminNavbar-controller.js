app.controller('adminNavController', function(sessionFactory, employeeFactory, $location){
 	var _this = this;
 
	sessionFactory.getUser(function(currentUser){
		if(currentUser == ' Require log in' || currentUser.length == 0) { //if not log in yet
			$location.path('/admin');
		}
	})

	sessionFactory.getUser(function(user){
		if(user[0].user_level == 9){
			_this.admin = true;
		} else {
			_this.admin = false;
			$location.path('/dashboard')
		}
	})
})