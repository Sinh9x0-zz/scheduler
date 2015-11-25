app.factory('locationFactory', function($http){
	var factory = {};

	factory.getLocations = function(callback){
		$http.get('/getLocations/').success(function(locations){
			callback(locations);
		});	
	}

	return factory;
})