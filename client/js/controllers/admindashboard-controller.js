app.controller('adminDashController', function(sessionFactory, adminFactory, $location) {
	var _this = this;
	
	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		_this.currentUser = _this.currentUserData[0].first_name + " " + _this.currentUserData[0].last_name;
		if(currentUser == ' Require log in' ||  _this.currentUserData.length == 0) { //if not log in yet
			$location.path('/admin');
		}
	})
});