
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
			//req.body should include user information
			//var query = "SELECT * FROM employees where email";
		}
	}

})();