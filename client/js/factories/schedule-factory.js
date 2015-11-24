app.factory('scheduleFactory', function($http){
	var factory = {};

	factory.getMySchedule = function(id, callback){
		$http.get('/getMySchedule/' + id).success(function(mySchedule){
			callback(mySchedule);
		});	
	}

	return factory;
})