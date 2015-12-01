app.factory('locationFactory', function($http, $location){
	var factory = {};

	factory.getLocations = function(callback){
		$http.get('/getLocations/').success(function(locations){
			callback(locations);
		});	
	}

	factory.addLocation = function(location, callback){
		$http.post('/addLocation/', location).success(function(id){
			callback(id);
		});
	}
	
	return factory;
})