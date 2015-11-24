module.exports = (function() {
	return {
		allEmployees: function(req, res) {
			var query = "SELECT * FROM employees";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else {
					console.log(rows)
					res.json(rows)
				}
			})
		},

		getOneEmployee: function(req, res) {
			var query = "SELECT * FROM employees WHERE id = ?";
			connection.query(query, req.params.id, function (err, rows){
				if (err) 
					res.json(err)
				else {
					res.json(rows)
				}
			})
		},
		
		addEmployee: function(req, res) {
			var post = {
				email: req.body.email, 
				password: req.body.password, 
				first_name: req.body.first_name,
				last_name: req.body.last_name, 
				address: req.body.address, 
				birthday: req.body.birthday, 
				phone_number: req.body.phone_number, 
				created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
				updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
			};

			var query = connection.query('INSERT INTO employees SET ?', post, function(err, result) {
				console.log(result);
			});

			console.log(query.sql); 
		},

		login: function(req,res){
			var query = "SELECT email, password, first_name, last_name FROM employees where email = '" + req.body.email + "';";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else
					res.json(rows)
			})
		}
	}

})();