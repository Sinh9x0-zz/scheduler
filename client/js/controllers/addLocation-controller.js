app.controller('addLocationController', function(locationFactory){
	var _this = this;
	_this.newLocation= {}

	locationFactory.getLocations(function(locations){
		_this.locations = locations;
	})

	_this.addLocation = function(){
		console.log(_this.newLocation);
		locationFactory.addLocation(_this.newEmployee, function(id){
			console.log('success!');
			console.log('id',id);
			$location.path('/admin/dashboard');
		})
	}

});