app.controller('navbarController', function(sessionFactory, employeeFactory, $location) {
	var _this = this; 
	console.log('controller got created');
	_this.logout = function(){
		console.log('clicked');
		sessionFactory.destroySession(function(response){
			$location.path('/');
		});
	}
});