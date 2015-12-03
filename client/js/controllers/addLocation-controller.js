app.controller('addLocationController', function(locationFactory){
	var _this = this;
	_this.newLocation= {}

	locationFactory.getLocations(function(locations){
		_this.locations = locations;
	})

	_this.addLocation = function(){
		locationFactory.addLocation(_this.newLocation, function(feedback){
			if(Number.isInteger(feedback)){
				$location.path('/admin/dashboard');
			} else {
				_this.errors = feedback;
			}
		})
	}

});