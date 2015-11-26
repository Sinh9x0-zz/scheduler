app.factory('shiftFactory', function($http){
	var factory = {};

	factory.getCategories = function(callback){
		$http.get('/getCategories').success(function(categories){
			callback(categories);
		});
	}

	factory.addShift = function(shift, callback){
		console.log(shift);
		$http.post('/addShift', shift).success(function(response){
			callback(response);
		});	
	}
	factory.getAllShift = function(callback){
		$http.get('/getAllShift').success(function(response){
			callback(response);
		})
	}

	return factory;
})