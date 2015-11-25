app.controller('navbarController', function(sessionFactory, employeeFactory, $location) {
	var _this = this; 

	sessionFactory.removeLogOutMessage();

	_this.logout = function(){
		sessionFactory.destroySession(function(response){
			$location.path('/');
		});
	}
});