
module.exports = (function() {
	return {
		allEmployees: function(req, res) {
			var query = "SELECT * FROM employees";
			connection.query(query, function (err, rows){
				if (err) 
					return response.json(err)
				else
					return response.json(rows)
			})
		},

		addEmployee: function(req, res){
			console.log(req.body);
		}
	}

})();