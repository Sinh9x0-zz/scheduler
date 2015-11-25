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
	_this.checkSession();

});
