app.controller('usersController', function(sessionFactory, userFactory) {
	var _this = this;
	userFactory.getUsers(function(users){
		_this.users = users;
	});

	_this.status = 'account';

	this.currentUser = {};

	_this.removeUser = function(id){
		userFactory.removeUser(id, function(){
			userFactory.getUsers(function(users){
				_this.users = users;
			});

		});
	}

	_this.checkSession = function(){
		session.checkSession(function(sessionUser){
			if(sessionUser){
				session.storeUser(sessionUser);
				session.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 
			}
		});
	}

	_this.inSession = function() {
		return (!jQuery.isEmptyObject(_this.currentUser));
	}

	_this.destroySession = function(){
		_this.currentUser =  {};
		session.destroySession();
		_this.feedback = "You've been logged out successfully!";
	}

	_this.checkSession();

});
app.controller('accountController', function(sessionFactory, userFactory){
	var _this = this;

	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		console.log(_this.currentUserData);
	})
})
app.controller('loginController', function(sessionFactory, userFactory, $location) {
	var _this = this;
	sessionFactory.getErrors(function(response){
		_this.sessionErrors = response;
	})
	_this.login = function(){
		userFactory.authenticate(_this.user, function(sessionUser){
			console.log(sessionUser);
			if(sessionUser.length == 0){ // couldnt find user 
				_this.feedback = "Invalid Credentials";
			} else {				
				_this.feedback = "You've been logged in successfully!";
				console.log("You've been logged in successfully!");
				sessionFactory.storeUser(sessionUser);
				sessionFactory.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 
				_this.user = {};
				$location.path('/dashboard');
			}
		});
	}

	this.currentUser = {};

});

app.controller('addEmployeeController', function(userFactory){
	var _this = this;
	_this.newEmployee = {}
	_this.addEmployee = function(){
		console.log(_this.newEmployee);
		userFactory.addEmployee(_this.newEmployee, function(){
			console.log('success!');
		})
	}

});
app.controller('myScheduleController', function(sessionFactory, userFactory, myScheduleFactory, $location) {
	var _this = this;
	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		if(currentUser == ' Require log in') { //if not log in yet
			$location.path('/');
		}
	})
	_this.currentUser = _this.currentUserData[0].first_name + " " + _this.currentUserData[0].last_name;
	// myScheduleFactory.getMySchedule(1, function(mySchedule){
	// 	_this.mySchedule = mySchedule;
	// });

});

