
module.exports = (function() {
	return {
		allEmployees: function(req, res) {
			var query = "SELECT * FROM employees";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else
					res.json(rows)
			})
		},

		addEmployee: function(req, res){
			console.log(req.body);
		},

		login: function(req,res){
			var query = "SELECT email, password, first_name, last_name FROM employees where email = '"+req.body.email+"';";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else
					res.json(rows)
			})
		}
	}

})();