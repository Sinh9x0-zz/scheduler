module.exports = (function() {
	return {
		availableShifts: function(req, res) {
			var query = "SELECT * FROM shifts where user.id = null";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else
					res.json(rows)
			})
		},

		employeeShift: function(req, res){
			var query = connection.query("select * from employees where id = ?", req.params.id, function(err, records){					
				if (err){
					res.json(err);
				} else {
					res.json(records);
				}
			});
		}
	}

})();