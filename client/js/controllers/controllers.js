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

app.controller('loginController', function(sessionFactory, userFactory) {
	var _this = this;

	_this.login = function(){
		console.log('logging in');
		userFactory.authenticate(_this.user, function(sessionUser){
			if(!sessionUser){
				_this.feedback = "Invalid Credentials";
			} else {
				_this.feedback = "You've been logged in successfully!";
				session.storeUser(sessionUser);
				session.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 
				_this.user = {};
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
app.controller('myScheduleController', function(sessionFactory, userFactory, myScheduleFactory) {
	var _this = this;

	myScheduleFactory.getMySchedule(1, function(mySchedule){
		_this.mySchedule = mySchedule;
	});

});

