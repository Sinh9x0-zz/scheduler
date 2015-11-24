
module.exports = (function() {
	return {
		availableShifts: function(req, res) {
			var query = "SELECT * FROM shifts where user.id = null";
			connection.query(query, function (err, rows){
				if (err) 
					return response.json(err)
				else
					return response.json(rows)
			})
		},

		employeeShift: function(req, res){
			var query = connection.query("select * from employees where id =?", req.params.id, function(err, records){					
				console.log(query.sql);

				if (err){
					res.json(err);
				} else {
					res.json(records);
				}
			});
		}
	}

})();