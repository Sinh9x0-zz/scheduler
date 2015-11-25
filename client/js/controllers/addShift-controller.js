app.controller('addShiftController', function($location, locationFactory, shiftFactory){
	var _this = this;
	
	_this.newShift = {}

	locationFactory.getLocations(function(locations){
		_this.locations = locations;	
	})

	shiftFactory.getCategories(function(categories){
		_this.categories = categories;
	})

	_this.addShift = function(){
		shiftFactory.addShift(_this.newShift, function(response){
			$location.path('/admin/dashboard')
		})
	}

});