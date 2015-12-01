app.controller('navbarController', function(sessionFactory, employeeFactory, $location) {
	var _this = this; 

	sessionFactory.removeLogOutMessage();

	sessionFactory.getUser(function(user){
		console.log(user);
		if(user[0].user_level == 9){
			_this.admin = true;
		} else {
			_this.admin = false;
		}
	})

	_this.logout = function(){
		sessionFactory.destroySession(function(response){
			$location.path('/');
		});
	}

});