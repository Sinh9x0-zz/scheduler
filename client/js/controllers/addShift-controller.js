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
		shiftFactory.addShift(_this.newShift, function(feedback){
			if(Number.isInteger(feedback)){
				$location.path('/admin/dashboard')
			} else {
				_this.errors = feedback;
			}
		})
	}

});