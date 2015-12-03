app.factory('scheduleFactory', function($http){
	var factory = {};

	factory.getMySchedule = function(id, callback){
		$http.get('/getMySchedule/' + id).success(function(mySchedule){
			callback(mySchedule);
		});	
	}
	factory.getUserShift = function(data, callback){
		$http.post('/getSchedule', data).success(function(shifts){
			callback(shifts);
		})
	}

	return factory;
})