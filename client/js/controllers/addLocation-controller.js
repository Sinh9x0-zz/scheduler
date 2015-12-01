app.controller('addLocationController', function(locationFactory){
	var _this = this;
	_this.newLocation= {}

	locationFactory.getLocations(function(locations){
		_this.locations = locations;
	})

	_this.addLocation = function(){
		console.log(_this.newLocation);
		locationFactory.addLocation(_this.newLocation, function(id){
			$location.path('/admin/dashboard');
		})
	}

});