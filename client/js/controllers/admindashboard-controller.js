app.controller('adminDashController', function(sessionFactory, adminFactory, $location) {
	var _this = this;

	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		console.log(_this.currentUserData);
		if(currentUser == ' Require log in') { //if not log in yet
			$location.path('/admin');
		}
	})
});