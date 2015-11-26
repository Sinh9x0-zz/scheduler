app.factory('locationFactory', function($http, $location){
	var factory = {};

	factory.getLocations = function(callback){
		$http.get('/getLocations/').success(function(locations){
			callback(locations);
		});	
	}
	factory.addLocation = function(location){
		$http.post('/addLocation/', location).success(function(result){
			$location.path('/admin/dashboard');
		});
	}
	return factory;
})