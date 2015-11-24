
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
		addEmployee: function(req, res) {
			connection.query(query, function(err){
				if (err){
					return response.json(err)
				} 	
				else{
					var query = "INSERT INTO employees (email, password, first_name, last_name, address, birthday, phone_number, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
					var values = array(req.body.email, req.body.password, req.body.first_name, req.body.last_name, req.body.address, req.body.birthday, req.body.phone_number);
				}
			})
		}
	}

})();