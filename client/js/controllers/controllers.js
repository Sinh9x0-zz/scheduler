app.controller('usersController', function(sessionFactory, userFactory) {
	var _this = this;
	userFactory.getUsers(function(users){
		_this.users = users;
	});

	_this.status = 'account';

	this.currentUser = {};

	_this.addUser = function(){
		userFactory.addUser(_this.newUser, function(){
			userFactory.getUsers(function(users){
				_this.users = users;
			});

			_this.newUser = {};

		});
	}

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