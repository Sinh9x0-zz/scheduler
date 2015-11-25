app.controller('navbarController', function(sessionFactory, employeeFactory, $location) {
	var _this = this; 

	sessionFactory.removeLogOutMessage();
	sessionFactory.getUser(function(user){
		console.log(user);
		if(user[0].user_level == 1){
			_this.admin = false;
		}else{
			_this.admin = true;
		}
	})
	_this.logout = function(){
		sessionFactory.destroySession(function(response){
			$location.path('/');
		});
	}
});