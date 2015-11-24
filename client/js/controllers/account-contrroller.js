app.controller('accountController', function(sessionFactory, userFactory){
 	var _this = this;
 
	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		console.log(_this.currentUserData);
	})
})